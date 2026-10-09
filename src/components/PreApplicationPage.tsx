import {useEffect, useState, type FormEvent} from 'react';
import {buildPreApplicationMessage, createOfficialAccountDraftUrl, type PreApplicationDraft} from '../preApplication';

const LINE_BASIC_ID = '@034laqhf';

const initialDraft: PreApplicationDraft = {
  place: '', purpose: '', preferredDate1: '', preferredDate2: '', plan: '', deliverables: [], details: '',
};

export default function PreApplicationPage() {
  const [draft, setDraft] = useState<PreApplicationDraft>(initialDraft);
  const [draftUrl, setDraftUrl] = useState('');

  useEffect(() => {
    document.title = '事前相談フォーム | Remex';
    const robots = document.querySelector('meta[name="robots"]') ?? document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex, nofollow');
    document.head.appendChild(robots);
  }, []);

  function update<K extends keyof PreApplicationDraft>(key: K, value: PreApplicationDraft[K]) {
    setDraft(current => ({...current, [key]: value}));
  }

  function toggleDeliverable(value: string) {
    setDraft(current => ({
      ...current,
      deliverables: current.deliverables.includes(value)
        ? current.deliverables.filter(item => item !== value)
        : [...current.deliverables, value],
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.place.trim() || !draft.details.trim()) return;
    setDraftUrl(createOfficialAccountDraftUrl(LINE_BASIC_ID, buildPreApplicationMessage(draft)));
  }

  return (
    <main className="apply-page">
      <header className="apply-header">
        <a className="apply-brand" href="/" aria-label="Remex ホーム">Remex<span>.</span></a>
        <span className="mono">LINE / PRE-APPLICATION</span>
      </header>

      <section className="apply-main" aria-labelledby="apply-title">
        <p className="eyebrow"><span className="dot"/> BEFORE WE VISIT</p>
        <h1 id="apply-title">現地へ行く前に、<br/>希望を教えてください。</h1>
        <p className="apply-lead">場所と確認したいことを送るだけで大丈夫です。内容を確認して、対応可否・料金・日程をLINEでご案内します。</p>

        <div className="apply-notice" role="note">
          <strong>これは事前相談です</strong>
          <p>フォーム送信だけでは予約・依頼は確定しません。内容と見積もりに合意いただき、入金確認後に予約が確定します。</p>
        </div>

        {draftUrl ? (
          <section className="apply-review" aria-labelledby="review-title">
            <span className="mono apply-step">REVIEW / 02</span>
            <h2 id="review-title">内容を確認してください。</h2>
            <p>ボタンを押すとRemex公式LINEとのトークが開き、申請文が入力欄に入ります。内容を確認して、LINEの送信ボタンを押してください。</p>
            <pre className="apply-message-preview">{buildPreApplicationMessage(draft)}</pre>
            <a className="button line apply-submit" href={draftUrl}>LINEトークで内容を確認する <span aria-hidden="true">↗</span></a>
            <button className="apply-edit" type="button" onClick={() => setDraftUrl('')}>フォームに戻って編集</button>
          </section>
        ) : (
          <form className="apply-form" onSubmit={handleSubmit}>
            <span className="mono apply-step">APPLICATION / 01</span>

            <label className="apply-field" htmlFor="apply-place">
              <span>場所 <b>必須</b></span>
              <input id="apply-place" name="place" required maxLength={160} autoComplete="off" placeholder="住所、駅名、店舗名、URLなど" value={draft.place} onChange={event => update('place', event.target.value)}/>
            </label>

            <label className="apply-field" htmlFor="apply-purpose">
              <span>相談内容 <b>必須</b></span>
              <select id="apply-purpose" name="purpose" required value={draft.purpose} onChange={event => update('purpose', event.target.value)}>
                <option value="" disabled>選択してください</option>
                <option>引っ越し候補地の確認</option>
                <option>店舗・物件の現地確認</option>
                <option>イベント・展示の代理体験</option>
                <option>商品・展示品の確認</option>
                <option>閉店前・取り壊し前の記録</option>
                <option>その他</option>
              </select>
            </label>

            <fieldset className="apply-fieldset">
              <legend>希望日時 <small>任意・決まっている場合</small></legend>
              <label className="apply-field" htmlFor="apply-date-one">
                <span>第1希望</span>
                <input id="apply-date-one" name="preferredDate1" type="datetime-local" value={draft.preferredDate1} onChange={event => update('preferredDate1', event.target.value)}/>
              </label>
              <label className="apply-field" htmlFor="apply-date-two">
                <span>第2希望</span>
                <input id="apply-date-two" name="preferredDate2" type="datetime-local" value={draft.preferredDate2} onChange={event => update('preferredDate2', event.target.value)}/>
              </label>
            </fieldset>

            <label className="apply-field" htmlFor="apply-plan">
              <span>希望プラン <small>任意</small></span>
              <select id="apply-plan" name="plan" value={draft.plan} onChange={event => update('plan', event.target.value)}>
                <option value="">相談して決めたい</option>
                <option>30分（現地作業 ¥6,600）</option>
                <option>60分（現地作業 ¥9,900）</option>
                <option>90分（現地作業 ¥13,200）</option>
              </select>
              <small>別途、往復交通費などがかかる場合があります。<a href="/pricing" target="_blank" rel="noreferrer">料金の詳細</a></small>
            </label>

            <fieldset className="apply-fieldset">
              <legend>希望する記録 <small>任意</small></legend>
              <div className="apply-choice-row">
                {[{value: '一人称動画', label: '一人称動画'}].map(item => (
                  <label className="apply-choice" key={item.value}>
                    <input type="checkbox" checked={draft.deliverables.includes(item.value)} onChange={() => toggleDeliverable(item.value)}/>
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
              <small>撮影は施設のルールに従います。</small>
            </fieldset>

            <label className="apply-field" htmlFor="apply-details">
              <span>現地で確認してほしいこと <b>必須</b></span>
              <textarea id="apply-details" name="details" required rows={5} maxLength={600} placeholder="見たい場所、気になる点、撮影してほしい範囲など" value={draft.details} onChange={event => update('details', event.target.value)}/>
              <small className="apply-counter">{draft.details.length} / 600</small>
            </label>

            <label className="apply-consent">
              <input type="checkbox" required/>
              <span><a href="/#privacy" target="_blank" rel="noreferrer">個人情報の取り扱い</a>と<a href="/#terms" target="_blank" rel="noreferrer">利用・キャンセル条件</a>を確認し、入力内容をLINEへ渡してトークの入力欄にセットすることに同意します。</span>
            </label>

            <p className="apply-status" role="note">次の画面へ進むと、入力内容を含むURLをLINEに渡して公式アカウントとのトーク欄に下書きします。Remexには、トークで送信ボタンを押した後に届きます。</p>
            <button className="button line apply-submit" type="submit">
              申請内容を確認する <span aria-hidden="true">→</span>
            </button>
            <p className="apply-footnote">入力内容はRemexのサーバーやD1には保存されません。LINEトークで送信する前に、内容を確認・編集できます。</p>
          </form>
        )}

        <footer className="apply-footer">
          <a href="/">Remex ホーム</a>
          <a href="/pricing">料金案内</a>
          <a href="/#privacy">個人情報の取り扱い</a>
        </footer>
      </section>
    </main>
  );
}
