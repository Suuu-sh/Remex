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

`.github/workflows/deploy-cloudflare.yml` は `main` へのpush（PRのマージを含む）で自動実行されます。`workflow_dispatch` で手動実行もできます。GitHubのリポジトリ設定に次のActions secretsを登録すると利用できます。

- `CLOUDFLARE_API_TOKEN`: WorkersデプロイとD1マイグレーションに必要な権限を持つトークン
- `CLOUDFLARE_ACCOUNT_ID`: デプロイ先CloudflareアカウントID

workflowはテスト、ビルド、リモートD1マイグレーション、Workerデプロイの順で実行します。テストかビルドが失敗した場合はデプロイされません。

## 受付データの確認

受付内容はCloudflare D1の `requests` テーブルに保存されます。相談データは受信から180日後に、Workerのスケジュール処理（毎日18:00 UTC）で削除されます。管理画面はありません。LINE通知のsecretを設定するまでは、D1を確認してください。Cloudflareアカウントのアクセスを適切に保護してください。

```sh
npx wrangler d1 execute remex-requests --remote --command "SELECT id, created_at, mode FROM requests ORDER BY created_at DESC LIMIT 20"
```

## LINEでの相談受付

相談の主な窓口はLINE公式アカウント（`https://lin.ee/ZvrRtXZ`）です。フォームはLINEを使っていない方向けに残しています。

1. LINE公式アカウントのあいさつメッセージに、相談テンプレート（場所・希望日時・してほしいこと・写真/動画の希望）を設定します。
2. フォームからの相談を運営者のLINEへ通知するには、その公式アカウントでMessaging APIを有効にし、チャネルアクセストークンを発行します。
3. LINE Developersのチャネル基本設定にある「あなたのユーザーID」を確認します。これは通常のLINE IDとは異なります。LINEアカウントをBusiness IDに連携し、Remex公式アカウントを友だち追加しておきます。
4. 次のコマンドを実行し、Cloudflareの入力プロンプトへ値を直接入力します。アクセストークンをチャット・ソースコード・GitHubへ貼らないでください。

```sh
npx wrangler secret put LINE_CHANNEL_ACCESS_TOKEN --name remex-site
npx wrangler secret put LINE_ADMIN_USER_ID --name remex-site
```

`LINE_ADMIN_USER_ID` は通知を受け取る運営者のユーザーID（`U` から始まる文字列）です。両secretのどちらかが未設定の場合、通知は送られず、受付内容はD1に保存されます。LINE APIがエラーを返した場合は、個人情報を含めずWorkerログに失敗理由を記録します。
値はWranglerのプロンプトへ直接入力し、チャット・ソースコード・GitHubへ貼らないでください。`secret put` は実行のたびにWorkerをデプロイします。設定後は `npx wrangler secret list --name remex-site` で名前だけが表示されることを確認し、フォーム送信で通知をテストしてください。

### 事業者情報の開示依頼が届いたら

サイトでは事業者の正式な氏名（名称）・住所・電話番号を掲載せず、開示請求をLINEで受け付ける案内にしています。これらの正確な情報はリポジトリや公開ページに保存せず、運営者が安全に管理してください。請求を受けたら遅滞なく電磁的記録で回答し、依頼者が見積もりに同意して依頼を確定する前に、判断に必要な時間をもって開示します。

返信例：

```text
事業者情報の開示希望を承りました。ご依頼を決める前にご確認いただけるよう、以下の情報をお送りします。
事業者の氏名（名称）：[正式な氏名または名称]
住所：[現に活動している住所]
電話番号：[確実に連絡が取れる番号]
```

この開示方法が実際の申込・契約フローに適合するか、またLINEトークでの回答が実際の運用に適するかを確認し、請求時に遅滞なく対応できない間は有料依頼を確定しないでください。必要に応じて専門家へ確認してください。

## アクセス解析

Cloudflare Web Analyticsを `remex-site.suuu-sh.workers.dev` に設定し、本番ホストでのみビーコンを読み込みます（`src/main.tsx`）。ダッシュボードに数値が反映されるまで時間がかかる場合があります。計測内容はプライバシー欄にも記載しています。

## 記録サンプル

サイトの「記録の見本」には、自主制作サンプルだけを掲載します。動画を公開する場合は、撮影・公開ルールと第三者のプライバシーを確認し、`SampleRecord.tsx` のサンプル一覧へ `public/samples/` 配下のファイルを追加してください。現在、公開できるサンプル映像はありません。実際の依頼動画を掲載する場合は、別途明示的な許可が必要です。

## 運用開始前に残っているタスク

- LINE DevelopersのMessaging API有効化、相談テンプレート、Cloudflare secretsの設定は完了。フォーム送信から運営者のLINE通知まで実際にテスト済み
- 特定商取引法に基づく表記を追加済み。住所等の請求時開示が実際の申込・契約フローに適合するかを確認し、開示請求に遅滞なく回答できるよう正式情報を安全に管理（必要に応じ専門家へ確認）
- 公開可能な自主制作の記録サンプルを撮影・掲載（現時点ではサンプル未公開）
- 依頼ごとの料金、交通費・入場料等の実費、支払方法・期日を見積もりで合意

このリポジトリにはユーザー登録、マッチング、決済、管理画面はありません。相談の主な窓口はLINE公式アカウントで、フォームはLINEを使っていない方向けの代替窓口です。料金・実費・支払方法・期日は、依頼ごとに見積もりで合意します。

## データ保護

`data/`、`.env*`、`.dev.vars*`、`.wrangler/` はGit対象外です。受付データ、APIキー、Cloudflare認証情報をコミットしないでください。Cloudflare本番D1へのアクセスは必要最小限にしてください。
