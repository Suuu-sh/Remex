export default function PublicPolicies() {
  return (
    <section className="section public-policies" aria-labelledby="policies-title">
      <div className="policy-intro" data-reveal>
        <p className="eyebrow"><span className="dot"/> PRIVACY &amp; TERMS</p>
        <h2 id="policies-title">ご相談の前に。</h2>
        <p>LINE・フォームでのご相談は無料の相談・見積もり依頼です。個人情報の取り扱いと、ご依頼が確定するまでの流れをご確認ください。</p>
      </div>
      <div className="policy-grid">
        <article className="policy-card" id="privacy" aria-labelledby="privacy-title" data-reveal>
          <p className="mono policy-kicker">01 / PRIVACY</p>
          <h3 id="privacy-title">個人情報の取り扱い</h3>
          <h4>受け取る情報と利用目的</h4>
          <p>お名前、メールアドレス、ご相談の種類、相談内容（希望場所・日時・してほしいこと・確認ポイント・希望のお届け方法・自由記入内容など）を受け取り、お問い合わせへの回答、対応可否や見積もりの検討、訪問の調整・提供、提供後のご連絡に利用します。</p>
          <h4>LINEでのご相談</h4>
          <p>LINE公式アカウントでご相談いただいた場合、トークの内容、送信された画像・動画、LINEの表示名などを、上記と同じ目的で利用します。トークの内容はLINEヤフー株式会社が提供するサービス上に保存され、同社のプライバシーポリシーに従って取り扱われます。撮影した写真・動画もLINE（または共有リンク）でお届けします。</p>
          <h4>保存と迷惑送信対策</h4>
          <p>本サイトの配信とフォーム処理にはCloudflareを利用し、フォームの入力内容はCloudflare D1に保存します。迷惑送信対策のCloudflareレート制限では、送信元IPアドレスを判定に利用します。IPアドレスは、本サービスのD1申込データには保存しません。</p>
          <h4>運営者への受付通知</h4>
          <p>フォームから相談を送信いただいた場合、通知機能の設定後は、お名前・希望場所・希望日時などをLINE Messaging API経由で運営者へ通知します。通知を設定していない間はLINEへの送信は行いません。送信先LINEアカウント上での情報の取り扱いは、LINEヤフー株式会社のプライバシーポリシーに従います。</p>
          <h4>アクセス解析</h4>
          <p>ページの閲覧状況と表示速度を把握するため、Cloudflare Web Analyticsを利用します。Cloudflareの説明によると、同サービスはPerformance APIを使った計測を行い、訪問者の個人データを収集・利用しません。<a href="https://developers.cloudflare.com/web-analytics/about/" target="_blank" rel="noreferrer">Cloudflare Web Analyticsについて</a>。</p>
          <h4>利用・保管期間</h4>
          <p>ご相談情報を販売することはありません。写真・動画や相談内容を事例紹介などに使う場合は、事前に個別の同意をいただきます。相談データは受信日から180日経過後、定期処理で削除します。</p>
          <h4>確認・削除などのお問い合わせ</h4>
          <p>ご自身の相談データの確認・訂正・削除のご希望、個人情報に関するお問い合わせは、ページ下部のフォームで「お問い合わせ」を選んでご連絡ください。</p>
        </article>

        <article className="policy-card" id="terms" aria-labelledby="terms-title" data-reveal>
          <p className="mono policy-kicker">02 / SERVICE TERMS</p>
          <h3 id="terms-title">利用・キャンセル条件</h3>
          <h4>相談から依頼確定まで</h4>
          <p>フォーム送信は無料の相談・見積もり依頼であり、予約・有料申込み・支払いの確定ではありません。訪問の可否、日時、作業範囲、料金、実費、支払方法・期日、キャンセル条件を個別にご案内します。お客様が見積もりと条件を承諾し、運営者も実施を確認して合意した後に依頼が確定し、作業を開始します。</p>
          <h4>キャンセル時の費用</h4>
          <p>作業開始前のキャンセルにサービス料金はかかりません。ただし、費目・金額・返金不可であることを事前にお伝えし、お客様が了承した実費に限りご負担いただきます。作業開始後は、完了した作業分の料金と、事前に了承いただいた返金不可の実費のみを請求し、未実施分の料金は請求しません。</p>
          <h4>天候・施設の制限・安全上の理由</h4>
          <p>天候、施設の利用・撮影ルール、安全上の理由などで予定どおり実施できない場合は、日程や作業範囲の変更を相談し、合意してから進めます。実施できなかった作業分の料金は請求しません。事前に了承いただいた返金不可の実費が発生している場合は、その分のみご負担いただきます。</p>
        </article>
      </div>
    </section>
  );
}
