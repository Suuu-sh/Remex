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
import RequestForm from './components/RequestForm';
import {Footer, MobileCta} from './components/Footer';
import PricingPage from './components/PricingPage';

export default function App() {
  useRevealAll();
  if (window.location.pathname.replace(/\/+$/, '') === '/pricing') {
    return (
      <>
        <a className="skip-link" href="#price">料金案内へ移動</a>
        <Header/>
        <main><PricingPage/></main>
        <Footer/>
        <MobileCta/>
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#request">相談フォームへ移動</a>
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
        <RequestForm/>
      </main>
      <Footer/>
      <MobileCta/>
    </>
  );
}
