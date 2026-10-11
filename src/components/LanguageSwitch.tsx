import {getLocale, setLocale, type Locale} from '../i18n';

export default function LanguageSwitch() {
  const current: Locale = getLocale();
  return <nav className="language-switch" aria-label="Language">
    <button type="button" aria-pressed={current === 'ja'} aria-current={current === 'ja' ? 'true' : undefined} onClick={() => setLocale('ja')}>JA</button>
    <span aria-hidden="true">/</span>
    <button type="button" aria-pressed={current === 'en'} aria-current={current === 'en' ? 'true' : undefined} onClick={() => setLocale('en')}>EN</button>
  </nav>;
}
