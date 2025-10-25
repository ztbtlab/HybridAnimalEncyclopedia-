## セットアップ

1. サービスアカウントを作成し、**対象の Drive フォルダ** と **Google Sheets** をそのメールアドレスに「閲覧者」で共有。
2. `.env.local` を作成して `.env.example` を参考に値をセット。
3. シートのヘッダに `id, fileId, title, tags, takenAt, author` を用意し、各行に値を入力。
4. 依存を入れて起動：

   ```bash
   npm i
   npm run dev
   ```

5. `http://localhost:3000/gallery` にアクセス。

### メモ
- キャッシュ秒数は `GALLERY_REVALIDATE_SECONDS` / `DRIVE_IMAGE_CACHE_SECONDS` で調整。
- 画像の最適化（サムネ/WebP変換）を入れたい場合は、`/api/drive-image/[fileId]` に `sharp` を噛ませる実装を後付け可能。
- シート列名は必要に応じて `app/api/gallery/route.ts` のパース部分を変更。
