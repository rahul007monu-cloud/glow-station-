import { useEffect, useState } from 'react';

export const asset = (path: string) =>
  /^(https?:)?\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/**
 * Checks whether an optional media file was actually uploaded.
 *
 * The salon's video sections are opt-in: nothing renders (and nothing is
 * downloaded) until `public/media/hero.mp4` exists, so the site never shows a
 * broken player while we wait for footage.
 */
export function useMediaExists(path: string) {
  const [state, setState] = useState<'checking' | 'found' | 'missing'>('checking');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(asset(path), { method: 'HEAD' });
        const type = res.headers.get('content-type') ?? '';
        // A SPA host answers 404s with index.html, so verify it is really media.
        const ok = res.ok && !type.includes('text/html');
        if (!cancelled) setState(ok ? 'found' : 'missing');
      } catch {
        if (!cancelled) setState('missing');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}
