import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  CalendarDays,
  Check,
  MessageCircle,
  Plus,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button, LinkButton } from '@/components/ui/Button';
import { TextArea, TextField } from '@/components/ui/Field';
import Modal from '@/components/ui/Modal';
import { useBooking } from '@/context/BookingProvider';
import { allServices, categories, formatINR, salon, stylists } from '@/data/salon';
import { track, trackCustom } from '@/lib/analytics';
import {
  bookingMessage,
  couponDiscount,
  emptyDraft,
  minutesOf,
  nextDays,
  prettyDate,
  priceOf,
  saveBooking,
  slotsFor,
  type BookingDraft,
  type BookingRecord,
  waLink,
} from '@/lib/booking';
import { addVisit } from '@/lib/loyalty';

const steps = ['Service', 'Date & time', 'Your details', 'Done'] as const;

export default function BookingModal() {
  const { open, closeBooking, initialServiceIds, initialCoupon } = useBooking();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [confirmed, setConfirmed] = useState<BookingRecord | null>(null);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  /* Reset the flow every time the sheet is opened. */
  useEffect(() => {
    if (!open) return;
    setStep(0);
    setConfirmed(null);
    setErrors({});
    setDraft({
      ...emptyDraft,
      serviceIds: initialServiceIds,
      couponCode: initialCoupon,
      date: nextDays(1)[0].iso,
    });
  }, [open, initialServiceIds, initialCoupon]);

  const subtotal = priceOf(draft.serviceIds);
  const duration = minutesOf(draft.serviceIds);
  const discount = couponDiscount(draft.couponCode, subtotal);
  const total = subtotal - discount.amount;

  const slots = useMemo(
    () => slotsFor(draft.date, duration || salon.hours.slotMinutes),
    [draft.date, duration],
  );

  const toggleService = (id: string) => {
    setDraft((d) => ({
      ...d,
      serviceIds: d.serviceIds.includes(id)
        ? d.serviceIds.filter((s) => s !== id)
        : [...d.serviceIds, id],
    }));
  };

  const canContinue =
    (step === 0 && draft.serviceIds.length > 0) ||
    (step === 1 && Boolean(draft.date && draft.time)) ||
    step === 2;

  const goNext = () => {
    if (step === 0) {
      track('AddToCart', {
        content_ids: draft.serviceIds.join(','),
        value: subtotal,
        currency: 'INR',
      });
      setStep(1);
      return;
    }
    if (step === 1) {
      track('InitiateCheckout', { value: total, currency: 'INR', num_items: draft.serviceIds.length });
      setStep(2);
      return;
    }
    if (step === 2) submit();
  };

  const submit = () => {
    const nextErrors: typeof errors = {};
    if (draft.name.trim().length < 2) nextErrors.name = 'Naam likhiye';
    if (!/^[+]?[0-9\s-]{10,15}$/.test(draft.phone.trim()))
      nextErrors.phone = '10-digit mobile number daaliye';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const record = saveBooking(draft);
    addVisit(record.total);
    setConfirmed(record);
    setStep(3);

    /* The money events — these are what Meta optimises your ads against. */
    track('Schedule', { value: record.total, currency: 'INR', content_name: record.serviceNames.join(' + ') });
    track('Lead', { value: record.total, currency: 'INR' });
    trackCustom('BookingRequested', { bookingId: record.id, coupon: record.couponCode || 'none' });
  };

  return (
    <Modal
      open={open}
      onClose={closeBooking}
      size="lg"
      title={confirmed ? 'Booking request ready 🎉' : 'Book your appointment'}
      subtitle={
        confirmed
          ? undefined
          : `${steps[step]} · Step ${Math.min(step + 1, 3)} of 3 — 30 second me ho jayega`
      }
    >
      {/* progress */}
      {!confirmed && (
        <div className="mb-6 flex gap-1.5">
          {steps.slice(0, 3).map((s, i) => (
            <div key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full rounded-full bg-gold-sheen"
                initial={{ width: 0 }}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ── Step 1: pick services ─────────────────────────── */}
        {step === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
          >
            <p className="mb-3 text-sm text-white/55">
              Ek ya zyada service select karo — total apne aap calculate ho jayega.
            </p>
            <div className="max-h-[46vh] space-y-5 overflow-y-auto pr-1">
              {categories.map((c) => (
                <div key={c.id}>
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gold-300/80">
                    {c.glyph} {c.name}
                  </p>
                  <div className="space-y-2">
                    {c.items.map((item) => {
                      const selected = draft.serviceIds.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleService(item.id)}
                          className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                            selected
                              ? 'border-gold-300/60 bg-gold-300/[0.12] shadow-glow'
                              : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                          }`}
                        >
                          <span>
                            <span className="block text-sm font-medium text-white">{item.name}</span>
                            <span className="block text-xs text-white/45">
                              {item.minutes} min · {formatINR(item.price)}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 rounded-full border p-1.5 ${
                              selected
                                ? 'border-gold-300/60 bg-gold-300 text-ink'
                                : 'border-white/20 text-white/40'
                            }`}
                          >
                            {selected ? <Check size={13} /> : <Plus size={13} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Step 2: date, time, stylist ───────────────────── */}
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
          >
            <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold-300/80">
              <CalendarDays size={13} /> Choose date
            </p>
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {nextDays(12).map((d) => {
                const active = d.iso === draft.date;
                return (
                  <button
                    key={d.iso}
                    onClick={() => setDraft((x) => ({ ...x, date: d.iso, time: '' }))}
                    className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2.5 transition ${
                      active
                        ? 'border-gold-300/60 bg-gold-300/15 text-white shadow-glow'
                        : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25'
                    }`}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wider">{d.day}</span>
                    <span className="font-display text-xl">{d.date}</span>
                    <span className="text-[0.6rem] text-white/45">{d.month}</span>
                  </button>
                );
              })}
            </div>

            <p className="mb-2 mt-6 text-xs uppercase tracking-[0.2em] text-gold-300/80">
              Available slots
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((s) => (
                <button
                  key={s.label}
                  disabled={s.disabled}
                  onClick={() => setDraft((x) => ({ ...x, time: s.label }))}
                  className={`rounded-xl border py-2.5 text-xs transition ${
                    draft.time === s.label
                      ? 'border-gold-300/60 bg-gold-300/20 text-white shadow-glow'
                      : s.disabled
                        ? 'cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20 line-through'
                        : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="mb-2 mt-6 text-xs uppercase tracking-[0.2em] text-gold-300/80">
              Preferred stylist (optional)
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDraft((x) => ({ ...x, stylistId: undefined }))}
                className={`chip ${!draft.stylistId ? 'border-gold-300/60 text-gold-100' : ''}`}
              >
                Any available
              </button>
              {stylists.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setDraft((x) => ({ ...x, stylistId: s.name }))}
                  className={`chip ${
                    draft.stylistId === s.name ? 'border-gold-300/60 text-gold-100' : ''
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Step 3: details ──────────────────────────────── */}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            className="space-y-4"
          >
            <TextField
              label="Your name"
              required
              placeholder="e.g. Priya Sharma"
              value={draft.name}
              error={errors.name}
              onChange={(e) => setDraft((x) => ({ ...x, name: e.target.value }))}
            />
            <TextField
              label="Mobile number"
              required
              type="tel"
              inputMode="tel"
              placeholder="98765 43210"
              value={draft.phone}
              error={errors.phone}
              hint="Isi number par confirmation aayega."
              onChange={(e) => setDraft((x) => ({ ...x, phone: e.target.value }))}
            />
            <TextField
              label="Coupon code"
              placeholder="GLOW25"
              value={draft.couponCode}
              onChange={(e) =>
                setDraft((x) => ({ ...x, couponCode: e.target.value.toUpperCase() }))
              }
              hint={
                draft.couponCode
                  ? discount.valid
                    ? `✓ ${discount.pct}% off applied`
                    : 'Ye code valid nahi hai'
                  : 'Offers section se code copy kar sakte ho.'
              }
            />
            <TextArea
              label="Anything we should know?"
              placeholder="Allergy, hair length, preferred look, reference photo…"
              value={draft.notes}
              onChange={(e) => setDraft((x) => ({ ...x, notes: e.target.value }))}
            />
          </motion.div>
        )}

        {/* ── Step 4: confirmation ─────────────────────────── */}
        {step === 3 && confirmed && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <span className="mx-auto flex h-16 w-16 animate-floaty items-center justify-center rounded-full border border-gold-300/40 bg-gold-300/15 text-gold-100">
              <Sparkles size={26} />
            </span>
            <p className="mt-4 text-sm text-white/70">
              Ref <strong className="text-gold-100">{confirmed.id}</strong> · {confirmed.serviceNames.join(' + ')}
              <br />
              {prettyDate(confirmed.date)} at {confirmed.time}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/50">
              Last step: neeche button dabao — aapki details WhatsApp par hamare paas chali jayengi
              aur hum 10 minute me slot confirm kar denge.
            </p>

            <LinkButton
              full
              size="lg"
              variant="whatsapp"
              className="mt-5"
              external
              href={waLink(bookingMessage(confirmed))}
              icon={<MessageCircle size={18} />}
              onClick={() => trackCustom('BookingSentToWhatsApp', { bookingId: confirmed.id })}
            >
              Confirm on WhatsApp
            </LinkButton>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-xs text-white/60">
              <p className="flex items-center gap-1.5 font-semibold text-gold-100">
                <BadgePercent size={13} /> Aapko ek loyalty stamp mil gaya!
              </p>
              <p className="mt-1">
                {salon.loyalty.stampsForReward} visits par {salon.loyalty.reward} free. Rewards
                section me apna card dekho.
              </p>
            </div>

            <button
              onClick={closeBooking}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white"
            >
              <X size={12} /> Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky summary + nav ──────────────────────────── */}
      {!confirmed && (
        <div className="mt-6 border-t border-white/[0.08] pt-4">
          {draft.serviceIds.length > 0 && (
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-white/55">
                {draft.serviceIds.length} service · ~{duration} min
                {draft.time ? ` · ${prettyDate(draft.date)}, ${draft.time}` : ''}
              </span>
              <span className="text-right">
                {discount.amount > 0 && (
                  <span className="mr-2 text-xs text-white/35 line-through">
                    {formatINR(subtotal)}
                  </span>
                )}
                <strong className="font-display text-xl text-gold-100">{formatINR(total)}</strong>
              </span>
            </div>
          )}

          <div className="flex gap-2.5">
            {step > 0 && (
              <Button variant="dark" onClick={() => setStep((s) => s - 1)} icon={<ArrowLeft size={15} />}>
                Back
              </Button>
            )}
            <Button
              full
              disabled={!canContinue}
              onClick={goNext}
              icon={step === 2 ? <Check size={16} /> : <ArrowRight size={16} />}
            >
              {step === 2 ? 'Confirm booking' : 'Continue'}
            </Button>
          </div>

          {step === 0 && draft.serviceIds.length === 0 && (
            <p className="mt-2 text-center text-xs text-white/40">
              Kam se kam ek service select karein ({allServices.length} options)
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}
