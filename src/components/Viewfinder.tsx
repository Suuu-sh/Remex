import {useEffect, useState, type ReactNode} from 'react';
import {prefersReducedMotion} from '../hooks';

function useTimecode() {
  const [seconds, setSeconds] = useState(754);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setSeconds(s => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor(seconds / 60) % 60).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/** Renders `children` twice side by side so a -50% translate loops seamlessly. */
function Layer({className, children}: {className: string; children: ReactNode}) {
  return (
    <div className={`vf-layer ${className}`}>
      <svg viewBox="0 0 800 400" preserveAspectRatio="xMinYMax slice">{children}</svg>
      <svg viewBox="0 0 800 400" preserveAspectRatio="xMinYMax slice">{children}</svg>
    </div>
  );
}

const farSkyline = (
  <g fill="#3b4f5a" opacity=".55">
    <path d="M0 260h40v-70h30v-30h26v100h34v-120h38v120h22v-60h40v60h30v-150h18v-24h12v24h18v150h40v-90h44v90h30v-60h50v60h36v-110h40v110h30v-70h42v70h28v-130h34v130h40v-80h46v80h28v-50h40v140H0Z"/>
  </g>
);

const windows = (x: number, y: number, cols: number, rows: number, lit: number[]) =>
  Array.from({length: cols * rows}, (_, i) => (
    <rect
      key={i}
      x={x + (i % cols) * 16}
      y={y + Math.floor(i / cols) * 20}
      width="9"
      height="11"
      rx="1"
      fill={lit.includes(i) ? '#ffd9a8' : '#2a3b44'}
    />
  ));

const midBuildings = (
  <g>
    <rect x="10" y="150" width="120" height="210" fill="#4d6670"/>
    {windows(24, 168, 6, 8, [1, 4, 8, 13, 15, 22, 27, 31, 38, 44])}
    <rect x="150" y="210" width="110" height="150" fill="#d8835f"/>
    <rect x="150" y="210" width="110" height="18" fill="#b9673f"/>
    <rect x="166" y="300" width="78" height="60" fill="#2d3e46"/>
    <rect x="172" y="306" width="66" height="30" fill="#ffd9a8" opacity=".85"/>
    <text x="205" y="258" fill="#fff6ea" fontSize="20" fontWeight="700" textAnchor="middle" letterSpacing="6">喫茶</text>
    <rect x="290" y="120" width="100" height="240" fill="#5a7480"/>
    {windows(302, 136, 5, 10, [0, 3, 7, 11, 18, 21, 26, 30, 33, 41, 46])}
    <rect x="410" y="190" width="140" height="170" fill="#a9bdb5"/>
    <rect x="410" y="190" width="140" height="14" fill="#8ea69c"/>
    {windows(424, 216, 7, 5, [2, 5, 9, 16, 20, 24, 30])}
    <rect x="570" y="160" width="90" height="200" fill="#46606a"/>
    {windows(582, 176, 4, 8, [1, 6, 10, 15, 19, 25, 28])}
    <rect x="680" y="230" width="110" height="130" fill="#e7b48f"/>
    <rect x="694" y="300" width="36" height="60" fill="#2d3e46"/>
    <rect x="740" y="250" width="38" height="34" fill="#ffd9a8" opacity=".8"/>
  </g>
);

const streetFurniture = (
  <g>
    {[60, 330, 600].map(x => (
      <g key={x}>
        <rect x={x} y="190" width="5" height="180" fill="#1d2b31"/>
        <path d={`M${x + 2} 192h26`} stroke="#1d2b31" strokeWidth="5"/>
        <ellipse cx={x + 28} cy="198" rx="10" ry="5" fill="#ffe2b8"/>
        <ellipse cx={x + 28} cy="240" rx="40" ry="60" fill="#ffd9a8" opacity=".12"/>
      </g>
    ))}
    {[200, 470, 740].map(x => (
      <g key={x}>
        <rect x={x - 3} y="300" width="6" height="70" fill="#2c3a33"/>
        <circle cx={x} cy="282" r="34" fill="#5f7d69"/>
        <circle cx={x - 18} cy="296" r="22" fill="#6c8a74"/>
        <circle cx={x + 20} cy="294" r="20" fill="#56735f"/>
      </g>
    ))}
  </g>
);

const ground = (
  <g>
    <rect x="0" y="360" width="800" height="40" fill="#2a3a40"/>
    {[0, 100, 200, 300, 400, 500, 600, 700].map(x => (
      <rect key={x} x={x + 20} y="380" width="56" height="4" rx="2" fill="#f2efe6" opacity=".55"/>
    ))}
  </g>
);

export default function Viewfinder() {
  const timecode = useTimecode();
  return (
    <div className="viewfinder" aria-label="現地で一人称映像を記録するイメージ" role="img">
      <div className="vf-screen">
        <div className="vf-scene">
          <div className="vf-sky"/>
          <div className="vf-sun"/>
          <Layer className="far">{farSkyline}</Layer>
          <Layer className="mid">{midBuildings}</Layer>
          <Layer className="near">{streetFurniture}</Layer>
          <Layer className="ground">{ground}</Layer>
        </div>
        <div className="vf-vignette"/>
        <div className="vf-hud">
          <div className="hud-row">
            <span className="rec"><i/>REC</span>
            <span className="mono">{timecode}</span>
            <span className="hud-spacer"/>
            <span className="mono dim">4K · 60</span>
            <span className="battery" aria-hidden="true"><i/></span>
          </div>
          <div className="reticle" aria-hidden="true"><span/><span/><span/><span/></div>
          <div className="hud-row bottom">
            <span className="mono dim">35°40′N 139°42′E</span>
            <span className="hud-spacer"/>
            <span className="mono dim">POV · WIDE</span>
          </div>
        </div>
      </div>

      <div className="vf-bubble one" aria-hidden="true">
        <small>REMEX · 現地</small>
        坂道、思ったより緩やかです。
      </div>
      <div className="vf-bubble two" aria-hidden="true">
        <small>CHECKPOINT 02</small>
        入口に段差が1段あります。
      </div>
      <div className="vf-call" aria-hidden="true">
        <span className="call-dot"/>
        <div>
          <strong>記録中</strong>
          <span className="vf-call-meta mono">PHOTO 12 · VIDEO 08:24</span>
        </div>
      </div>
      <div className="vf-map" aria-hidden="true">
        <svg viewBox="0 0 120 90">
          <path d="M0 30h120M0 62h120M38 0v90M84 0v90" stroke="#d9d5c8" strokeWidth="6"/>
          <path className="map-route" d="M14 80 38 62h46V30l22-18" fill="none" stroke="#f65f32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="14" cy="80" r="4" fill="#20343c"/>
          <circle className="map-pin" cx="106" cy="12" r="5" fill="#f65f32"/>
        </svg>
        <span>駅 → 目的地　徒歩 8 分</span>
      </div>
      <span className="vf-sample">※ イメージ</span>
    </div>
  );
}
