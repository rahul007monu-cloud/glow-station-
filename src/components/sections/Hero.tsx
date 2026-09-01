import { motion } from 'framer-motion';
import { CalendarHeart, Instagram, MapPin, MessageCircle, Star } from 'lucide-react';
import Chandelier from '@/components/fx/Chandelier';
import Marquee from '@/components/fx/Marquee';
import MirrorStation from '@/components/fx/MirrorStation';
import { Button, LinkButton } from '@/components/ui/Button';
import { useBooking } from '@/context/BookingProvider';
import { categories, salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { waLink } from '@/lib/booking';

const brands = [
  "L'Oréal Professionnel",
  'Schwarzkopf',
  'Kérastase',
  'O3+',
  'Rica Wax',
  'Olaplex',
];

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section
      id="top"
      className="light-beams relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 md:pt-44"
    >
      {/* Ceiling chandelier — the entrance moment */}
      <Chandelier className="absolute left-1/2 top-0 z-0 -translate-x-1/2" />

      {/* Polished showroom floor with a soft reflection */}
      <div className="mirror-floor pointer-events-none absolute inset-x-0 bottom-0 h-56" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

      <div className="shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Copy ─────────────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-300/[0.08] px-4 py-1.5 text-xs text-gold-100 backdrop-blur"
          >
            <Star size={13} className="fill-gold-300 text-gold-300" />
            {salon.stats[0].value} on Google · {salon.stats[1].value} happy clients
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-shadow-luxe mt-6 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem]"
          >
            {salon.name} <span className="gold-text">{salon.suffix}</span>
            <span className="mt-3 block font-sans text-base font-light tracking-[0.2em] text-white/50 sm:text-lg">
              {salon.tagline.toUpperCase()}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-white/65 sm:text-lg"
          >
            {salon.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              icon={<CalendarHeart size={18} />}
              onClick={() => openBooking({ from: 'hero' })}
            >
              Book your slot
            </Button>
            <LinkButton
              size="lg"
              variant="whatsapp"
              external
              href={waLink(`Hi ${salon.legalName}! Aaj ka slot available hai?`)}
              icon={<MessageCircle size={18} />}
              onClick={() => track('Contact', { method: 'whatsapp', placement: 'hero' })}
            >
              WhatsApp us
            </LinkButton>
            <LinkButton
              size="lg"
              variant="ghost"
              external
              href={salon.instagram}
              icon={<Instagram size={18} />}
            >
              See our work
            </LinkButton>
          </motion.div>

          {/* Trust stats */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {salon.stats.map((s) => (
              <div key={s.label} className="glass-soft rounded-2xl px-3 py-3 text-center">
                <dt className="font-display text-2xl text-gold-100">{s.value}</dt>
                <dd className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-white/45">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── The styling station ──────────────────────────────── */}
        <div className="relative">
          <MirrorStation />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c, i) => (
              <motion.a
                key={c.id}
                href="#services"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.06 }}
                className="glass rounded-full px-3.5 py-2 text-xs text-white/75 transition hover:border-gold-300/40 hover:text-white"
              >
                {c.name}
              </motion.a>
            ))}
          </div>

          <a
            href={salon.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass mx-auto mt-4 flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs text-white/70 hover:text-white"
          >
            <MapPin size={13} className="text-gold-300" />
            {salon.address.line2}, {salon.address.city} · Get directions
          </a>
        </div>
      </div>

      <div className="shell mt-14">
        <Marquee items={brands} />
      </div>
    </section>
  );
}
