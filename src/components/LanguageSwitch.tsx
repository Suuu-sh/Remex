import {getLocale, localeHref, type Locale} from '../i18n';

export default function LanguageSwitch() {
  const current: Locale = getLocale();
  const path = `${window.location.pathname}${window.location.hash}`;
  const destination = (locale: Locale) => {
    const query = new URLSearchParams(window.location.search);
    const hasLiffContext = [...query.keys()].some(key => key.startsWith('liff.'));
    const route = hasLiffContext && /(?:^|\/)apply\/?$/.test(window.location.pathname)
      ? `${window.location.pathname}${window.location.hash}`
      : localeHref(path, locale);
    const url = new URL(route, window.location.origin);
    // Keep existing LIFF parameters intact, but make the selected language authoritative.
    query.set('lang', locale);
    url.search = query.toString();
    return `${url.pathname}${url.search}${url.hash}`;
  };
  return <nav className="language-switch" aria-label="Language">
    <a href={destination('ja')} aria-current={current === 'ja' ? 'page' : undefined}>JA</a>
    <span aria-hidden="true">/</span>
    <a href={destination('en')} aria-current={current === 'en' ? 'page' : undefined}>EN</a>
  </nav>;
}
