import {useSyncExternalStore} from 'react';

export type Locale = 'ja' | 'en';
const STORAGE_KEY = 'remex-locale';
const listeners = new Set<() => void>();
const isLocale = (value: string | null): value is Locale => value === 'ja' || value === 'en';
let selectedLocale: Locale | undefined;

function readStoredLocale(): Locale | undefined {
  try {
    const value = typeof window === 'undefined' ? null : window.localStorage.getItem(STORAGE_KEY);
    return isLocale(value) ? value : undefined;
  } catch { return undefined; }
}

function queryLocale(search: string): Locale | undefined {
  const params = new URLSearchParams(search);
  const direct = params.get('lang');
  if (isLocale(direct)) return direct;
  const state = params.get('liff.state');
  if (state) {
    const candidates = [state];
    try { const decoded = decodeURIComponent(state); if (decoded !== state) candidates.push(decoded); } catch { /* malformed state is ignored */ }
    for (const candidate of candidates) {
      const queryAt = candidate.indexOf('?');
      const fragmentAt = candidate.indexOf('#');
      const query = queryAt >= 0 ? candidate.slice(queryAt + 1, fragmentAt >= 0 ? fragmentAt : undefined) : candidate;
      const nested = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query).get('lang');
      if (isLocale(nested)) return nested;
    }
  }
}

export function getLocale(): Locale {
  if (selectedLocale) return selectedLocale;
  const stored = readStoredLocale();
  if (stored) return stored;
  if (typeof window === 'undefined') return 'ja';
  const fromQuery = queryLocale(window.location.search);
  if (fromQuery) return fromQuery;
  return /^\/en(?:\/|$)/.test(window.location.pathname) ? 'en' : 'ja';
}

export function setLocale(locale: Locale): void {
  selectedLocale = locale;
  try { window.localStorage.setItem(STORAGE_KEY, locale); } catch { /* private browsing or storage disabled */ }
  listeners.forEach(listener => listener());
}

export function subscribeLocale(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribeLocale, getLocale, () => 'ja');
}

export function text(ja: string, en: string): string {
  return getLocale() === 'en' ? en : ja;
}

// Kept for source compatibility; newly generated internal links are locale-neutral.
export function localeHref(path: string, _locale: Locale = getLocale()): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path) || path.startsWith('#')) return path;
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const beforeHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = beforeHash.indexOf('?');
  let pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : '';
  if (!pathname) pathname = '/';
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  pathname = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return `${pathname}${query}${hash}`;
}
