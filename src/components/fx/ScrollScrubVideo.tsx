import { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { asset } from '@/lib/media';
import { useIsLowPower } from '@/lib/device';

type Props = {
  src: string;
  poster?: string;
  /** 0 → 1 progress that drives the playhead in scrub mode. */
  progress: MotionValue<number>;
  className?: string;
};

/**
 * Salon footage that the scroll position scrubs — on hardware that can take it.
 *
 * Seeking an MP4 costs a decode, so doing it on every scroll tick pegs the main
 * thread; on a phone that freezes touch scrolling outright. Guards:
 *
 *  1. Low-power / touch / reduced-motion devices never scrub. They get a plain
 *     muted autoplay loop, which the browser decodes off the main thread.
 *  2. In scrub mode we allow one seek at a time (waiting for `seeked`) and
 *     ignore movements smaller than a frame, so seeks can never pile up.
 *  3. If metadata never arrives or the file errors, it falls back to the loop.
 */
export default function ScrollScrubVideo({ src, poster, progress, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lowPower = useIsLowPower();
  const [mode, setMode] = useState<'scrub' | 'loop'>(lowPower ? 'loop' : 'scrub');

  const seeking = useRef(false);
  const pending = useRef<number | null>(null);

  useEffect(() => {
    if (lowPower) setMode('loop');
  }, [lowPower]);

  /* Loop mode: just play it. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mode !== 'loop') return;
    video.loop = true;
    video.play().catch(() => {
      /* autoplay blocked — the poster frame stays, which is fine */
    });
  }, [mode]);

  /* Metadata guard: no duration means we cannot scrub. */
  useEffect(() => {
    if (mode !== 'scrub') return;
    const video = videoRef.current;
    if (!video) return;
    const guard = setTimeout(() => {
      if (!Number.isFinite(video.duration) || video.duration === 0) setMode('loop');
    }, 3000);
    return () => clearTimeout(guard);
  }, [mode]);

  /* Scrub mode: one in-flight seek at a time. */
  useEffect(() => {
    if (mode !== 'scrub') return;
    const video = videoRef.current;
    if (!video) return;

    const step = () => {
      if (pending.current === null || seeking.current) return;
      const target = pending.current;
      pending.current = null;
      if (!Number.isFinite(video.duration) || video.duration === 0) return;
      const time = Math.min(video.duration - 0.05, Math.max(0, video.duration * target));
      // Ignore sub-frame moves; they cost a decode and change nothing visible.
      if (Math.abs(time - video.currentTime) < 1 / 24) return;
      seeking.current = true;
      video.currentTime = time;
    };

    const onSeeked = () => {
      seeking.current = false;
      step();
    };

    video.addEventListener('seeked', onSeeked);
    const unsubscribe = progress.on('change', (p) => {
      pending.current = p;
      step();
    });

    return () => {
      video.removeEventListener('seeked', onSeeked);
      unsubscribe();
    };
  }, [mode, progress]);

  return (
    <video
      ref={videoRef}
      className={`pointer-events-none ${className}`}
      src={asset(src)}
      poster={poster ? asset(poster) : undefined}
      muted
      playsInline
      loop={mode === 'loop'}
      autoPlay={mode === 'loop'}
      preload={mode === 'scrub' ? 'auto' : 'metadata'}
      disablePictureInPicture
      onLoadedMetadata={(e) => {
        if (mode !== 'scrub') return;
        const video = e.currentTarget;
        // iOS only unlocks seeking after a play() has been attempted.
        video
          .play()
          .then(() => video.pause())
          .catch(() => {});
      }}
      onError={() => setMode('loop')}
    />
  );
}
