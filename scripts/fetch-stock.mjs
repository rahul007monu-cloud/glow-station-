/**
 * Downloads the licensed placeholder photography into `public/images/stock/`
 * and optimises it for the web (1600px wide, progressive JPEG).
 *
 *   npm run stock
 *
 * All sources are CC0 / public domain (StockSnap, Wikimedia Commons) so the
 * salon can use them commercially. They are only placeholders — as soon as the
 * owner uploads `public/images/gallery-1.jpg` etc., those win automatically.
 * See docs/CREDITS.md.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('public/images/stock');

/** Wikimedia thumbnails can be requested at any width. */
const wm = (file, hash, width = 1600) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash}/${file}/${width}px-${file}`;

/** Full-size Wikimedia original (we downscale locally with sharp). */
const wmFull = (file, hash) => `https://upload.wikimedia.org/wikipedia/commons/${hash}/${file}`;
const snap = (id) => `https://cdn.stocksnap.io/img-thumbs/960w/${id}.jpg`;

const shots = [
  {
    name: 'interior-wide.jpg',
    url: wm('Interior_view_of_modern_beauty_salon.jpg', '4/4c', 1920),
    width: 1920,
  },
  { name: 'interior-2.jpg', url: wmFull('Salon_interior.jpg', '3/34'), width: 1600 },
  { name: 'hair-cut.jpg', url: wmFull('Hairdresser_cutting_hair.jpg', 'c/ce'), width: 1600 },
  {
    name: 'hair-colour.jpg',
    url: wmFull(
      'Make-up_artists_from_Iran_Jorj_Barber_Canon_Photography_Mostafa_Meraji_free_Pictures_01.jpg',
      'b/b7',
    ),
    width: 1600,
  },
  {
    name: 'makeup.jpg',
    url: wmFull(
      'Make-up_artists_from_Iran_Jorj_Barber_Canon_Photography_Mostafa_Meraji_free_Pictures_06.jpg',
      'd/d0',
    ),
    width: 1200,
  },
  {
    name: 'makeup-2.jpg',
    url: wmFull(
      'Make-up_artist_Iranian_Zeynab_Rashti_Canon_Real_Edit_Mostafa_Meraji_Persian_Women_10.jpg',
      '7/77',
    ),
    width: 1200,
  },
  { name: 'bridal.jpg', url: snap('Y72F5HF9PT'), width: 960 },
  { name: 'bridal-2.jpg', url: snap('V5JGV2EC4W'), width: 960 },
  { name: 'hair-style.jpg', url: snap('ASMG0XOU6M'), width: 960 },
  { name: 'nails.jpg', url: snap('XX356Q6EI4'), width: 960 },
  { name: 'nails-2.jpg', url: snap('OCZSBORYR9'), width: 960 },
  { name: 'facial.jpg', url: snap('LRSAT4NCLS'), width: 960 },
  { name: 'spa.jpg', url: snap('CC9TYE8VJY'), width: 960 },
  { name: 'skin.jpg', url: snap('HIZNJOUVSY'), width: 960 },
  { name: 'barber.jpg', url: snap('S7UEWWIRTD'), width: 960 },
];

await mkdir(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const shot of shots) {
  try {
    // Wikimedia rate-limits bursts, so pace the downloads.
    await sleep(1200);
    const res = await fetch(shot.url, {
      headers: { 'User-Agent': 'GlowStationSalonSite/1.0 (build script)' },
    });
    if (!res.ok) {
      console.warn('✗ skip', shot.name, res.status);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const out = path.join(OUT, shot.name);
    await sharp(buf)
      .resize({ width: shot.width ?? 1400, withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(out);
    const meta = await sharp(out).metadata();
    console.log(`✓ ${shot.name} ${meta.width}x${meta.height}`);
  } catch (err) {
    console.warn('✗ failed', shot.name, err.message);
  }
}

await writeFile(
  path.join(OUT, 'README.txt'),
  'Placeholder photography (CC0 / public domain). Replace by uploading the salon\u2019s own\nphotos to public/images/ — see public/images/README.md. Credits: docs/CREDITS.md\n',
  'utf8',
);
