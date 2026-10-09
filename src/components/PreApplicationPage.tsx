import {useEffect, useState} from 'react';
import {buildPreApplicationMessage, createOfficialAccountDraftUrl, type PreApplicationDraft} from '../preApplication';

const LINE_BASIC_ID = '@034laqhf';
const questions = [
  {label: '場所', title: 'どこを確認しますか？'},
  {label: '相談内容', title: 'どんなことを相談しますか？'},
  {label: '希望プラン', title: '希望プランはありますか？'},
  {label: '詳細な内容', title: '確認したいことを教えてください。'},
];

const initialDraft: PreApplicationDraft = {
  place: '', purpose: '', plan: '', details: '',
};

export default function PreApplicationPage() {
  const [draft, setDraft] = useState<PreApplicationDraft>(initialDraft);
  const [step, setStep] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [consented, setConsented] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = '事前相談フォーム | Remex';
    const robots = document.querySelector('meta[name="robots"]') ?? document.createElement('meta');
    robots.setAttribute('name', 'robots');
    robots.setAttribute('content', 'noindex, nofollow');
    document.head.appendChild(robots);
  }, []);

  function update<K extends keyof PreApplicationDraft>(key: K, value: PreApplicationDraft[K]) {
    setDraft(current => ({...current, [key]: value}));
    setError('');
    setConsented(false);
  }

  function next() {
    if (step === 0 && !draft.place.trim()) {
      setError('場所を入力してください。');
      return;
    }
    if (step === 1 && !draft.purpose.trim()) {
      setError('相談内容を選択してください。');
      return;
    }
    if (step === 3) {
      if (!draft.details.trim()) {
        setError('詳細な内容を入力してください。');
        return;
      }
      setError('');
      setShowReview(true);
      return;
    }
    setError('');
    setStep(current => current + 1);
  }

  function back() {
    setError('');
    if (showReview) {
      setShowReview(false);
      setStep(3);
      return;
    }
    setStep(current => Math.max(0, current - 1));
  }

  const lineUrl = createOfficialAccountDraftUrl(LINE_BASIC_ID, buildPreApplicationMessage(draft));
  const progress = showReview ? 100 : ((step + 1) / questions.length) * 100;

  return (
    <main className={`apply-page${showReview ? ' is-review' : ''}`}>
      <header className="apply-header">
        <a className="apply-brand" href="/" aria-label="Remex ホーム">Remex<span>.</span></a>
        <span className="mono">LINE / PRE-APPLICATION</span>
      </header>

      <section className="apply-main" aria-labelledby="apply-title">
        <div className="apply-intro">
          <p className="eyebrow"><span className="dot"/> BEFORE WE VISIT</p>
          <h1 id="apply-title">現地へ行く前に、<br/>希望を教えてください。</h1>
          <p className="apply-lead">場所と確認したいことを送るだけで大丈夫です。内容を確認して、対応可否・料金・日程をLINEでご案内します。</p>

          <div className="apply-notice" role="note">
            <strong>これは事前相談です</strong>
            <p>フォーム送信だけでは予約・依頼は確定しません。内容と見積もりに合意いただき、入金確認後に予約が確定します。</p>
          </div>
        </div>

        <div className="apply-form" aria-label="事前相談フォーム">
          <div className="apply-progress-head">
            <span className="mono apply-step">{showReview ? 'FINAL REVIEW' : `QUESTION / 0${step + 1}`}</span>
            <span className="apply-progress-count">{showReview ? '確認' : `${step + 1} / ${questions.length}`}</span>
          </div>
          <div className="apply-progress-track" role="progressbar" aria-label="入力の進行状況" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{width: `${progress}%`}}/>
          </div>

          {showReview ? (
            <section className="apply-review" aria-labelledby="review-title">
              <p className="apply-question-label">送信内容<span className="is-required">必須</span></p>
              <h2 id="review-title">送信前に内容を確認してください。</h2>
              <p>LINE公式アカウントとのトークが開き、申請文が入力欄に入ります。内容を確認・編集して、LINEの送信ボタンを押してください。</p>
              <pre className="apply-message-preview">{buildPreApplicationMessage(draft)}</pre>
              <label className="apply-consent">
                <input type="checkbox" checked={consented} onChange={event => setConsented(event.target.checked)}/>
                <span><a href="/#privacy" target="_blank" rel="noreferrer">個人情報の取り扱い</a>と<a href="/#terms" target="_blank" rel="noreferrer">利用・キャンセル条件</a>を確認し、入力内容をLINEへ渡してトークの入力欄にセットすることに同意します。</span>
              </label>
              {!consented && <p className="apply-status" role="note">LINEへ進むには、上記への同意が必要です。</p>}
              <div className="apply-review-actions">
                {consented ? (
                  <a className="button line apply-submit" href={lineUrl}>LINEトークで内容を確認する <span aria-hidden="true">↗</span></a>
                ) : (
                  <button className="button line apply-submit" type="button" disabled>同意してLINEへ進む</button>
                )}
                <button className="apply-edit" type="button" onClick={back}>回答を編集する</button>
              </div>
              <p className="apply-footnote">入力内容はRemexのサーバーやD1には保存されません。LINEトークで送信する前に、内容を確認・編集できます。</p>
            </section>
          ) : (
            <form
              className="apply-question"
              aria-labelledby="question-title"
              key={step}
              noValidate
              onSubmit={event => {
                event.preventDefault();
                next();
              }}
            >
              <p className="apply-question-label">{questions[step].label}<span className={step === 2 ? 'is-optional' : 'is-required'}>{step === 2 ? '任意' : '必須'}</span></p>
              <h2 id="question-title">{questions[step].title}</h2>

              {step === 0 && (
                <label className="apply-field" htmlFor="apply-place">
                  <span className="sr-only">場所</span>
                  <input id="apply-place" name="place" required autoComplete="off" maxLength={160} placeholder="住所、駅名、店舗名、URLなど" value={draft.place} aria-invalid={Boolean(error)} aria-describedby={error ? 'apply-error' : undefined} onChange={event => update('place', event.target.value)}/>
                </label>
              )}

              {step === 1 && (
                <label className="apply-field" htmlFor="apply-purpose">
                  <span className="sr-only">相談内容</span>
                  <select id="apply-purpose" name="purpose" required value={draft.purpose} aria-invalid={Boolean(error)} aria-describedby={error ? 'apply-error' : undefined} onChange={event => update('purpose', event.target.value)}>
                    <option value="">選択してください</option>
                    <option>引っ越し候補地の確認</option>
                    <option>店舗・物件の現地確認</option>
                    <option>イベント・展示の代理体験</option>
                    <option>商品・展示品の確認</option>
                    <option>閉店前・取り壊し前の記録</option>
                    <option>その他</option>
                  </select>
                </label>
              )}

              {step === 2 && (
                <label className="apply-field" htmlFor="apply-plan">
                  <span className="sr-only">希望プラン</span>
                  <select id="apply-plan" name="plan" value={draft.plan} onChange={event => update('plan', event.target.value)}>
                    <option value="">相談して決めたい</option>
                    <option>30分（現地作業 ¥6,600）</option>
                    <option>60分（現地作業 ¥9,900）</option>
                    <option>90分（現地作業 ¥13,200）</option>
                  </select>
                  <small>{draft.plan ? '別途、往復交通費などがかかる場合があります。' : 'プランは選ばなくても次へ進めます。'} <a href="/pricing" target="_blank" rel="noreferrer">料金の詳細</a></small>
                </label>
              )}

              {step === 3 && (
                <label className="apply-field" htmlFor="apply-details">
                  <span className="sr-only">詳細な内容</span>
                  <textarea id="apply-details" name="details" required rows={4} maxLength={600} placeholder="見たい場所や気になる点、当日の事情などを教えてください" value={draft.details} aria-invalid={Boolean(error)} aria-describedby={error ? 'apply-error apply-date-note' : 'apply-date-note'} onChange={event => update('details', event.target.value)}/>
                  <small id="apply-date-note">開催日時が固定されたイベントなどは、その日時を記入してください。運営者の予定などにより、その日時に対応できない場合があります。</small>
                  <small className="apply-counter">{draft.details.length} / 600</small>
                </label>
              )}

              {error && <p id="apply-error" className="apply-status is-error" role="alert">{error}</p>}
              <div className="apply-question-actions">
                <button className="apply-back" type="button" onClick={back} disabled={step === 0}><span aria-hidden="true">←</span> 戻る</button>
                <button className="button line apply-next" type="submit">
                  {step === 3 ? '内容を確認する' : '次へ'} <span aria-hidden="true">→</span>
                </button>
              </div>
              {step === 3 && <p className="apply-footnote">次の画面で申請文と同意事項を確認します。LINEで送信するまでは、相談内容はRemexへ届きません。</p>}
            </form>
          )}
        </div>

        <footer className="apply-footer">
          <a href="/">Remex ホーム</a>
          <a href="/pricing">料金案内</a>
          <a href="/#privacy">個人情報の取り扱い</a>
        </footer>
      </section>
    </main>
  );
}
