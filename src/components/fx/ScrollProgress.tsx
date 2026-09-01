import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gold rail that fills as the customer walks through the salon. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-gold-700 via-gold-200 to-rose-400 shadow-[0_0_14px_rgba(231,195,93,0.8)]"
    />
  );
}
