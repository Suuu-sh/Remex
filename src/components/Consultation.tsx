import LineButton from './LineButton';
import {Check} from './Icons';

export default function Consultation() {
  return (
    <section id="request" className="request">
      <div className="request-inner">
        <div className="request-intro">
          <p className="eyebrow" data-reveal><span className="dot"/> CONSULTATION</p>
          <h2 data-reveal>相談は、<br/>LINEから。</h2>
          <p data-reveal>新しいご相談は、LINE内の事前相談フォームから受け付けています。入力内容を送信するとLINE公式アカウントとのトークに届き、内容を確認して対応可否や料金をご案内します。</p>
          <ul className="request-points" data-reveal>
            <li><Check/>相談・見積もりは無料</li>
            <li><Check/>内容と料金をご案内してから調整</li>
            <li><Check/>入金確認後に予約確定</li>
          </ul>
        </div>

        <div className="request-side">
          <div className="line-card" data-reveal>
            <div className="line-card-head">
              <span className="mono">ONLY INTAKE / LINE OFFICIAL</span>
              <h3>まずは、LINEで事前相談。</h3>
              <p>場所と詳細な内容をフォームに入力。開催日時が決まっている場合は詳細な内容に記入してください。運営者の予定などにより、その日時に対応できない場合があります。内容を確認してから、LINEのトークで送信できます。</p>
            </div>
            <ol className="line-steps">
              <li><b>1</b>事前相談フォームに入力</li>
              <li><b>2</b>内容を確認してLINEで送信</li>
              <li><b>3</b>対応可否・料金をご案内</li>
              <li><b>4</b>入金確認後に訪問を予約</li>
            </ol>
            <LineButton label="LINEで事前相談フォームを開く"/>
            <p className="line-card-note">ご相談・見積もりは無料です。LINEでの相談時点では予約は確定しません。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
