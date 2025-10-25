import { google } from 'googleapis';
import type { NextRequest } from 'next/server';
import { getJwtAuth } from '@/lib/google';

export const runtime = 'nodejs';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ fileId?: string }> }
) {
  const { fileId } = await params;
  if (!fileId) return new Response('fileId required', { status: 400 });

  const auth = getJwtAuth();
  const drive = google.drive({ version: 'v3', auth });

  try {
    // mimeType 取得
    const meta = await drive.files.get({
      fileId,
      fields: 'mimeType,name',
      supportsAllDrives: true
    });
    const mime = meta.data.mimeType || 'image/jpeg';
    const name = meta.data.name || `${fileId}.bin`;

    // 本体ストリーム取得
    const fileResp = await drive.files.get(
      { fileId, alt: 'media', supportsAllDrives: true },
      { responseType: 'stream' }
    );
    const stream = fileResp.data as unknown as NodeJS.ReadableStream;

    const cacheSeconds =
      Number(process.env.DRIVE_IMAGE_CACHE_SECONDS ?? '86400') || 86400;
    const headers = new Headers({
      'Content-Type': mime,
      'Cache-Control': `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}, immutable`,
      'Content-Disposition': `inline; filename="${encodeURIComponent(name)}"`,
    });

    // Edge 互換のため webReadableStream に変換（Node でも動作）
    const readable = (stream as any);
    return new Response(readable as any, { headers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Drive fetch failed';
    const status = typeof err === 'object' && err !== null && 'code' in err && Number.isInteger((err as any).code)
      ? Number((err as any).code) || 500
      : 500;
    return new Response(message, { status });
  }
}
