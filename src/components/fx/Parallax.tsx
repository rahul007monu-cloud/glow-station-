import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { type PropsWithChildren, useRef } from 'react';

type Props = PropsWithChildren<{
  /** Pixels the element drifts across the whole scroll pass. Higher = faster. */
  speed?: number;
  /** Subtle rotation in degrees for a "hanging in air" feel. */
  tilt?: number;
  /** Scale from -> to as it passes through the viewport. */
  zoom?: boolean;
  className?: string;
}>;

/**
 * Scroll-linked floating. Unlike a one-shot entrance animation, this keeps
 * moving the whole time the element is on screen, so the page feels like the
 * cards are suspended in the room while you walk past them.
 */
export default function Parallax({
  children,
  speed = 60,
  tilt = 0,
  zoom = false,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const y = useTransform(smooth, [0, 1], [speed, -speed]);
  const rotate = useTransform(smooth, [0, 1], [tilt, -tilt]);
  const scale = useTransform(smooth, [0, 0.5, 1], zoom ? [0.96, 1.02, 0.96] : [1, 1, 1]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, rotate, scale }} className={className}>
      {children}
    </motion.div>
  );
}
