import {useEffect, useState} from 'react';
import {usePageScroll} from '../hooks';
import {Brand} from './Header';
import {Arrow} from './Icons';

export function Footer() {
  return (
    <footer className="footer" data-dark>
      <div className="footer-inner">
        <a className="footer-cta" href="#request">
          <span className="mono">START A REQUEST</span>
          <strong>あなたの代わりに、<br/>行ってきます。</strong>
          <span className="footer-cta-arrow"><Arrow size={28}/></span>
        </a>
        <div className="footer-row">
          <Brand/>
          <nav aria-label="フッターメニュー">
            <a href="#service">できること</a>
            <a href="#cases">活用例</a>
            <a href="#delivery">届け方</a>
            <a href="#price">料金</a>
            <a href="#safety">安心への約束</a>
            <a href="#faq">よくある質問</a>
          </nav>
          <small>© {new Date().getFullYear()} Remex <span>／</span> 東京23区・運営者対応</small>
        </div>
        <p className="footer-word" aria-hidden="true">remex</p>
      </div>
    </footer>
  );
}

/** Mobile-only floating CTA: shown after the hero, hidden while the form is on screen. */
export function MobileCta() {
  const {y} = usePageScroll();
  const [formInView, setFormInView] = useState(false);
  useEffect(() => {
    const form = document.getElementById('request');
    if (!form || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting));
    observer.observe(form);
    return () => observer.disconnect();
  }, []);
  const visible = y > 640 && !formInView;
  return (
    <div className={`mobile-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible} inert={!visible}>
      <span><i className="live-dot"/>相談は無料です</span>
      <a className="button small" href="#request">相談してみる <Arrow/></a>
    </div>
  );
}
