import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker, {type Env} from './index';

function createEnv() {
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
    ASSETS: {fetch: async () => new Response('asset')},
  } as unknown as Env;
  return {env, inserts, deletes};
}

test('Worker disables new form submissions and directs users to LINE', async () => {
  const {env, inserts} = createEnv();
  const response = await worker.fetch(new Request('https://remex.example/api/requests', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({mode: 'request', name: 'テスト利用者'}),
  }), env);
  assert.equal(response.status, 410);
  const result = await response.json() as {message: string; lineUrl: string};
  assert.match(result.message, /フォームでの新規受付は終了しました/);
  assert.equal(result.lineUrl, 'https://lin.ee/ZvrRtXZ');
  assert.equal(inserts.length, 0);

  const get = await worker.fetch(new Request('https://remex.example/api/requests'), env);
  assert.equal(get.status, 405);
});

test('Worker routes health checks and static assets', async () => {
  const {env} = createEnv();
  const health = await worker.fetch(new Request('https://remex.example/api/health'), env);
  assert.deepEqual(await health.json(), {ok: true});
  const page = await worker.fetch(new Request('https://remex.example/'), env);
  assert.equal(await page.text(), 'asset');
});

test('scheduled cleanup still deletes requests older than 180 days', async () => {
  const {env, deletes} = createEnv();
  const scheduledTime = Date.parse('2026-10-08T18:00:00.000Z');
  await worker.scheduled({scheduledTime} as ScheduledController, env);
  assert.equal(deletes.length, 1);
  assert.equal(deletes[0].sql, 'DELETE FROM requests WHERE created_at < ?');
  assert.equal(deletes[0].values[0], new Date(scheduledTime - 180 * 24 * 60 * 60 * 1000).toISOString());
});
