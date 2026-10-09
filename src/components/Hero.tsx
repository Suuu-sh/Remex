import {heroPlaces} from '../content';
import {useCycle, vars} from '../hooks';
import Viewfinder from './Viewfinder';
import LineButton, {hasLine} from './LineButton';

const titleLines = ['あなたの代わりに、', '行ってきます'];

export default function Hero() {
  const [place] = useCycle(heroPlaces.length, 2800);
  let charIndex = 0;
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true"/>
      <div className="hero-grid" aria-hidden="true"/>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="pill intro" style={vars({'--d': '0ms'})}>
            <span className="live-dot"/> NOW ACCEPTING <span className="pill-sep"/> TOKYO 23 WARDS
          </p>
          <h1 aria-label="あなたの代わりに、行ってきます。">
            {titleLines.map((line, li) => (
              <span className="line" key={line} aria-hidden="true">
                {Array.from(line).map(ch => {
                  const i = charIndex++;
                  return <span className="char" key={i} style={vars({'--i': i})}>{ch}</span>;
                })}
                {li === titleLines.length - 1 && <span className="char orange" style={vars({'--i': charIndex})}>。</span>}
              </span>
            ))}
          </h1>
          <p className="lead intro" style={vars({'--d': '650ms'})}>
            気になる場所、お店、イベントへ。<br/>東京の「行けない」を、あなたの体験に。
          </p>
          <div className="rotator intro" style={vars({'--d': '750ms'})} aria-live="off">
            <span className="rotator-label mono">FOR EXAMPLE</span>
            <span className="rotator-window">
              {heroPlaces.map((p, i) => (
                <span key={p} className={i === place ? 'is-active' : i === (place + heroPlaces.length - 1) % heroPlaces.length ? 'is-leaving' : ''}>
                  {p}
                </span>
              ))}
            </span>
            <span className="rotator-tail">を、確かめに。</span>
          </div>
          <p className="hero-note intro" style={vars({'--d': '850ms'})}>
            時間がない日も、遠くて行けない場所も。GoProの一人称動画と写真で届ける、現地訪問サービス。
          </p>
          <div className="hero-actions intro" style={vars({'--d': '950ms'})}>
            <LineButton/>
            <a className="button ghost" href="#service">できることを見る</a>
          </div>
          {hasLine && <p className="micro intro hero-alt" style={vars({'--d': '1000ms'})}>LINEを使っていない方は <a href="#request">フォームから相談</a></p>}
          <dl className="hero-facts intro" style={vars({'--d': '1050ms'})}>
            <div><dt>対応エリア</dt><dd>東京<b>23</b>区</dd></div>
            <div><dt>訪問時間</dt><dd><b>30</b>分〜</dd></div>
            <div><dt>料金の目安</dt><dd>¥<b>6,600</b>〜</dd></div>
          </dl>
        </div>
        <div className="hero-visual intro" style={vars({'--d': '300ms'})}>
          <Viewfinder/>
        </div>
      </div>
      <a className="scroll-cue" href="#manifesto" aria-label="下へスクロール"><span/></a>
    </section>
  );
}
