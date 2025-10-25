import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getJwtAuth } from '@/lib/google';
import type { GalleryItem } from '@/lib/types';

export async function GET() {
  const sheetId = process.env.SHEET_ID;
  const hasCreds = process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;
  if (!sheetId || !hasCreds) return NextResponse.json({ items: [] });

  const auth = getJwtAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  // 範囲は適宜変更（先頭行: ヘッダ）
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'A1:Z1000',
  });

  const rows = res.data.values || [];
  if (rows.length === 0) return NextResponse.json({ items: [] });

  const [header, ...data] = rows;
  const headerMap = new Map<string, number>();
  header.forEach((value, index) => {
    const key = String(value ?? '').trim();
    if (!key) return;
    if (!headerMap.has(key)) headerMap.set(key, index);
    const lower = key.toLowerCase();
    if (!headerMap.has(lower)) headerMap.set(lower, index);
  });

  const getIndex = (...names: string[]) => {
    for (const name of names) {
      const key = String(name ?? '').trim();
      if (!key) continue;
      if (headerMap.has(key)) return headerMap.get(key)!;
      const lower = key.toLowerCase();
      if (headerMap.has(lower)) return headerMap.get(lower)!;
    }
    return -1;
  };

  const pickValue = (row: string[], ...names: string[]) => {
    const index = getIndex(...names);
    if (index === -1) return undefined;
    return row[index];
  };

  const items = data.reduce<GalleryItem[]>((acc, r) => {
    const rawFileId = pickValue(r, 'fileId', 'ファイルID');
    const fileId = typeof rawFileId === 'string' ? rawFileId.trim() : '';
    if (!fileId) return acc;

    const tagsRaw = pickValue(r, 'tags', 'タグ');
    const idRaw = pickValue(r, 'id', 'ID', '保存ファイル名');
    const titleRaw = pickValue(r, 'title', 'タイトル');
    const takenRaw = pickValue(r, 'takenAt', '撮影日', 'timestamp', 'Timestamp');
    const authorRaw = pickValue(r, 'author', '撮影者');
    const descriptionRaw = pickValue(r, 'description', '説明', 'Details');

    const tags = String(tagsRaw ?? '')
      .split(/[,\u3001]/)
      .map(s => s.trim())
      .filter(Boolean);

    acc.push({
      id: String(idRaw ?? fileId).trim() || fileId,
      fileId,
      title: titleRaw ? String(titleRaw).trim() : undefined,
      tags,
      takenAt: takenRaw ? String(takenRaw).trim() : undefined,
      author: authorRaw ? String(authorRaw).trim() : undefined,
      description: descriptionRaw ? String(descriptionRaw).trim() : undefined,
      src: `/api/drive-image/${encodeURIComponent(fileId)}`,
    });
    return acc;
  }, []);

  const response = NextResponse.json({ items });
  const cacheSeconds =
    Number(process.env.GALLERY_REVALIDATE_SECONDS ?? '300') || 300;
  response.headers.set(
    'Cache-Control',
    `public, max-age=0, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds}`
  );
  return response;
}
