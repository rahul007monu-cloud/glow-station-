import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import SmartImage from '@/components/ui/SmartImage';

type Item = { id: string; label: string; tag: string; src?: string; stock: string };

/**
 * A true 3D carousel: the photos are arranged on the surface of a cylinder and
 * the whole ring rotates in perspective. It spins on its own, follows the drag,
 * and picks the spin back up afterwards.
 */
export default function PhotoRing({ items, radius = 420 }: { items: Item[]; radius?: number }) {
  const rotate = useMotionValue(0);
  const reduced = useReducedMotion();
  const spin = useRef<ReturnType<typeof animate> | null>(null);
  const step = 360 / items.length;

  /** Continuous slow rotation, restarted from wherever the drag left off. */
  const startSpin = () => {
    if (reduced) return;
    spin.current?.stop();
    spin.current = animate(rotate, rotate.get() - 360, {
      duration: 46,
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
      className="relative h-[22rem] w-full cursor-grab select-none active:cursor-grabbing sm:h-[26rem]"
      style={{ perspective: '1100px' }}
    >
      <motion.div
        className="preserve-3d absolute inset-0"
        style={{ rotateY: rotate, transformStyle: 'preserve-3d' }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragStart={() => spin.current?.stop()}
        onDrag={(_, info) => rotate.set(rotate.get() + info.delta.x * 0.28)}
        onDragEnd={startSpin}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="absolute left-1/2 top-1/2 h-[15rem] w-[10.5rem] sm:h-[18rem] sm:w-[12.5rem]"
            style={{
              transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <figure className="gold-frame group h-full w-full overflow-hidden rounded-xl bg-ivory-50">
              <SmartImage
                src={item.src}
                fallbackSrc={item.stock}
                alt={item.label}
                className="h-full w-full object-cover"
                fallback={<PhotoPlaceholder label={item.label} hint={item.tag} />}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-3 pb-2.5 pt-8">
                <span className="block text-[0.55rem] uppercase tracking-[0.25em] text-gold-200">
                  {item.tag}
                </span>
                <span className="block text-xs font-medium text-white">{item.label}</span>
              </figcaption>
            </figure>
          </div>
        ))}
      </motion.div>

      {/* floor reflection under the ring */}
      <div className="pointer-events-none absolute inset-x-[18%] bottom-2 h-10 rounded-[100%] bg-[radial-gradient(closest-side,rgba(32,37,43,0.22),transparent)] blur-md" />

      <p className="pointer-events-none absolute inset-x-0 -bottom-1 text-center text-[0.6rem] uppercase tracking-[0.3em] text-ink-muted">
        Drag to rotate
      </p>
    </div>
  );
}
