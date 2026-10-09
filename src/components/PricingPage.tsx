import {plans} from '../content';
import {Arrow} from './Icons';
import LineButton from './LineButton';

const inclusions = [
  {label: '訪問先', value: '東京23区内・1か所'},
  {label: '事前準備・お届け', value: '準備と基本レポート'},
];

const conditions = [
  {title: '交通費', text: '訪問先までの往復の公共交通機関運賃は、実際にかかった金額を別途いただきます。'},
  {title: '往復の移動時間', text: '合計60分までは加算なし。60分を超えた場合は、超過分を30分単位で切り上げ、1区分につき1,100円を加算します。'},
  {title: '入場料・施設利用料', text: '必要な場合は事前に金額をお見積もりし、お客様の了承を得てから発生させます。'},
  {title: '延長', text: '現地作業を延長する場合は、続行前にお客様の了承をいただきます。了承後、30分ごと（端数も1区分）に3,300円です。'},
];

const estimateCases = ['複数の訪問先', '東京23区外', '急ぎ・夜間の訪問'];

export default function PricingPage() {
  return (
    <section id="price" className="pricing-page section" aria-labelledby="pricing-page-title">
      <div className="pricing-page-inner">
        <div className="pricing-page-head" data-reveal>
          <p className="eyebrow"><span className="dot"/> PRICING &amp; TERMS</p>
          <h1 id="pricing-page-title">料金と、<br/>含まれること。</h1>
          <p>Remexのサービスは、現地へ訪問して確認・記録するひとつのサービスです。目的に合わせて訪問時間を選べます。以下は東京23区内・1か所の基本料金です。</p>
          <a className="pricing-back mono" href="/#top">ホームへ戻る ↗</a>
        </div>

        <div className="pricing-detail-grid" aria-label="訪問時間と基本料金">
          {plans.map((plan, index) => (
            <article className={`pricing-detail-card${index === 1 ? ' is-featured' : ''}`} key={plan.mins} data-reveal>
              <p className="mono">VISIT / {String(index + 1).padStart(2, '0')}</p>
              <h2><span>{plan.mins}</span>分</h2>
              <p className="pricing-detail-desc">{plan.desc}</p>
              <strong>¥{plan.price.toLocaleString('ja-JP')}</strong>
              <small>現地作業の基本料金</small>
            </article>
          ))}
        </div>

        <section className="pricing-included" aria-labelledby="pricing-included-title">
          <div className="pricing-subhead" data-reveal>
            <p className="eyebrow"><span className="dot"/> INCLUDED</p>
            <h2 id="pricing-included-title">基本料金に、<br/>含まれるもの。</h2>
          </div>
          <div className="pricing-included-grid">
            {inclusions.map(item => (
              <article className="pricing-inclusion" key={item.label} data-reveal>
                <span className="mono">{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
            {plans.map(plan => (
              <article className="pricing-inclusion" key={plan.mins} data-reveal>
                <span className="mono">{plan.mins}分プラン</span>
                <strong>現地作業{plan.mins}分 ／ 確認項目{plan.checklist}件まで</strong>
              </article>
            ))}
            <article className="pricing-inclusion pricing-inclusion-wide" data-reveal>
              <span className="mono">POV VIDEO</span>
              <strong>撮影・施設ルールで許可される場合、編集なしの一人称動画を1本お届けします。</strong>
            </article>
          </div>
          <p className="pricing-not-offered pricing-photo-note" data-reveal>写真での記録・納品は準備中です。</p>
        </section>

        <section className="pricing-costs" aria-labelledby="pricing-costs-title">
          <div className="pricing-subhead" data-reveal>
            <p className="eyebrow"><span className="dot"/> BEFORE THE VISIT</p>
            <h2 id="pricing-costs-title">追加費用は、<br/>事前に確認。</h2>
            <p>お見積もり・ご承諾なく、追加費用や作業を発生させることはありません。</p>
          </div>
          <dl className="pricing-condition-list">
            {conditions.map((condition, index) => (
              <div key={condition.title} data-reveal>
                <dt><span className="mono">0{index + 1}</span>{condition.title}</dt>
                <dd>{condition.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="pricing-custom" id="business" aria-labelledby="pricing-custom-title" data-reveal>
          <p className="mono">INDIVIDUAL ESTIMATE</p>
          <h2 id="pricing-custom-title">内容に応じた、個別のお見積もり。</h2>
          <p>複数の訪問先、東京23区外、急ぎ・夜間の訪問は個別にお見積もりします。法人のお客さまも基本料金は共通です。追加の確認範囲・報告形式・訪問先などを含む個別見積もりの目安は、内容により¥15,000〜¥30,000程度となる場合があります。別のサービス料金ではなく、追加範囲を含むご依頼の目安です。</p>
          <ul>{estimateCases.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="pricing-payment" aria-labelledby="pricing-payment-title">
          <div className="pricing-subhead" data-reveal>
            <p className="eyebrow"><span className="dot"/> ESTIMATE &amp; PAYMENT</p>
            <h2 id="pricing-payment-title">相談から、<br/>予約確定まで。</h2>
          </div>
          <div className="pricing-payment-copy" data-reveal>
            <p>LINEでの相談と見積もりは無料です。見積もりは発行日から7日間有効で、支払期限も見積書に記載します。銀行振込で前払いをお願いします（振込手数料はお客様負担）。原則、訪問前日までにお支払いください。訪問前日または当日の予約は、訪問開始前に着金確認が必要です。入金確認後に予約が確定します。</p>
            <h3>キャンセル・予定変更</h3>
            <p>作業開始前のキャンセルにサービス料金はかかりません。費目・金額・返金不可であることを事前にお伝えし、お客様が了承した実費のみご負担いただきます。作業開始後は、完了した訪問作業時間分のみを請求し、未実施分の料金やキャンセル料は請求しません。天候・施設の制限・安全上の理由で実施できない作業も同じ扱いです。</p>
            <p className="pricing-not-offered">撮影した動画の編集とリアルタイム通話は、現在提供していません。</p>
            <nav className="pricing-policy-links" aria-label="関連情報">
              <a href="/#terms">利用・キャンセル条件 <Arrow size={16}/></a>
              <a href="/#tokusho">特定商取引法に基づく表記 <Arrow size={16}/></a>
            </nav>
          </div>
        </section>

        <div className="pricing-page-cta" data-reveal>
          <div><span className="mono">NEXT STEP</span><strong>まずは、行きたい場所を教えてください。</strong></div>
          <LineButton label="LINEで料金を相談"/>
        </div>
      </div>
    </section>
  );
}
