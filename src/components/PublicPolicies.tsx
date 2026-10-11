import {LINE_URL} from '../content';
import {localeHref, text} from '../i18n';

export default function PublicPolicies() {
  return (
    <section className="section public-policies" aria-labelledby="policies-title">
      <div className="policy-intro" data-reveal>
        <p className="eyebrow"><span className="dot"/> PRIVACY &amp; TERMS</p>
        <h2 id="policies-title">{text('ご相談の前に。', 'Before you contact us.')}</h2>
        <p>{text('新しいご相談・見積もりはLINE公式アカウントで受け付けています。個人情報の取り扱いと、ご依頼が確定するまでの流れをご確認ください。', 'We accept new inquiries and estimate requests through our official LINE account. Please review how we handle personal information and how a request is confirmed.')}</p>
      </div>
      <div className="policy-grid">
        <article className="policy-card" id="privacy" aria-labelledby="privacy-title" data-reveal>
          <p className="mono policy-kicker">01 / PRIVACY</p>
          <h3 id="privacy-title">{text('個人情報の取り扱い', 'Handling of personal information')}</h3>
          <h4>{text('受け取る情報と利用目的', 'Information we receive and how we use it')}</h4>
          <p>{text('LINEの表示名、トークに送信いただいた相談内容（希望場所・日時・してほしいこと・確認ポイントなど）、画像・動画を受け取り、お問い合わせへの回答、対応可否や見積もりの検討、訪問の調整・提供、提供後のご連絡に利用します。', 'We receive your LINE display name, inquiry details sent in the chat (such as the requested location and date/time, what you would like us to do, and points to check), and images or videos. We use this information to respond to inquiries, assess whether we can help and prepare estimates, arrange and provide visits, and contact you after service.')}</p>
          <h4>{text('LINEでのご相談', 'Inquiries through LINE')}</h4>
          <p>{text('LINE公式アカウントでご相談いただいた場合、トークの内容、送信された画像・動画、LINEの表示名などを、上記と同じ目的で利用します。トークの内容はLINEヤフー株式会社が提供するサービス上に保存され、同社のプライバシーポリシーに従って取り扱われます。基本レポートと、撮影・施設ルールで許可される場合の一人称動画をLINE（または共有リンク）でお届けします。写真での記録・納品は準備中です。', 'If you contact us through the official LINE account, we use the chat contents, images or videos you send, and your LINE display name for the purposes described above. Chat contents are stored on services provided by LY Corporation and handled under its privacy policy. We deliver the basic report and, when permitted by photography and facility rules, a first-person video through LINE or a shared link. Photo documentation and delivery are coming soon.')}</p>
          <h4>{text('LINE内の事前相談フォーム', 'Pre-application form within LINE')}</h4>
          <p>{text('フォームに入力した内容は、本サイトのサーバーには保存されません。内容確認後にLINE公式アカウントとのトーク画面を開くと、入力内容を含むLINE URLスキームがLINEに渡され、トークの入力欄に下書きされます。ユーザーがLINEの送信ボタンを押すまでRemexには届きません。送信後の内容は通常のLINEトークと同様にLINEヤフー株式会社のサービス上で取り扱われます。', 'Information entered in the form is not stored on this website’s server. After you review the information and open the chat with our official LINE account, a LINE URL scheme containing your entries is passed to LINE and placed in the chat input as a draft. Remex does not receive it until you press Send in LINE. After you send it, the information is handled on LY Corporation’s services in the same way as other LINE chat messages.')}</p>
          <h4>{text('フォーム受付の終了', 'Closed form intake')}</h4>
          <p>{text('新しい相談はLINE公式アカウントのみで受け付けており、本サイトのフォーム受付は終了しました。LINEで送信された相談内容は通常のLINEトークとして取り扱われ、本サイトのサーバーでは受信・保管しません。', 'New inquiries are accepted only through our official LINE account; this website no longer accepts inquiries through its form. Messages sent through LINE are handled as ordinary LINE chats and are not received or stored by this website’s server.')}</p>
          <h4>{text('アクセス解析', 'Analytics')}</h4>
          <p>{text('ページの閲覧状況と表示速度を把握するため、Cloudflare Web Analyticsを利用します。Cloudflareの説明によると、同サービスはPerformance APIを使った計測を行い、訪問者の個人データを収集・利用しません。', 'We use Cloudflare Web Analytics to understand page views and page performance. According to Cloudflare, the service uses the Performance API for measurement and does not collect or use visitors’ personal data.')} <a href="https://developers.cloudflare.com/web-analytics/about/" target="_blank" rel="noreferrer">{text('Cloudflare Web Analyticsについて', 'About Cloudflare Web Analytics')}</a>.</p>
          <h4>{text('利用・保管期間', 'Use and retention')}</h4>
          <p>{text('ご相談情報を販売することはありません。写真・動画や相談内容を事例紹介などに使う場合は、事前に個別の同意をいただきます。LINEのトーク内容はLINEヤフー株式会社が提供するサービス上で保存され、同社のプライバシーポリシーに従って取り扱われます。', 'We do not sell inquiry information. We will obtain your specific consent in advance before using photos, videos, or inquiry details in case studies or similar materials. LINE chat contents are stored on services provided by LY Corporation and handled under its privacy policy.')}</p>
          <h4>{text('確認・削除などのお問い合わせ', 'Requests to access or delete your information')}</h4>
          <p>{text('ご自身の相談データの確認・訂正・削除のご希望、個人情報に関するお問い合わせは、', 'To request access to, correction of, or deletion of your inquiry data, or for other questions about personal information, contact us through our ')}<a href={LINE_URL} target="_blank" rel="noopener noreferrer">{text('LINE公式アカウント', 'official LINE account')}</a>{text('からご連絡ください。', '.')}</p>
        </article>

        <article className="policy-card" id="terms" aria-labelledby="terms-title" data-reveal>
          <p className="mono policy-kicker">02 / SERVICE TERMS</p>
          <h3 id="terms-title">{text('利用・キャンセル条件', 'Service and cancellation terms')}</h3>
          <h4>{text('相談から依頼確定まで', 'From inquiry to confirmed request')}</h4>
          <p>{text('LINE公式アカウントからのご相談・見積もりは無料で、予約や支払いの確定ではありません。訪問の可否、日時、作業範囲、料金、実費、キャンセル条件を個別にご案内します。見積もりは発行日から7日間有効で、支払期限も見積書に記載します。内容と条件に合意いただいた後、銀行振込で前払いをお願いします（振込手数料はお客様負担）。原則、支払期限は訪問前日までです。訪問前日または当日の予約は、訪問開始前に着金確認が必要です。入金確認後に予約が確定します。', 'Inquiries and estimates through our official LINE account are free and do not confirm a booking or payment. We will discuss whether we can make the visit, the date and time, scope of work, price, actual expenses, and cancellation terms individually. Estimates are valid for 7 days from the date of issue, and the payment deadline is stated on the estimate. After you agree to the details and terms, payment is required in advance by bank transfer (transfer fees are your responsibility). As a rule, payment is due by the day before the visit. For bookings made the day before or on the visit date, payment must be confirmed before work begins. The booking is confirmed once payment is received.')}</p>
          <h4>{text('キャンセル時の費用', 'Cancellation charges')}</h4>
          <p>{text('作業開始前のキャンセルにサービス料金はかかりません。ただし、費目・金額・返金不可であることを事前にお伝えし、お客様が了承した実費に限りご負担いただきます。作業開始後は、完了した訪問作業時間分のみを請求し、未実施分の料金やキャンセル料は請求しません。', 'There is no service fee for cancellations before work begins. You are responsible only for actual expenses that were disclosed in advance (including the item, amount, and non-refundable status) and that you approved. Once work begins, you are charged only for the completed on-site work time; there is no charge for uncompleted work or a cancellation fee.')}</p>
          <h4>{text('天候・施設の制限・安全上の理由', 'Weather, facility restrictions, and safety')}</h4>
          <p>{text('天候、施設の利用・撮影ルール、安全上の理由などで予定どおり実施できない場合は、日程や作業範囲の変更を相談し、合意してから進めます。実施できなかった作業分の料金は請求しません。作業開始後に中止となる場合も、請求対象は完了した訪問作業時間分のみです。', 'If we cannot proceed as planned due to weather, facility use or photography rules, safety concerns, or similar reasons, we will discuss changes to the schedule or scope and proceed only after agreement. We will not charge for work that could not be performed. If work is stopped after it begins, charges are limited to completed on-site work time.')}</p>
        </article>

        <article className="policy-card policy-card-tokusho" id="tokusho" aria-labelledby="tokusho-title" data-reveal>
          <p className="mono policy-kicker">03 / LEGAL DISCLOSURE</p>
          <h3 id="tokusho-title">{text('特定商取引法に基づく表記', 'Disclosure under the Act on Specified Commercial Transactions')}</h3>
          <dl className="policy-legal-list">
            <div>
              <dt>{text('事業者の氏名（名称）・住所・電話番号', 'Business name, address, and telephone number')}</dt>
              <dd>{text('開示のご請求があれば、遅滞なく電磁的記録（LINEトーク等）でお知らせします。', 'Upon request, we will provide this information without delay in electronic form (such as via LINE chat).')}<a href={LINE_URL} target="_blank" rel="noopener noreferrer">{text('LINE公式アカウント', 'official LINE account')}</a>{text('から「事業者情報の開示希望」とお送りください。ご依頼を決める前に確認いただけるよう、見積もりへの同意・依頼確定より前にご案内します。', ' and send “Request to disclose business information.” We will provide the information before you agree to an estimate or confirm a request, so you can review it before deciding.')}</dd>
            </div>
            <div>
              <dt>{text('サービスの対価', 'Price of the service')}</dt>
              <dd>{text('東京23区内・1か所の基本訪問料金は', 'For base visit prices for one location within Tokyo’s 23 wards, see the ')}<a href={localeHref('/pricing')}>{text('料金案内', 'pricing page')}</a>{text('をご確認ください。複数の訪問先、東京23区外、急ぎ・夜間の訪問、その他の追加作業は個別見積もりで事前にご案内します。', '. We will provide an individual estimate in advance for multiple locations, areas outside Tokyo’s 23 wards, urgent or nighttime visits, and other additional work.')}</dd>
            </div>
            <div>
              <dt>{text('サービスの対価以外に必要な費用', 'Additional costs')}</dt>
              <dd>{text('実際にかかった往復の公共交通機関運賃は別途です。往復移動時間は60分まで加算なし、超過分は30分単位で切り上げて1区分1,100円です。入場料・施設利用料が必要な場合は、事前見積もりと了承後に限り発生します。延長料金などの詳細は', 'Actual round-trip public transportation fares are charged separately. There is no surcharge for up to 60 minutes of round-trip travel time; any excess is rounded up to 30-minute units at ¥1,100 per unit. Admission or facility fees are incurred only after an advance estimate and your approval. For extension fees and other details, see the ')}<a href={localeHref('/pricing')}>{text('料金案内', 'pricing page')}</a>.</dd>
            </div>
            <div>
              <dt>{text('支払方法・支払時期', 'Payment method and timing')}</dt>
              <dd>{text('銀行振込による前払いです。振込手数料はお客様負担です。見積もりは発行日から7日間有効で、支払期限を記載します。原則、訪問前日までにお支払いください。訪問前日または当日の予約は訪問開始前に着金確認が必要です。入金確認後に予約が確定します。', 'Payment is required in advance by bank transfer, and transfer fees are your responsibility. Estimates are valid for 7 days from issue and state the payment deadline. As a rule, payment is due by the day before the visit. For bookings made the day before or on the visit date, payment must be confirmed before work begins. The booking is confirmed once payment is received.')}</dd>
            </div>
            <div>
              <dt>{text('サービスの提供時期', 'Service delivery')}</dt>
              <dd>{text('訪問日時と記録のお届け時期を個別にご案内し、双方で合意した後に提供します。', 'We will discuss the visit date and the delivery timing for records individually and provide the service after both parties agree.')}</dd>
            </div>
            <div>
              <dt>{text('キャンセル・変更', 'Cancellations and changes')}</dt>
              <dd><a href={localeHref('/#terms')}>{text('利用・キャンセル条件', 'Service and cancellation terms')}</a>{text('をご確認ください。依頼ごとの条件は見積もり時にもご案内します。', ' apply. We will also explain the terms for each request when providing an estimate.')}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
