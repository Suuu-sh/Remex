import {useRevealAll} from './hooks';
import Header from './components/Header';
import Hero from './components/Hero';
import {Marquee, Manifesto, Services} from './components/Story';
import Delivery from './components/Delivery';
import UseCases from './components/UseCases';
import {Area, Pricing, Process} from './components/Plan';
import {Chapter, Faq, Safety} from './components/Trust';
import RequestForm from './components/RequestForm';
import {Footer, MobileCta} from './components/Footer';

export default function App() {
  useRevealAll();
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
        <Process/>
        <Area/>
        <Pricing/>
        <Safety/>
        <Chapter/>
        <Faq/>
        <RequestForm/>
      </main>
      <Footer/>
      <MobileCta/>
    </>
  );
}
