import assert from 'node:assert/strict';
import test from 'node:test';
import {getLocale, localeHref, setLocale, text} from './i18n';

type MockLocation = Pick<Location, 'pathname' | 'search'>;

function withLocation(location: MockLocation, run: () => void): void {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {location},
  });

  try {
    run();
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'window', descriptor);
    else Reflect.deleteProperty(globalThis, 'window');
  }
}

test('getLocale selects English routes and keeps Japanese routes as the default', () => {
  for (const pathname of ['/en', '/en/pricing', '/en/apply']) {
    withLocation({pathname, search: ''}, () => assert.equal(getLocale(), 'en'));
  }

  for (const pathname of ['/', '/pricing', '/apply']) {
    withLocation({pathname, search: ''}, () => assert.equal(getLocale(), 'ja'));
  }
});

test('a direct lang query takes precedence over the route locale', () => {
  withLocation({pathname: '/en/pricing', search: '?lang=ja'}, () => assert.equal(getLocale(), 'ja'));
  withLocation({pathname: '/pricing', search: '?lang=en'}, () => assert.equal(getLocale(), 'en'));
  withLocation({pathname: '/en', search: '?lang=fr'}, () => assert.equal(getLocale(), 'en'));
});

test('LIFF state query can select English, while malformed state safely falls back', () => {
  withLocation({pathname: '/apply', search: '?liff.state=%2Fen%2Fapply%3Flang%3Den'}, () => {
    assert.equal(getLocale(), 'en');
  });
  withLocation({pathname: '/apply', search: '?liff.state=not-a-valid-state%ZZ'}, () => {
    assert.equal(getLocale(), 'ja');
  });
});

test('text follows the locale selected from the current URL', () => {
  withLocation({pathname: '/', search: ''}, () => assert.equal(text('こんにちは', 'Hello'), 'こんにちは'));
  withLocation({pathname: '/en', search: ''}, () => assert.equal(text('こんにちは', 'Hello'), 'Hello'));
});

test('localeHref preserves external links and anchors while keeping internal routes language-neutral', () => {
  assert.equal(localeHref('https://example.com/pricing', 'en'), 'https://example.com/pricing');
  assert.equal(localeHref('//example.com/pricing', 'en'), '//example.com/pricing');
  assert.equal(localeHref('#terms', 'en'), '#terms');
  assert.equal(localeHref('/pricing', 'en'), '/pricing');
  assert.equal(localeHref('/#terms', 'en'), '/#terms');
  assert.equal(localeHref('/en', 'en'), '/');
  assert.equal(localeHref('/en/apply?source=nav#form', 'en'), '/apply?source=nav#form');
  assert.equal(localeHref('/en/pricing', 'ja'), '/pricing');
});



test('an explicit selection is persisted and wins over URL fallbacks without navigation', () => {
  let stored: string | null = null;
  const location = {pathname: '/pricing', search: '?lang=ja'};
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {location, localStorage: {getItem: () => stored, setItem: (_key: string, value: string) => { stored = value; }}},
  });
  try {
    setLocale('en');
    assert.equal(stored, 'en');
    assert.equal(getLocale(), 'en');
    assert.deepEqual(location, {pathname: '/pricing', search: '?lang=ja'});
    setLocale('ja');
    assert.equal(getLocale(), 'ja');
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'window', descriptor);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
