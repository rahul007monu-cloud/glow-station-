import { motion, type Variants } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.92 },
};

type Props = PropsWithChildren<{
  delay?: number;
  from?: Direction;
  className?: string;
  /** Keeps the element floating gently after it appears. */
  float?: boolean;
}>;

/** Scroll-triggered entrance animation used across every section. */
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  className,
  float = false,
}: Props) {
  const variants: Variants = {
    hidden: { opacity: 0, filter: 'blur(6px)', ...offsets[from] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] },
    },
  };

  return (
    <motion.div
      className={[className, float ? 'animate-floaty' : ''].filter(Boolean).join(' ')}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
