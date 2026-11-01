import {getLocalizedContent} from '../content';
import {trackPointer, vars} from '../hooks';
import {Arrow} from './Icons';
import {getLocale, localeHref, text} from '../i18n';

export function Process() {
  const {steps} = getLocalizedContent(getLocale());
  return (
    <section className="process" id="process">
      <div className="visit-process">
        <p className="section-label">{text('04 / ご利用の流れ', '04 / How it works')}</p>
        <h2>{text('相談から、お届けまで。', 'From request to delivery.')}</h2>
        <ol className="visit-steps">{steps.map(s => <li key={s.n}><span className="mono">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></li>)}</ol>
        <p className="process-payment">{text('LINEでの相談だけでは予約は確定しません。見積もりは7日間有効で、支払期限を記載します。銀行振込の前払いは原則、訪問前日までです。前日・当日の予約は訪問開始前に着金確認が必要で、いずれも入金確認後に予約が確定します。', 'A LINE inquiry is not a booking. Estimates are valid for 7 days and state the payment deadline. Bank transfer is generally due by the day before; next-day and same-day bookings require payment to clear before the visit starts. Your booking is confirmed after payment.')}</p>
      </div>
    </section>
  );
}

export function Area() {
  const {wards} = getLocalizedContent(getLocale());
  return (
    <section className="section area" id="area">
      <div className="area-copy">
        <p className="section-label">{text('対応エリア', 'Service area')}</p>
        <h2 data-reveal>{text('東京23区内に対応しています。', 'Within Tokyo’s 23 wards.')}</h2>
        <p data-reveal>{text('現在の対応エリアは東京23区内です。場所や訪問内容によって対応できない場合がありますので、まずはご相談ください。', 'We currently serve Tokyo’s 23 wards only. Availability depends on the location and request, so please ask first.')}</p>
      </div>
      <ul className="ward-grid" aria-label={text('対応エリア：東京23区', 'Service area: Tokyo’s 23 wards')}>
        {wards.map((w, i) => (
          <li key={w} data-reveal style={vars({'--delay': `${i * 25}ms`})}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            {w}{getLocale() === 'ja' && <small>区</small>}
          </li>
        ))}
      </ul>
    </section>
  );
}

const yen = (n: number) => n.toLocaleString('ja-JP');

export function Pricing() {
  const {plans} = getLocalizedContent(getLocale());
  return (
    <section id="price" className="section pricing">
      <div className="section-heading">
        <div><p className="section-label">{text('03 / 料金', '03 / Pricing')}</p><h2>{text('訪問時間で選ぶ、3つのプラン。', 'Three plans. Just the time you need.')}</h2></div>
        <p>{text('東京23区内・1か所の訪問料金です。含まれる内容と追加費用を事前にご案内します。', 'For one location in Tokyo’s 23 wards. Inclusions and extra costs are explained in advance.')}</p>
      </div>
      <div className="visit-plans">{plans.map(p => (
        <article key={p.mins} className="visit-plan">
          <p className="plan-duration"><b>{p.mins}</b>{text('分', ' min')}</p>
          <h3>{p.desc}</h3><p className="plan-price">¥{yen(p.price)}<small>{text('／訪問', ' / visit')}</small></p>
          <p className="plan-checkpoints">{text('確認項目 最大', 'Up to ')}<b>{p.checklist}</b>{text('件', ' checkpoints')}</p>
          <p className="plan-example">{p.example}</p>
        </article>
      ))}</div>
      <div className="plan-inclusions"><p>{text('準備・基本レポート、確認項目（最大3／5／8件）を含みます。撮影が許可される場合は未編集の一人称動画1本をお届けします。往復の公共交通機関運賃は別途です。', 'Includes preparation, a basic report, and up to 3 / 5 / 8 checkpoints. One unedited first-person video is included when filming is permitted. Round-trip public transit is extra.')}</p><a className="text-link" href={localeHref('/pricing')}>{text('料金・追加費用・お支払いの詳細', 'Pricing, extras, and payment details')} <span aria-hidden="true">↗</span></a></div>
      <a className="biz-card" href={localeHref('/pricing')} data-reveal onPointerMove={trackPointer}>
        <div>
          <p className="mono">{text('追加の確認・報告形式', 'Additional scope and reporting')}</p>
          <strong>{text('法人・事業者の方へ', 'For businesses')}</strong>
          <p>{text('基本料金は共通。追加範囲や報告形式は個別にお見積もりします。', 'The base price is the same. We can quote separately for extra scope or reporting.')}</p>
        </div>
        <div className="biz-price">
          <span>{text('追加範囲を含む個別見積もりの目安', 'Typical custom estimate with additional scope')}</span>
          <b>¥15,000〜¥30,000</b>
        </div>
        <span className="biz-arrow"><Arrow size={22}/></span>
      </a>
    </section>
  );
}
