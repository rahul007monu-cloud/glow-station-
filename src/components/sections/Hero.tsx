import { motion } from 'framer-motion';
import { CalendarHeart, Home as HomeIcon, Instagram, MessageCircle, Sparkles } from 'lucide-react';
import Marquee from '@/components/fx/Marquee';
import Logo from '@/components/layout/Logo';
import { Button, LinkButton } from '@/components/ui/Button';
import { useBooking } from '@/context/BookingProvider';
import { categories, salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { waLink } from '@/lib/booking';

/** Short label for the orbiting chips ("Waxing & Hair Removal" -> "Waxing"). */
const short = (name: string) => name.split(/[\s/&]+/)[0];

export default function Hero() {
  const { openBooking } = useBooking();
  const welcome = salon.welcomeOffer;

  return (
    <section id="top" className="relative px-5 pb-16 pt-32 sm:px-8 md:pt-44">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Copy ─────────────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1.5 text-xs text-rose-200 backdrop-blur"
          >
            <HomeIcon size={13} className="text-gold-300" />
            Doorstep beauty services · by {salon.owner}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-shadow-luxe mt-6 text-[3rem] leading-[1] sm:text-7xl lg:text-[5rem]"
          >
            <span className="gold-text">{salon.name}</span>{' '}
            <span className="script text-[1.15em] text-rose-300">{salon.suffix}</span>
            <span className="mt-4 block font-sans text-sm font-light tracking-[0.3em] text-white/55 sm:text-base">
              {salon.tagline.toUpperCase()}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="script mt-4 text-3xl text-gold-200 sm:text-4xl"
          >
            {salon.motto}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/65 sm:text-lg"
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
              Book your appointment
            </Button>
            <LinkButton
              size="lg"
              variant="whatsapp"
              external
              href={waLink(`Hi ${salon.owner}! ${salon.legalName} ki service book karni hai. Slot available hai?`)}
              icon={<MessageCircle size={18} />}
              onClick={() => track('Contact', { method: 'whatsapp', placement: 'hero' })}
            >
              WhatsApp
            </LinkButton>
            <LinkButton
              size="lg"
              variant="ghost"
              external
              href={salon.instagram}
              icon={<Instagram size={18} />}
            >
              {salon.instagramHandle}
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
            {/* central glowing plate with the flyer offer */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => openBooking({ from: 'hero-orb', coupon: welcome.code })}
              className="block h-56 w-56 animate-floaty-slow rounded-full border border-gold-300/30 bg-gradient-to-br from-lilac-500/30 via-rose-500/20 to-gold-300/20 backdrop-blur-xl transition hover:shadow-glow-rose"
              aria-label={`Book with ${welcome.code}`}
            >
              <span className="flex h-full flex-col items-center justify-center text-center">
                <Logo className="h-12 w-12" />
                <span className="mt-2 font-display text-5xl text-gold-100">10% OFF</span>
                <span className="mt-1 px-6 text-[0.65rem] uppercase tracking-[0.22em] text-white/65">
                  for discovering us
                </span>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 font-mono text-[0.65rem] tracking-[0.2em] text-gold-200">
                  <Sparkles size={10} /> {welcome.code}
                </span>
              </span>
            </button>
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
                  className="glass absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/80 hover:border-rose-300/40 hover:text-white"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.25,
                  }}
                >
                  <span aria-hidden>{c.glyph}</span>
                  <span className="whitespace-nowrap">{short(c.name)}</span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="shell mt-14">
        <Marquee items={categories.map((c) => c.name)} />
      </div>
    </section>
  );
}
