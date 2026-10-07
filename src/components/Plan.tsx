import {useState} from 'react';
import {plans, steps, wards} from '../content';
import {useCountTo, useScrollProgress, trackPointer, vars} from '../hooks';
import {Arrow} from './Icons';

export function Process() {
  const [ref, progress] = useScrollProgress<HTMLOListElement>(0.75, 0.5);
  return (
    <section className="process" id="process">
      <div className="process-inner">
        <div className="process-head">
          <p className="eyebrow" data-reveal><span className="dot"/> HOW IT WORKS</p>
          <h2 data-reveal>相談から、<br/>お届けまで。</h2>
          <p data-reveal>フォームの送信だけでは、予約もお支払いも発生しません。内容と費用に合意してから、訪問が決まります。</p>
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
  return (
    <section className="section area" id="area">
      <div className="area-copy">
        <p className="eyebrow" data-reveal><span className="dot"/> SERVICE AREA</p>
        <h2 data-reveal>東京23区を、<br/>あなたの目で。</h2>
        <p data-reveal>現在の対応エリアは東京23区内です。場所や訪問内容によって対応できない場合がありますので、まずはご相談ください。</p>
      </div>
      <ul className="ward-grid" aria-label="対応エリア：東京23区">
        {wards.map((w, i) => (
          <li key={w} data-reveal style={vars({'--delay': `${i * 25}ms`})}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            {w}<small>区</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

const yen = (n: number) => n.toLocaleString('ja-JP');

export function Pricing() {
  const [selected, setSelected] = useState(1);
  const plan = plans[selected];
  const price = useCountTo(plan.price);
  const mins = useCountTo(plan.mins, 500);

  return (
    <section id="price" className="section pricing">
      <div className="section-heading">
        <div>
          <p className="eyebrow" data-reveal><span className="dot"/> SIMPLE PRICING</p>
          <h2 data-reveal>必要な時間だけ、<br/>頼めます。</h2>
        </div>
        <p data-reveal>まずは訪問時間を目安に。<br/>総額は、訪問前にご案内します。</p>
      </div>

      <div className="price-layout">
        <div className="price-picker" data-reveal>
          <div className="segmented" role="radiogroup" aria-label="訪問時間" style={vars({'--index': selected, '--count': plans.length})}>
            <span className="segmented-thumb" aria-hidden="true"/>
            {plans.map((p, i) => (
              <button key={p.mins} type="button" role="radio" aria-checked={i === selected} onClick={() => setSelected(i)}>
                {p.mins}分
              </button>
            ))}
          </div>
          <div className="price-readout" aria-live="polite">
            <p className="price-desc">{plan.desc}</p>
            <div className="price-big">
              <span className="price-mins"><b>{mins}</b>分</span>
              <span className="price-amount">¥<b>{yen(price)}</b><small>／訪問</small></span>
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
              <span className="price-card-time"><b>{p.mins}</b>分</span>
              <span className="price-card-desc">{p.desc}</span>
              <span className="price-card-amount">¥{yen(p.price)}</span>
            </button>
          ))}
          <p className="price-notes" data-reveal>
            交通費・入場料などの実費は別途。訪問範囲、時間の数え方、撮影オプションなども事前に確認し、見積もりをご案内します。追加費用を無断で発生させることはありません。撮った動画の編集は、今後のオプションとして準備中です。
          </p>
        </div>
      </div>

      <a className="biz-card" href="#request" data-reveal onPointerMove={trackPointer}>
        <div>
          <p className="mono">FOR BUSINESS</p>
          <strong>法人・事業者の方へ</strong>
          <p>内容・範囲に応じて個別にお見積もりします。</p>
        </div>
        <div className="biz-price">
          <span>現地確認・調査の目安</span>
          <b>¥15,000〜¥30,000</b>
        </div>
        <span className="biz-arrow"><Arrow size={22}/></span>
      </a>
    </section>
  );
}
