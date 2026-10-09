import express from 'express';
import path from 'node:path';

const LINE_URL = 'https://lin.ee/ZvrRtXZ';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
  app.get('/api/health', (_req, res) => res.json({ok: true}));
  app.all('/api/requests', (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({message: 'この操作は利用できません。'});
      return;
    }
    res.status(410).json({
      message: 'フォームでの新規受付は終了しました。Remex公式LINEアカウントからお問い合わせください。',
      lineUrl: LINE_URL,
    });
  });
  app.use(express.static(path.resolve('dist'), {index: 'index.html'}));
  return app;
}
