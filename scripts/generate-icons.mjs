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
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdf8ec"/>
      <stop offset="45%" stop-color="#e7c35d"/>
      <stop offset="100%" stop-color="#a77616"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#2a1740"/>
      <stop offset="100%" stop-color="#0b0710"/>
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#glow)"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${inner * 0.42}" fill="none" stroke="url(#gold)" stroke-width="${size * 0.018}"/>
  <text x="50%" y="50%" dy="${size * 0.12}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-weight="600"
        font-size="${inner * 0.42}" fill="url(#gold)">GS</text>
  <path d="M${size * 0.74} ${size * 0.26}l${size * 0.026} ${size * 0.07} ${size * 0.07} ${size * 0.026}-${size * 0.07} ${size * 0.026}-${size * 0.026} ${size * 0.07}-${size * 0.026}-${size * 0.07}-${size * 0.07}-${size * 0.026} ${size * 0.07}-${size * 0.026}z"
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
    <radialGradient id="bg1" cx="18%" cy="12%" r="60%">
      <stop offset="0%" stop-color="#3a1c5c"/>
      <stop offset="100%" stop-color="#0b0710"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg1)"/>
  <circle cx="1000" cy="120" r="200" fill="#e14e86" opacity="0.18"/>
  <circle cx="180" cy="540" r="220" fill="#dfb134" opacity="0.14"/>
  <text x="80" y="290" font-family="Georgia, serif" font-size="96" fill="#ffffff">Glow Station</text>
  <text x="80" y="392" font-family="Georgia, serif" font-size="96" fill="url(#gold)">Luxe Salon</text>
  <text x="84" y="462" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="8" fill="#ffffff" opacity="0.65">LOOK LUXE. FEEL LUXE.</text>
  <text x="84" y="530" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#e7c35d">Hair · Skin · Nails · Makeup · Bridal</text>
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
