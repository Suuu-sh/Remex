import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker, {type Env} from './index';

function createEnv() {
  const env = {
    ASSETS: {fetch: async () => new Response('asset')},
  } as unknown as Env;
  return {env};
}

test('Worker disables new form submissions and directs users to LINE', async () => {
  const {env} = createEnv();
  const response = await worker.fetch(new Request('https://remex.example/api/requests', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({mode: 'request', name: 'テスト利用者'}),
  }), env);
  assert.equal(response.status, 410);
  const result = await response.json() as {message: string; lineUrl: string};
  assert.match(result.message, /フォームでの新規受付は終了しました/);
  assert.equal(result.lineUrl, 'https://lin.ee/ZvrRtXZ');

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
