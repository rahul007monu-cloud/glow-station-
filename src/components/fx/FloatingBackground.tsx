import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Blob = {
  size: number;
  top: string;
  left: string;
  hue: string;
  delay: number;
  duration: number;
};

const BLOBS: Blob[] = [
  { size: 420, top: '-8%', left: '-6%', hue: 'rgba(169,125,255,0.35)', delay: 0, duration: 18 },
  { size: 320, top: '18%', left: '78%', hue: 'rgba(241,119,165,0.32)', delay: 1.4, duration: 22 },
  { size: 260, top: '58%', left: '4%', hue: 'rgba(223,177,52,0.28)', delay: 0.8, duration: 26 },
  { size: 380, top: '72%', left: '62%', hue: 'rgba(139,92,246,0.22)', delay: 2.1, duration: 20 },
];

/**
 * The signature "floating" layer: soft drifting orbs, twinkling dust and a
 * slow-rotating gold ring. Purely decorative, so it is hidden from a11y tools
 * and it stops animating when the user prefers reduced motion (CSS handles it).
 */
export default function FloatingBackground() {
  const dust = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 1 + ((i * 7) % 3),
        delay: (i % 9) * 0.4,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle at 30% 30%, ${blob.hue}, transparent 70%)`,
          }}
          animate={{
            y: [0, -38, 12, 0],
            x: [0, 22, -18, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Slow gold ring behind the hero */}
      <div className="absolute left-1/2 top-[8%] h-[46rem] w-[46rem] -translate-x-1/2 animate-spin-slow rounded-full border border-gold-300/10">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-200/70 blur-[1px]" />
      </div>

      {/* Floating dust */}
      {dust.map((d) => (
        <span
          key={d.id}
          className="absolute animate-twinkle rounded-full bg-gold-100"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      {/* Vignette keeps text readable over the animation */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_35%,rgba(11,7,16,0.85)_100%)]" />
    </div>
  );
}
