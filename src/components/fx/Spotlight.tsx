import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';

/** Magenta/gold light that follows the pointer (desktop only). */
export function Spotlight() {
  const x = useSpring(useMotionValue(0.5), { stiffness: 60, damping: 20 });
  const y = useSpring(useMotionValue(0.2), { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  const background = useMotionTemplate`radial-gradient(480px circle at calc(${x} * 100%) calc(${y} * 100%), rgba(240,98,184,0.12), rgba(231,195,93,0.05) 40%, transparent 70%)`;

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-[5] hidden mix-blend-screen lg:block"
    />
  );
}

/** Thin gold → pink rail that fills as the visitor scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-gold-500 via-gold-200 to-rose-400 shadow-[0_0_14px_rgba(240,98,184,0.8)]"
    />
  );
}
