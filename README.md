# Remex

「あなたの代わりに、行ってきます。」東京23区の現地訪問サービスのMVPです。個人・法人の用途を分けず、依頼内容に沿って現地を訪問し、許可された範囲で確認・記録してオンライン納品する一つのサービスとして提供します。

## 技術構成

- React / TypeScript / Vite のモバイルファーストLP
- 開発用: Expressで生成済みLPとhealth APIを配信
- 公開用: Cloudflare Workers Static Assets + D1。D1は過去の相談記録の保管と180日後の削除に利用
- 新しいご相談はLINE公式アカウントのみで受付。旧フォームAPIへのPOSTはHTTP 410を返し、LINE公式アカウントへ案内
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

`npm start` は生成済みLPとExpressのhealth APIを http://127.0.0.1:3001 で提供します。`POST /api/requests` は新しいデータを保存せず、HTTP 410とLINE公式アカウントへの案内を返します。

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

過去にフォームで受け付けた記録はCloudflare D1の `requests` テーブルに残っています。この変更で既存のD1レコードやテーブルは削除しません。Workerのスケジュール処理（毎日18:00 UTC）が、各記録の受信から180日後に削除します。新しいLINE相談は本サイトのD1へ保存されません。管理画面はありません。Cloudflareアカウントのアクセスを適切に保護してください。

```sh
npx wrangler d1 execute remex-requests --remote --command "SELECT id, created_at, mode FROM requests ORDER BY created_at DESC LIMIT 20"
```

## LINEでの相談受付

新しいご相談はLINEのみで受け付けます。サイトの相談ボタンから[LIFF事前相談フォーム](https://liff.line.me/2011950025-CXAIFaev)を開き、入力内容を確認後、LINE公式アカウントとのトーク画面へ移動します。内容はLINEの入力欄に下書きされるため、お客様が内容を確認して送信します。フォーム入力内容は本サイトのサーバーやD1に保存されません。ウェブフォームは終了しており、旧フォームAPIも新規送信を受け付けません。

事前相談フォームはLINE LoginチャンネルのLIFFアプリ（LIFF ID: `2011950025-CXAIFaev`、URL: `https://liff.line.me/2011950025-CXAIFaev`）で開きます。Endpoint URLは `https://remex-site.suuu-sh.workers.dev/apply`、画面サイズはFullです。フォームは `oaMessage` URLスキームで公式アカウントとのトークに入力文をセットします。ユーザーがLINEアプリ上で送信するまで、相談内容はRemexに届きません。LIFFは必須の `openid` のみを設定し、RemexフォームではLINEのユーザー識別情報を取得・保存しません。`profile` と `chat_message.write` 権限は付けません。

フォームの項目・送信文面は `src/components/PreApplicationPage.tsx` と `src/preApplication.ts` にあります。LIFFアプリは静的アセットとして配信し、D1やMessaging APIのアクセストークンを使いません。旧フォーム通知用のLINE Messaging API処理は停止しており、関連するCloudflare secretsが設定済みでも現在は読み取り・使用しません。secretの変更・削除はこの変更では行っていません。

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

- LINE公式アカウントのトークで新しい相談を受け付け、返信する運用を継続
- 特定商取引法に基づく表記を追加済み。住所等の請求時開示が実際の申込・契約フローに適合するかを確認し、開示請求に遅滞なく回答できるよう正式情報を安全に管理（必要に応じ専門家へ確認）
- 公開可能な自主制作の記録サンプルを撮影・掲載（現時点ではサンプル未公開）
- 基本料金は30分 ¥6,600／60分 ¥9,900／90分 ¥13,200。訪問先と作業範囲を確認し、実際の往復公共交通機関運賃と、必要な場合の入場料・施設利用料を見積もりで事前提示して了承を得る

このリポジトリにはユーザー登録、マッチング、決済、管理画面はありません。新しい相談の窓口はLINE公式アカウントのみです。見積もりは発行日から7日間有効で、支払期限を記載します。銀行振込による前払い（振込手数料は依頼者負担）の期限は原則訪問前日までです。訪問前日または当日の予約は、訪問開始前に着金確認が必要です。入金確認後に予約が確定します。

## データ保護

`data/`、`.env*`、`.dev.vars*`、`.wrangler/` はGit対象外です。受付データ、APIキー、Cloudflare認証情報をコミットしないでください。Cloudflare本番D1へのアクセスは必要最小限にしてください。
