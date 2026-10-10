import {useEffect, useState} from 'react';
import {usePageScroll} from '../hooks';
import {Brand} from './Header';
import {Arrow} from './Icons';
import LineButton from './LineButton';
import {getLocale, localeHref, text} from '../i18n';

const isPricingPage = () => window.location.pathname.replace(/\/+$/, '').replace(/^\/en(?=\/|$)/, '') === '/pricing';
const siteHref = (href: string) => localeHref(isPricingPage() && href.startsWith('#') ? `/${href}` : href);

export function Footer() {
  return (
    <footer className="footer" data-dark>
      <div className="footer-inner">
        <a className="footer-cta" href={siteHref('#request')}>
          <span className="mono">START WITH LINE</span>
          <strong>{getLocale() === 'en' ? <>Start with a message<br/>on LINE.</> : <>まずはLINEで、<br/>相談から。</>}</strong>
          <span className="footer-cta-arrow"><Arrow size={28}/></span>
        </a>
        <div className="footer-row">
          <Brand/>
          <nav aria-label="フッターメニュー">
            <a href={siteHref('#service')}>{text('できること', 'What we do')}</a>
            <a href={siteHref('#cases')}>{text('活用例', 'Use cases')}</a>
            <a href={siteHref('#delivery')}>{text('届け方', 'Delivery')}</a>
            <a href={siteHref('#samples')}>{text('記録の見本', 'Sample record')}</a>
            <a href={localeHref('/pricing')}>{text('料金', 'Pricing')}</a>
            <a href={siteHref('#safety')}>{text('安心への約束', 'Our promise')}</a>
            <a href={siteHref('#faq')}>{text('よくある質問', 'FAQ')}</a>
            <a href={siteHref('#privacy')}>{text('個人情報の取り扱い', 'Privacy policy')}</a>
            <a href={siteHref('#terms')}>{text('利用・キャンセル条件', 'Service and cancellation terms')}</a>
            <a href={siteHref('#tokusho')}>{text('特定商取引法に基づく表記', 'Commercial disclosure')}</a>
          </nav>
          <small>© {new Date().getFullYear()} Remex <span>／</span> {text('東京23区・運営者対応', 'Owner-operated · Tokyo 23 wards only')}</small>
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
      <span><i className="live-dot"/>{text('相談は無料です', 'Free consultation')}</span>
      <LineButton small label={text('LINEで相談', 'Ask on LINE')}/>
    </div>
  );
}
