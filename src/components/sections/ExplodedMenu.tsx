import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import Logo from '@/components/layout/Logo';
import { useBooking } from '@/context/BookingProvider';
import { asset, categories, formatINR, salon, type ServiceCategory } from '@/data/salon';
import { useIsNarrow } from '@/lib/device';

/**
 * Exploded-view scroll sequence.
 *
 * The Divine Touch emblem starts as one stacked "deck". While the section is
 * pinned, scrolling pulls it apart in real 3D: the logo lifts towards the
 * viewer and leaves, and the nine service cards from the flyer fly out of the
 * deck onto a 3 × 3 grid, each with its photo and starting price.
 */

/* Grid slot for each card, in multiples of the card's own size. */
const GRID = [
  { x: -1.12, y: -1.08 },
  { x: 0, y: -1.08 },
  { x: 1.12, y: -1.08 },
  { x: -1.12, y: 0 },
  { x: 0, y: 0 },
  { x: 1.12, y: 0 },
  { x: -1.12, y: 1.08 },
  { x: 0, y: 1.08 },
  { x: 1.12, y: 1.08 },
];

/* Depth and tilt each card lands with, so the grid never looks flat. */
const DEPTH = [
  { z: 90, rx: 8, ry: 14 },
  { z: 160, rx: 6, ry: 0 },
  { z: 90, rx: 8, ry: -14 },
  { z: 40, rx: 0, ry: 16 },
  { z: 220, rx: 0, ry: 0 },
  { z: 40, rx: 0, ry: -16 },
  { z: 90, rx: -8, ry: 14 },
  { z: 160, rx: -6, ry: 0 },
  { z: 90, rx: -8, ry: -14 },
];

export default function ExplodedMenu() {
  const ref = useRef<HTMLElement>(null);
  const narrow = useIsNarrow();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  /* Whole stage slowly rotates, like turning a product in your hand. */
  const stageRx = useTransform(p, [0, 0.5, 1], [18, 6, 0]);
  const stageRy = useTransform(p, [0, 0.5, 1], [-22, -6, 0]);

  /* Logo badge lifts out and away. */
  const logoZ = useTransform(p, [0, 0.35], [60, 420]);
  const logoY = useTransform(p, [0, 0.35], ['0%', '-140%']);
  const logoRotate = useTransform(p, [0, 0.35], [0, -30]);
  const logoOpacity = useTransform(p, [0, 0.22, 0.36], [1, 1, 0]);

  /* Gold ring expands and fades as the deck opens. */
  const ringScale = useTransform(p, [0, 0.45], [1, 2.6]);
  const ringOpacity = useTransform(p, [0, 0.3, 0.45], [0.9, 0.5, 0]);

  const introOpacity = useTransform(p, [0, 0.08, 0.2], [1, 1, 0]);
  const outroOpacity = useTransform(p, [0.8, 0.95], [0, 1]);

  return (
    <section id="menu-3d" ref={ref} className="relative h-[280vh] sm:h-[320vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        {/* stage light */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,51,159,0.35),rgba(143,62,240,0.15)_55%,transparent)] blur-2xl" />

        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-x-0 top-24 z-40 px-6 text-center sm:top-28"
        >
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-gold-300/85">The Divine Experience</p>
          <p className="mt-2 font-display text-2xl text-white sm:text-3xl">
            Scroll karo — poora menu <span className="script text-rose-300">khul jayega</span>
          </p>
          <motion.span
            className="mt-3 inline-flex text-gold-200"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <ArrowDown size={18} />
          </motion.span>
        </motion.div>

        <div className="scene relative mt-10 h-[min(64vh,36rem)] w-[min(96vw,58rem)]">
          <motion.div
            style={{ rotateX: stageRx, rotateY: stageRy }}
            className="preserve-3d absolute inset-0"
          >
            {/* gold ring */}
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-72">
              <motion.div
                style={{ scale: ringScale, opacity: ringOpacity }}
                className="h-full w-full rounded-full border-2 border-gold-300/70 shadow-[0_0_60px_rgba(231,195,93,0.45),inset_0_0_40px_rgba(231,195,93,0.25)]"
              />
            </div>

            {categories.map((c, i) => (
              <Card
                key={c.id}
                category={c}
                index={i}
                progress={p}
                slot={GRID[i % GRID.length]}
                depth={DEPTH[i % DEPTH.length]}
                narrow={narrow}
              />
            ))}

            {/* logo badge on top of the deck */}
            <motion.div
              style={{ z: logoZ, y: logoY, rotate: logoRotate, opacity: logoOpacity }}
              className="absolute left-1/2 top-1/2 z-50 -ml-16 -mt-16 sm:-ml-20 sm:-mt-20"
            >
              <div className="rounded-full bg-ink p-2 shadow-[0_30px_80px_-10px_rgba(214,51,159,0.7)] ring-1 ring-gold-300/60">
                <Logo className="h-28 w-28 sm:h-36 sm:w-36" />
              </div>
              <p className="mt-4 whitespace-nowrap rounded-full bg-ink/80 px-4 py-1 text-center backdrop-blur">
                <span className="gold-text font-display text-2xl">{salon.name}</span>{' '}
                <span className="script text-3xl text-rose-300">{salon.suffix}</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div style={{ opacity: outroOpacity }} className="absolute inset-x-0 bottom-5 z-40 text-center">
          <a href="#services" className="chip border-gold-300/40 bg-ink/70 text-gold-100 hover:text-white">
            Saari services aur prices <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Card({
  category,
  index,
  progress,
  slot,
  depth,
  narrow,
}: {
  category: ServiceCategory;
  index: number;
  progress: MotionValue<number>;
  slot: { x: number; y: number };
  depth: { z: number; rx: number; ry: number };
  narrow: boolean;
}) {
  const { openBooking } = useBooking();
  const from = 0.14 + index * 0.035;
  const to = 0.58 + index * 0.035;

  /* In the deck every card is stacked a few px deeper than the last. */
  const stackZ = -index * 6;
  const x = useTransform(progress, [from, to], ['0%', `${slot.x * 100}%`]);
  const y = useTransform(progress, [from, to], [`${-index * 1.2}%`, `${slot.y * 100}%`]);
  const z = useTransform(progress, [0, from, to], [stackZ, stackZ + 40, narrow ? depth.z * 0.4 : depth.z]);
  const rotateX = useTransform(progress, [from, (from + to) / 2, to], [0, depth.rx * 3, depth.rx]);
  const rotateY = useTransform(progress, [from, (from + to) / 2, to], [0, depth.ry * 3 + 180, depth.ry + 360]);
  const rotateZ = useTransform(progress, [0, from, to], [(index - 4) * 4, (index - 4) * 6, 0]);
  const shine = useTransform(progress, [from, to], ['-120%', '120%']);
  const cheapest = Math.min(...category.items.map((s) => s.price));

  return (
    <motion.div
      style={{ x, y, z, rotateX, rotateY, rotate: rotateZ }}
      className="preserve-3d absolute left-1/2 top-1/2 -ml-[3.4rem] -mt-[4.4rem] h-[8.8rem] w-[6.8rem] sm:-ml-[5.6rem] sm:-mt-[4.6rem] sm:h-[9.2rem] sm:w-[11.2rem]"
    >
      <button
        onClick={() => openBooking({ from: `menu3d-${category.id}` })}
        className="backface-hidden group relative block h-full w-full overflow-hidden rounded-2xl border border-gold-300/40 bg-ink-card text-left shadow-[0_25px_60px_-20px_rgba(0,0,0,0.9),0_0_30px_-10px_rgba(214,51,159,0.6)]"
      >
        <img
          src={asset(category.photo)}
          alt={category.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        {/* light sweep as the card turns */}
        <motion.span
          style={{ x: shine }}
          className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-sm">{category.glyph}</span>
        <span className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
          <span className="block font-display text-sm leading-tight text-white sm:text-lg">{category.name}</span>
          <span className="mt-0.5 block text-[0.55rem] font-semibold uppercase tracking-wider text-gold-200 sm:text-[0.65rem]">
            from {formatINR(cheapest)}
          </span>
        </span>
      </button>
      {/* card back (seen mid-flip) */}
      <span
        className="absolute inset-0 flex items-center justify-center rounded-2xl border border-gold-300/50 bg-gradient-to-br from-lilac-500 via-rose-500 to-gold-500"
        style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
      >
        <Logo className="h-12 w-12" />
      </span>
    </motion.div>
  );
}
