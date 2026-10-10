import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './style.css';
import {getLocale} from './i18n';

const locale = getLocale();
const english = locale === 'en';
const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
const isApply = pathname.endsWith('/apply');
const isPricing = pathname.endsWith('/pricing');
document.documentElement.lang = locale;
document.title = english
  ? (isApply ? 'Request a visit on LINE — Remex' : isPricing ? 'Pricing — Remex' : 'Remex — We’ll go there for you.')
  : (isPricing ? '料金案内 — Remex' : isApply ? '事前相談フォーム — Remex' : 'Remex — あなたの代わりに、行ってきます。');
const description = english
  ? 'Need someone to check a place in Tokyo? Remex visits locations in Tokyo’s 23 wards and shares a basic report and an unedited first-person video when filming is permitted.'
  : '東京23区で、気になる場所をあなたの代わりに訪ねる Remex。時間がない人、遠くて行けない人のために、基本レポートと一人称動画で現地を届けます。引っ越し先の下見から、閉店前の記録まで。';
document.querySelector('meta[name="description"]')?.setAttribute('content', description);
document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
canonical.href = `${window.location.origin}${pathname}`;
if (isApply) {
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots); }
  robots.content = 'noindex, nofollow';
}

if (import.meta.env.PROD && window.location.hostname === 'remex-site.suuu-sh.workers.dev') {
  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({token: '99c3b8daa75d4cc4b193e9fe8e5e5437'});
  document.head.appendChild(beacon);
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
