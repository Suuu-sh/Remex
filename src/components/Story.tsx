import {getLocalizedContent} from '../content';
import {useScrollProgress, trackPointer, vars} from '../hooks';
import {Check, Icon} from './Icons';
import {getLocale, text} from '../i18n';

export function Marquee() {
  const words = getLocale() === 'en' ? ['NEIGHBORHOOD', 'LOCAL SHOPS', 'EVENTS', 'PRODUCTS', 'EXHIBITIONS', 'CUSTOMER VIEW'] : ['NEIGHBORHOOD', '街の空気', 'LOCAL SHOPS', 'お店', 'EVENTS', 'イベント', 'PRODUCTS', '商品', 'EXHIBITIONS', '展示', 'CUSTOMER VIEW', 'お客さま目線'];
  const row = (
    <div className="marquee-row">
      {words.map(w => <span key={w}>{w}<i aria-hidden="true">↗</i></span>)}
    </div>
  );
  return (
    <div className="marquee" aria-hidden="true" data-dark>
      <div className="marquee-track">{row}{row}</div>
    </div>
  );
}

const manifesto = getLocale() === 'en' ? 'Remex visits the places on your mind and helps you find out what they’re really like.' : 'Remexは、あなたが気になっている場所へ足を運び、「実際どうなんだろう？」を、一緒に確かめます。';

export function Manifesto() {
  const [ref, progress] = useScrollProgress<HTMLDivElement>(0.9, 0.55);
  const chars = Array.from(manifesto);
  const {audiences} = getLocalizedContent(getLocale());
  const lit = Math.round(progress * chars.length);
  return (
    <section className="manifesto" id="manifesto">
      <div className="manifesto-inner" ref={ref}>
        <p className="eyebrow" data-reveal><span className="dot"/> WHY REMEX</p>
        <p className="manifesto-lede" data-reveal>
          {getLocale() === 'en' ? <>Even when you can’t go,<br/>your curiosity keeps moving.</> : <>行けない日にも、<br/>知りたい気持ちは動いている。</>}
        </p>
        <p className="manifesto-body">
          <span className="manifesto-sub">{text('地図や口コミだけでは、わからないことがある。', 'Maps and reviews can only tell you so much.')}</span>
          <span className="sr-only">{manifesto}</span>
          <span aria-hidden="true">
            {chars.map((ch, i) => <span key={i} className={i < lit ? 'on' : ''}>{ch}</span>)}
          </span>
        </p>
        <div className="audiences">
          {audiences.map((a, i) => (
            <article key={a.en} data-reveal style={vars({'--delay': `${i * 120}ms`})} onPointerMove={trackPointer}>
              <span className="mono">FOR — {a.en}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <i className={`aud-art ${i ? 'far' : 'time'}`} aria-hidden="true"/>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const {uses} = getLocalizedContent(getLocale());
  return (
    <section id="service" className="section services">
      <div className="section-heading">
        <div>
          <p className="eyebrow" data-reveal><span className="dot"/> WHAT WE CAN DO</p>
          <h2 data-reveal>{getLocale() === 'en' ? <>Curious about a place?<br/>We’ll go see.</> : <>その「気になる」、<br/>見に行きます。</>}</h2>
        </div>
        <p data-reveal>{getLocale() === 'en' ? <>Tell us what you need.<br/>From a quick look to a business site check.</> : <>目的に合わせて、訪問内容を相談。<br/>小さな下見から、仕事の現地確認まで。</>}</p>
      </div>
      <div className="bento">
        {uses.map((u, i) => (
          <article
            className={`use-card c${i + 1}`}
            key={u.n}
            data-reveal
            style={vars({'--delay': `${(i % 3) * 90}ms`})}
            onPointerMove={trackPointer}
          >
            <div className="card-top">
              <span className="mono">{u.n}</span>
              <span className="use-icon"><Icon name={u.icon}/></span>
            </div>
            {i === 0 && <NeighborhoodArt/>}
            {i === 1 && <ShopArt/>}
            {i === 5 && <CompareArt/>}
            <div className="card-body">
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
            <small className="mono">{u.label}</small>
          </article>
        ))}
      </div>
      <p className="section-foot" data-reveal>
        {text('※ 施設内の訪問・撮影は、施設の許可やルールに従います。撮影禁止の場所がある場合は、事前に相談して訪問内容を調整します。', 'We follow venue rules and obtain permission where needed. If filming is prohibited, we’ll discuss the visit plan in advance.')}
      </p>
    </section>
  );
}

function NeighborhoodArt() {
  return (
    <svg className="card-art walk" viewBox="0 0 320 120" aria-hidden="true">
      <path d="M0 96h320" stroke="currentColor" strokeOpacity=".15"/>
      <path className="walk-route" d="M18 96C70 96 70 50 120 50s60 30 100 30 60-40 84-40" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeDasharray="5 7" strokeLinecap="round"/>
      <g fill="var(--ink)">
        <rect x="8" y="80" width="20" height="16" rx="2"/>
        <text x="18" y="114" fontSize="9" textAnchor="middle" fill="currentColor" opacity=".6">駅</text>
      </g>
      <g className="walk-pins">
        <circle cx="120" cy="50" r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"/>
        <text x="120" y="38" fontSize="9" textAnchor="middle" fill="currentColor" opacity=".7">坂道</text>
        <circle cx="220" cy="80" r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"/>
        <text x="220" y="68" fontSize="9" textAnchor="middle" fill="currentColor" opacity=".7">街灯</text>
      </g>
      <path d="M304 40c0-8 6-13 12-13" fill="none"/>
      <path className="walk-home" d="M296 46l8-8 8 8v10h-16Z" fill="var(--orange)"/>
    </svg>
  );
}

function ShopArt() {
  return (
    <svg className="card-art shop" viewBox="0 0 240 130" aria-hidden="true">
      <rect x="40" y="38" width="160" height="92" fill="var(--paper-3)" stroke="var(--ink)" strokeWidth="1.5"/>
      <g className="awning">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <path key={i} d={`M${34 + i * 21.5} 30h21.5v14a10.75 10.75 0 0 1-21.5 0Z`} fill={i % 2 ? 'var(--paper-3)' : 'var(--orange)'} stroke="var(--ink)" strokeWidth="1.5"/>
        ))}
      </g>
      <rect x="56" y="66" width="62" height="40" rx="3" fill="#ffe2c4" stroke="var(--ink)" strokeWidth="1.5"/>
      <path className="steam" d="M80 82c-3-4 3-6 0-10M90 82c-3-4 3-6 0-10" fill="none" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" opacity=".5"/>
      <path d="M76 86h18v6a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6Z" fill="var(--orange)"/>
      <rect x="138" y="66" width="44" height="64" rx="2" fill="var(--ink)"/>
      <g className="sign">
        <path d="M150 58 160 46 170 58" fill="none" stroke="var(--ink)" strokeWidth="1.2"/>
        <rect x="146" y="58" width="28" height="14" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2"/>
        <text x="160" y="68.5" fontSize="7.5" fontWeight="700" textAnchor="middle" fill="var(--ink)" letterSpacing="1">OPEN</text>
      </g>
    </svg>
  );
}

function CompareArt() {
  const labels = getLocale() === 'en'
    ? ['Service flow', 'Wait time', 'Store layout', 'Product display']
    : ['接客の流れ', '待ち時間', '店内の動線', '陳列の見せ方'];
  return (
    <ul className="card-art checklist" aria-hidden="true">
      {labels.map((t, i) => (
        <li key={t} style={vars({'--i': i})}><Check size={12}/>{t}</li>
      ))}
    </ul>
  );
}
