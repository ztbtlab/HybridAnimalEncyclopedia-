'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/lib/types';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(d => setItems(d.items || []));
  }, []);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    items.forEach(i => i.tags?.forEach(t => s.add(t)));
    return Array.from(s).sort();
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter(i => {
      const qLower = q.toLowerCase();
      const hitQ = q ? (
        (i.title || '').toLowerCase().includes(qLower) ||
        (i.description || '').toLowerCase().includes(qLower) ||
        i.tags.join(',').toLowerCase().includes(qLower)
      ) : true;
      const hitTag = tag ? i.tags.includes(tag) : true;
      return hitQ && hitTag;
    });
  }, [items, q, tag]);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-4 py-10 dark:from-neutral-950 dark:via-slate-950 dark:to-emerald-950">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-300 mb-2">合体動物ずかん</h1>
        <p className="mb-6 text-sm text-gray-600 dark:text-neutral-300">
          タグやキーワードで検索して、いろんな合体動物のストーリーを見つけよう！
        </p>

        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white/80 p-4 shadow-lg shadow-emerald-200/40 backdrop-blur dark:bg-neutral-900/90 dark:shadow-none sm:flex-row sm:items-center">
          <div className="flex-1">
            <label className="block text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
              キーワード
            </label>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="タイトル・説明・タグで検索"
              className="mt-1 w-full rounded-2xl border border-emerald-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            />
          </div>
          <div className="sm:w-60">
            <label className="block text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
              タグ
            </label>
            <select
              value={tag ?? ''}
              onChange={e => setTag(e.target.value || null)}
              className="mt-1 w-full rounded-2xl border border-emerald-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            >
              <option value="">すべてのタグ</option>
              {allTags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map(item => (
            <button
              key={item.id}
              className="group relative overflow-hidden rounded-3xl bg-white/90 p-3 text-left shadow-md shadow-emerald-200/40 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-300/60 dark:bg-neutral-900/80 dark:shadow-none"
              onClick={() => setActive(item)}
            >
              <div className="overflow-hidden rounded-2xl bg-emerald-100/60">
                <Image
                  src={item.src}
                  alt={item.title || 'image'}
                  width={500}
                  height={500}
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-500 dark:text-emerald-300">
                <span>★</span>
                <span>合体動物</span>
              </div>
              <div className="mt-1 text-base font-semibold text-gray-900 dark:text-neutral-50">
                {item.title}
              </div>
              {item.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">
                  {item.description}
                </p>
              )}
              {item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map(t => (
                    <span key={t} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-200">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-emerald-300/70 bg-white/70 p-8 text-center text-sm text-emerald-600 dark:border-emerald-700 dark:bg-neutral-900/70 dark:text-emerald-200">
            合体動物が見つかりませんでした。別のキーワードやタグを試してみてね！
          </div>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative mx-auto max-h-[80vh] max-w-full overflow-hidden rounded-3xl bg-black/40 p-3">
              <Image
                src={active.src}
                alt={active.title || 'image'}
                width={1600}
                height={1200}
                className="h-full w-full rounded-2xl object-contain shadow-2xl"
                priority
              />
            </div>
            <div className="mt-4 rounded-3xl bg-white/90 p-5 text-gray-800 shadow-lg dark:bg-neutral-900/90 dark:text-neutral-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">{active.title}</span>
                {active.author && <span className="text-sm text-gray-600 dark:text-neutral-300">by {active.author}</span>}
                {active.takenAt && <span className="text-sm text-gray-600 dark:text-neutral-300">📅 {active.takenAt}</span>}
                <div className="ml-auto flex flex-wrap gap-2">
                  {active.tags?.map(t => <span key={t} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/70 dark:text-emerald-200">#{t}</span>)}
                </div>
              </div>
              {active.description && (
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-neutral-300 whitespace-pre-line">
                  {active.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
