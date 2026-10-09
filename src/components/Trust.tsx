import {useId, useState} from 'react';
import {faqs, principles, refusals} from '../content';
import {vars} from '../hooks';
import {Cross} from './Icons';

export function Safety() {
  return (
    <section className="safety" id="safety" data-dark>
      <div className="safety-inner">
        <div className="safety-head">
          <p className="eyebrow" data-reveal><span className="dot"/> TRUST, BEFORE EVERYTHING.</p>
          <h2 data-reveal>安心して頼めることを、<br/>いちばんに。</h2>
          <p data-reveal>Remexは、運営者自身が対応する小さなサービスです。<br/>できること・できないことを、訪問前にきちんとお伝えします。</p>
        </div>
        <div className="principles">
          {principles.map((p, i) => (
            <article key={p.n} data-reveal style={vars({'--delay': `${i * 100}ms`})}>
              <span className="principle-n mono">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
        <div className="refusals" data-reveal>
          <p className="mono">WE DON’T DO</p>
          <ul>
            {refusals.map(r => <li key={r}><Cross size={12}/>{r}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Chapter() {
  return (
    <section className="chapter" id="chapter">
      <div className="chapter-inner" data-reveal>
        <span className="chapter-no mono" aria-hidden="true">No.001</span>
        <p className="eyebrow"><span className="dot"/> OUR FIRST CHAPTER</p>
        <h2>これから、一つずつ。</h2>
        <p>
          Remexは、これから実績を積み重ねていくサービスです。<br/>
          まだご紹介できる訪問事例やお客様の声はありません。<br/>
          まずは一件ずつ、丁寧に向き合っていきます。
        </p>
        <a className="chapter-link mono" href="#request">FIRST STEP, WITH YOU. ↗</a>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="faq" className="section faq">
      <div>
        <p className="eyebrow" data-reveal><span className="dot"/> QUESTIONS &amp; ANSWERS</p>
        <h2 data-reveal>気になること。</h2>
        <p className="faq-side" data-reveal>ここにないことも、LINE公式アカウントから気軽にご相談ください。</p>
      </div>
      <div className="faq-list">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={f.q} data-reveal style={vars({'--delay': `${i * 60}ms`})}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${base}-${i}`}
                  id={`${base}-q${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="mono">Q.0{i + 1}</span>
                  <span className="faq-q">{f.q}</span>
                  <span className="faq-icon" aria-hidden="true"/>
                </button>
              </h3>
              <div className="faq-a" id={`${base}-${i}`} role="region" aria-labelledby={`${base}-q${i}`}>
                <div><p>{f.a}{'link' in f && f.link && <> <a className="faq-policy-link" href={f.link.href}>{f.link.label}</a></>}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
