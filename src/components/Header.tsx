import {useEffect, useState} from 'react';
import {usePageScroll} from '../hooks';
import LineButton from './LineButton';
import LanguageSwitch from './LanguageSwitch';
import {getLocale, localeHref, text} from '../i18n';

const links = [
  {href: '#service', ja: 'できること', en: 'What we do'},
  {href: '#cases', ja: '活用例', en: 'Use cases'},
  {href: '#delivery', ja: '届け方', en: 'Delivery'},
  {href: '/pricing', ja: '料金', en: 'Pricing'},
  {href: '#safety', ja: '安心への約束', en: 'Our promise'},
  {href: '#faq', ja: 'よくある質問', en: 'FAQ'},
];

const isPricingPage = () => window.location.pathname.replace(/\/+$/, '').replace(/^\/en(?=\/|$)/, '') === '/pricing';
const siteHref = (href: string) => localeHref(isPricingPage() && href.startsWith('#') ? `/${href}` : href);

export function Brand() {
  return (
    <a className="brand" href={localeHref(isPricingPage() ? '/' : '#top')} aria-label={text('Remex ホーム', 'Remex home')}>
      <img className="brand-mark" src="/favicon.svg" alt="" aria-hidden="true"/>
      <span className="brand-wordmark">remex</span>
    </a>
  );
}

export default function Header() {
  const {progress, scrolled, y} = usePageScroll();
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const under = document.elementsFromPoint(window.innerWidth / 2, 40).find(el => !el.closest('.header'));
    setOnDark(Boolean(under?.closest('[data-dark]')));
  }, [y]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}${onDark ? ' on-dark' : ''}${open ? ' is-open' : ''}`}>
        <div className="header-inner">
          <Brand/>
          <nav aria-label={text('メインメニュー', 'Main menu')}>
            {links.map(l => <a key={l.href} href={siteHref(l.href)}>{getLocale() === 'en' ? l.en : l.ja}</a>)}
          </nav>
          <LanguageSwitch/>
          <LineButton small label={text('LINEで相談', 'Ask on LINE')}/>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? text('メニューを閉じる', 'Close menu') : text('メニューを開く', 'Open menu')}
            onClick={() => setOpen(o => !o)}
          >
            <span/><span/>
          </button>
        </div>
        <div className="progress" style={{transform: `scaleX(${progress})`}} aria-hidden="true"/>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} inert={!open} aria-hidden={!open}>
        <nav aria-label={text('モバイルメニュー', 'Mobile menu')}>
          {links.map((l, i) => (
            <a key={l.href} href={siteHref(l.href)} onClick={() => setOpen(false)} style={{transitionDelay: `${80 + i * 50}ms`}}>
              <small>0{i + 1}</small>{getLocale() === 'en' ? l.en : l.ja}
            </a>
          ))}
        </nav>
        <LanguageSwitch/>
        <LineButton label={text('LINEで事前相談する', 'Request a visit on LINE')}/>
        <p className="micro">{text('東京23区対応 ／ 個人・法人どちらも', 'Tokyo’s 23 wards only / Individuals and businesses')}</p>
      </div>
    </>
  );
}
