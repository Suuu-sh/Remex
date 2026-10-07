import {useEffect, useState} from 'react';
import {usePageScroll} from '../hooks';
import {Arrow} from './Icons';

const links = [
  {href: '#service', label: 'できること'},
  {href: '#cases', label: '活用例'},
  {href: '#delivery', label: '届け方'},
  {href: '#price', label: '料金'},
  {href: '#safety', label: '安心への約束'},
  {href: '#faq', label: 'よくある質問'},
];

export function Brand() {
  return <a className="brand" href="#top" aria-label="Remex ホーム">remex<span><Arrow size={12}/></span></a>;
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
          <nav aria-label="メインメニュー">
            {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <a className="button small" href="#request">相談してみる <Arrow/></a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            onClick={() => setOpen(o => !o)}
          >
            <span/><span/>
          </button>
        </div>
        <div className="progress" style={{transform: `scaleX(${progress})`}} aria-hidden="true"/>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} inert={!open} aria-hidden={!open}>
        <nav aria-label="モバイルメニュー">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{transitionDelay: `${80 + i * 50}ms`}}>
              <small>0{i + 1}</small>{l.label}
            </a>
          ))}
        </nav>
        <a className="button" href="#request" onClick={() => setOpen(false)}>まずは無料で相談する <Arrow/></a>
        <p className="micro">東京23区対応 ／ 個人・法人どちらも</p>
      </div>
    </>
  );
}
