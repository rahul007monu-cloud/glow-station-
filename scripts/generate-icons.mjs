/**
 * Generates every PWA / social icon from one inline SVG so the repo never
 * carries binary art that can drift out of sync with the brand.
 *
 *   npm run icons
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.resolve('public/icons');
const publicDir = path.resolve('public');

const monogram = (size, { padding = 0 } = {}) => {
  const inner = size - padding * 2;
  const c = size / 2;
  const r = inner * 0.42;
  // Open ring (gap at the bottom) like the official Divine Touch logo.
  const a0 = (135 * Math.PI) / 180;
  const a1 = (45 * Math.PI) / 180;
  const ring = `M${c + r * Math.cos(a0)} ${c + r * Math.sin(a0)} A${r} ${r} 0 1 1 ${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdf8ec"/>
      <stop offset="45%" stop-color="#e7c35d"/>
      <stop offset="100%" stop-color="#a77616"/>
    </linearGradient>
    <linearGradient id="pink" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f3d7dc"/>
      <stop offset="100%" stop-color="#d68fa0"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#43201d"/>
      <stop offset="60%" stop-color="#211a17"/>
      <stop offset="100%" stop-color="#0b0908"/>
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#glow)"/>
  <path d="${ring}" fill="none" stroke="url(#gold)" stroke-width="${size * 0.02}" stroke-linecap="round"/>
  <text x="${c - inner * 0.08}" y="${c + inner * 0.12}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-weight="600"
        font-size="${inner * 0.4}" fill="url(#gold)">D</text>
  <text x="${c + inner * 0.13}" y="${c + inner * 0.18}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-style="italic"
        font-size="${inner * 0.36}" fill="url(#pink)">T</text>
  <path d="M${size * 0.72} ${size * 0.2}l${size * 0.024} ${size * 0.062} ${size * 0.062} ${size * 0.024}-${size * 0.062} ${size * 0.024}-${size * 0.024} ${size * 0.062}-${size * 0.024}-${size * 0.062}-${size * 0.062}-${size * 0.024} ${size * 0.062}-${size * 0.024}z"
        fill="#fdf8ec" opacity="0.92"/>
</svg>`;
};

const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fdf8ec"/>
      <stop offset="50%" stop-color="#e7c35d"/>
      <stop offset="100%" stop-color="#a77616"/>
    </linearGradient>
    <linearGradient id="pink" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f3d7dc"/>
      <stop offset="100%" stop-color="#d68fa0"/>
    </linearGradient>
    <radialGradient id="bg1" cx="20%" cy="15%" r="75%">
      <stop offset="0%" stop-color="#43201d"/>
      <stop offset="100%" stop-color="#0b0908"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg1)"/>
  <circle cx="1020" cy="110" r="230" fill="#b9677a" opacity="0.25"/>
  <circle cx="160" cy="560" r="220" fill="#dfb134" opacity="0.12"/>
  <circle cx="930" cy="330" r="190" fill="none" stroke="url(#gold)" stroke-width="4" opacity="0.8"/>
  <text x="930" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="url(#gold)">10% OFF</text>
  <text x="930" y="350" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="4" fill="#ffffff" opacity="0.75">FIRST SERVICE</text>
  <text x="930" y="400" text-anchor="middle" font-family="Courier New, monospace" font-size="26" letter-spacing="6" fill="#f8ecc9">DIVINE10</text>
  <text x="80" y="250" font-family="Georgia, serif" font-size="110" fill="url(#gold)">Divine</text>
  <text x="90" y="360" font-family="Georgia, serif" font-style="italic" font-size="110" fill="url(#pink)">Touch</text>
  <text x="86" y="420" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="8" fill="#e7c35d">BY DIKSHA GUPTA</text>
  <text x="86" y="480" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="6" fill="#ffffff" opacity="0.65">WHERE BEAUTY MEETS PERFECTION</text>
  <text x="86" y="545" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#e8b8c2">Makeup · Facials · Waxing · Hair · Massages — at your home</text>
</svg>`;

const targets = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'maskable-512.png', size: 512, padding: 64 },
];

await mkdir(outDir, { recursive: true });

for (const t of targets) {
  const svg = Buffer.from(monogram(t.size, { padding: t.padding ?? 0 }));
  await sharp(svg).png().toFile(path.join(outDir, t.name));
  console.log('✓', t.name);
}

await sharp(Buffer.from(cover)).png().toFile(path.join(outDir, 'og-cover.png'));
console.log('✓ og-cover.png');

await writeFile(path.join(publicDir, 'favicon.svg'), monogram(64), 'utf8');
console.log('✓ favicon.svg');
