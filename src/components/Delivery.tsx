import {useState} from 'react';
import {getLocalizedContent, type Delivery as DeliveryItem} from '../content';
import {useCycle, useInView, vars} from '../hooks';
import {getLocale, text} from '../i18n';

export default function Delivery() {
  const {deliveries} = getLocalizedContent(getLocale());
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLElement>('-20% 0px');
  const [active, setActive] = useCycle(deliveries.length, 5200, paused || !inView);
  const current = deliveries[active];

  return (
    <section id="delivery" className="section delivery" ref={ref}>
      <div className="delivery-copy">
        <p className="eyebrow" data-reveal><span className="dot"/> HOW YOU’LL SEE IT</p>
        <h2 data-reveal>{getLocale() === 'en' ? <>Get a feel for the place,<br/>before you go.</> : <>行った気分まで、<br/>持ち帰ります。</>}</h2>
        <p className="delivery-lead" data-reveal>{text('基本レポートと、撮影が許可される場合の一人称動画でお届けします。', 'We share a basic report and, when filming is permitted, an unedited first-person video.')}</p>
        <div className="delivery-tabs" role="tablist" aria-label={text('お届け方法', 'Delivery options')} data-reveal>
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
              <strong>{d.label}{d.badge && <span className="soon-badge">{d.badge}</span>}</strong>
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
          <span className="vf-sample">{text('※ 画面はイメージです', '* Illustration')}</span>
      </div>
    </section>
  );
}

function Screen({item}: {item: DeliveryItem}) {
  switch (item.id) {
    case 'photo':
      return (
        <div className="scr scr-photo">
          <header><strong>{text('写真での記録', 'Photo delivery')}</strong><span className="soon-badge">{text('準備中', 'Coming soon')}</span></header>
          <div className="photo-placeholder"><span className="mono">PHOTO DELIVERY</span><strong>{text('準備中', 'Coming soon')}</strong></div>
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
          <div className="video-meta"><span>{text('駅から徒歩ルート', 'Walk from the station')}</span><span className="mono">08:24</span></div>
          <ul className="chapters">
            <li><span className="mono">00:00</span>{text('改札を出る', 'Leave the station')}</li>
            <li><span className="mono">02:40</span>{text('商店街を抜ける', 'Walk through the shopping street')}</li>
            <li><span className="mono">05:15</span>{text('坂道を上る', 'Head up the hill')}</li>
          </ul>
        </div>
      );
    case 'edit':
      return (
        <div className="scr scr-edit">
          <header><strong>{text('編集オプション', 'Editing')}</strong><span className="soon-badge">{text('準備中', 'Coming soon')}</span></header>
          <div className="edit-preview"><span className="mono">PREVIEW</span></div>
          <div className="edit-timeline">
            {[38, 22, 30, 18].map((w, i) => <i key={i} style={vars({'--w': `${w}%`, '--i': i})}/>)}
            <span className="edit-head"/>
          </div>
          <ul className="chapters">
            <li><span className="mono">CUT</span>{text('見どころだけを短く', 'Short highlights')}</li>
            <li><span className="mono">TITLE</span>{text('場所と日付を入れて', 'Add place and date')}</li>
          </ul>
        </div>
      );
  }
}
