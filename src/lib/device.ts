import { useEffect, useState } from 'react';

/**
 * Capability checks used to keep the heavy effects off phones.
 *
 * Scroll-scrubbing a video and animating large blurred layers are both fine on
 * a desktop GPU and brutal on a mid-range phone — enough to block touch
 * scrolling entirely. Everything expensive is gated behind these.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Touch-first device: no hover, coarse pointer. */
export const useIsTouch = () => useMediaQuery('(pointer: coarse)');

export const useIsNarrow = () => useMediaQuery('(max-width: 767px)');

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');

/**
 * True when the device is likely to struggle with continuous compositing:
 * few cores, little memory, data-saver on, or simply a touch device.
 */
export function useIsLowPower() {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  /* A phone-sized viewport is treated as low power even if the browser
     reports a fine pointer, which some Android browsers do. */
  const small = useMediaQuery('(max-width: 900px)');
  const [weak, setWeak] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    setWeak(cores <= 4 || memory <= 4 || nav.connection?.saveData === true);
  }, []);

  return touch || reduced || weak || small;
}
