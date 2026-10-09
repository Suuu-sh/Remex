import {useRef, useState, type FormEvent} from 'react';
import {formats} from '../content';
import {vars} from '../hooks';
import {Arrow, Check} from './Icons';
import LineButton, {hasLine} from './LineButton';

type Mode = 'request' | 'inquiry';
type Status = 'idle' | 'sending' | 'success' | 'error';

const fieldLabels: Record<string, string> = {
  name: 'お名前', email: 'メールアドレス', place: '行ってほしい場所', preferred: '希望の日時',
  activities: 'してほしいこと', wishes: 'お問い合わせ内容', consent: '同意',
};

function TextArea({name, label, required, max, placeholder, hint}: {name: string; label: string; required?: boolean; max: number; placeholder: string; hint?: string}) {
  const [count, setCount] = useState(0);
  return (
    <label className="field">
      <span className="field-label">{label} {required ? <b>必須</b> : <em>{hint ?? '任意'}</em>}</span>
      <textarea name={name} required={required} maxLength={max} placeholder={placeholder} onInput={e => setCount(e.currentTarget.value.length)}/>
      <span className={`counter mono${count > max * 0.9 ? ' warn' : ''}`} aria-hidden="true">{count} / {max}</span>
    </label>
  );
}

export default function RequestForm() {
  const [mode, setMode] = useState<Mode>('request');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [completion, setCompletion] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  function measure() {
    const form = formRef.current;
    if (!form) return;
    const required = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]'));
    const done = required.filter(el => (el instanceof HTMLInputElement && el.type === 'checkbox' ? el.checked : el.value.trim() !== '' && el.checkValidity()));
    setCompletion(required.length ? done.length / required.length : 0);
  }

  function switchMode(next: Mode) {
    setMode(next);
    setStatus('idle');
    setMessage('');
    setFieldErrors([]);
    requestAnimationFrame(measure);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setMessage('');
    setFieldErrors([]);
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          mode,
          name: data.get('name'),
          email: data.get('email'),
          place: data.get('place') || '',
          preferred: data.get('preferred') || '',
          activities: data.get('activities') || '',
          checkpoints: data.get('checkpoints') || '',
          formats: data.getAll('formats'),
          wishes: data.get('wishes') || '',
          consent: data.get('consent') === 'on',
          website: data.get('website') || '',
        }),
      });
      const result = await response.json() as {message?: string; fields?: Record<string, unknown>};
      if (!response.ok) {
        if (result.fields) setFieldErrors(Object.keys(result.fields).map(k => fieldLabels[k] ?? k));
        throw new Error(result.message || '送信できませんでした。');
      }
      setStatus('success');
      setMessage('ご相談を保存しました。現地訪問の確定ではありません。内容を確認し、ご入力のメールアドレスへ個別にご連絡します。');
      form.reset();
      setCompletion(0);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : '通信に失敗しました。再度お試しください。');
    }
  }

  return (
    <section id="request" className="request">
      <div className="request-inner">
        <div className="request-intro">
          <p className="eyebrow" data-reveal><span className="dot"/> LET’S GO, FOR YOU.</p>
          <h2 data-reveal>どこへ、<br/>行きましょうか。</h2>
          <p data-reveal>「こんなこと、頼める？」からで大丈夫。<br/>相談は無料です。気軽に教えてください。</p>
          <ul className="request-points" data-reveal>
            <li><Check/>相談・見積もりは無料</li>
            <li><Check/>送信だけでは予約・支払いは発生しません</li>
            <li><Check/>{hasLine ? 'やりとりも動画のお届けも、LINEで完結' : '内容を確認し、メールで個別にご連絡'}</li>
          </ul>
          <div className="request-stamp" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs><path id="stamp-circle" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs>
              <text><textPath href="#stamp-circle">TOKYO · 23 WARDS · THROUGH YOUR EYES · </textPath></text>
            </svg>
            <span><Arrow size={34}/></span>
          </div>
        </div>

        <div className="request-side">
        {hasLine && (
          <div className="line-card" data-reveal>
            <div className="line-card-head">
              <span className="mono">RECOMMENDED</span>
              <h3>LINEで、そのまま相談。</h3>
              <p>友だち追加すると、相談のテンプレートが届きます。見積もりのご案内も、撮影した動画のお届けも、同じトークで行います。</p>
            </div>
            <ol className="line-steps">
              <li><b>1</b>友だち追加</li>
              <li><b>2</b>テンプレートに沿って送信</li>
              <li><b>3</b>見積もり・期限を確認。着金後に予約確定</li>
              <li><b>4</b>動画と写真をLINEでお届け</li>
            </ol>
            <LineButton/>
            <p className="line-card-note">長い動画は画質を保つため、共有リンクでお送りする場合があります。</p>
          </div>
        )}
        {hasLine && <p className="form-divider" data-reveal><span>LINEを使っていない方は、フォームから</span></p>}
        <div className="form-card" data-reveal>
          {status === 'success' ? (
            <div className="form-success" role="status">
              <span className="success-mark"><Check size={30}/></span>
              <h3>ありがとうございます。</h3>
              <p>{message}</p>
              <button type="button" className="button ghost" onClick={() => switchMode(mode)}>別の相談を送る</button>
            </div>
          ) : (
            <>
              <div className="form-head">
                <div className="form-tabs" role="group" aria-label="相談の種類" style={vars({'--index': mode === 'request' ? 0 : 1})}>
                  <span className="form-tabs-thumb" aria-hidden="true"/>
                  <button type="button" aria-pressed={mode === 'request'} onClick={() => switchMode('request')}>訪問の相談</button>
                  <button type="button" aria-pressed={mode === 'inquiry'} onClick={() => switchMode('inquiry')}>お問い合わせ</button>
                </div>
                <div className="form-meter" aria-hidden="true">
                  <span className="mono">{Math.round(completion * 100)}%</span>
                  <i style={vars({'--c': completion})}/>
                </div>
              </div>
              <form ref={formRef} onSubmit={submit} onInput={measure} onChange={measure}>
                <div className="field-row">
                  <label className="field">
                    <span className="field-label">お名前 <b>必須</b></span>
                    <input name="name" autoComplete="name" required maxLength={200} placeholder="山田 花子"/>
                  </label>
                  <label className="field">
                    <span className="field-label">メールアドレス <b>必須</b></span>
                    <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/>
                  </label>
                </div>
                {mode === 'request' && (
                  <>
                    <div className="field-row">
                      <label className="field">
                        <span className="field-label">行ってほしい場所 <b>必須</b></span>
                        <input name="place" required maxLength={500} placeholder="例：清澄白河駅周辺、気になるお店"/>
                      </label>
                      <label className="field">
                        <span className="field-label">希望の日時 <b>必須</b></span>
                        <input name="preferred" required maxLength={200} placeholder="例：10月20日 午後 / 平日なら調整可能"/>
                      </label>
                    </div>
                    <TextArea name="activities" label="してほしいこと" required max={2000} placeholder="例：駅から引っ越し候補の家まで歩いてほしい"/>
                    <TextArea name="checkpoints" label="特に確認したいポイント" max={2000} placeholder="例：道の明るさ、坂道、周辺のお店"/>
                    <fieldset className="field">
                      <legend className="field-label">希望のお届け方法 <em>任意・複数選択可</em></legend>
                      <div className="chips">
                        {formats.map(f => (
                          <label key={f} className="chip">
                            <input type="checkbox" name="formats" value={f}/>
                            <span><Check size={12}/>{f}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </>
                )}
                <TextArea
                  name="wishes"
                  label={mode === 'request' ? 'その他のご希望' : 'お問い合わせ内容'}
                  required={mode === 'inquiry'}
                  max={2000}
                  placeholder="相談したいことを自由にお書きください"
                />
                <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
                <p className="privacy">お名前・メールアドレス・相談内容は、お問い合わせへの回答や訪問の調整に利用します。受信日から180日を経過した相談データは削除します。<a href="#privacy">個人情報の取り扱い</a>をご確認ください。</p>
                <label className="consent">
                  <input name="consent" type="checkbox" required/>
                  <span><a href="#privacy">個人情報の取り扱い</a>、<a href="#terms">利用・キャンセル条件</a>、<a href="#tokusho">特定商取引法に基づく表記</a>、<a href="#service">サービス内容</a>・<a href="#safety">禁止事項</a>を確認し、同意します。</span>
                </label>
                <button className="button submit" disabled={status === 'sending'}>
                  {status === 'sending' ? <><span className="spinner" aria-hidden="true"/>送信しています…</> : <>この内容で相談する <Arrow/></>}
                </button>
                <p className="micro">送信だけでは、予約・お支払いは発生しません。</p>
                {status === 'error' && message && (
                  <div role="alert" className="feedback error">
                    {message}
                    {fieldErrors.length > 0 && <small>確認が必要な項目：{fieldErrors.join('、')}</small>}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
