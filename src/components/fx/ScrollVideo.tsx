import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { asset, useMediaExists } from '@/lib/media';
import { MEDIA } from '@/data/media';

/**
 * Apple-style scroll-scrubbed video: the clip does not play on its own — the
 * scroll position *is* the playhead, so the salon footage moves frame by frame
 * as the visitor scrolls.
 *
 * Renders nothing until the owner uploads `public/media/hero.mp4`.
 */
export default function ScrollVideo({
  heading,
  sub,
}: {
  heading: string;
  sub?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const exists = useMediaExists(MEDIA.hero);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const overlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.15, 0.6]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  /* Drive the playhead from scroll, throttled to animation frames. */
  useEffect(() => {
    if (exists !== 'found') return;
    let frame = 0;
    const unsubscribe = scrollYProgress.on('change', (p) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const video = videoRef.current;
        if (!video || !Number.isFinite(video.duration)) return;
        video.currentTime = Math.min(video.duration - 0.05, video.duration * p);
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [exists, scrollYProgress]);

  if (exists !== 'found') return null;

  return (
    <section ref={wrapRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.video
          ref={videoRef}
          style={{ scale }}
          className="h-full w-full object-cover"
          src={asset(MEDIA.hero)}
          muted
          playsInline
          preload="auto"
          /* iOS needs a play()/pause() cycle before seeking works reliably. */
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.play()
              .then(() => v.pause())
              .catch(() => {});
          }}
        />
        <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-ink" />

        <motion.div
          style={{ y: textY }}
          className="absolute inset-x-0 bottom-[12%] px-6 text-center"
        >
          <h2 className="sign-letters text-3xl sm:text-5xl">{heading}</h2>
          {sub && (
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/85 sm:text-base">{sub}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
