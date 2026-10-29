import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { asset } from '@/data/salon';
import { useIsNarrow, useIsTouch } from '@/lib/device';

type Item = { id: string; label: string; tag: string; src?: string };

/**
 * True 3D carousel: photos sit on the surface of a cylinder that rotates in
 * perspective. It spins on its own, follows a drag on desktop, and resumes.
 */
export default function PhotoRing({ items, radius = 420 }: { items: Item[]; radius?: number }) {
  const rotate = useMotionValue(0);
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const narrow = useIsNarrow();
  const spin = useRef<ReturnType<typeof animate> | null>(null);
  const step = 360 / items.length;
  /* Smaller cylinder on phones so the front card never fills the screen. */
  const r = narrow ? Math.round(radius * 0.5) : radius;

  const startSpin = () => {
    if (reduced) return;
    spin.current?.stop();
    spin.current = animate(rotate, rotate.get() - 360, {
      duration: 40,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
  };

  useEffect(() => {
    startSpin();
    return () => spin.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <div
      className={`relative h-[22rem] w-full select-none overflow-hidden sm:h-[28rem] ${touch ? '' : 'cursor-grab active:cursor-grabbing'}`}
      style={{ perspective: '1100px', touchAction: 'pan-y' }}
    >
      <motion.div
        className="preserve-3d absolute inset-0"
        /* Push the cylinder back by its radius so the front card renders at 1:1 instead of being magnified and clipped. */
        style={{ z: -r, rotateY: rotate, rotateX: -6 }}
        drag={touch ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragStart={() => spin.current?.stop()}
        onDrag={(_, info) => rotate.set(rotate.get() + info.delta.x * 0.28)}
        onDragEnd={startSpin}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="absolute left-1/2 top-1/2 h-[12rem] w-[8.5rem] sm:h-[18rem] sm:w-[12.5rem]"
            style={{
              transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${r}px)`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <figure className="relative h-full w-full overflow-hidden rounded-2xl border border-gold-300/40 bg-ink-card shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9),0_0_30px_-12px_rgba(214,51,159,0.7)]">
              {item.src ? (
                <img src={asset(item.src)} alt={item.label} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-lilac-500/40 via-rose-500/20 to-gold-300/20" />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent px-3 pb-2.5 pt-10">
                <span className="block text-[0.55rem] uppercase tracking-[0.25em] text-gold-200">{item.tag}</span>
                <span className="block text-xs font-medium text-white">{item.label}</span>
              </figcaption>
            </figure>
          </div>
        ))}
      </motion.div>

      {/* floor glow under the ring */}
      <div className="pointer-events-none absolute inset-x-[15%] bottom-3 h-12 rounded-[100%] bg-[radial-gradient(closest-side,rgba(214,51,159,0.45),transparent)] blur-md" />
      <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[0.6rem] uppercase tracking-[0.3em] text-white/40">
        {touch ? 'Auto rotating' : 'Drag to rotate'}
      </p>
    </div>
  );
}
