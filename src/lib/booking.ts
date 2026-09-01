import { allServices, formatINR, salon } from '@/data/salon';
import { attribution, attributionLabel } from '@/lib/analytics';
import { KEYS, read, write } from '@/lib/storage';

export type BookingDraft = {
  serviceIds: string[];
  stylistId?: string;
  date: string; // yyyy-mm-dd
  time: string; // "4:30 PM"
  name: string;
  phone: string;
  notes: string;
  couponCode: string;
};

export type BookingRecord = BookingDraft & {
  id: string;
  createdAt: string;
  total: number;
  estimatedMinutes: number;
  serviceNames: string[];
  source: string;
  status: 'requested' | 'confirmed' | 'done' | 'cancelled';
};

export const emptyDraft: BookingDraft = {
  serviceIds: [],
  date: '',
  time: '',
  name: '',
  phone: '',
  notes: '',
  couponCode: '',
};

/* ── Pricing ──────────────────────────────────────────────────────────── */

export function priceOf(serviceIds: string[]) {
  return serviceIds.reduce((sum, id) => {
    const s = allServices.find((x) => x.id === id);
    return sum + (s?.price ?? 0);
  }, 0);
}

export function minutesOf(serviceIds: string[]) {
  return serviceIds.reduce((sum, id) => {
    const s = allServices.find((x) => x.id === id);
    return sum + (s?.minutes ?? 0);
  }, 0);
}

/** Known coupon codes -> percentage off. Keep in sync with `offers`. */
const COUPONS: Record<string, number> = {
  GLOW25: 25,
  HAPPY899: 15,
  DULHAN3000: 10,
  FRIEND20: salon.referral.friendDiscount,
};

export function couponDiscount(code: string, subtotal: number) {
  const pct = COUPONS[code.trim().toUpperCase()];
  if (!pct) return { pct: 0, amount: 0, valid: false };
  return { pct, amount: Math.round((subtotal * pct) / 100), valid: true };
}

/* ── Slots ────────────────────────────────────────────────────────────── */

export function nextDays(count = 10) {
  const out: { iso: string; day: string; date: string; month: string }[] = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({
      iso: toISODate(d),
      day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      date: String(d.getDate()).padStart(2, '0'),
      month: d.toLocaleDateString('en-IN', { month: 'short' }),
    });
  }
  return out;
}

export function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/**
 * Builds the selectable time slots for a date. Slots in the past are dropped,
 * and slots that cannot fit the selected services before closing are dropped
 * too, so customers never pick an impossible time.
 */
export function slotsFor(dateISO: string, durationMinutes = 30) {
  const { openHour, closeHour, slotMinutes } = salon.hours;
  const slots: { label: string; disabled: boolean }[] = [];
  const now = new Date();
  const isToday = dateISO === toISODate(now);

  for (let minutes = openHour * 60; minutes < closeHour * 60; minutes += slotMinutes) {
    const fitsBeforeClose = minutes + Math.max(durationMinutes, slotMinutes) <= closeHour * 60;
    const isPast = isToday && minutes <= now.getHours() * 60 + now.getMinutes() + 45;
    slots.push({ label: minutesToLabel(minutes), disabled: isPast || !fitsBeforeClose });
  }
  return slots;
}

function minutesToLabel(total: number) {
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

export function prettyDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

/* ── Persistence ──────────────────────────────────────────────────────── */

export function saveBooking(draft: BookingDraft): BookingRecord {
  const subtotal = priceOf(draft.serviceIds);
  const { amount } = couponDiscount(draft.couponCode, subtotal);
  const record: BookingRecord = {
    ...draft,
    id: `GS-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    total: subtotal - amount,
    estimatedMinutes: minutesOf(draft.serviceIds),
    serviceNames: draft.serviceIds.map(
      (id) => allServices.find((s) => s.id === id)?.name ?? id,
    ),
    source: attributionLabel(),
    status: 'requested',
  };

  const all = read<BookingRecord[]>(KEYS.bookings, []);
  write(KEYS.bookings, [record, ...all].slice(0, 300));
  return record;
}

export function getBookings() {
  return read<BookingRecord[]>(KEYS.bookings, []);
}

export function updateBookingStatus(id: string, status: BookingRecord['status']) {
  const all = getBookings().map((b) => (b.id === id ? { ...b, status } : b));
  write(KEYS.bookings, all);
  return all;
}

export function bookingsToCSV(rows: BookingRecord[]) {
  const head = [
    'Booking ID',
    'Requested at',
    'Name',
    'Phone',
    'Services',
    'Date',
    'Time',
    'Stylist',
    'Coupon',
    'Total (INR)',
    'Duration (min)',
    'Lead source',
    'Status',
    'Notes',
  ];
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const body = rows.map((b) =>
    [
      b.id,
      new Date(b.createdAt).toLocaleString('en-IN'),
      b.name,
      b.phone,
      b.serviceNames.join(' + '),
      b.date,
      b.time,
      b.stylistId ?? 'Any',
      b.couponCode || '-',
      b.total,
      b.estimatedMinutes,
      b.source,
      b.status,
      b.notes.replace(/\n/g, ' '),
    ]
      .map(esc)
      .join(','),
  );
  return [head.map(esc).join(','), ...body].join('\n');
}

/* ── WhatsApp handoff ─────────────────────────────────────────────────── */

/**
 * The salon has no server, so the confirmed booking is delivered as a
 * pre-filled WhatsApp message. Owner ko sab detail ek message me mil jati hai.
 */
export function bookingMessage(record: BookingRecord) {
  const a = attribution();
  const lines = [
    `*New booking – ${salon.legalName}*`,
    `Ref: ${record.id}`,
    '',
    `👤 Name: ${record.name}`,
    `📞 Phone: ${record.phone}`,
    `💫 Service: ${record.serviceNames.join(' + ')}`,
    `📅 Date: ${prettyDate(record.date)}`,
    `⏰ Time: ${record.time}`,
    record.stylistId ? `✂️ Stylist: ${record.stylistId}` : '',
    `⏳ Approx duration: ${record.estimatedMinutes} min`,
    record.couponCode ? `🎟️ Coupon: ${record.couponCode}` : '',
    `💰 Estimated total: ${formatINR(record.total)}`,
    record.notes ? `📝 Notes: ${record.notes}` : '',
    '',
    `_Source: ${record.source}${a.fbclid ? ' (paid ad click)' : ''}_`,
    '_Sent from the Glow Station app_',
  ];
  return lines.filter(Boolean).join('\n');
}

export function waLink(message: string, phone = salon.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone = salon.phone) {
  return `tel:${phone.replace(/\s/g, '')}`;
}
