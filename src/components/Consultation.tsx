import LineButton from './LineButton';
import {Check} from './Icons';
import {getLocale, text} from '../i18n';

export default function Consultation() {
  return (
    <section id="request" className="request">
      <div className="request-inner">
        <div className="request-intro">
          <p className="eyebrow" data-reveal><span className="dot"/> CONSULTATION</p>
          <h2 data-reveal>{getLocale() === 'en' ? <>Start with a message<br/>on LINE.</> : <>相談は、<br/>LINEから。</>}</h2>
          <p data-reveal>{text('新しいご相談は、LINE内の事前相談フォームから受け付けています。入力内容を送信するとLINE公式アカウントとのトークに届き、内容を確認して対応可否や料金をご案内します。', 'New requests are accepted through the pre-visit form in LINE. Submit the form to send a draft to our official LINE chat; we’ll review it and let you know whether we can help and what it will cost.')}</p>
          <ul className="request-points" data-reveal>
            <li><Check/>{text('相談・見積もりは無料', 'Free consultation and estimate')}</li>
            <li><Check/>{text('内容と料金をご案内してから調整', 'Confirm scope and cost before booking')}</li>
            <li><Check/>{text('入金確認後に予約確定', 'Booking confirmed after payment')}</li>
          </ul>
        </div>

        <div className="request-side">
          <div className="line-card" data-reveal>
            <div className="line-card-head">
              <span className="mono">ONLY INTAKE / LINE OFFICIAL</span>
              <h3>{text('まずは、LINEで事前相談。', 'Start with a request on LINE.')}</h3>
              <p>{text('場所と詳細な内容をフォームに入力。開催日時が決まっている場合は詳細な内容に記入してください。運営者の予定などにより、その日時に対応できない場合があります。内容を確認してから、LINEのトークで送信できます。', 'Enter the location and details in the form. If you have a date or time in mind, include it; availability depends on our schedule. Review your message, then send it in LINE.')}</p>
            </div>
            <ol className="line-steps">
              <li><b>1</b>{text('事前相談フォームに入力', 'Fill in the request form')}</li>
              <li><b>2</b>{text('内容を確認してLINEで送信', 'Review and send it on LINE')}</li>
              <li><b>3</b>{text('対応可否・料金をご案内', 'We confirm availability and price')}</li>
              <li><b>4</b>{text('入金確認後に訪問を予約', 'Visit is booked after payment')}</li>
            </ol>
            <LineButton label={text('LINEで事前相談フォームを開く', 'Open the request form on LINE')}/>
            <p className="line-card-note">{text('ご相談・見積もりは無料です。LINEでの相談時点では予約は確定しません。', 'Consultations and estimates are free. A LINE inquiry does not confirm a booking.')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
