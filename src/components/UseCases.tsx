import {useCases, useCaseRules} from '../content';
import {trackPointer, vars} from '../hooks';
import {Check} from './Icons';

const art = {
  moving: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <path d="M0 84h200M0 40h200M60 0v120M140 0v120" stroke="currentColor" strokeWidth="5" opacity=".12"/>
      <path className="lr-route" d="M24 100 60 84h80V46l30-16" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round"/>
      <rect x="14" y="94" width="20" height="14" rx="2" fill="currentColor"/>
      <path d="M160 30l12-11 12 11v14h-24Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="168" y="34" width="8" height="10" fill="var(--orange)"/>
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <rect x="30" y="34" width="140" height="86" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 34h152l-8-16H32Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="44" y="60" width="54" height="40" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".6"/>
      <rect x="114" y="58" width="40" height="62" fill="currentColor" opacity=".18"/>
      <g className="lr-notice">
        <rect x="58" y="66" width="26" height="30" fill="#f3e6cf"/>
        <path d="M63 74h16M63 80h16M63 86h10" stroke="#3a2a1c" strokeWidth="1.4"/>
      </g>
      <text x="100" y="30" fontSize="9" textAnchor="middle" fill="currentColor" letterSpacing="3">THANK YOU</text>
    </svg>
  ),
  business: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <g className="lr-tag">
        <path d="M122 44h58v18h-58Z" fill="var(--orange)"/>
        <text x="151" y="57" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#fff">テナント募集</text>
      </g>
      <path d="M140 44 151 34 162 44" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="40" y="52" width="80" height="68" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      {[0, 1, 2].map(r => [0, 1, 2].map(c => (
        <rect key={`${r}${c}`} x={50 + c * 22} y={62 + r * 18} width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1" opacity=".6"/>
      )))}
      <path d="M36 52v68M124 52v68M36 70h88M36 90h88" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 3" opacity=".5"/>
    </svg>
  ),
};

export default function UseCases() {
  const ticker = ['CASE 01', '引っ越し候補地', 'CASE 02', '店舗・物件の確認', 'CASE 03', '閉店前の記録', 'AND MORE', 'ご相談ください'];
  return (
    <section id="cases" className="last" data-dark>
      <div className="last-ticker" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(k => (
            <div className="marquee-row" key={k}>
              {ticker.map(t => <span key={t}>{t}<i>●</i></span>)}
            </div>
          ))}
        </div>
      </div>
      <div className="last-inner">
        <div className="last-head">
          <div>
            <p className="eyebrow" data-reveal><span className="dot"/> USE CASES</p>
            <h2 data-reveal>
              <span className="last-kicker">活用例</span>
              たとえば、<br/>こんな使い方。
            </h2>
          </div>
          <p data-reveal>
            Remexのサービスはひとつだけ。あなたの代わりに現地へ行き、記録することです。<br/>
            目的に合わせて、こんなふうに使えます。
          </p>
        </div>

        <div className="film">
          {useCases.map((r, i) => (
            <article key={r.n} className="frame" data-reveal style={vars({'--delay': `${i * 120}ms`})} onPointerMove={trackPointer}>
              <span className="sprockets" aria-hidden="true"/>
              <div className="frame-top mono">
                <span>{r.en}</span>
                <span>FR.{r.n}</span>
              </div>
              <div className="frame-art">{art[r.art]}</div>
              <h3>{r.title.split('、').map((part, j, all) => <span key={j}>{part}{j < all.length - 1 && <>、<br/></>}</span>)}</h3>
              <p>{r.text}</p>
              <small>{r.note}</small>
              <span className="sprockets bottom" aria-hidden="true"/>
            </article>
          ))}
        </div>

        <div className="last-rules" data-reveal>
          <p className="mono">HOW WE RECORD</p>
          <ul>
            {useCaseRules.map(rule => <li key={rule}><Check size={12}/>{rule}</li>)}
          </ul>
          <a className="button" href="#request">使い方を相談する</a>
        </div>
      </div>
    </section>
  );
}
