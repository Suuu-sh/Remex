import LineButton from './LineButton';
import {Check} from './Icons';

export default function Consultation() {
  return (
    <section id="request" className="request">
      <div className="request-inner">
        <div className="request-intro">
          <p className="eyebrow" data-reveal><span className="dot"/> CONSULTATION</p>
          <h2 data-reveal>相談は、<br/>LINEから。</h2>
          <p data-reveal>新しいご相談は、LINE公式アカウントでのみ受け付けています。友だち追加後、気になる場所や希望日時を送ってください。まだ具体的に決まっていなくても大丈夫です。</p>
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
              <h3>まずは、LINEで相談。</h3>
              <p>友だち追加すると、相談のテンプレートが届きます。場所・希望日時・気になる点を送ってください。</p>
            </div>
            <ol className="line-steps">
              <li><b>1</b>公式アカウントを友だち追加</li>
              <li><b>2</b>相談したい内容を送信</li>
              <li><b>3</b>対応可否・料金をご案内</li>
              <li><b>4</b>入金確認後に訪問を予約</li>
            </ol>
            <LineButton label="LINE公式アカウントで相談する"/>
            <p className="line-card-note">ご相談・見積もりは無料です。LINEでの相談時点では予約は確定しません。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
