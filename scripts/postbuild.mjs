/**
 * Static hosts (GitHub Pages, S3) don't know about client-side routes.
 *
 * 1. `404.html` makes any unknown deep link still boot the app.
 * 2. Real `/<route>/index.html` copies make the known routes answer with a
 *    proper HTTP 200 — important for ad landing pages and SEO.
 */
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const index = path.join(dist, 'index.html');

/** Keep in sync with the <Route> list in src/App.tsx. */
const routes = ['offer', 'admin'];

await copyFile(index, path.join(dist, '404.html'));
console.log('✓ dist/404.html (SPA fallback)');

for (const route of routes) {
  await mkdir(path.join(dist, route), { recursive: true });
  await copyFile(index, path.join(dist, route, 'index.html'));
  console.log(`✓ dist/${route}/index.html`);
}
