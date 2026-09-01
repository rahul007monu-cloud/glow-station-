import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import Logo from '@/components/layout/Logo';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import SmartImage from '@/components/ui/SmartImage';
import { useBooking } from '@/context/BookingProvider';
import { categories, formatINR, salon, scenery } from '@/data/salon';

/**
 * Exploded-view scroll sequence — the product-ad effect.
 *
 * The salon's signboard starts assembled, then as you scroll every part
 * separates in real 3D: the logo badge lifts out, the gold letters rise, and
 * the five service plates fly apart. Each plate lands on its own photo panel,
 * so the board literally disassembles into the service menu.
 */

type Part = {
  /** Matches a plate on the real signboard. */
  label: string;
  categoryId: string;
  photo: { own: string; stock: string };
  /** Final resting position, in percent of the stage. */
  to: { x: number; y: number; z: number; rx: number; ry: number };
};

const parts: Part[] = [
  {
    label: 'Hair',
    categoryId: 'hair',
    photo: scenery.hair,
    to: { x: -34, y: -12, z: 130, rx: 4, ry: 16 },
  },
  {
    label: 'Skin',
    categoryId: 'skin',
    photo: scenery.skin,
    to: { x: -12, y: 14, z: 30, rx: -3, ry: 7 },
  },
  {
    label: 'Makeup',
    categoryId: 'makeup',
    photo: scenery.makeup,
    to: { x: 10, y: -16, z: 190, rx: 5, ry: -6 },
  },
  {
    label: 'Nails',
    categoryId: 'nails',
    photo: scenery.nails,
    to: { x: 30, y: 12, z: 70, rx: -4, ry: -14 },
  },
  {
    label: 'Academy',
    categoryId: 'academy',
    photo: scenery.academy,
    to: { x: 4, y: 30, z: -60, rx: 8, ry: 2 },
  },
];

export default function ExplodedBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 95, damping: 28, restDelta: 0.001 });

  /* The white board panel itself: tilts, then dissolves away. */
  const boardRy = useTransform(p, [0, 0.35, 1], [0, -12, -18]);
  const boardRx = useTransform(p, [0, 1], [0, 10]);
  const boardOpacity = useTransform(p, [0, 0.22, 0.5], [1, 0.85, 0]);
  const boardZ = useTransform(p, [0, 1], [0, -220]);

  /* Logo badge lifts out towards the viewer. */
  const logoX = useTransform(p, [0, 0.5], ['0%', '-60%']);
  const logoY = useTransform(p, [0, 0.5], ['0%', '-40%']);
  const logoZ = useTransform(p, [0, 0.5], [0, 220]);
  const logoRotate = useTransform(p, [0, 0.5], [0, -14]);

  /* Gold letters lift off the board, then clear the stage for the cards. */
  const wordY = useTransform(p, [0, 0.45], ['0%', '-80%']);
  const wordZ = useTransform(p, [0, 0.45], [0, 90]);
  const wordOpacity = useTransform(p, [0, 0.2, 0.4], [1, 1, 0]);

  /* Sub-plates peel off sideways and fade with it. */
  const subX = useTransform(p, [0, 0.45], ['0%', '70%']);
  const subY = useTransform(p, [0, 0.45], ['0%', '-70%']);
  const subOpacity = useTransform(p, [0, 0.2, 0.4], [1, 1, 0]);

  /* The badge leads the disassembly, then also steps aside. */
  const logoOpacity = useTransform(p, [0, 0.3, 0.5], [1, 1, 0]);

  const captionOpacity = useTransform(p, [0, 0.12, 0.72, 0.9], [0, 1, 1, 0]);
  const outroOpacity = useTransform(p, [0.78, 0.95], [0, 1]);

  return (
    <section id="exploded" ref={ref} className="relative h-[340vh]">
      <div className="scene sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        {/* soft studio floor */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ivory-300/80 to-transparent" />

        <div className="preserve-3d relative h-[62vh] w-[min(94%,60rem)]">
          {/* ── The board panel ─────────────────────────────── */}
          <motion.div
            style={{ rotateY: boardRy, rotateX: boardRx, z: boardZ, opacity: boardOpacity }}
            className="board absolute inset-x-0 top-1/2 mx-auto h-[46%] -translate-y-1/2"
          />

          {/* ── Logo badge ──────────────────────────────────── */}
          <motion.div
            style={{ x: logoX, y: logoY, z: logoZ, rotate: logoRotate, opacity: logoOpacity }}
            className="preserve-3d absolute left-[8%] top-1/2 z-30 -translate-y-1/2"
          >
            <div className="rounded-full bg-ivory-50 p-1.5 shadow-lift">
              <Logo className="h-20 w-20 sm:h-28 sm:w-28" />
            </div>
          </motion.div>

          {/* ── Gold channel letters ────────────────────────── */}
          <motion.div
            style={{ y: wordY, z: wordZ, opacity: wordOpacity }}
            className="absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-6 text-center"
          >
            <p className="sign-letters text-[1.6rem] leading-none sm:text-[2.6rem] lg:text-[3.2rem]">
              Glow Station
            </p>
          </motion.div>

          {/* ── LUXE SALON / HIM-HER plates ─────────────────── */}
          <motion.div
            style={{ x: subX, y: subY, opacity: subOpacity }}
            className="absolute right-[8%] top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2"
          >
            <span className="plate">Luxe Salon</span>
            <span className="plate">{salon.audience}</span>
          </motion.div>

          {/* ── Service plates → photo panels ───────────────── */}
          {parts.map((part, i) => (
            <PartPanel key={part.label} part={part} index={i} progress={p} />
          ))}
        </div>

        {/* caption */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="pointer-events-none absolute inset-x-0 top-24 text-center"
        >
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-gold-600">Exploded view</p>
          <p className="mt-1.5 font-display text-xl text-ink sm:text-2xl">
            Scroll karo — board khul kar poora menu ban jayega
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: outroOpacity }}
          className="absolute inset-x-0 bottom-10 text-center"
        >
          <a
            href="#services"
            className="chip shadow-card transition hover:border-gold-400 hover:text-ink"
          >
            Poora menu aur prices dekho <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function PartPanel({
  part,
  index,
  progress,
}: {
  part: Part;
  index: number;
  progress: MotionValue<number>;
}) {
  const { openBooking } = useBooking();
  const category = categories.find((c) => c.id === part.categoryId);
  const from = 0.12 + index * 0.045;
  const to = 0.62 + index * 0.05;

  const x = useTransform(progress, [from, to], ['0%', `${part.to.x * 3}%`]);
  const y = useTransform(progress, [from, to], ['0%', `${part.to.y * 3}%`]);
  const z = useTransform(progress, [from, to], [0, part.to.z]);
  const rotateX = useTransform(progress, [from, to], [0, part.to.rx]);
  const rotateY = useTransform(progress, [from, to], [0, part.to.ry]);

  /* The photo panel materialises behind the plate as it separates. */
  const panelOpacity = useTransform(progress, [from + 0.1, to], [0, 1]);
  const panelScale = useTransform(progress, [from + 0.1, to], [0.6, 1]);
  const cheapest = category ? Math.min(...category.items.map((s) => s.price)) : undefined;

  return (
    <motion.div
      style={{ x, y, z, rotateX, rotateY }}
      className="preserve-3d absolute left-1/2 top-1/2 z-20 -ml-[4.2rem] -mt-4 w-[8.4rem] sm:-ml-[5.4rem] sm:w-[10.8rem]"
    >
      {/* photo panel */}
      <motion.button
        onClick={() => openBooking({ from: `exploded-${part.categoryId}` })}
        style={{ opacity: panelOpacity, scale: panelScale }}
        className="group block w-full overflow-hidden rounded-xl border border-ivory-400/70 bg-ivory-50 text-left shadow-lift"
      >
        <span className="block aspect-[4/5] overflow-hidden">
          <SmartImage
            src={part.photo.own}
            fallbackSrc={part.photo.stock}
            alt={`${part.label} at ${salon.legalName}`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            fallback={<PhotoPlaceholder label={part.label} />}
          />
        </span>
        {cheapest !== undefined && (
          <span className="block px-2.5 py-2 text-[0.62rem] font-semibold uppercase tracking-wider text-ink-muted">
            from {formatINR(cheapest)}
          </span>
        )}
      </motion.button>

      {/* the plate itself, riding on top of the panel */}
      <span className="plate absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
        {part.label}
      </span>
    </motion.div>
  );
}
