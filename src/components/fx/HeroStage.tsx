import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Logo from '@/components/layout/Logo';
import { asset, salon } from '@/data/salon';

type Layer = {
  src: string;
  label: string;
  /** Position inside the stage, % of its size. */
  left: string;
  top: string;
  w: string;
  /** Depth in px — bigger = closer to the viewer, moves more. */
  z: number;
  rotate: number;
};

const layers: Layer[] = [
  { src: 'images/stock/bridal-2.jpg', label: 'Bridal makeup', left: '4%', top: '6%', w: '46%', z: -120, rotate: -8 },
  { src: 'images/stock/facial.jpg', label: 'Glow facials', left: '52%', top: '2%', w: '42%', z: 40, rotate: 7 },
  { src: 'images/stock/nails.jpg', label: 'Mani & pedi', left: '48%', top: '52%', w: '44%', z: 140, rotate: -5 },
  { src: 'images/stock/bridal.jpg', label: 'Hair styling', left: '0%', top: '50%', w: '40%', z: 80, rotate: 6 },
];

/**
 * The hero's 3D stage: photo cards hang at different depths inside one
 * perspective box. The whole box tilts towards the pointer (or sways gently on
 * phones), and on scroll the layers fly apart along Z — a parallax you can feel.
 */
export default function HeroStage({ onOfferClick }: { onOfferClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-16, 16]), { stiffness: 80, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const spread = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 90, damping: 24 });
  const emblemZ = useTransform(spread, [0, 1], [220, 420]);

  useEffect(() => {
    if (reduced) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) {
      /* Phones: slow automatic sway instead of pointer tracking. */
      let t = 0;
      let raf = 0;
      const tick = () => {
        t += 0.012;
        mx.set(Math.sin(t) * 0.6);
        my.set(Math.cos(t * 0.8) * 0.4);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }
    const move = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [mx, my, reduced]);

  return (
    <div ref={ref} className="scene relative mx-auto aspect-square w-full max-w-[30rem]">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="preserve-3d absolute inset-0">
        {/* glowing back plate */}
        <div
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(214,51,159,0.45),rgba(143,62,240,0.25)_60%,transparent)] blur-2xl"
          style={{ transform: 'translateZ(-220px)' }}
        />
        {/* rotating gold ring */}
        <div className="absolute inset-[6%]" style={{ transform: 'translateZ(-160px)' }}>
          <div className="h-full w-full animate-spin-slow rounded-full border border-dashed border-gold-300/40" />
        </div>
        <div className="absolute inset-[14%]" style={{ transform: 'translateZ(-60px) rotateX(70deg)' }}>
          <div className="h-full w-full animate-spin-slow rounded-full border-2 border-gold-300/50 shadow-[0_0_40px_rgba(231,195,93,0.5)]" />
        </div>

        {layers.map((l, i) => (
          <PhotoLayer key={l.src} layer={l} index={i} spread={spread} />
        ))}

        {/* front emblem with the flyer offer */}
        <motion.button
          onClick={onOfferClick}
          style={{ z: emblemZ }}
          className="absolute left-1/2 top-1/2 -ml-[5.5rem] -mt-[5.5rem] flex h-44 w-44 flex-col items-center justify-center rounded-full border border-gold-300/60 bg-ink/80 text-center shadow-[0_30px_80px_-10px_rgba(214,51,159,0.8)] backdrop-blur-md transition hover:shadow-glow"
          aria-label={`Book with ${salon.welcomeOffer.code}`}
        >
          <Logo className="h-11 w-11" />
          <span className="mt-1 font-display text-4xl leading-none text-gold-100">10% OFF</span>
          <span className="mt-1 text-[0.55rem] uppercase tracking-[0.25em] text-white/65">for discovering us</span>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-0.5 font-mono text-[0.6rem] tracking-[0.2em] text-gold-200">
            <Sparkles size={9} /> {salon.welcomeOffer.code}
          </span>
        </motion.button>

        {/* sparkles floating at different depths */}
        {[
          { l: '10%', t: '20%', z: 260, d: 0 },
          { l: '86%', t: '30%', z: 180, d: 0.8 },
          { l: '78%', t: '86%', z: 300, d: 1.5 },
          { l: '18%', t: '88%', z: 120, d: 2.1 },
        ].map((s) => (
          <span
            key={s.l + s.t}
            className="absolute h-2 w-2 animate-twinkle rounded-full bg-gold-100 shadow-[0_0_12px_4px_rgba(253,248,236,0.7)]"
            style={{ left: s.l, top: s.t, transform: `translateZ(${s.z}px)`, animationDelay: `${s.d}s` }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function PhotoLayer({ layer, index, spread }: { layer: Layer; index: number; spread: MotionValue<number> }) {
  const z = useTransform(spread, [0, 1], [layer.z, layer.z * 2.4 + 120]);
  const x = useTransform(spread, [0, 1], ['0%', `${(index % 2 ? 1 : -1) * 35}%`]);
  const y = useTransform(spread, [0, 1], ['0%', `${(index < 2 ? -1 : 1) * 25}%`]);

  return (
    <motion.figure
      style={{ left: layer.left, top: layer.top, width: layer.w, z, x, y, rotate: layer.rotate }}
      className="absolute aspect-[4/5]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
        className="h-full w-full overflow-hidden rounded-2xl border border-gold-300/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
      >
        <img src={asset(layer.src)} alt={layer.label} className="h-full w-full object-cover" loading="eager" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <figcaption className="absolute bottom-2 left-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-gold-100">
          {layer.label}
        </figcaption>
      </motion.div>
    </motion.figure>
  );
}
