import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Warm salon-light that follows the pointer, like the spotlight above a
 * styling chair. Desktop only — touch devices skip it entirely.
 */
export default function Spotlight() {
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

  const background = useMotionTemplate`radial-gradient(420px circle at calc(${x} * 100%) calc(${y} * 100%), rgba(231,195,93,0.10), transparent 70%)`;

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-[5] hidden mix-blend-screen lg:block"
    />
  );
}
