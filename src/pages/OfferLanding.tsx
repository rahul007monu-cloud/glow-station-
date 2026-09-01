import { motion } from 'framer-motion';
import { BadgeCheck, Clock, MapPin, MessageCircle, Phone, ShieldCheck, Star } from 'lucide-react';
import { useState } from 'react';
import Reveal from '@/components/fx/Reveal';
import { Button, LinkButton } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { allServices, formatINR, offers, packages, salon } from '@/data/salon';
import { track, trackCustom } from '@/lib/analytics';
import { telLink, waLink } from '@/lib/booking';
import { useCountdown } from '@/lib/hooks';

/**
 * Dedicated landing page for paid Meta / Google traffic.
 *
 * One offer, one promise, one action — no navigation to leak clicks away.
 * Send ad traffic here with UTM params, e.g.
 *   /offer?utm_source=meta&utm_medium=paid&utm_campaign=first-visit-25
 */
export default function OfferLanding() {
  const offer = offers[0];
  const t = useCountdown(offer.expires);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(allServices[0]?.id ?? '');
  const [error, setError] = useState('');

  const chosen = allServices.find((s) => s.id === service);

  const submit = () => {
    if (name.trim().length < 2 || !/^[+]?[0-9\s-]{10,15}$/.test(phone.trim())) {
      setError('Naam aur 10-digit mobile number sahi bharein.');
      return;
    }
    setError('');
    track('Lead', {
      content_name: chosen?.name ?? 'offer-form',
      value: chosen?.price ?? 0,
      currency: 'INR',
    });
    trackCustom('OfferFormSubmitted', { coupon: offer.code });

    const message = [
      `*${offer.title}* claim karna hai — ${salon.legalName}`,
      '',
      `👤 ${name}`,
      `📞 ${phone}`,
      `💫 Service: ${chosen?.name ?? '-'}`,
      `🎟️ Code: ${offer.code}`,
      '',
      '_Sent from the offer page_',
    ].join('\n');
    window.open(waLink(message), '_blank');
  };

  return (
    <main className="px-5 pb-32 pt-28 sm:px-8 sm:pb-16">
      <div className="shell">
        {/* ── Offer hero ─────────────────────────────────────── */}
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="chip border-rose-400/40 bg-rose-500/15 text-rose-200"
            >
              Limited period offer
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-shadow-luxe mt-4 text-4xl leading-[1.08] sm:text-6xl"
            >
              {offer.title} <span className="gold-text">at {salon.name}</span>
            </motion.h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
              {offer.detail} Certified stylists, 100% original products aur ek fixed slot — waiting
              zero. Form bharo, hum WhatsApp par turant confirm karenge.
            </p>

            {t.total > 0 && (
              <div className="mt-6 flex gap-2.5">
                {[
                  { v: t.days, l: 'Days' },
                  { v: t.hours, l: 'Hrs' },
                  { v: t.minutes, l: 'Min' },
                  { v: t.seconds, l: 'Sec' },
                ].map((b) => (
                  <div key={b.l} className="glass w-[4.2rem] rounded-2xl py-2.5 text-center">
                    <p className="font-display text-2xl text-gold-100">
                      {String(b.v).padStart(2, '0')}
                    </p>
                    <p className="text-[0.6rem] uppercase tracking-wider text-white/45">{b.l}</p>
                  </div>
                ))}
              </div>
            )}

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Certified & trained stylists',
                'Only branded, original products',
                'Sanitised tools, single-use disposables',
                'Fixed appointment, no queue',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-white/70">
                  <BadgeCheck size={16} className="mt-0.5 shrink-0 text-gold-300" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="chip">
                <Star size={12} className="fill-gold-300 text-gold-300" /> {salon.stats[0].value}{' '}
                Google rating
              </span>
              <span className="chip">
                <ShieldCheck size={12} className="text-gold-300" /> Hygiene certified
              </span>
              <span className="chip">
                <MapPin size={12} className="text-gold-300" /> {salon.address.city}
              </span>
              <span className="chip">
                <Clock size={12} className="text-gold-300" /> {salon.hours.weekdays}
              </span>
            </div>
          </div>

          {/* ── Lead form ────────────────────────────────────── */}
          <Reveal from="scale">
            <div className="glass sticky top-24 rounded-3xl border-gold-300/25 p-6 shadow-glow">
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-300/85">
                Claim your discount
              </p>
              <h2 className="mt-1.5 font-display text-2xl text-white">
                Slot book karo, {offer.code} apply hoga
              </h2>

              <div className="mt-5 space-y-3.5">
                <TextField
                  label="Name"
                  required
                  placeholder="Aapka naam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="WhatsApp number"
                  required
                  type="tel"
                  inputMode="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/55">
                    Service
                  </span>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-2xl border border-white/[0.12] bg-ink-card px-4 py-3 text-sm text-white outline-none focus:border-gold-300/60"
                  >
                    {allServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {formatINR(s.price)}
                      </option>
                    ))}
                  </select>
                </label>

                {error && <p className="text-xs text-rose-400">{error}</p>}

                <Button full size="lg" onClick={submit} icon={<MessageCircle size={17} />}>
                  Get my {offer.code} slot
                </Button>
                <LinkButton
                  full
                  variant="dark"
                  href={telLink()}
                  icon={<Phone size={15} />}
                  onClick={() => track('Contact', { method: 'call', placement: 'offer-page' })}
                >
                  Or call {salon.phone}
                </LinkButton>
                <p className="text-center text-[0.68rem] leading-relaxed text-white/40">
                  Aapka number sirf booking confirm karne ke liye use hoga. No spam.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Package upsell ─────────────────────────────────── */}
        <section className="mt-20">
          <h2 className="text-center font-display text-3xl text-white">
            Ek baar aane wale nahi, <span className="gold-text">regular banne wale</span> deals
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/55">
            Discount ek visit ka fayda deta hai — package saal bhar ka. Neeche dekhiye kitna bachta
            hai.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <div className="float-card h-full p-6">
                  <h3 className="font-display text-xl text-white">{p.name}</h3>
                  <p className="mt-1 text-xs text-white/50">{p.bestFor}</p>
                  <p className="mt-4 font-display text-3xl text-gold-100">{formatINR(p.price)}</p>
                  {p.mrp && (
                    <p className="text-sm text-[#5be584]">
                      Save {formatINR(p.mrp - p.price)} · {p.validity}
                    </p>
                  )}
                  <ul className="mt-4 space-y-1.5 text-sm text-white/65">
                    {p.usps.map((u) => (
                      <li key={u.title}>✓ {u.title}</li>
                    ))}
                  </ul>
                  <LinkButton
                    full
                    size="sm"
                    variant="outline"
                    className="mt-5"
                    external
                    href={waLink(
                      `Hi ${salon.legalName}! Mujhe *${p.name}* chahiye. Details bhejiye.`,
                    )}
                    onClick={() =>
                      track('Lead', {
                        content_name: p.name,
                        value: p.price,
                        currency: 'INR',
                        placement: 'offer-page',
                      })
                    }
                  >
                    Enquire now
                  </LinkButton>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* ── Sticky mobile CTA ──────────────────────────────── */}
      <div className="dock-safe fixed inset-x-0 bottom-0 z-[70] px-4 pb-3 sm:hidden">
        <LinkButton
          full
          size="lg"
          variant="whatsapp"
          external
          href={waLink(`Hi ${salon.legalName}! ${offer.title} chahiye. Code: ${offer.code}`)}
          icon={<MessageCircle size={18} />}
          onClick={() => track('Contact', { method: 'whatsapp', placement: 'offer-sticky' })}
        >
          WhatsApp par claim karo
        </LinkButton>
      </div>
    </main>
  );
}
