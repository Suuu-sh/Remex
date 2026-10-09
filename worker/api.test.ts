import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker, {type Env} from './index';

const validRequest = {
  mode: 'request',
  name: 'テスト利用者',
  email: 'test@example.com',
  place: '東京駅周辺',
  preferred: '平日午後',
  activities: '駅から候補地まで歩いて確認',
  checkpoints: '道の明るさ',
  formats: ['写真'],
  wishes: '',
  consent: true,
  website: '',
};

function createEnv(options: {allowRequest?: boolean} = {}) {
  const inserts: unknown[][] = [];
  const deletes: {sql: string; values: unknown[]}[] = [];
  const env = {
    DB: {prepare: (sql: string) => ({
      bind: (...values: unknown[]) => ({run: async () => {
        if (sql.trimStart().startsWith('INSERT')) inserts.push(values);
        if (sql.trimStart().startsWith('DELETE')) deletes.push({sql: sql.trim(), values});
        return {success: true};
      }}),
    })},
    REQUEST_LIMITER: {limit: async () => ({success: options.allowRequest ?? true})},
    ASSETS: {fetch: async () => new Response('asset')},
  } as unknown as Env;
  return {env, inserts, deletes};
}

function post(body: unknown, extraHeaders: Record<string, string> = {}) {
  return new Request('https://remex.example/api/requests', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Origin: 'https://remex.example', ...extraHeaders},
    body: JSON.stringify(body),
  });
}

test('Worker stores a validated request in D1', async () => {
  const {env, inserts} = createEnv();
  const response = await worker.fetch(post(validRequest), env);
  assert.equal(response.status, 201);
  assert.ok((await response.json() as {id: string}).id);
  assert.equal(inserts.length, 1);
  assert.equal(inserts[0][2], 'request');
  assert.equal(inserts[0][3], 'テスト利用者');
});

test('Worker rejects invalid, cross-origin, oversized, and rate-limited requests', async () => {
  const {env, inserts} = createEnv();
  assert.equal((await worker.fetch(post({...validRequest, consent: false}), env)).status, 400);
  assert.equal((await worker.fetch(post(validRequest, {Origin: 'https://other.example'}), env)).status, 403);
  assert.equal((await worker.fetch(post(validRequest, {'Content-Length': '20001'}), env)).status, 413);
  assert.equal((await worker.fetch(post({...validRequest, wishes: 'x'.repeat(20_000)}), env)).status, 413);
  const throttled = createEnv({allowRequest: false});
  assert.equal((await worker.fetch(post(validRequest), throttled.env)).status, 429);
  assert.equal(inserts.length, 0);
});

test('Worker routes health checks and static assets', async () => {
  const {env} = createEnv();
  const health = await worker.fetch(new Request('https://remex.example/api/health'), env);
  assert.deepEqual(await health.json(), {ok: true});
  const page = await worker.fetch(new Request('https://remex.example/'), env);
  assert.equal(await page.text(), 'asset');
});

test('scheduled cleanup deletes requests older than 180 days', async () => {
  const {env, deletes} = createEnv();
  const scheduledTime = Date.parse('2026-10-08T18:00:00.000Z');
  await worker.scheduled({scheduledTime} as ScheduledController, env);
  assert.equal(deletes.length, 1);
  assert.equal(deletes[0].sql, 'DELETE FROM requests WHERE created_at < ?');
  assert.equal(deletes[0].values[0], new Date(scheduledTime - 180 * 24 * 60 * 60 * 1000).toISOString());
});

test('Worker pushes a LINE notice only when LINE secrets are configured', async () => {
  const calls: {url: string; init: RequestInit}[] = [];
  const warnings: string[] = [];
  const infos: string[] = [];
  const realFetch = globalThis.fetch;
  const realWarn = console.warn;
  const realInfo = console.info;
  console.warn = (message?: unknown) => { warnings.push(String(message)); };
  console.info = (message?: unknown) => { infos.push(String(message)); };
  globalThis.fetch = (async (url: string, init: RequestInit) => { calls.push({url, init}); return new Response('{}'); }) as typeof fetch;
  try {
    const {env} = createEnv();
    assert.equal((await worker.fetch(post(validRequest), env)).status, 201);
    assert.equal(calls.length, 0);
    assert.match(warnings[0], /"event":"line_notification_skipped"/);
    assert.match(warnings[0], /"tokenConfigured":false/);
    assert.match(warnings[0], /"recipientConfigured":false/);

    Object.assign(env, {LINE_CHANNEL_ACCESS_TOKEN: 'token', LINE_ADMIN_USER_ID: 'U123'});
    assert.equal((await worker.fetch(post(validRequest), env)).status, 201);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://api.line.me/v2/bot/message/push');
    const body = JSON.parse(String(calls[0].init.body));
    assert.equal(body.to, 'U123');
    assert.match(body.messages[0].text, /東京駅周辺/);
    assert.match(infos[0], /"event":"line_notification_accepted"/);

    globalThis.fetch = (async () => { throw new Error('network'); }) as typeof fetch;
    assert.equal((await worker.fetch(post(validRequest), env)).status, 201);
    assert.match(warnings[1], /"reason":"network_error"/);

    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({url: String(url), init: init ?? {}});
      return String(url).endsWith('/validate/push')
        ? new Response('{}')
        : new Response(JSON.stringify({message: "Couldn't send the message"}), {status: 400});
    }) as typeof fetch;
    assert.equal((await worker.fetch(post(validRequest), env)).status, 201);
    assert.match(warnings[2], /"status":400/);
    assert.match(warnings[2], /"reason":"recipient_invalid"/);
    assert.equal(calls[1].url, 'https://api.line.me/v2/bot/message/push');
    assert.equal(calls[2].url, 'https://api.line.me/v2/bot/message/validate/push');
  } finally {
    globalThis.fetch = realFetch;
    console.warn = realWarn;
    console.info = realInfo;
  }
});
