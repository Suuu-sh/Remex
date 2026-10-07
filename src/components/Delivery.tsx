import {useState} from 'react';
import {deliveries, type Delivery as DeliveryItem} from '../content';
import {useCycle, useInView, vars} from '../hooks';

export default function Delivery() {
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLElement>('-20% 0px');
  const [active, setActive] = useCycle(deliveries.length, 5200, paused || !inView);
  const current = deliveries[active];

  return (
    <section id="delivery" className="section delivery" ref={ref}>
      <div className="delivery-copy">
        <p className="eyebrow" data-reveal><span className="dot"/> HOW YOU’LL SEE IT</p>
        <h2 data-reveal>行った気分まで、<br/>持ち帰ります。</h2>
        <p className="delivery-lead" data-reveal>目的と現地のルールに合わせて、写真と動画で届けます。</p>
        <div className="delivery-tabs" role="tablist" aria-label="お届け方法" data-reveal>
          {deliveries.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`tab-${d.id}`}
              aria-selected={i === active}
              aria-controls="delivery-panel"
              className={i === active ? 'is-active' : ''}
              onClick={() => { setActive(i); setPaused(true); }}
            >
              <span className="mono">{d.en}</span>
              <strong>{d.label}{d.soon && <span className="soon-badge">準備中</span>}</strong>
              <span className="tab-text">{d.text}</span>
              <i className="tab-timer" style={vars({'--run': paused || !inView ? 'paused' : 'running'})} key={`${d.id}-${active}`}/>
            </button>
          ))}
        </div>
      </div>
      <div className="delivery-stage" data-reveal>
        <div className="phone" id="delivery-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`}>
          <div className="phone-notch"/>
          <div className="phone-screen" key={current.id}>
            <Screen item={current}/>
          </div>
        </div>
        <span className="stage-orbit" aria-hidden="true"/>
        <span className="vf-sample">※ 画面はイメージです</span>
      </div>
    </section>
  );
}

function Screen({item}: {item: DeliveryItem}) {
  switch (item.id) {
    case 'photo':
      return (
        <div className="scr scr-photo">
          <header><strong>清澄白河 周辺</strong><span>12枚</span></header>
          <div className="photo-grid">
            {['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map((c, i) => <div key={c} className={`ph ${c}`} style={vars({'--i': i})}/>)}
          </div>
          <p className="scr-caption">駅前の通り／入口の段差／夕方の明るさ</p>
        </div>
      );
    case 'video':
      return (
        <div className="scr scr-video">
          <div className="video-frame">
            <div className="fish"><span/><span/><span/></div>
            <span className="rec"><i/>POV</span>
          </div>
          <div className="video-bar"><i/></div>
          <div className="video-meta"><span>駅から徒歩ルート</span><span className="mono">08:24</span></div>
          <ul className="chapters">
            <li><span className="mono">00:00</span>改札を出る</li>
            <li><span className="mono">02:40</span>商店街を抜ける</li>
            <li><span className="mono">05:15</span>坂道を上る</li>
          </ul>
        </div>
      );
    case 'edit':
      return (
        <div className="scr scr-edit">
          <header><strong>編集オプション</strong><span className="soon-badge">準備中</span></header>
          <div className="edit-preview"><span className="mono">PREVIEW</span></div>
          <div className="edit-timeline">
            {[38, 22, 30, 18].map((w, i) => <i key={i} style={vars({'--w': `${w}%`, '--i': i})}/>)}
            <span className="edit-head"/>
          </div>
          <ul className="chapters">
            <li><span className="mono">CUT</span>見どころだけを短く</li>
            <li><span className="mono">TITLE</span>場所と日付を入れて</li>
          </ul>
        </div>
      );
  }
}
