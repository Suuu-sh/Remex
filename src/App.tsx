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
import {getLocale, text} from './i18n';

export default function App() {
  useRevealAll();
  const rawPathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const pathname = rawPathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const locale = getLocale();
  document.documentElement.lang = locale;
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
