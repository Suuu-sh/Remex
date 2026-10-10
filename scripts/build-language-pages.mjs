import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

const dist = join(process.cwd(), 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');
const enDescription = 'Need someone to check a place in Tokyo? Remex visits locations in Tokyo’s 23 wards and shares a basic report and an unedited first-person video when filming is permitted.';
const jaDescription = '東京23区で、気になる場所をあなたの代わりに訪ねる Remex。時間がない人、遠くて行けない人のために、基本レポートと一人称動画で現地を届けます。引っ越し先の下見から、閉店前の記録まで。';
const routes = [
  {path: '/en/', title: 'Remex — We’ll go there for you.', description: enDescription},
  {path: '/en/pricing/', title: 'Pricing — Remex', description: 'Clear pricing for on-site visits in Tokyo’s 23 wards. ¥6,600, ¥9,900, or ¥13,200, depending on visit time.'},
  {path: '/en/apply/', title: 'Request a visit on LINE — Remex', description: enDescription, noindex: true},
];

function escapeAttr(value) { return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;'); }
function meta(html, selector, attr, value) {
  const escaped = escapeAttr(value);
  return html.replace(new RegExp(`(<meta\\s+${selector}[^>]*${attr}=")[^"]*(")`, 'i'), `$1${escaped}$2`);
}
for (const route of routes) {
  let html = template.replace('<html lang="ja"', '<html lang="en"');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  html = meta(html, 'name="description"', 'content', route.description);
  html = meta(html, 'property="og:title"', 'content', route.title);
  html = meta(html, 'property="og:description"', 'content', route.description);
  html = html.replace('</head>', `<link rel="canonical" href="${route.path}"/><link rel="alternate" hreflang="ja" href="${route.path.replace(/^\/en/, '')}"/><link rel="alternate" hreflang="en" href="${route.path}"/><link rel="alternate" hreflang="x-default" href="${route.path.replace(/^\/en/, '')}"/>${route.noindex ? '<meta name="robots" content="noindex, nofollow"/>' : ''}</head>`);
  const target = join(dist, route.path.replace(/^\/|\/$/g, ''), 'index.html');
  await mkdir(target.slice(0, target.lastIndexOf('/')), {recursive: true});
  await writeFile(target, html);
}

// Add language alternates to the Japanese routes while retaining their existing copy.
const jaRoutes = [
  {path: '/', target: join(dist, 'index.html')},
  {path: '/pricing/', target: join(dist, 'pricing', 'index.html')},
  {path: '/apply/', target: join(dist, 'apply', 'index.html')},
];
for (const route of jaRoutes) {
  let html;
  try { html = await readFile(route.target, 'utf8'); } catch { html = template; }
  const enPath = `/en${route.path}`;
  const alternate = `<link rel="canonical" href="${route.path}"/><link rel="alternate" hreflang="ja" href="${route.path}"/><link rel="alternate" hreflang="en" href="${enPath}"/><link rel="alternate" hreflang="x-default" href="${route.path}"/>`;
  const updated = html.includes('rel="canonical"') ? html : html.replace('</head>', `${alternate}${route.path === '/apply/' ? '<meta name="robots" content="noindex, nofollow"/>' : ''}</head>`);
  await mkdir(route.target.slice(0, route.target.lastIndexOf('/')), {recursive: true});
  await writeFile(route.target, updated);
}
