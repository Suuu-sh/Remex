import {heroPlaces} from '../content';
import {useCycle, vars} from '../hooks';
import Viewfinder from './Viewfinder';
import LineButton from './LineButton';
import {getLocale, text} from '../i18n';

const titleLines = ['あなたの代わりに、', '行ってきます'];

export default function Hero() {
  const en = getLocale() === 'en';
  const [place] = useCycle(heroPlaces.length, 2800);
  let charIndex = 0;
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true"/>
      <div className="hero-grid" aria-hidden="true"/>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="pill intro" style={vars({'--d': '0ms'})}>
            <span className="live-dot"/> {text('NOW ACCEPTING', 'NOW ACCEPTING')} <span className="pill-sep"/> TOKYO 23 WARDS
          </p>
          <h1 aria-label={text('あなたの代わりに、行ってきます。', 'We’ll go there for you.') }>
            {(en ? ['We’ll go there', 'for you'] : titleLines).map((line, li) => (
              <span className="line" key={line} aria-hidden="true">
                {Array.from(line).map(ch => {
                  const i = charIndex++;
                  return <span className="char" key={i} style={vars({'--i': i})}>{ch}</span>;
                })}
                {li === (en ? 1 : titleLines.length - 1) && <span className="char orange" style={vars({'--i': charIndex})}>{en ? '.' : '。'}</span>}
              </span>
            ))}
          </h1>
          <p className="lead intro" style={vars({'--d': '650ms'})}>
            {en ? <>Want to see a place, shop, or event in Tokyo?<br/>We’ll make the visit for you.</> : <>気になる場所、お店、イベントへ。<br/>東京の「行けない」を、あなたの体験に。</>}
          </p>
          <div className="rotator intro" style={vars({'--d': '750ms'})} aria-live="off">
            <span className="rotator-label mono">{text('FOR EXAMPLE', 'FOR EXAMPLE')}</span>
            <span className="rotator-window">
              {heroPlaces.map((p, i) => (
                <span key={p} className={i === place ? 'is-active' : i === (place + heroPlaces.length - 1) % heroPlaces.length ? 'is-leaving' : ''}>
                  {p}
                </span>
              ))}
            </span>
            <span className="rotator-tail">{text('を、確かめに。', ' — we’ll check it out.')}</span>
          </div>
          <p className="hero-note intro" style={vars({'--d': '850ms'})}>
            {text('時間がない日も、遠くて行けない場所も。GoProの一人称動画と基本レポートで届ける現地訪問サービス。', 'For days you’re busy or places you can’t reach. On-site visits in Tokyo’s 23 wards, with a basic report and an unedited first-person video when filming is permitted.')}
          </p>
          <div className="hero-actions intro" style={vars({'--d': '950ms'})}>
            <LineButton/>
            <a className="button ghost" href="#service">{text('できることを見る', 'See what we do')}</a>
          </div>
          <dl className="hero-facts intro" style={vars({'--d': '1050ms'})}>
            <div><dt>{text('対応エリア', 'Area')}</dt><dd>{text('東京', 'Tokyo')}<b>23</b>{text('区', ' wards')}</dd></div>
            <div><dt>{text('訪問時間', 'Visit')}</dt><dd><b>30</b>{text('分〜', ' min+')}</dd></div>
            <div><dt>{text('料金の目安', 'From')}</dt><dd>¥<b>6,600</b>〜</dd></div>
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
