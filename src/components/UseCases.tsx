import {getLocalizedContent} from '../content';
import {Check} from './Icons';
import {getLocale, text} from '../i18n';

const art = {
  moving: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <path d="M0 84h200M0 40h200M60 0v120M140 0v120" stroke="currentColor" strokeWidth="5" opacity=".12"/>
      <path d="M24 100 60 84h80V46l30-16" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round"/>
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
      <g>
        <rect x="58" y="66" width="26" height="30" fill="#f3e6cf"/>
        <path d="M63 74h16M63 80h16M63 86h10" stroke="#3a2a1c" strokeWidth="1.4"/>
      </g>
      <path d="M72 26h56" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  business: (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <g>
        <path d="M122 44h58v18h-58Z" fill="var(--orange)"/>
        <text x="151" y="57" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#fff">{text('テナント募集', 'FOR LEASE')}</text>
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
  const {useCases, useCaseRules, uses} = getLocalizedContent(getLocale());
  return (
    <section id="service" className="section service-cases">
      <div className="section-heading">
        <div><p className="section-label">{text('01 / サービス内容', '01 / The service')}</p><h2>{text('気になる場所を、代わりに確認。', 'What you can request')}</h2></div>
        <p>{text('目的と確認したい点を伺って、訪問内容を決めます。個人・法人どちらもご相談いただけます。', 'We agree on the visit and checkpoints with you in advance. For individuals and businesses.')}</p>
      </div>
      <div id="cases" className="case-grid">
        {useCases.map(r => (
          <article className="case-card" key={r.n}>
            <div className="case-art"><span className="mono">{r.n}</span>{art[r.art]}</div>
            <h3>{r.title}</h3><p>{r.text}</p><small>{r.note}</small>
          </article>
        ))}
      </div>
      <div className="additional-uses">
        <h3>{text('このような確認も、ご相談ください。', 'Other visits you can request')}</h3>
        <ul>{uses.slice(2).map(use => <li key={use.n}><strong>{use.title}</strong><p>{use.text}</p></li>)}</ul>
      </div>
      <div className="case-conditions"><strong>{text('訪問・記録について', 'Visit conditions')}</strong><ul>{useCaseRules.map(rule => <li key={rule}><Check size={14}/>{rule}</li>)}</ul></div>
    </section>
  );
}
