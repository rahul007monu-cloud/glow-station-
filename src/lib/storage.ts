/** Tiny typed wrapper around localStorage that never throws. */

export const KEYS = {
  bookings: 'gs_bookings',
  loyalty: 'gs_loyalty',
  referral: 'gs_referral',
  welcomeSeen: 'gs_welcome_seen',
  installDismissed: 'gs_install_dismissed',
  favourites: 'gs_favourites',
  profile: 'gs_profile',
} as const;

export function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Let other components in this tab react to the change too.
    window.dispatchEvent(new CustomEvent('gs:storage', { detail: { key } }));
  } catch {
    /* private mode / quota exceeded — feature degrades silently */
  }
}

export function remove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent('gs:storage', { detail: { key } }));
  } catch {
    /* ignore */
  }
}
