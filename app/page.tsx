export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-200">
          🌟 合体動物ずかんへようこそ！
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 dark:text-neutral-50">
          ドライブの写真が、<br className="hidden sm:inline" />こどもたちのワクワク図鑑に変身！
        </h1>
        <p className="mt-4 text-base text-gray-600 dark:text-neutral-300">
          Google Sheets のデータをもとに、合体動物のストーリーや冒険を紹介。
          カラフルなギャラリーで、お気に入りの仲間を見つけよう。
        </p>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="/gallery"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-0.5 hover:bg-emerald-400"
        >
          ギャラリーを探検する →
        </a>
        <a
          href="#how-it-works"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-300 px-6 py-3 text-base font-semibold text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-500/10"
        >
          しくみを見る
      </a>
    </div>
      <section id="how-it-works" className="mt-20 grid gap-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8 dark:from-emerald-900/40 dark:via-neutral-900 dark:to-sky-900/30 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/80 p-6 shadow-sm shadow-emerald-200/40 dark:bg-neutral-900/70 dark:shadow-none">
          <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">1. 集める</h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-neutral-300">
            Google Drive に集めた合体動物の写真を、Sheets にファイルID付きで登録します。
          </p>
        </div>
        <div className="rounded-2xl bg-white/80 p-6 shadow-sm shadow-emerald-200/40 dark:bg-neutral-900/70 dark:shadow-none">
          <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">2. つなげる</h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-neutral-300">
            メタ情報やタグを追加すると、図鑑ページに色鮮やかなカードとして表示されます。
          </p>
        </div>
        <div className="rounded-2xl bg-white/80 p-6 shadow-sm shadow-emerald-200/40 dark:bg-neutral-900/70 dark:shadow-none">
          <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">3. たのしむ</h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-neutral-300">
            子どもたちはギャラリーでお気に入りを選び、全画面表示で迫力の姿を楽しめます。
          </p>
        </div>
      </section>
    </div>
  );
}
