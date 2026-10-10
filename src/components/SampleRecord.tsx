type SampleRecord = {
  title: string;
  description: string;
  src: string;
  poster?: string;
};
import {getLocale, text} from '../i18n';

// Add only footage made for demonstration and cleared for public release.
// Keep real customer deliveries out of this public gallery unless separately authorized.
const samples: SampleRecord[] = [];

export default function SampleRecordSection() {
  return (
    <section className="section samples" id="samples" aria-labelledby="samples-title">
      <div className="samples-head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot"/> FIELD NOTE / SAMPLE</p>
          <h2 id="samples-title" data-reveal>{getLocale() === 'en' ? <>See a sample before<br/>you request a visit.</> : <>記録の見本を、<br/>ご依頼の前に。</>}</h2>
        </div>
        <p data-reveal>{text('一人称動画の仕上がりをイメージしていただけるよう、自主制作のサンプルを掲載する予定です。実際のご依頼事例とは分けてご紹介します。', 'We plan to share self-produced samples to show what a first-person video may look like. They will be clearly distinguished from customer visits.')}</p>
      </div>
      {samples.length > 0 ? (
        <div className="sample-grid">
          {samples.map(sample => (
            <article className="sample-card" key={sample.src} data-reveal>
              <video controls playsInline preload="metadata" poster={sample.poster} aria-label={`自主制作サンプル：${sample.title}`}>
                <source src={sample.src} type="video/mp4"/>
                お使いのブラウザーは動画再生に対応していません。
              </video>
              <div className="sample-caption">
                <span className="mono">SELF-PRODUCED SAMPLE</span>
                <h3>{sample.title}</h3>
                <p>{sample.description}</p>
                <small>自主制作の見本です。実際の依頼・お客様の声ではありません。</small>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="sample-empty" data-reveal>
          <div className="sample-empty-mark" aria-hidden="true"><span>REC</span><i/></div>
          <div>
            <span className="mono">SELF-PRODUCED SAMPLE / COMING SOON</span>
            <h3>{text('自主制作の見本は、準備中です。', 'Self-produced samples are coming soon.')}</h3>
            <p>{text('現在、公開できるサンプル映像はありません。実際のご依頼事例やお客様の声を、見本として掲載することはありません。', 'There are no sample videos available yet. We will not present customer visits or testimonials as samples.')}</p>
          </div>
        </div>
      )}
    </section>
  );
}
