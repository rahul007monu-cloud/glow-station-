import { motion } from 'framer-motion';
import { CalendarHeart, Instagram, MapPin, MessageCircle, Star } from 'lucide-react';
import Marquee from '@/components/fx/Marquee';
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
    <section id="top" className="relative px-5 pb-16 pt-32 sm:px-8 md:pt-44">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
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

        {/* ── Floating service orbs ────────────────────────────── */}
        <div className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[30rem]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="absolute inset-0"
          >
            {/* central glowing plate */}
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-floaty-slow rounded-full border border-gold-300/25 bg-gradient-to-br from-gold-300/20 via-rose-400/10 to-lilac-400/20 backdrop-blur-xl">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="font-display text-5xl text-gold-100">
                  {salon.stats[2].value}
                </p>
                <p className="mt-1 px-6 text-[0.68rem] uppercase tracking-[0.25em] text-white/60">
                  expert artists ready for you
                </p>
              </div>
            </div>

            {/* orbiting category chips */}
            {categories.map((c, i) => {
              const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 44;
              const left = 50 + Math.cos(angle) * radius;
              const top = 50 + Math.sin(angle) * radius;
              return (
                <motion.a
                  key={c.id}
                  href="#services"
                  className="glass absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs text-white/80 hover:border-gold-300/40 hover:text-white"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4 + i * 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                >
                  <span aria-hidden>{c.glyph}</span>
                  <span className="whitespace-nowrap">{c.name}</span>
                </motion.a>
              );
            })}
          </motion.div>

          <a
            href={salon.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs text-white/70 hover:text-white"
          >
            <MapPin size={13} className="text-gold-300" />
            {salon.address.city} · Get directions
          </a>
        </div>
      </div>

      <div className="shell mt-14">
        <Marquee items={brands} />
      </div>
    </section>
  );
}
