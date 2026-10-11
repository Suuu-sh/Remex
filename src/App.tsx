import {useEffect} from 'react';
import {useRevealAll} from './hooks';
import Header from './components/Header';
import Hero from './components/Hero';
import {Marquee, Manifesto, Services} from './components/Story';
import Delivery from './components/Delivery';
import UseCases from './components/UseCases';
import {Area, Pricing, Process} from './components/Plan';
import {Chapter, Faq, Safety} from './components/Trust';
import PublicPolicies from './components/PublicPolicies';
import SampleRecord from './components/SampleRecord';
import Consultation from './components/Consultation';
import {Footer, MobileCta} from './components/Footer';
import PricingPage from './components/PricingPage';
import PreApplicationPage from './components/PreApplicationPage';
import {text, useLocale} from './i18n';

export default function App() {
  useRevealAll();
  const rawPathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const pathname = rawPathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const locale = useLocale();
  useEffect(() => {
    const english = locale === 'en';
    document.documentElement.lang = locale;
    const isPricing = pathname === '/pricing';
    const isApply = pathname === '/apply';
    document.title = english
      ? (isApply ? 'Request a visit on LINE — Remex' : isPricing ? 'Pricing — Remex' : 'Remex — We’ll go there for you.')
      : (isPricing ? '料金案内 — Remex' : isApply ? '事前相談フォーム — Remex' : 'Remex — あなたの代わりに、行ってきます。');
    const description = english
      ? 'Need someone to check a place in Tokyo? Remex visits locations in Tokyo’s 23 wards and shares a basic report and an unedited first-person video when filming is permitted.'
      : '東京23区で、気になる場所をあなたの代わりに訪ねる Remex。時間がない人、遠くて行けない人のために、基本レポートと一人称動画で現地を届けます。引っ越し先の下見から、閉店前の記録まで。';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://remex-site.suuu-sh.workers.dev${pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`}`;
  }, [locale, pathname]);
  if (pathname === '/apply') return <PreApplicationPage/>;

  if (pathname === '/pricing') {
    return (
      <>
        <a className="skip-link" href="#price">{text('料金案内へ移動', 'Skip to pricing')}</a>
        <Header/>
        <main><PricingPage/></main>
        <Footer/>
        <MobileCta/>
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#request">{text('LINEでの相談窓口へ移動', 'Skip to consultation')}</a>
      <Header/>
      <main>
        <Hero/>
        <Marquee/>
        <Manifesto/>
        <Services/>
        <UseCases/>
        <Delivery/>
        <SampleRecord/>
        <Process/>
        <Area/>
        <Pricing/>
        <Safety/>
        <Chapter/>
        <Faq/>
        <PublicPolicies/>
        <Consultation/>
      </main>
      <Footer/>
      <MobileCta/>
    </>
  );
}
