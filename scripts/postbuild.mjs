/**
 * Static hosts (GitHub Pages, S3) do not know about client-side routes such as
 * /offer or /admin. Copying index.html to 404.html makes deep links work.
 */
import { copyFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
await copyFile(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('✓ dist/404.html written (SPA fallback)');
