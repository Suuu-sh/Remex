import {useEffect, useState} from 'react';
import {usePageScroll} from '../hooks';
import {Brand} from './Header';
import {Arrow} from './Icons';
import LineButton from './LineButton';

const isPricingPage = () => window.location.pathname.replace(/\/+$/, '') === '/pricing';
const siteHref = (href: string) => isPricingPage() && href.startsWith('#') ? `/${href}` : href;

export function Footer() {
  return (
    <footer className="footer" data-dark>
      <div className="footer-inner">
        <a className="footer-cta" href={siteHref('#request')}>
          <span className="mono">START WITH LINE</span>
          <strong>まずはLINEで、<br/>相談から。</strong>
          <span className="footer-cta-arrow"><Arrow size={28}/></span>
        </a>
        <div className="footer-row">
          <Brand/>
          <nav aria-label="フッターメニュー">
            <a href={siteHref('#service')}>できること</a>
            <a href={siteHref('#cases')}>活用例</a>
            <a href={siteHref('#delivery')}>届け方</a>
            <a href={siteHref('#samples')}>記録の見本</a>
            <a href="/pricing">料金</a>
            <a href={siteHref('#safety')}>安心への約束</a>
            <a href={siteHref('#faq')}>よくある質問</a>
            <a href={siteHref('#privacy')}>個人情報の取り扱い</a>
            <a href={siteHref('#terms')}>利用・キャンセル条件</a>
            <a href={siteHref('#tokusho')}>特定商取引法に基づく表記</a>
          </nav>
          <small>© {new Date().getFullYear()} Remex <span>／</span> 東京23区・運営者対応</small>
        </div>
        <p className="footer-word" aria-hidden="true">remex</p>
      </div>
    </footer>
  );
}

/** Mobile-only floating CTA: shown after the hero, hidden while the consultation section is on screen. */
export function MobileCta() {
  const {y} = usePageScroll();
  const [consultationInView, setConsultationInView] = useState(false);
  useEffect(() => {
    const consultation = document.getElementById('request');
    if (!consultation || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setConsultationInView(entry.isIntersecting));
    observer.observe(consultation);
    return () => observer.disconnect();
  }, []);
  const visible = y > 640 && !consultationInView;
  return (
    <div className={`mobile-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible} inert={!visible}>
      <span><i className="live-dot"/>相談は無料です</span>
      <LineButton small label="LINEで相談"/>
    </div>
  );
}
