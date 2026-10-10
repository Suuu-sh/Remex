export type Locale = 'ja' | 'en';

const isLocale = (value: string | null): value is Locale => value === 'ja' || value === 'en';

function queryLocale(search: string): Locale | undefined {
  const params = new URLSearchParams(search);
  const direct = params.get('lang');
  if (isLocale(direct)) return direct;

  // LIFF may carry the original query string inside liff.state after its primary redirect.
  // Read it only; the app intentionally does not rewrite the URL or interact with LIFF tokens.
  const state = params.get('liff.state');
  if (state) {
    const candidates = [state];
    try {
      const decoded = decodeURIComponent(state);
      if (decoded !== state) candidates.push(decoded);
    } catch { /* malformed state is ignored */ }
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
  if (typeof window === 'undefined') return 'ja';
  const fromQuery = queryLocale(window.location.search);
  if (fromQuery) return fromQuery;
  return /^\/en(?:\/|$)/.test(window.location.pathname) ? 'en' : 'ja';
}

export function useLocale(): Locale {
  return getLocale();
}

export function text(ja: string, en: string): string {
  return getLocale() === 'en' ? en : ja;
}

export function localeHref(path: string, locale: Locale = getLocale()): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path) || path.startsWith('#')) return path;
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = withoutHash.indexOf('?');
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : '';
  let pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  if (!pathname) pathname = '/';
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  pathname = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  return `${locale === 'en' ? '/en' : ''}${pathname === '/' && locale === 'en' ? '' : pathname}${query}${hash}` || '/';
}
