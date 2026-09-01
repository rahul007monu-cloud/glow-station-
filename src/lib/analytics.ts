/**
 * Marketing + analytics layer.
 *
 * Nothing loads unless the matching id is present in `.env`, so the site stays
 * fast and privacy-friendly until the owner actually starts running ads.
 *
 *   VITE_META_PIXEL_ID=1234567890
 *   VITE_GA_ID=G-XXXXXXX
 */

type MetaStandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Schedule'
  | 'Contact'
  | 'Subscribe'
  | 'CompleteRegistration'
  | 'Purchase';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const UTM_KEY = 'gs_attribution';

let pixelReady = false;

/** Loads the Meta Pixel exactly once. */
export function initMetaPixel() {
  if (pixelReady || !PIXEL_ID || typeof window === 'undefined') return;

  /* eslint-disable */
  const f = window as Window;
  if (!f.fbq) {
    const n: any = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue!.push(args);
    };
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    f.fbq = n;
    f._fbq = n;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }
  /* eslint-enable */

  window.fbq?.('init', PIXEL_ID);
  window.fbq?.('track', 'PageView');
  pixelReady = true;
}

/** Loads Google Analytics 4 exactly once (optional). */
export function initGA() {
  if (!GA_ID || typeof window === 'undefined' || window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: true });
}

/**
 * Fires a Meta standard event (for ad optimisation) and mirrors it to GA4.
 * `eventId` lets you de-duplicate against a future Conversions API setup.
 */
export function track(event: MetaStandardEvent, params: Params = {}) {
  const payload = { ...attribution(), ...params };
  window.fbq?.('track', event, payload, { eventID: `${event}-${Date.now()}` });
  window.gtag?.('event', event, payload);
  if (import.meta.env.DEV) console.info('[track]', event, payload);
}

/** Fires a non-standard event, useful for funnel debugging. */
export function trackCustom(name: string, params: Params = {}) {
  const payload = { ...attribution(), ...params };
  window.fbq?.('trackCustom', name, payload);
  window.gtag?.('event', name, payload);
  if (import.meta.env.DEV) console.info('[trackCustom]', name, payload);
}

export function trackPageView(path: string) {
  window.fbq?.('track', 'PageView');
  window.gtag?.('event', 'page_view', { page_path: path });
}

export type Attribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  /** Meta click id — proves the lead came from a paid ad. */
  fbclid?: string;
  landedAt?: string;
};

/**
 * Captures UTM/fbclid params on the very first page load and keeps them for the
 * whole visit, so every booking can be traced back to the ad that paid for it.
 */
export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  const url = new URL(window.location.href);
  const q = url.searchParams;
  const fresh: Attribution = {
    source: q.get('utm_source') ?? undefined,
    medium: q.get('utm_medium') ?? undefined,
    campaign: q.get('utm_campaign') ?? undefined,
    content: q.get('utm_content') ?? undefined,
    term: q.get('utm_term') ?? undefined,
    fbclid: q.get('fbclid') ?? undefined,
  };

  const hasNew = Object.values(fresh).some(Boolean);
  const stored = attribution();

  if (hasNew || !stored.landedAt) {
    const next: Attribution = {
      ...(hasNew ? fresh : stored),
      landedAt: stored.landedAt ?? new Date().toISOString(),
    };
    try {
      localStorage.setItem(UTM_KEY, JSON.stringify(next));
    } catch {
      /* storage disabled — tracking is best-effort only */
    }
    return next;
  }
  return stored;
}

export function attribution(): Attribution {
  try {
    return JSON.parse(localStorage.getItem(UTM_KEY) ?? '{}') as Attribution;
  } catch {
    return {};
  }
}

/** Human-readable one-liner appended to WhatsApp leads. */
export function attributionLabel(): string {
  const a = attribution();
  if (a.campaign || a.source) {
    return [a.source, a.medium, a.campaign].filter(Boolean).join(' / ');
  }
  return a.fbclid ? 'meta-ad' : 'organic';
}
