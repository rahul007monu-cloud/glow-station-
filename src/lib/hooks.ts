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

/*
 * The browser fires `beforeinstallprompt` once, often before React mounts.
 * Capture it at module load and share it with every component that wants an
 * "Install app" button (banner, menu, rewards card).
 */
let deferredPrompt: BeforeInstallPromptEvent | null = null;
let appInstalled = false;
const installListeners = new Set<() => void>();
const notifyInstall = () => installListeners.forEach((fn) => fn());

if (typeof window !== 'undefined') {
  appInstalled =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    // iOS Safari home-screen apps
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    notifyInstall();
  });
  window.addEventListener('appinstalled', () => {
    appInstalled = true;
    deferredPrompt = null;
    notifyInstall();
  });
}

/**
 * Native "Add to Home Screen" support. On iOS Safari there is no event, so we
 * fall back to showing manual instructions.
 */
export function useInstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(deferredPrompt);
  const [installed, setInstalled] = useState(appInstalled);

  useEffect(() => {
    const sync = () => {
      setEvent(deferredPrompt);
      setInstalled(appInstalled);
    };
    sync();
    installListeners.add(sync);
    return () => {
      installListeners.delete(sync);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!event) return 'unavailable' as const;
    await event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === 'accepted') appInstalled = true;
    deferredPrompt = null;
    notifyInstall();
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
