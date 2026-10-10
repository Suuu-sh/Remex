import {LINE_APPLICATION_URL} from '../content';
import {Arrow} from './Icons';
import {getLocale, text} from '../i18n';

function LineMark({size = 18}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 3C6.8 3 2.5 6.4 2.5 10.7c0 3.8 3.4 7 8 7.6.6.1.7.4.6.9l-.3 1.6c-.1.5.4.9.8.6 2.7-1.6 6.6-4.3 8.3-6.7.9-1.2 1.6-2.5 1.6-4C21.5 6.4 17.2 3 12 3Z"/>
      <path fill="var(--line-ink, #06c755)" d="M7.2 8.6v4.6h2.7M11.3 8.6v4.6M13.3 13.2V8.6l3 4.6V8.6" stroke="var(--line-ink, #06c755)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Primary consultation CTA. */
export default function LineButton({label = 'LINEで事前相談する', small = false, className = ''}: {label?: string; small?: boolean; className?: string}) {
  const url = getLocale() === 'en' ? `${LINE_APPLICATION_URL}/?lang=en` : LINE_APPLICATION_URL;
  return (
    <a className={`button line${small ? ' small' : ''} ${className}`} href={url} target="_blank" rel="noopener noreferrer">
      <LineMark size={small ? 16 : 20}/>{label === 'LINEで事前相談する' && getLocale() === 'en' ? text(label, 'Request a visit on LINE') : label}<Arrow/>
    </a>
  );
}
