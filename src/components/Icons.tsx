import type {ReactNode} from 'react';
import type {IconName} from '../content';

const paths: Record<IconName, ReactNode> = {
  home: <><path d="M4 11.5 12 5l8 6.5"/><path d="M6.5 10v9h11v-9"/><path d="M10 19v-5h4v5"/></>,
  cup: <><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5Z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8.5 3.5c-.8 1 .8 2-.1 3M12 3.5c-.8 1 .8 2-.1 3"/></>,
  ticket: <><path d="M4 7.5h16v3a1.5 1.5 0 0 0 0 3v3H4v-3a1.5 1.5 0 0 0 0-3Z"/><path d="M14.5 7.5v9" strokeDasharray="1.6 1.8"/></>,
  tag: <><path d="M12.5 4H20v7.5L11.5 20 4 12.5Z"/><circle cx="16" cy="8" r="1.4"/></>,
  frame: <><rect x="4" y="4" width="16" height="16" rx="1"/><rect x="7.5" y="7.5" width="9" height="9"/><path d="m7.5 16.5 3-3.5 2 2 1.5-1.5 2.5 3"/></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></>,
};

export function Icon({name, size = 28}: {name: IconName; size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function Arrow({size = 16}: {size?: number}) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"/>
    </svg>
  );
}

export function Check({size = 14}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7"/>
    </svg>
  );
}

export function Cross({size = 14}: {size?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
      <path d="m4.5 4.5 7 7M11.5 4.5l-7 7"/>
    </svg>
  );
}
