import { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { asset } from '@/lib/media';

type Props = {
  src: string;
  poster?: string;
  /** 0 → 1 progress that drives the playhead. */
  progress: MotionValue<number>;
  className?: string;
};

/**
 * Scroll *is* the playhead.
 *
 * The clip never plays on its own — every scroll tick seeks the video, so the
 * visitor walks through the salon at their own pace (the effect used in product
 * launch pages).
 *
 * Two safety nets, because video seeking is the flakiest thing on mobile:
 *  1. iOS refuses to seek until the element has been played once, so we do a
 *     silent play/pause on load.
 *  2. If the browser cannot seek smoothly (or metadata never arrives) we fall
 *     back to a normal muted loop instead of showing a frozen frame.
 */
export default function ScrollScrubVideo({ src, poster, progress, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<'scrub' | 'loop'>('scrub');
  const frame = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    /* Give the browser a moment; if metadata never lands, just loop it. */
    const guard = setTimeout(() => {
      if (!Number.isFinite(video.duration) || video.duration === 0) {
        setMode('loop');
        video.loop = true;
        video.play().catch(() => {});
      }
    }, 3500);

    return () => clearTimeout(guard);
  }, []);

  useEffect(() => {
    if (mode !== 'scrub') return;

    const unsubscribe = progress.on('change', (p) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration === 0) return;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const clamped = Math.min(Math.max(p, 0), 1);
        video.currentTime = Math.min(video.duration - 0.04, video.duration * clamped);
      });
    });

    return () => {
      cancelAnimationFrame(frame.current);
      unsubscribe();
    };
  }, [mode, progress]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={asset(src)}
      poster={poster ? asset(poster) : undefined}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      onLoadedMetadata={(e) => {
        const video = e.currentTarget;
        // iOS unlocks seeking only after a play() has happened.
        video
          .play()
          .then(() => {
            if (mode === 'scrub') video.pause();
          })
          .catch(() => {
            // Autoplay blocked — scrubbing still works from a user scroll.
          });
      }}
      onError={() => setMode('loop')}
    />
  );
}
