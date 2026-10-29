import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/context/BookingProvider';
import { asset, categories, formatINR, story } from '@/data/salon';
import { useIsNarrow } from '@/lib/device';

/**
 * Scroll-driven story: the section is pinned and each scene owns a slice of the
 * scroll. As a scene arrives its photo swings in on a 3D hinge, the headline
 * rises, and then the scene's service options open one by one, each with its
 * price and a quick-add button. Scrolling on swings it away and the next opens.
 */
export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.0005 });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative"
      style={{ height: `${story.length * 110}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {story.map((scene, i) => (
          <Scene key={scene.id} scene={scene} index={i} total={story.length} progress={p} />
        ))}

        {/* progress rail */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
          {story.map((s, i) => (
            <Dot key={s.id} index={i} total={story.length} progress={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Scene({
  scene,
  index,
  total,
  progress,
}: {
  scene: (typeof story)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { openBooking } = useBooking();
  const narrow = useIsNarrow();
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  /* Visible for exactly its own slice; the next scene starts as this one ends. */
  const opacity = useTransform(
    progress,
    [isFirst ? -1 : start, isFirst ? 0 : start + span * 0.12, isLast ? 2 : end - span * 0.12, isLast ? 3 : end],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
  );
  /* Photo swings in on a vertical hinge, then out the other side. */
  const rotateY = useTransform(progress, [start, start + span * 0.3, end - span * 0.25, end], [isFirst ? 0 : -55, 0, 0, isLast ? 0 : 55]);
  const z = useTransform(progress, [start, start + span * 0.3, end - span * 0.25, end], [isFirst ? 0 : -300, 0, 0, isLast ? 0 : -300]);
  const imgScale = useTransform(progress, [start, end], [1.15, 1]);
  const titleY = useTransform(progress, [start, start + span * 0.3], [isFirst ? 0 : 60, 0]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? 'auto' : 'none'));

  const items = scene.categoryIds.flatMap((id) => categories.find((c) => c.id === id)?.items ?? []);
  const shown = items.slice(0, narrow ? 3 : 5);

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className="absolute inset-0 grid grid-cols-1 grid-rows-[auto_1fr] items-center gap-4 px-5 pb-28 pt-24 sm:px-8 lg:grid-cols-2 lg:grid-rows-1 lg:gap-12 lg:pb-16 lg:pt-20"
    >
      {/* 3D photo */}
      <div className="scene order-1 mx-auto w-full max-w-[15rem] sm:max-w-sm lg:order-2 lg:max-w-md">
        <motion.figure
          style={{ rotateY, z }}
          className="preserve-3d relative aspect-[16/10] w-full sm:aspect-[4/3] lg:aspect-[4/5]"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-gold-400/50 via-rose-500/40 to-lilac-500/50 blur-xl" />
          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-gold-300/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
            <motion.img
              style={{ scale: imgScale }}
              src={asset(scene.photo)}
              alt={`${scene.title} ${scene.script}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 font-mono text-xs tracking-[0.3em] text-gold-100">
              0{index + 1} / 0{total}
            </span>
          </div>
        </motion.figure>
      </div>

      {/* copy + options */}
      <div className="order-2 mx-auto w-full min-w-0 max-w-xl self-start lg:order-1 lg:self-center lg:pl-[max(0rem,calc((100vw-72rem)/2))]">
        <motion.h3 style={{ y: titleY }} className="text-[2.1rem] leading-none sm:text-6xl">
          <span className="font-display text-white">{scene.title}</span>{' '}
          <span className="script text-[1.15em] text-rose-300">{scene.script}</span>
        </motion.h3>
        <p className="mt-2 max-w-md text-sm text-white/65 sm:mt-3 sm:text-base">{scene.line}</p>

        <ul className="mt-4 space-y-2 sm:mt-5">
          {shown.map((item, k) => (
            <Option
              key={item.id}
              item={item}
              index={k}
              count={shown.length}
              start={start + span * 0.18}
              end={start + span * 0.7}
              progress={progress}
              onAdd={() => openBooking({ serviceIds: [item.id], from: `story-${scene.id}` })}
            />
          ))}
        </ul>

        <Button
          size="sm"
          className="mt-4 sm:mt-5"
          onClick={() => openBooking({ from: `story-${scene.id}-all` })}
        >
          Book now
        </Button>
      </div>
    </motion.div>
  );
}

/** One service row that slides open from the left as its turn in the scroll comes. */
function Option({
  item,
  index,
  count,
  start,
  end,
  progress,
  onAdd,
}: {
  item: { id: string; name: string; price: number; minutes: number; popular?: boolean };
  index: number;
  count: number;
  start: number;
  end: number;
  progress: MotionValue<number>;
  onAdd: () => void;
}) {
  const step = (end - start) / count;
  const a = start + index * step;
  const b = a + step;
  const opacity = useTransform(progress, [a, b], [0, 1]);
  const x = useTransform(progress, [a, b], [-40, 0]);
  const rotateX = useTransform(progress, [a, b], [-70, 0]);
  const width = useTransform(progress, [a, b], ['0%', '100%']);

  return (
    <motion.li style={{ opacity, x, rotateX }} className="origin-top [perspective:600px]">
      <button
        onClick={onAdd}
        className="group relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-left backdrop-blur transition hover:border-gold-300/50 hover:bg-gold-300/10"
      >
        <motion.span style={{ width }} className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-gold-300 to-rose-400" />
        <span className="min-w-0">
          <span className="block truncate text-sm text-white">
            {item.name}
            {item.popular && <span className="ml-2 text-[0.6rem] uppercase tracking-wider text-gold-300">★ Bestseller</span>}
          </span>
          <span className="text-xs text-white/45">{item.minutes} min</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="font-display text-lg text-gold-100">{formatINR(item.price)}</span>
          <span className="rounded-full border border-gold-300/40 p-1 text-gold-200 transition group-hover:bg-gold-300 group-hover:text-ink">
            <Plus size={12} className="group-active:hidden" />
            <Check size={12} className="hidden group-active:block" />
          </span>
        </span>
      </button>
    </motion.li>
  );
}

function Dot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start - 0.02, start, end, end + 0.02], [0.3, 1, 1, 0.3]);
  const width = useTransform(progress, [start - 0.02, start, end, end + 0.02], [8, 30, 30, 8]);
  return <motion.span style={{ opacity, width }} className="h-1.5 rounded-full bg-gradient-to-r from-gold-300 to-rose-400" aria-hidden />;
}
