# Remex

「あなたの代わりに、行ってきます。」東京23区の現地訪問サービスのMVPです。個人・法人の用途を分けず、依頼内容に沿って現地を訪問し、許可された範囲で確認・記録してオンライン納品する一つのサービスとして提供します。

## 技術構成

- React / TypeScript / Vite のモバイルファーストLP
- 開発用: Express API。受付データは `data/requests.json` にローカル保存
- 公開用: Cloudflare Workers Static Assets + D1。`/api/requests` をWorkerで処理し、受付データをD1へ保存
- Zod入力検証、20KB上限、同一オリジン確認、honeypot、Cloudflare Rate Limiting
- Cloudflare本番デプロイ用Wrangler設定と、GitHub Actionsの手動デプロイworkflow

## ローカル開発（Express）

Node.js 22以上を推奨します。

```sh
npm ci
npm run dev
```

LP: http://127.0.0.1:5173 / API: http://127.0.0.1:3001

```sh
npm test
npm run build
npm start
```

`npm start` は生成済みLPとExpress APIを http://127.0.0.1:3001 で提供します。受付データは `data/requests.json` へ保存されます。このファイルはGit対象外です。

## Cloudflare Workersでローカル確認

1. CloudflareアカウントでWranglerを認証します: `npx wrangler login`
2. 現在のCloudflareアカウントには `remex-requests` D1を作成済みで、IDは `wrangler.jsonc` に設定済みです。別アカウントを使う場合は `npx wrangler d1 create remex-requests` を実行し、表示されたIDへ置き換えてください。
3. ローカルD1へマイグレーションし、Workers版を起動します。

```sh
npm run db:migrate:local
npm run dev:cloudflare
```

`dev:cloudflare` は先にViteで `dist/` を作り、その後Wranglerを起動します。Workers版のD1はWranglerのローカル開発ストレージに保存されます。

## Cloudflareへのデプロイ

Wrangler設定は `wrangler.jsonc` です。静的ファイルとWorkerを一つのCloudflare Workerとしてデプロイします。`/api/*` のみWorkerへ先に渡し、その他のURLは静的アセットとして配信します。

```sh
npm run deploy:cloudflare
```

このコマンドはテスト・ビルド・本番D1マイグレーション・Workerデプロイを行います。本番リソースを変更するため、Cloudflare認証後に実行してください。独自ドメインはCloudflareダッシュボードで追加できます。

## GitHub Actions

`.github/workflows/deploy-cloudflare.yml` は `workflow_dispatch` による手動実行のみです。GitHubのリポジトリ設定に次のActions secretsを登録すると利用できます。

- `CLOUDFLARE_API_TOKEN`: WorkersデプロイとD1マイグレーションに必要な権限を持つトークン
- `CLOUDFLARE_ACCOUNT_ID`: デプロイ先CloudflareアカウントID

workflowはテスト、ビルド、リモートD1マイグレーション、Workerデプロイの順で実行します。自動デプロイではなく、公開タイミングを選べる設定です。

## 受付データの確認

受付内容はCloudflare D1の `requests` テーブルに保存されます。管理画面・自動メール通知はまだありません。運用開始前に通知・確認方法を整え、Cloudflareアカウントのアクセスを適切に保護してください。例として、一覧確認では個人情報を表示しないクエリを利用できます。

```sh
npx wrangler d1 execute remex-requests --remote --command "SELECT id, created_at, mode FROM requests ORDER BY created_at DESC LIMIT 20"
```

## 公開前に残っている運用タスク

- 運営者情報、問い合わせ窓口、個人情報の保存期間・削除手順を決定し、プライバシー表示へ反映
- 新しい問い合わせを見逃さないメール通知または安全な受付管理画面を用意
- 料金、交通費・入場料等の実費、見積もり合意、キャンセル・悪天候・撮影不可時の扱いを最終確定
- サンプル記録を実際に作成する場合は、施設ルールと人物・第三者のプライバシーを確認し、実績と誤認されないよう表示
- 自社LPから直接申込みを受ける場合の特定商取引法上の表示事項等を確認
- 実サービス公開前にCloudflareの本番DB・ドメイン・通知を設定し、送信から運営者の確認まで通しでテスト

このリポジトリにはユーザー登録、マッチング、決済、管理画面はありません。最初の有料依頼は、ココナラ等のプラットフォームで受け付ける形も選べます。

## データ保護

`data/`、`.env*`、`.dev.vars*`、`.wrangler/` はGit対象外です。受付データ、APIキー、Cloudflare認証情報をコミットしないでください。Cloudflare本番D1を利用する前に、保存期間・削除運用と権限管理を決めてください。
