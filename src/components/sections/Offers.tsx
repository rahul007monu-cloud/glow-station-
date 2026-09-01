import { Copy, Ticket } from 'lucide-react';
import { useState } from 'react';
import Reveal from '@/components/fx/Reveal';
import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useBooking } from '@/context/BookingProvider';
import { offers } from '@/data/salon';
import { track, trackCustom } from '@/lib/analytics';
import { useCountdown } from '@/lib/hooks';

const tones = {
  gold: 'from-gold-500/25 to-gold-300/5 border-gold-300/30',
  rose: 'from-rose-500/25 to-rose-300/5 border-rose-400/30',
  lilac: 'from-lilac-500/25 to-lilac-300/5 border-lilac-400/30',
};

export default function Offers() {
  const live = offers.filter((o) => new Date(o.expires).getTime() > Date.now());

  return (
    <Section
      id="offers"
      eyebrow="Live offers"
      title="Aaj ke"
      highlight="deals"
      subtitle="Coupon code copy karo aur booking ke time apply kar do. Ek booking par ek coupon."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {live.map((o, i) => (
          <Reveal key={o.id} delay={i * 0.1}>
            <OfferCard offer={o} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function OfferCard({ offer }: { offer: (typeof offers)[number] }) {
  const [copied, setCopied] = useState(false);
  const { openBooking } = useBooking();
  const t = useCountdown(offer.expires);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
    } catch {
      /* clipboard blocked — code is visible on screen anyway */
    }
    setCopied(true);
    trackCustom('CouponCopied', { code: offer.code });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`float-card relative h-full overflow-hidden border bg-gradient-to-br p-6 ${tones[offer.tone]}`}
    >
      {/* ticket notches */}
      <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-ink" />
      <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-ink" />

      <Ticket className="animate-floaty text-gold-200" size={26} />
      <h3 className="mt-4 font-display text-2xl leading-snug text-white">{offer.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{offer.detail}</p>

      <button
        onClick={copy}
        className="mt-5 flex w-full items-center justify-between rounded-2xl border border-dashed border-white/25 bg-black/25 px-4 py-3 text-left transition hover:border-gold-300/60"
      >
        <span className="font-mono text-lg tracking-[0.2em] text-gold-100">{offer.code}</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
          <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
        </span>
      </button>

      {t.total > 0 && t.days < 45 && (
        <p className="mt-3 text-center text-[0.7rem] uppercase tracking-wider text-rose-300">
          Ends in {t.days}d {t.hours}h {t.minutes}m
        </p>
      )}

      <Button
        full
        size="sm"
        variant="dark"
        className="mt-4"
        onClick={() => {
          track('AddToCart', { content_name: offer.title, content_type: 'offer' });
          openBooking({ coupon: offer.code, from: `offer-${offer.id}` });
        }}
      >
        Use this offer
      </Button>
    </div>
  );
}
