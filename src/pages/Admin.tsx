import { Download, Lock, RefreshCw, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { formatINR, salon } from '@/data/salon';
import {
  bookingsToCSV,
  getBookings,
  prettyDate,
  updateBookingStatus,
  type BookingRecord,
} from '@/lib/booking';
import { useStoredValue } from '@/lib/hooks';
import { KEYS, remove } from '@/lib/storage';

/**
 * Owner-only view of every booking request made on this device/browser.
 *
 * Bookings live in localStorage (no server yet), so this dashboard is a
 * convenience log + CSV export — the WhatsApp message stays the source of
 * truth. The PIN is a soft gate, not real security.
 */
const PIN = (import.meta.env.VITE_ADMIN_PIN as string | undefined) ?? '1234';

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [filter, setFilter] = useState<'all' | BookingRecord['status']>('all');
  const [bookings, refresh] = useStoredValue(getBookings);

  const rows = useMemo(
    () => (filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter],
  );

  const revenue = rows.reduce((sum, b) => sum + b.total, 0);

  const download = () => {
    const blob = new Blob([bookingsToCSV(rows)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `glow-station-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!unlocked) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center px-5 pt-24">
        <div className="glass w-full max-w-sm rounded-3xl p-7">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/30 bg-gold-300/10 text-gold-200">
            <Lock size={22} />
          </span>
          <h1 className="mt-4 text-center font-display text-2xl text-white">Owner dashboard</h1>
          <p className="mt-1.5 text-center text-sm text-white/50">
            {salon.legalName} staff only.
          </p>
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setUnlocked(pin === PIN);
            }}
          >
            <TextField
              label="PIN"
              type="password"
              inputMode="numeric"
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              error={pin.length >= 4 && pin !== PIN ? 'Galat PIN' : undefined}
            />
            <Button full type="submit">
              Unlock
            </Button>
          </form>
          <p className="mt-4 text-center text-[0.68rem] text-white/35">
            Default PIN 1234 — deploy karte waqt VITE_ADMIN_PIN set karke badal dena.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 pb-28 pt-28 sm:px-8">
      <div className="shell">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-white">Booking requests</h1>
            <p className="mt-1 text-sm text-white/50">
              {rows.length} request · estimated value{' '}
              <strong className="text-gold-100">{formatINR(revenue)}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="dark" icon={<RefreshCw size={14} />} onClick={refresh}>
              Refresh
            </Button>
            <Button size="sm" icon={<Download size={14} />} onClick={download} disabled={!rows.length}>
              Export CSV
            </Button>
          </div>
        </header>

        <div className="mt-6 flex flex-wrap gap-2">
          {(['all', 'requested', 'confirmed', 'done', 'cancelled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip capitalize ${filter === f ? 'border-gold-300/60 text-gold-100' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="glass mt-8 rounded-3xl p-10 text-center text-sm text-white/50">
            Abhi koi booking request nahi hai. Jaise hi koi customer form bharega, wo yahan dikhega.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {rows.map((b) => (
              <article key={b.id} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl text-white">{b.name}</p>
                    <a href={`tel:${b.phone}`} className="text-sm text-gold-200 hover:underline">
                      {b.phone}
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl text-gold-100">{formatINR(b.total)}</p>
                    <p className="text-[0.68rem] uppercase tracking-wider text-white/40">{b.id}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-white/70">{b.serviceNames.join(' + ')}</p>
                <p className="mt-1 text-xs text-white/45">
                  {prettyDate(b.date)} · {b.time} · {b.estimatedMinutes} min ·{' '}
                  {b.stylistId ?? 'Any stylist'}
                  {b.couponCode ? ` · coupon ${b.couponCode}` : ''}
                </p>
                {b.notes && <p className="mt-2 text-xs italic text-white/50">“{b.notes}”</p>}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="chip text-[0.65rem]">lead: {b.source}</span>
                  {(['requested', 'confirmed', 'done', 'cancelled'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateBookingStatus(b.id, s)}
                      className={`chip text-[0.65rem] capitalize ${
                        b.status === s ? 'border-gold-300/60 text-gold-100' : ''
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center justify-between rounded-2xl border border-rose-400/20 bg-rose-500/[0.06] p-5">
          <p className="text-xs text-white/55">
            Purana data clear karna hai? Ye sirf is browser se hatega.
          </p>
          <Button
            size="sm"
            variant="dark"
            icon={<Trash2 size={14} />}
            onClick={() => {
              if (confirm('Sare booking records delete kar dein?')) remove(KEYS.bookings);
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </main>
  );
}
