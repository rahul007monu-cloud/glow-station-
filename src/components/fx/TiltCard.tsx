import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { type PropsWithChildren, useRef } from 'react';

type Props = PropsWithChildren<{ className?: string; intensity?: number }>;

/**
 * Pointer-following 3D tilt with a moving light sheen. Adds the "floating in
 * space" feel to service and package cards without any images.
 */
export default function TiltCard({ children, className = '', intensity = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 20 });
  const ry = useSpring(0, { stiffness: 220, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const sheen = useMotionTemplate`radial-gradient(280px circle at ${gx}% ${gy}%, rgba(255,255,255,0.13), transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <div className="perspective">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={`relative overflow-hidden ${className}`}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: sheen }}
        />
        {children}
      </motion.div>
    </div>
  );
}
