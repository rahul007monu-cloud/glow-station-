import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollScrubVideo from '@/components/fx/ScrollScrubVideo';
import { MEDIA, salon } from '@/data/salon';
import { useMediaExists } from '@/lib/media';

/**
 * Apple-style scroll-scrubbed film. Scroll position is the playhead on capable
 * desktops; phones get a smooth muted loop (see ScrollScrubVideo).
 *
 * Renders nothing until Diksha's own clip is uploaded to `public/media/divine.mp4`.
 */
export default function ScrollFilm() {
  const ref = useRef<HTMLElement>(null);
  const exists = useMediaExists(MEDIA.film);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const overlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.15, 0.65]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  if (exists !== 'found') return null;

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={{ scale }} className="h-full w-full">
          <ScrollScrubVideo src={MEDIA.film} progress={scrollYProgress} className="h-full w-full object-cover" />
        </motion.div>
        <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-ink" />
        <motion.div style={{ y: textY }} className="absolute inset-x-0 bottom-[12%] px-6 text-center">
          <h2 className="text-4xl sm:text-6xl">
            <span className="gold-text font-display">{salon.name}</span>{' '}
            <span className="script text-rose-300">{salon.suffix}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/85 sm:text-base">{salon.motto}</p>
        </motion.div>
      </div>
    </section>
  );
}
