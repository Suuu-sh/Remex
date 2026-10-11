import {useEffect, useState} from 'react';
import {localeHref, text, useLocale} from '../i18n';
import {buildPreApplicationMessage, createOfficialAccountDraftUrl, type PreApplicationDraft} from '../preApplication';
import LanguageSwitch from './LanguageSwitch';

const LINE_BASIC_ID = '@034laqhf';
const initialDraft: PreApplicationDraft = {place: '', purpose: '', plan: '', details: ''};
const purposes = [
  ['move', '引っ越し候補地の確認', 'Check a potential neighborhood for a move'],
  ['property', '店舗・物件の現地確認', 'Check a shop or property in person'],
  ['event', 'イベント・展示の代理体験', 'Attend an event or exhibition on my behalf'],
  ['product', '商品・展示品の確認', 'Check a product or displayed item'],
  ['record', '閉店前・取り壊し前の記録', 'Document a place before it closes or is demolished'],
  ['other', 'その他', 'Other'],
] as const;

export default function PreApplicationPage() {
  const locale = useLocale();
  const en = locale === 'en';
  const questions = en ? [
    {label: 'Place', title: 'What location would you like us to check?'},
    {label: 'Purpose', title: 'What would you like us to do?'},
    {label: 'Preferred plan', title: 'Do you have a preferred plan?'},
    {label: 'Details', title: 'What would you like us to check?'},
  ] : [
    {label: '場所', title: 'どこを確認しますか？'},
    {label: '相談内容', title: 'どんなことを相談しますか？'},
    {label: '希望プラン', title: '希望プランはありますか？'},
    {label: '詳細な内容', title: '確認したいことを教えてください。'},
  ];
  const [draft, setDraft] = useState<PreApplicationDraft>(initialDraft);
  const [step, setStep] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [consented, setConsented] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setError(''); setConsented(false); }, [locale]);

  useEffect(() => {
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
      setError(text('場所を入力してください。', 'Please enter a location.'));
      return;
    }
    if (step === 1 && !draft.purpose.trim()) {
      setError(text('相談内容を選択してください。', 'Please select a purpose.'));
      return;
    }
    if (step === 3) {
      if (!draft.details.trim()) {
        setError(text('詳細な内容を入力してください。', 'Please enter the details.'));
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

  const message = buildPreApplicationMessage(draft, locale);
  const lineUrl = createOfficialAccountDraftUrl(LINE_BASIC_ID, message);
  const progress = showReview ? 100 : ((step + 1) / questions.length) * 100;

  return (
    <main className={`apply-page${showReview ? ' is-review' : ''}`}>
      <header className="apply-header">
        <a className="apply-brand" href={localeHref('/')} aria-label={text('Remex ホーム', 'Remex home')}>Remex<span>.</span></a>
        <span className="mono">LINE / PRE-APPLICATION</span>
        <LanguageSwitch />
      </header>

      <section className="apply-main" aria-labelledby="apply-title">
        <div className="apply-intro">
          <p className="eyebrow"><span className="dot"/> {text('BEFORE WE VISIT', 'BEFORE WE VISIT')}</p>
          <h1 id="apply-title">{text('現地へ行く前に、', 'Before we visit,')}<br/>{text('希望を教えてください。', 'tell us what you need.')}</h1>
          <p className="apply-lead">{text('場所と確認したいことを送るだけで大丈夫です。内容を確認して、対応可否・料金・日程をLINEでご案内します。', 'Just tell us the location and what you would like checked. We will review your request and follow up on LINE about availability, pricing, and scheduling.')}</p>

          <div className="apply-notice" role="note">
            <strong>{text('これは事前相談です', 'This is an inquiry, not a booking')}</strong>
            <p>{text('フォーム送信だけでは予約・依頼は確定しません。内容と見積もりに合意いただき、入金確認後に予約が確定します。', 'Submitting this form does not confirm a booking or request. A booking is confirmed after you agree to the details and estimate and we confirm receipt of payment.')}</p>
          </div>
        </div>

        <div className="apply-form" aria-label={text('事前相談フォーム', 'Pre-application form')}>
          <div className="apply-progress-head">
            <span className="mono apply-step">{showReview ? 'FINAL REVIEW' : `${en ? 'QUESTION' : 'QUESTION'} / 0${step + 1}`}</span>
            <span className="apply-progress-count">{showReview ? text('確認', 'Review') : `${step + 1} / ${questions.length}`}</span>
          </div>
          <div className="apply-progress-track" role="progressbar" aria-label={text('入力の進行状況', 'Form progress')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{width: `${progress}%`}}/>
          </div>

          {showReview ? (
            <section className="apply-question apply-review" aria-labelledby="review-title">
              <p className="apply-question-label">{text('送信内容', 'Your message')}<span className="is-required">{text('必須', 'Required')}</span></p>
              <h2 id="review-title">{text('送信前に内容を確認してください。', 'Review your message before continuing.')}</h2>
              <div className="apply-field">
                <pre className="apply-message-preview" tabIndex={0} aria-label={text('LINEに入力される申請文', 'Message to be drafted in LINE')}>{message}</pre>
                <label className="apply-consent">
                  <input type="checkbox" checked={consented} onChange={event => setConsented(event.target.checked)}/>
                  <span><a href={localeHref('/#privacy')} target="_blank" rel="noreferrer">{text('個人情報の取り扱い', 'Privacy information')}</a>{text('と', ' and ')}<a href={localeHref('/#terms')} target="_blank" rel="noreferrer">{text('利用・キャンセル条件', 'service and cancellation terms')}</a>{text('を確認し、入力内容をLINEへ渡してトークの入力欄にセットすることに同意します。', ' and agree that my entries will be passed to LINE and placed in the chat input field.')}</span>
                </label>
              </div>
              <div className="apply-question-actions">
                <button className="apply-back" type="button" onClick={back}><span aria-hidden="true">←</span> {text('編集する', 'Edit')}</button>
                {consented ? (
                  <a className="button line apply-next" href={lineUrl}>{text('LINEで送信へ', 'Continue to LINE')} <span aria-hidden="true">↗</span></a>
                ) : (
                  <button className="button line apply-next" type="button" disabled aria-describedby="apply-consent-note">{text('LINEで送信へ', 'Continue to LINE')} <span aria-hidden="true">↗</span></button>
                )}
              </div>
              <p id="apply-consent-note" className="apply-footnote">{consented ? text('LINEのトークが開き、申請文が入力欄に入ります。', 'LINE will open with your message in the chat input field.') : text('LINEへ進むには、上記への同意が必要です。', 'Please agree above to continue to LINE. ')}{text('LINEで送信するまでは、相談内容はRemexへ届かず、サーバーにも保存されません。', 'Your inquiry will not reach Remex or be stored on a server until you send it in LINE.')}</p>
            </section>
          ) : (
            <form
              className="apply-question"
              aria-labelledby="question-title"
              noValidate
              onSubmit={event => {
                event.preventDefault();
                next();
              }}
            >
              <p className="apply-question-label">{questions[step].label}<span className={step === 2 ? 'is-optional' : 'is-required'}>{step === 2 ? text('任意', 'Optional') : text('必須', 'Required')}</span></p>
              <h2 id="question-title">{questions[step].title}</h2>

              {step === 0 && (
                <label className="apply-field" htmlFor="apply-place">
                  <span className="sr-only">{questions[step].label}</span>
                  <input id="apply-place" name="place" required autoComplete="off" maxLength={160} placeholder={text('住所、駅名、店舗名、URLなど', 'Address, station, business name, URL, etc.')} value={draft.place} aria-invalid={Boolean(error)} aria-describedby={error ? 'apply-error' : undefined} onChange={event => update('place', event.target.value)}/>
                </label>
              )}

              {step === 1 && (
                <label className="apply-field" htmlFor="apply-purpose">
                  <span className="sr-only">{questions[step].label}</span>
                  <select id="apply-purpose" name="purpose" required value={draft.purpose} aria-invalid={Boolean(error)} aria-describedby={error ? 'apply-error' : undefined} onChange={event => update('purpose', event.target.value)}>
                    <option value="">{text('選択してください', 'Select a purpose')}</option>
                    {purposes.map(([id, ja, english]) => <option key={id} value={id}>{text(ja, english)}</option>)}
                  </select>
                </label>
              )}

              {step === 2 && (
                <label className="apply-field" htmlFor="apply-plan">
                  <span className="sr-only">{questions[step].label}</span>
                  <select id="apply-plan" name="plan" value={draft.plan} onChange={event => update('plan', event.target.value)}>
                    <option value="">{text('相談して決めたい', 'I would like to discuss this')}</option>
                    <option value="30">{text('30分（現地作業 ¥6,600）', '30 minutes (on-site work ¥6,600)')}</option>
                    <option value="60">{text('60分（現地作業 ¥9,900）', '60 minutes (on-site work ¥9,900)')}</option>
                    <option value="90">{text('90分（現地作業 ¥13,200）', '90 minutes (on-site work ¥13,200)')}</option>
                  </select>
                  <small>{draft.plan ? text('別途、往復交通費などがかかる場合があります。', 'Round-trip transportation and other costs may apply separately.') : text('プランは選ばなくても次へ進めます。', 'You can continue without choosing a plan.')}{' '}<a href={localeHref('/pricing')} target="_blank" rel="noreferrer">{text('料金の詳細', 'Pricing details')}</a></small>
                </label>
              )}

              {step === 3 && (
                <label className="apply-field" htmlFor="apply-details">
                  <span className="sr-only">{questions[step].label}</span>
                  <textarea id="apply-details" name="details" required rows={4} maxLength={600} placeholder={text('見たい場所や気になる点、当日の事情などを教えてください', 'Tell us what you would like to see, any points of concern, or circumstances on the day.')} value={draft.details} aria-invalid={Boolean(error)} aria-describedby={error ? 'apply-error apply-date-note' : 'apply-date-note'} onChange={event => update('details', event.target.value)}/>
                  <small id="apply-date-note">{text('開催日時が固定されたイベントなどは、その日時を記入してください。運営者の予定などにより、その日時に対応できない場合があります。', 'If the event has a fixed date and time, please include it here. We may be unable to attend at that time due to the operator’s schedule or other circumstances.')}</small>
                  <small className="apply-counter">{draft.details.length} / 600</small>
                </label>
              )}

              {error && <p id="apply-error" className="apply-status is-error" role="alert">{error}</p>}
              <div className="apply-question-actions">
                <button className="apply-back" type="button" onClick={back} disabled={step === 0}><span aria-hidden="true">←</span> {text('戻る', 'Back')}</button>
                <button className="button line apply-next" type="submit">{step === 3 ? text('内容を確認する', 'Review your message') : text('次へ', 'Next')} <span aria-hidden="true">→</span></button>
              </div>
              {step === 3 && <p className="apply-footnote">{text('次の画面で申請文と同意事項を確認します。LINEで送信するまでは、相談内容はRemexへ届きません。', 'On the next screen, you can review your message and consent. Your inquiry will not reach Remex until you send it in LINE.')}</p>}
            </form>
          )}
        </div>

        <footer className="apply-footer">
          <a href={localeHref('/')}>{text('Remex ホーム', 'Remex home')}</a>
          <a href={localeHref('/pricing')}>{text('料金案内', 'Pricing')}</a>
          <a href={localeHref('/#privacy')}>{text('個人情報の取り扱い', 'Privacy information')}</a>
        </footer>
      </section>
    </main>
  );
}
