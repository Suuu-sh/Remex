import {useEffect, useRef, useState} from 'react';
import LineButton from './LineButton';
import {text} from '../i18n';

function Windows({x, y, cols, rows, step = 36}: {x: number; y: number; cols: number; rows: number; step?: number}) {
  return <>{Array.from({length: cols * rows}, (_, i) => <rect key={i} x={x + i % cols * step} y={y + Math.floor(i / cols) * 43} width="14" height="23" fill={i % 5 === 0 || i % 7 === 1 ? '#eac798' : '#385358'} opacity={i % 5 === 0 ? '.9' : '.6'}/>)}</>;
}

/** Original illustrated street; deliberately not presented as real visit footage. */
function StreetScene() {
  return (
    <div className="cinema-scene" aria-hidden="true">
      <svg className="cinema-camera cinema-motion" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="cinema-sky" x1="800" y1="0" x2="800" y2="700" gradientUnits="userSpaceOnUse"><stop stopColor="#193640"/><stop offset=".55" stopColor="#628081"/><stop offset="1" stopColor="#d5b18a"/></linearGradient>
          <linearGradient id="cinema-road" x1="900" y1="440" x2="900" y2="900" gradientUnits="userSpaceOnUse"><stop stopColor="#6a7b75"/><stop offset="1" stopColor="#172c32"/></linearGradient>
          <linearGradient id="cinema-window" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d0a16f"/><stop offset="1" stopColor="#f3d7a1"/></linearGradient>
          <radialGradient id="cinema-haze"><stop stopColor="#f2d2a0" stopOpacity=".3"/><stop offset="1" stopColor="#e9c194" stopOpacity="0"/></radialGradient>
          <pattern id="cinema-brick" width="48" height="24" patternUnits="userSpaceOnUse"><path d="M0 0H48M0 24H48M24 0V12M0 12H48M0 12V24M48 12V24" stroke="#dab18c" strokeOpacity=".12"/></pattern>
        </defs>
        <path fill="url(#cinema-sky)" d="M0 0h1600v900H0z"/>
        <circle cx="1048" cy="276" r="44" fill="#e8cf9d" opacity=".7"/>
        <g className="cinema-clouds cinema-motion" stroke="#b5c1b5" strokeOpacity=".12" strokeWidth="14" strokeLinecap="round"><path d="M500 165h180m25 0h90M1010 130h220m-170 32h90M1220 225h180"/></g>
        <g className="cinema-far cinema-motion" fill="#526b6c">
          <path d="M390 530V328h90v202h20V260h62v270h28V350h100v180h25V240h60v290h32V325h78v205h55V285h50v245h38V355h100v175h24V252h82v278h35V335h82v195h20V300h100v230Z"/>
          <path d="M732 240v-26h26v26M1117 252v-35h18v35"/>
          <Windows x={515} y={285} cols={1} rows={5}/><Windows x={724} y={273} cols={1} rows={6}/><Windows x={1109} y={284} cols={2} rows={5}/>
        </g>
        <ellipse cx="930" cy="490" rx="400" ry="350" fill="url(#cinema-haze)"/>
        <path d="m890 460-90 440h500L955 460Z" fill="url(#cinema-road)"/>
        <path d="M0 900h800l90-440H0ZM1300 900h300V460H955Z" fill="#344a4b"/>
        <path d="m890 460-110 440M955 460l374 440" stroke="#87928a" strokeOpacity=".55" strokeWidth="3"/>
        <path d="m925 530 5 30m14 74 9 45m25 120 18 85" stroke="#b7ba9f" strokeOpacity=".5" strokeWidth="4"/>
        <g className="cinema-middle cinema-motion">
          <path d="M0 70h310v642H0Z" fill="#233e47"/><Windows x={38} y={110} cols={7} rows={11}/>
          <path d="m310 70 98 80v518l-98 44Z" fill="#1b333c"/><path d="M335 196v408m26-386v373m26-348v331" stroke="#41585b" strokeWidth="10"/>
          <path d="M410 292h218v350H410Z" fill="#8d7060"/><path d="M410 292h218v350H410Z" fill="url(#cinema-brick)"/>
          <path d="m628 292 55 34v291l-55 25Z" fill="#635d53"/>
          <Windows x={438} y={326} cols={5} rows={4}/>
          <path d="M438 531h164v100H438Z" fill="#203a40"/><path d="M449 545h56v75h-56Zm74 0h67v75h-67Z" fill="url(#cinema-window)" opacity=".65"/>
          <path d="M424 504h190l-11-25H438Z" fill="#bf7653"/><path d="M424 504h190v13H424Z" fill="#b58e6b"/>
          <path d="M695 368h114v220H695Z" fill="#58706c"/><Windows x={715} y={393} cols={2} rows={3}/>
          <path d="M821 419h56v132h-56Z" fill="#7d8880"/><Windows x={833} y={435} cols={1} rows={2}/>
          <path d="M1013 381h132v232h-132Z" fill="#657771"/><Windows x={1034} y={409} cols={3} rows={4}/>
          <path d="M1163 230h257v469h-257Z" fill="#b09375"/><path d="m1127 268 36-38v469l-36-49Z" fill="#6f7565"/>
          <Windows x={1195} y={263} cols={6} rows={5}/>
          <path d="M1185 545h211v145h-211Z" fill="#254148"/><path d="M1198 560h85v111h-85Zm99 0h86v111h-86Z" fill="url(#cinema-window)" opacity=".85"/>
          <path d="M1172 514h238l-18-35h-202Z" fill="#ce7d55"/><path d="M1172 514h238v20h-238Z" fill="#d3b48c"/>
          <path d="M1445 50h155v728h-155Z" fill="#334d52"/><Windows x={1470} y={94} cols={4} rows={14}/>
          <path d="M1088 420h32v113h-32Z" fill="#c7ad7b"/><path d="M1104 434v22m0 12v22m0 12v17" stroke="#485b53" strokeWidth="6"/>
          <path d="M641 433h27v96h-27Z" fill="#e0bd87"/><path d="M653 448v19m0 11v19m0 10v12" stroke="#59655a" strokeWidth="5"/>
        </g>
        <g className="cinema-near cinema-motion">
          <path d="M1390 0v835M1387 111l-155 23m143 48-139 20" stroke="#182f36" strokeWidth="10"/>
          <path d="M1388 118Q1000 265 485 111M1388 174Q930 335 216 82M0 35Q765 259 1600 40" stroke="#29464c" strokeWidth="2"/>
          <path d="M1110 471v252m-2-250 45 3" stroke="#203c41" strokeWidth="6"/>
          <path d="M1140 476h24v8h-24Z" fill="#f3d4a1"/><ellipse cx="1152" cy="535" rx="43" ry="70" fill="url(#cinema-haze)"/>
          <path d="M747 431v211m-2-209 35-4" stroke="#203c41" strokeWidth="5"/>
          <path d="M772 430h19v7h-19Z" fill="#f3d4a1"/>
          <path d="M1007 465v113m0-112 22 1" stroke="#304a49" strokeWidth="3"/><path d="M1023 466h12v5h-12Z" fill="#edcda1"/>
          <path d="M180 900V616m-20 97 25-37 29 10m-31-18-28-54" stroke="#203c37" strokeWidth="13"/>
          <g fill="#2c5047"><circle cx="150" cy="564" r="75"/><circle cx="222" cy="601" r="64"/><circle cx="192" cy="518" r="53"/><circle cx="112" cy="627" r="55"/></g>
          <path d="M1510 900V644" stroke="#223c35" strokeWidth="17"/><g fill="#365749"><circle cx="1510" cy="595" r="76"/><circle cx="1457" cy="657" r="62"/><circle cx="1570" cy="651" r="80"/></g>
          <path d="M1400 797h99m-68 0v58m46-58v78" stroke="#142d32" strokeWidth="10"/>
          <path d="M0 868h725M1347 876h253" stroke="#9d9e83" strokeOpacity=".25" strokeWidth="2"/>
          <path d="m866 736-72 30m75-11-77 34m79-12-81 37" stroke="#dfc396" strokeWidth="5" opacity=".13"/>
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [available, setAvailable] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = true;
    const update = () => { setReduced(preference.matches); setAvailable(onScreen && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; update(); });
    if (ref.current) observer.observe(ref.current);
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { observer.disconnect(); preference.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  const stopped = paused || reduced || !available;
  return (
    <section ref={ref} className={`hero hero-cinematic${stopped ? ' hero-motion-stopped' : ''}`} id="top" data-dark>
      <StreetScene/>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="service-label"><span/>{text('東京23区の現地訪問サービス', 'On-site visits in Tokyo’s 23 wards')}</p>
          <h1>{text('東京の現地確認を、', 'On-site checks in Tokyo,')}<br/><em>{text('動画とレポートで。', 'with video and a report.')}</em></h1>
          <p className="hero-lead">{text('引っ越し先の下見、店舗・物件の確認、閉店前の記録。あなたの代わりに、運営者が現地を訪ねます。', 'Neighborhoods, shops, properties, or a place before it closes. The owner of Remex makes the visit for you.')}</p>
          <p className="hero-note">{text('基本レポートと、撮影が許可される場合の未編集の一人称動画をお届け。', 'A basic report, plus an unedited first-person video when filming is permitted.')}</p>
          <div className="hero-actions"><LineButton/><a className="text-link" href="#service">{text('サービス内容を見る', 'Explore the service')} <span aria-hidden="true">↓</span></a></div>
          <p className="hero-consultation">{text('相談・見積もり無料 ／ 相談だけでは予約は確定しません', 'Free consultation and estimate · An inquiry is not a booking')}</p>
        </div>
        <div className="hero-bottom">
          <dl className="hero-facts">
            <div><dt>{text('対応エリア', 'Service area')}</dt><dd>{text('東京', 'Tokyo ')}<b>23</b>{text('区', ' wards')}</dd></div>
            <div><dt>{text('現地作業時間', 'On-site time')}</dt><dd><b>30</b>{text('分〜', ' min+')}</dd></div>
            <div><dt>{text('基本料金', 'Base price')}</dt><dd>¥<b>6,600</b>{text('〜', '+')}</dd></div>
          </dl>
          <div className="hero-animation-controls"><span>{text('イメージアニメーション', 'Illustrative animation')}</span><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused || reduced} disabled={reduced}>{reduced ? text('端末設定により停止中', 'Motion reduced by your settings') : paused ? text('▶ 再生', '▶ Play') : text('Ⅱ 一時停止', 'Ⅱ Pause')}</button></div>
        </div>
      </div>
    </section>
  );
}
