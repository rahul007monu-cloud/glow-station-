import { useCallback, useEffect, useState } from 'react';

/** Re-renders whenever any `write()`/`remove()` touches localStorage. */
export function useStoredValue<T>(reader: () => T): [T, () => void] {
  const [value, setValue] = useState<T>(reader);
  const refresh = useCallback(() => setValue(reader()), [reader]);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener('gs:storage', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('gs:storage', handler);
      window.removeEventListener('storage', handler);
    };
  }, [refresh]);

  return [value, refresh];
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

/**
 * Native "Add to Home Screen" support. On iOS Safari there is no event, so we
 * fall back to showing manual instructions.
 */
export function useInstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setEvent(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) setInstalled(true);

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!event) return 'unavailable' as const;
    await event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setEvent(null);
    return outcome;
  }, [event]);

  const isIOS =
    typeof navigator !== 'undefined' &&
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !/crios|fxios/i.test(navigator.userAgent);

  return { canInstall: Boolean(event), installed, promptInstall, isIOS };
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}

/** Locks body scroll while a modal/sheet is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

export function useOnlineStatus() {
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);
  return online;
}

/** Counts down to an ISO date — used by the offer urgency timer. */
export function useCountdown(targetISO: string) {
  const [remaining, setRemaining] = useState(() => diff(targetISO));
  useEffect(() => {
    const t = setInterval(() => setRemaining(diff(targetISO)), 1000);
    return () => clearInterval(t);
  }, [targetISO]);
  return remaining;
}

function diff(targetISO: string) {
  const ms = Math.max(0, new Date(targetISO).getTime() - Date.now());
  return {
    total: ms,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}
