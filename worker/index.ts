export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

const LINE_URL = 'https://lin.ee/ZvrRtXZ';
const REQUEST_RETENTION_DAYS = 180;
const DAY_MS = 24 * 60 * 60 * 1000;
const jsonHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {status, headers: jsonHeaders});
}

async function handleApi(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '/api/health' && request.method === 'GET') return json({ok: true});
  if (url.pathname === '/api/requests') {
    if (request.method !== 'POST') return json({message: 'この操作は利用できません。'}, 405);
    return json({
      message: 'フォームでの新規受付は終了しました。Remex公式LINEアカウントからお問い合わせください。',
      lineUrl: LINE_URL,
    }, 410);
  }
  return json({message: '見つかりませんでした。'}, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname.startsWith('/api/')) return handleApi(request);
    return env.ASSETS.fetch(request);
  },
  async scheduled(controller: ScheduledController, env: Env): Promise<void> {
    const cutoff = new Date(controller.scheduledTime - REQUEST_RETENTION_DAYS * DAY_MS).toISOString();
    await env.DB.prepare('DELETE FROM requests WHERE created_at < ?').bind(cutoff).run();
  },
} satisfies ExportedHandler<Env>;
