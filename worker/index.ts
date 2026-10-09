import {requestSchema} from '../shared/request-schema';

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  REQUEST_LIMITER: RateLimit;
  /** Messaging API channel access token (secret). Notification is skipped when unset. */
  LINE_CHANNEL_ACCESS_TOKEN?: string;
  /** Operator's LINE user ID that receives new-request notifications (secret). */
  LINE_ADMIN_USER_ID?: string;
}

type StoredRequest = {mode: 'request' | 'inquiry'; name: string; place: string; preferred: string};

/** Pushes a short new-request notice to the operator's LINE. Never throws. */
async function notifyLine(env: Env, input: StoredRequest, id: string): Promise<void> {
  if (!env.LINE_CHANNEL_ACCESS_TOKEN || !env.LINE_ADMIN_USER_ID) return;
  const lines = [
    input.mode === 'request' ? '【Remex】フォームから訪問の相談が届きました' : '【Remex】フォームからお問い合わせが届きました',
    `お名前: ${input.name}`,
    ...(input.mode === 'request' ? [`場所: ${input.place}`, `希望日時: ${input.preferred}`] : []),
    `ID: ${id}`,
  ];
  try {
    await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`},
      body: JSON.stringify({to: env.LINE_ADMIN_USER_ID, messages: [{type: 'text', text: lines.join('\n').slice(0, 1000)}]}),
    });
  } catch {
    // The request is already stored; a failed notice must not fail the submission.
  }
}

const MAX_BODY_BYTES = 20_000;
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

async function readLimitedBody(request: Request): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const {done, value} = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

async function handleApi(request: Request, env: Env, ctx?: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '/api/health' && request.method === 'GET') return json({ok: true});
  if (url.pathname !== '/api/requests') return json({message: '見つかりませんでした。'}, 404);
  if (request.method !== 'POST') return json({message: 'この操作は利用できません。'}, 405);

  const origin = request.headers.get('Origin');
  if (origin) {
    try {
      if (new URL(origin).origin !== url.origin) return json({message: '送信元を確認できませんでした。'}, 403);
    } catch {
      return json({message: '送信元を確認できませんでした。'}, 403);
    }
  }

  const limit = await env.REQUEST_LIMITER.limit({
    key: request.headers.get('CF-Connecting-IP') || 'local-development',
  });
  if (!limit.success) {
    return json({message: '送信回数が多いため、しばらく待ってからお試しください。'}, 429);
  }

  if (!request.headers.get('Content-Type')?.toLowerCase().includes('application/json')) {
    return json({message: '送信データを確認してください。'}, 415);
  }
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY_BYTES) {
    return json({message: '送信データが大きすぎます。'}, 413);
  }

  let body: unknown;
  try {
    const raw = await readLimitedBody(request);
    if (raw === null) return json({message: '送信データが大きすぎます。'}, 413);
    body = JSON.parse(raw);
  } catch {
    return json({message: '送信データを確認してください。'}, 400);
  }

  const result = requestSchema.safeParse(body);
  if (!result.success) {
    return json({message: '入力内容をご確認ください。', fields: result.error.flatten().fieldErrors}, 400);
  }
  if (result.data.website) return json({message: '送信できませんでした。'}, 400);

  const {website: _website, ...input} = result.data;
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  try {
    await env.DB.prepare(`
      INSERT INTO requests (
        id, created_at, mode, name, email, place, preferred,
        activities, checkpoints, formats_json, wishes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      createdAt,
      input.mode,
      input.name,
      input.email,
      input.place,
      input.preferred,
      input.activities,
      input.checkpoints,
      JSON.stringify(input.formats),
      input.wishes,
    ).run();
  } catch {
    return json({message: '保存できませんでした。時間をおいて再度お試しください。'}, 500);
  }

  const notice = notifyLine(env, input, id);
  if (ctx) ctx.waitUntil(notice);
  else await notice;
  return json({id, message: '受け付けました。'}, 201);
}

export default {
  async fetch(request: Request, env: Env, ctx?: ExecutionContext): Promise<Response> {
    if (new URL(request.url).pathname.startsWith('/api/')) return handleApi(request, env, ctx);
    return env.ASSETS.fetch(request);
  },
  async scheduled(controller: ScheduledController, env: Env): Promise<void> {
    const cutoff = new Date(controller.scheduledTime - REQUEST_RETENTION_DAYS * DAY_MS).toISOString();
    await env.DB.prepare('DELETE FROM requests WHERE created_at < ?').bind(cutoff).run();
  },
} satisfies ExportedHandler<Env>;
