import { useEffect, useState } from 'react';
import { asset } from '@/data/salon';

/**
 * Checks whether an optional media file was actually uploaded, so video
 * sections stay hidden (and download nothing) until the file exists.
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
