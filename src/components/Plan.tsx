import {useState} from 'react';
import {getLocalizedContent} from '../content';
import {useCountTo, useScrollProgress, trackPointer, vars} from '../hooks';
import {Arrow} from './Icons';
import {getLocale, localeHref, text} from '../i18n';

export function Process() {
  const {steps} = getLocalizedContent(getLocale());
  const [ref, progress] = useScrollProgress<HTMLOListElement>(0.75, 0.5);
  return (
    <section className="process" id="process">
      <div className="process-inner">
        <div className="process-head">
          <p className="eyebrow" data-reveal><span className="dot"/> HOW IT WORKS</p>
          <h2 data-reveal>{getLocale() === 'en' ? <>From first message<br/>to final delivery.</> : <>相談から、<br/>お届けまで。</>}</h2>
          <p data-reveal>{text('LINEでの相談だけでは予約は確定しません。見積もりは7日間有効で、支払期限を記載します。銀行振込の前払いは原則、訪問前日までです。前日・当日の予約は訪問開始前に着金確認が必要で、いずれも入金確認後に予約が確定します。', 'A LINE inquiry is not a booking. Estimates are valid for 7 days and state the payment deadline. Bank transfer is generally due by the day before; next-day and same-day bookings require payment to clear before the visit starts. Your booking is confirmed after payment.')}</p>
        </div>
        <ol className="timeline" ref={ref} style={vars({'--p': progress})}>
          <span className="timeline-track" aria-hidden="true"><span/></span>
          {steps.map((s, i) => (
            <li key={s.n} className={progress >= i / steps.length ? 'is-active' : ''} data-reveal>
              <span className="step-dot" aria-hidden="true">{s.n}</span>
              <div>
                <span className="mono step-tag">STEP {s.n} — {s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Area() {
  const {wards} = getLocalizedContent(getLocale());
  return (
    <section className="section area" id="area">
      <div className="area-copy">
        <p className="eyebrow" data-reveal><span className="dot"/> SERVICE AREA</p>
        <h2 data-reveal>{getLocale() === 'en' ? <>Tokyo’s 23 wards,<br/>through your eyes.</> : <>東京23区を、<br/>あなたの目で。</>}</h2>
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
  const [selected, setSelected] = useState(1);
  const plan = plans[selected];
  const price = useCountTo(plan.price);
  const mins = useCountTo(plan.mins, 500);

  return (
    <section id="price" className="section pricing">
      <div className="section-heading">
        <div>
          <p className="eyebrow" data-reveal><span className="dot"/> SIMPLE PRICING</p>
          <h2 data-reveal>{getLocale() === 'en' ? <>Book only the time<br/>you need.</> : <>必要な時間だけ、<br/>頼めます。</>}</h2>
        </div>
        <p data-reveal>{getLocale() === 'en' ? <>For one location in Tokyo’s 23 wards.<br/>We’ll explain inclusions and extra costs in advance.</> : <>東京23区内・1か所の訪問料金です。<br/>含まれる内容と追加費用を事前にご案内します。</>}</p>
      </div>

      <div className="price-layout">
        <div className="price-picker" data-reveal>
          <div className="segmented" role="radiogroup" aria-label={text('訪問時間', 'Visit duration')} style={vars({'--index': selected, '--count': plans.length})}>
            <span className="segmented-thumb" aria-hidden="true"/>
            {plans.map((p, i) => (
              <button key={p.mins} type="button" role="radio" aria-checked={i === selected} onClick={() => setSelected(i)}>
                {p.mins}{text('分', ' min')}
              </button>
            ))}
          </div>
          <div className="price-readout" aria-live="polite">
            <p className="price-desc">{plan.desc}</p>
            <div className="price-big">
              <span className="price-mins"><b>{mins}</b>{text('分', ' min')}</span>
              <span className="price-amount">¥<b>{yen(price)}</b><small>{text('／訪問', ' / visit')}</small></span>
            </div>
            <p className="price-example"><span className="mono">EXAMPLE</span>{plan.example}</p>
          </div>
          <div className="price-dial" aria-hidden="true" style={vars({'--deg': `${(plan.mins / 90) * 360}deg`})}>
            <span>{plan.mins}<small>min</small></span>
          </div>
        </div>

        <div className="price-list">
          {plans.map((p, i) => (
            <button
              key={p.mins}
              type="button"
              className={`price-card${i === selected ? ' is-selected' : ''}`}
              onClick={() => setSelected(i)}
              onPointerMove={trackPointer}
              aria-pressed={i === selected}
              data-reveal
              style={vars({'--delay': `${i * 80}ms`})}
            >
              <span className="price-card-time"><b>{p.mins}</b>{text('分', ' min')}</span>
              <span className="price-card-desc">{p.desc}</span>
              <span className="price-card-amount">¥{yen(p.price)}</span>
            </button>
          ))}
          <p className="price-notes" data-reveal>
            {text('準備・基本レポート、確認項目（最大3／5／8件）を含みます。撮影が許可される場合は未編集の一人称動画1本をお届けします。往復の公共交通機関運賃は別途です。', 'Includes preparation, a basic report, and up to 3 / 5 / 8 checkpoints. One unedited first-person video is included when filming is permitted. Round-trip public transit is extra.')}
            <a href={localeHref('/pricing')}>{text('料金・追加費用・お支払いの詳細を見る', 'See pricing, extras, and payment details')} ↗</a>
          </p>
        </div>
      </div>

      <a className="biz-card" href={localeHref('/pricing')} data-reveal onPointerMove={trackPointer}>
        <div>
          <p className="mono">FOR BUSINESS</p>
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
