type SampleRecord = {
  title: string;
  description: string;
  src: string;
  poster?: string;
};

// Add only footage made for demonstration and cleared for public release.
// Keep real customer deliveries out of this public gallery unless separately authorized.
const samples: SampleRecord[] = [];

export default function SampleRecordSection() {
  return (
    <section className="section samples" id="samples" aria-labelledby="samples-title">
      <div className="samples-head">
        <div>
          <p className="eyebrow" data-reveal><span className="dot"/> FIELD NOTE / SAMPLE</p>
          <h2 id="samples-title" data-reveal>記録の見本を、<br/>ご依頼の前に。</h2>
        </div>
        <p data-reveal>一人称動画の仕上がりをイメージしていただけるよう、自主制作のサンプルを掲載する予定です。実際のご依頼事例とは分けてご紹介します。</p>
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
            <h3>自主制作の見本は、準備中です。</h3>
            <p>現在、公開できるサンプル映像はありません。実際のご依頼事例やお客様の声を、見本として掲載することはありません。</p>
          </div>
        </div>
      )}
    </section>
  );
}
