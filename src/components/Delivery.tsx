import {text} from '../i18n';
import {Check} from './Icons';

export default function Delivery() {
  return (
    <section id="delivery" className="delivery-summary">
      <div className="delivery-summary-inner">
        <div><p className="section-label">{text('02 / お届けするもの', '02 / Your delivery')}</p><h2>{text('基本レポートと一人称動画をお届け。', 'Your report and video')}</h2><p className="delivery-summary-lead">{text('事前に決めた確認項目に沿って、現地の様子を記録します。', 'We document the location around your agreed checkpoints.')}</p></div>
        <div className="delivery-items">
          <article><span className="delivery-check"><Check size={18}/></span><div><h3>{text('基本レポート', 'Basic report')}</h3><p>{text('現地で確認した内容をまとめてお届けします。確認項目はプランに応じて最大3・5・8件です。', 'A summary of the on-site observations, covering up to 3, 5, or 8 checkpoints depending on your plan.')}</p></div></article>
          <article><span className="delivery-check"><Check size={18}/></span><div><h3>{text('未編集の一人称動画 1本', 'One unedited first-person video')}</h3><p>{text('撮影が許可される場合に、GoProで歩く目線を記録します。施設のルールに従い、撮影できない場所は事前に相談します。', 'When filming is permitted, a GoPro captures the walker’s point of view. We follow venue rules and discuss any filming restrictions in advance.')}</p></div></article>
          <p className="delivery-unavailable">{text('写真の記録・納品、動画編集は準備中です。', 'Photo capture, photo delivery, and video editing are not yet available.')}</p>
        </div>
        <div id="samples" className="sample-status"><strong>{text('公開サンプルについて', 'About public samples')}</strong><p>{text('現在、公開できるサンプル映像や訪問事例・お客様の声はありません。自主制作の見本は準備中です。実際のご依頼の記録を、許可なく公開・事例紹介に使うことはありません。', 'No public sample videos, visit examples, or testimonials are available yet. Self-produced samples are in preparation. Customer records will never be published or used as case studies without permission.')}</p></div>
      </div>
    </section>
  );
}
