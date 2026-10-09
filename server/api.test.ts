import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from './app';

test('local API rejects new website-form submissions and points to LINE', async () => {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.on('listening', resolve));
  const url = `http://127.0.0.1:${(server.address() as {port: number}).port}/api/requests`;
  const post = (body: unknown) => fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });

  try {
    const response = await post({mode: 'request', name: 'テスト'});
    assert.equal(response.status, 410);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    const result = await response.json() as {message: string; lineUrl: string};
    assert.match(result.message, /フォームでの新規受付は終了しました/);
    assert.equal(result.lineUrl, 'https://lin.ee/ZvrRtXZ');
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
