import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: '合体動物ずかん',
  description: 'Google Drive と Sheets のデータで動くポップな動物ギャラリー',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh antialiased">
        <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-neutral-950/80 border-b border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-3">
            <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">合体動物ずかん</div>
            <nav className="ml-auto text-sm opacity-80">
              <a href="/gallery" className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-200 hover:bg-emerald-500/20">ギャラリーを見る</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
