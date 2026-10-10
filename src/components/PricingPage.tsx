import {plans} from '../content';
import {localeHref, text, useLocale} from '../i18n';
import {Arrow} from './Icons';
import LineButton from './LineButton';

const inclusions = [
  {label: '訪問先', enLabel: 'VISIT LOCATION', value: '東京23区内・1か所', enValue: 'One location within Tokyo’s 23 wards'},
  {label: '事前準備・お届け', enLabel: 'PREPARATION & DELIVERY', value: '準備と基本レポート', enValue: 'Preparation and a basic report'},
];
const planDescriptions = ['For a quick check', 'For a more thorough visit', 'For checking several points'];
const conditions = [
  {title: '交通費', enTitle: 'Transportation', text: '訪問先までの往復の公共交通機関運賃は、実際にかかった金額を別途いただきます。', enText: 'Round-trip public transportation fares to the location are charged separately at the actual cost.'},
  {title: '往復の移動時間', enTitle: 'Round-trip travel time', text: '合計60分までは加算なし。60分を超えた場合は、超過分を30分単位で切り上げ、1区分につき1,100円を加算します。', enText: 'There is no travel-time surcharge for up to 60 minutes in total. Beyond 60 minutes, the excess is rounded up to 30-minute units and charged at ¥1,100 per unit.'},
  {title: '入場料・施設利用料', enTitle: 'Admission and facility fees', text: '必要な場合は事前に金額をお見積もりし、お客様の了承を得てから発生させます。', enText: 'If required, we will provide an estimate in advance and incur these costs only with your approval.'},
  {title: '延長', enTitle: 'On-site extensions', text: '現地作業を延長する場合は、続行前にお客様の了承をいただきます。了承後、30分ごと（端数も1区分）に3,300円です。', enText: 'If on-site work needs to be extended, we will ask for your approval before continuing. Once approved, extensions cost ¥3,300 per 30 minutes; any partial unit counts as one full unit.'},
];
const estimateCases = ['複数の訪問先', '東京23区外', '急ぎ・夜間の訪問'];
const estimateCasesEn = ['Multiple locations', 'Outside Tokyo’s 23 wards', 'Urgent or nighttime visits'];

export default function PricingPage() {
  const locale = useLocale();
  const en = locale === 'en';
  return (
    <section id="price" className="pricing-page section" aria-labelledby="pricing-page-title">
      <div className="pricing-page-inner">
        <div className="pricing-page-head" data-reveal>
          <p className="eyebrow"><span className="dot"/> PRICING &amp; TERMS</p>
          <h1 id="pricing-page-title">{text('料金と、', 'Pricing and')}<br/>{text('含まれること。', 'what’s included.')}</h1>
          <p>{text('Remexのサービスは、現地へ訪問して確認・記録するひとつのサービスです。目的に合わせて訪問時間を選べます。以下は東京23区内・1か所の基本料金です。', 'Remex is one service: we visit a location to check and document what matters to you. Choose a visit duration to suit your needs. The prices below are for one location within Tokyo’s 23 wards.')}</p>
          <a className="pricing-back mono" href={localeHref('/#top')}>{text('ホームへ戻る', 'Back to home')} ↗</a>
        </div>

        <div className="pricing-detail-grid" aria-label={text('訪問時間と基本料金', 'Visit durations and base prices')}>
          {plans.map((plan, index) => (
            <article className={`pricing-detail-card${index === 1 ? ' is-featured' : ''}`} key={plan.mins} data-reveal>
              <p className="mono">VISIT / {String(index + 1).padStart(2, '0')}</p>
              <h2><span>{plan.mins}</span>{text('分', ' min')}</h2>
              <p className="pricing-detail-desc">{text(plan.desc, planDescriptions[index])}</p>
              <strong>¥{plan.price.toLocaleString('en-US')}</strong>
              <small>{text('現地作業の基本料金', 'Base on-site work fee')}</small>
            </article>
          ))}
        </div>

        <section className="pricing-included" aria-labelledby="pricing-included-title">
          <div className="pricing-subhead" data-reveal>
            <p className="eyebrow"><span className="dot"/> INCLUDED</p>
            <h2 id="pricing-included-title">{text('基本料金に、', 'Included in the')}<br/>{text('含まれるもの。', 'base price.')}</h2>
          </div>
          <div className="pricing-included-grid">
            {inclusions.map(item => (
              <article className="pricing-inclusion" key={item.label} data-reveal>
                <span className="mono">{text(item.label, item.enLabel)}</span>
                <strong>{text(item.value, item.enValue)}</strong>
              </article>
            ))}
            {plans.map(plan => (
              <article className="pricing-inclusion" key={plan.mins} data-reveal>
                <span className="mono">{text(`${plan.mins}分プラン`, `${plan.mins}-minute plan`)}</span>
                <strong>{text(`現地作業${plan.mins}分 ／ 確認項目${plan.checklist}件まで`, `${plan.mins} minutes of on-site work / up to ${plan.checklist} check items`)}</strong>
              </article>
            ))}
            <article className="pricing-inclusion pricing-inclusion-wide" data-reveal>
              <span className="mono">POV VIDEO</span>
              <strong>{text('撮影・施設ルールで許可される場合、編集なしの一人称動画を1本お届けします。', 'When permitted by the location’s rules, one unedited first-person video is included.')}</strong>
            </article>
          </div>
          <p className="pricing-not-offered pricing-photo-note" data-reveal>{text('写真での記録・納品は準備中です。', 'Photo documentation and delivery are coming soon.')}</p>
        </section>

        <section className="pricing-costs" aria-labelledby="pricing-costs-title">
          <div className="pricing-subhead" data-reveal>
            <p className="eyebrow"><span className="dot"/> BEFORE THE VISIT</p>
            <h2 id="pricing-costs-title">{text('追加費用は、', 'Any extra costs')}<br/>{text('事前に確認。', 'are confirmed in advance.')}</h2>
            <p>{text('お見積もり・ご承諾なく、追加費用や作業を発生させることはありません。', 'No additional costs or work will be incurred without an estimate and your approval.')}</p>
          </div>
          <dl className="pricing-condition-list">
            {conditions.map((condition, index) => (
              <div key={condition.title} data-reveal>
                <dt><span className="mono">0{index + 1}</span>{text(condition.title, condition.enTitle)}</dt>
                <dd>{text(condition.text, condition.enText)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="pricing-custom" id="business" aria-labelledby="pricing-custom-title" data-reveal>
          <p className="mono">INDIVIDUAL ESTIMATE</p>
          <h2 id="pricing-custom-title">{text('内容に応じた、個別のお見積もり。', 'Custom estimates for specific requests.')}</h2>
          <p>{text('複数の訪問先、東京23区外、急ぎ・夜間の訪問は個別にお見積もりします。法人のお客さまも基本料金は共通です。追加の確認範囲・報告形式・訪問先などを含む個別見積もりの目安は、内容により¥15,000〜¥30,000程度となる場合があります。別のサービス料金ではなく、追加範囲を含むご依頼の目安です。', 'We provide individual estimates for multiple locations, areas outside Tokyo’s 23 wards, and urgent or nighttime visits. The same base prices apply to individuals and businesses. Depending on the request, an estimate that includes additional checks, reporting, or locations may be around ¥15,000–¥30,000. This is an estimate for a request with additional scope, not a separate service.')}</p>
          <ul>{(en ? estimateCasesEn : estimateCases).map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="pricing-payment" aria-labelledby="pricing-payment-title">
          <div className="pricing-subhead" data-reveal>
            <p className="eyebrow"><span className="dot"/> ESTIMATE &amp; PAYMENT</p>
            <h2 id="pricing-payment-title">{text('相談から、', 'From inquiry')}<br/>{text('予約確定まで。', 'to confirmed booking.')}</h2>
          </div>
          <div className="pricing-payment-copy" data-reveal>
            <p>{text('LINEでの相談と見積もりは無料です。見積もりは発行日から7日間有効で、支払期限も見積書に記載します。銀行振込で前払いをお願いします（振込手数料はお客様負担）。原則、訪問前日までにお支払いください。訪問前日または当日の予約は、訪問開始前に着金確認が必要です。入金確認後に予約が確定します。', 'Consultations and estimates via LINE are free. Estimates are valid for 7 days from the date of issue, and the payment deadline is stated on the estimate. Payment is required in advance by bank transfer; the customer is responsible for transfer fees. As a rule, payment is due by the day before the visit. For bookings made the day before or on the visit date, payment must be confirmed before work begins. Your booking is confirmed once payment is received. All prices are in JPY. Please confirm payment arrangements before booking.')}</p>
            <h3>{text('キャンセル・予定変更', 'Cancellations and schedule changes')}</h3>
            <p>{text('作業開始前のキャンセルにサービス料金はかかりません。費目・金額・返金不可であることを事前にお伝えし、お客様が了承した実費のみご負担いただきます。作業開始後は、完了した訪問作業時間分のみを請求し、未実施分の料金やキャンセル料は請求しません。天候・施設の制限・安全上の理由で実施できない作業も同じ扱いです。', 'There is no service fee for cancellations before work begins. You are responsible only for actual expenses that were disclosed in advance (including the item, amount, and non-refundable status) and that you approved. Once work begins, you are charged only for the completed on-site work time; there is no charge for uncompleted work or a cancellation fee. The same applies to work that cannot be carried out due to weather, facility restrictions, or safety concerns.')}</p>
            <p className="pricing-not-offered">{text('撮影した動画の編集とリアルタイム通話は、現在提供していません。', 'Video editing and live calls are not currently available.')}</p>
            <nav className="pricing-policy-links" aria-label={text('関連情報', 'Related information')}>
              <a href={localeHref('/#terms')}>{text('利用・キャンセル条件', 'Service and cancellation terms')} <Arrow size={16}/></a>
              <a href={localeHref('/#tokusho')}>{text('特定商取引法に基づく表記', 'Legal disclosure')} <Arrow size={16}/></a>
            </nav>
          </div>
        </section>

        <div className="pricing-page-cta" data-reveal>
          <div><span className="mono">NEXT STEP</span><strong>{text('まずは、行きたい場所を教えてください。', 'Tell us where you would like us to visit.')}</strong></div>
          <LineButton label={text('LINEで料金を相談', 'Ask about pricing on LINE')}/>
        </div>
      </div>
    </section>
  );
}
