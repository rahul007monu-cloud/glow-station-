import { Gift } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useBooking } from '@/context/BookingProvider';
import { salon } from '@/data/salon';
import { trackCustom } from '@/lib/analytics';
import { KEYS, read, write } from '@/lib/storage';

/**
 * Shown once per device, ~6 seconds after landing. A single, honest discount
 * popup lifts first-visit conversion without annoying repeat customers.
 */
export default function WelcomeOffer() {
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();
  const offer = salon.welcomeOffer;

  useEffect(() => {
    if (!offer.enabled || read<boolean>(KEYS.welcomeSeen, false)) return;
    const t = setTimeout(() => {
      setOpen(true);
      trackCustom('WelcomeOfferShown', { code: offer.code });
    }, 6000);
    return () => clearTimeout(t);
  }, [offer.enabled, offer.code]);

  const dismiss = () => {
    write(KEYS.welcomeSeen, true);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={dismiss}>
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 animate-floaty items-center justify-center rounded-full border border-gold-300/40 bg-gold-300/15 text-gold-600">
          <Gift size={26} />
        </span>
        <h3 className="mt-4 font-display text-3xl text-ink">{offer.headline}</h3>
        <p className="mt-2 text-sm text-ink-muted">{offer.sub}</p>

        <div className="mt-5 rounded-2xl border border-dashed border-gold-300/40 bg-ivory-300/70 px-4 py-3">
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-ink-muted">Coupon code</p>
          <p className="mt-1 font-mono text-2xl tracking-[0.2em] text-gold-600">{offer.code}</p>
        </div>

        <Button
          full
          size="lg"
          className="mt-5"
          onClick={() => {
            trackCustom('WelcomeOfferClaimed', { code: offer.code });
            dismiss();
            openBooking({ coupon: offer.code, from: 'welcome-popup' });
          }}
        >
          Claim & book now
        </Button>
        <button onClick={dismiss} className="mt-3 text-xs text-ink-muted hover:text-ink-soft">
          Baad me dekhunga
        </button>
      </div>
    </Modal>
  );
}
