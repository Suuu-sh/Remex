import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

// Locale selection is client-side and does not create separate /en pages.
// Keep static route documents for direct access to the pricing page and the noindex LINE form.
const dist = join(process.cwd(), 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');
const siteOrigin = 'https://remex-site.suuu-sh.workers.dev';
const routes = [
  {path: '/pricing/', title: '料金案内 — Remex'},
  {path: '/apply/', title: '事前相談フォーム — Remex', noindex: true},
];

for (const route of routes) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  const target = join(dist, route.path.replace(/^\//, ''), 'index.html');
  const metadata = `<link rel="canonical" href="${siteOrigin}${route.path}"/>${route.noindex ? '<meta name="robots" content="noindex, nofollow"/>' : ''}`;
  if (!html.includes('rel="canonical"')) html = html.replace('</head>', `${metadata}</head>`);
  await mkdir(target.slice(0, target.lastIndexOf('/')), {recursive: true});
  await writeFile(target, html);
}
