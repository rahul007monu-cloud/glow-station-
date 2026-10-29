import { motion } from 'framer-motion';
import { CalendarHeart, Home as HomeIcon, Instagram, MessageCircle } from 'lucide-react';
import Marquee from '@/components/fx/Marquee';
import HeroStage from '@/components/fx/HeroStage';
import { Button, LinkButton } from '@/components/ui/Button';
import { useBooking } from '@/context/BookingProvider';
import { categories, salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { waLink } from '@/lib/booking';

export default function Hero() {
  const { openBooking } = useBooking();
  const welcome = salon.welcomeOffer;

  return (
    <section id="top" className="relative overflow-x-clip px-5 pb-16 pt-28 sm:px-8 md:pt-44">
      <div className="shell grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
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

        {/* ── 3D stage ─────────────────────────────────────────── */}
        <motion.div
          className="order-first mx-auto -mt-6 w-[86%] max-w-[30rem] lg:order-none lg:mt-0 lg:w-full"
          initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroStage onOfferClick={() => openBooking({ from: 'hero-orb', coupon: welcome.code })} />
        </motion.div>
      </div>

      <div className="shell mt-14">
        <Marquee items={categories.map((c) => c.name)} />
      </div>
    </section>
  );
}
