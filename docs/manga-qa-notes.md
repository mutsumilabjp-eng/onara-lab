# 漫画実装の確認メモ

- 2026-08-15：本番ビルドは成功し、Sitesアーティファクトの検証も完了した。
- `/smell/why-smells` を一時公開URLで確認した。
- 記事の結論ブロック直後に `COMIC NOTE` と「漫画でわかる：においの正体を、急がず見にいく。」が表示された。
- 2ページ漫画用の読みどころと、その後の本文・PR・参考資料の表示順が意図どおりであることを確認した。
- `npm test` の失敗は既存の `codex-preview=development` メタデータを期待するテストによるもので、今回の漫画実装のビルドは成功している。

GitHubの`main`ブランチへコミット`4400e85aef3c8d0812991e2178b2568a0205d9e4`をプッシュした。GitHub Actionsには`pages build`の成功記録があるが、`onara-lab.com`および`onara-lab-preview.mutsumi1979.chatgpt.site`の取得結果は、漫画セクションを含まない旧公開版だった。Cloudflare Pagesアカウントには`overseas-esim-check`と`server-guide-jp`のみが登録されており、`onara-lab`リポジトリのPagesプロジェクトは確認できなかった。したがって、GitHub反映は完了している一方、本番反映はCloudflare Pages以外の既存公開フローで行われる可能性が高い。
GitHub Pages設定を確認した結果、本番ドメイン`http://onara-lab.com/`は`gh-pages`ブランチのルートを公開元としており、状態は`built`だった。リポジトリには`pages-build-deployment`ワークフローが有効である。したがって、`main`への実装コミットだけでなく、`gh-pages`への公開成果物反映が本番反映に必要である。
