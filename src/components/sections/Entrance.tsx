import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone, Star } from 'lucide-react';
import { useRef } from 'react';
import Signboard from '@/components/fx/Signboard';
import SmartImage from '@/components/ui/SmartImage';
import { Button, LinkButton } from '@/components/ui/Button';
import { useBooking } from '@/context/BookingProvider';
import { MEDIA } from '@/data/media';
import { salon, scenery } from '@/data/salon';
import { track } from '@/lib/analytics';
import { telLink, waLink } from '@/lib/booking';
import { asset, useMediaExists } from '@/lib/media';

/**
 * The arrival: you stand in front of the shop, and as you scroll the camera
 * pushes *through* the glass door into the salon.
 *
 * Everything is real 3D — the facade, door and interior sit at different Z
 * depths inside one perspective, so the board grows past the camera while the
 * interior scales up from behind it.
 */
export default function Entrance() {
  const ref = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  /* Uses the salon's own footage the moment it is uploaded. */
  const video = useMediaExists(MEDIA.hero);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  /* Camera pushes forward: facade rushes past, interior comes to meet you. */
  const facadeZ = useTransform(p, [0, 1], [0, 760]);
  const facadeOpacity = useTransform(p, [0, 0.55, 0.8], [1, 1, 0]);
  const facadeBlur = useTransform(p, [0, 0.6, 1], ['blur(0px)', 'blur(0px)', 'blur(7px)']);

  const doorZ = useTransform(p, [0, 1], [-260, 460]);
  const doorScale = useTransform(p, [0, 1], [1, 1.5]);
  const leftDoor = useTransform(p, [0.15, 0.85], ['0%', '-115%']);
  const rightDoor = useTransform(p, [0.15, 0.85], ['0%', '115%']);

  const interiorZ = useTransform(p, [0, 1], [-1100, -120]);
  const interiorOpacity = useTransform(p, [0, 0.35, 1], [0.55, 0.85, 1]);
  const interiorScale = useTransform(p, [0, 1], [1.18, 1]);

  const copyOpacity = useTransform(p, [0, 0.28], [1, 0]);
  const copyY = useTransform(p, [0, 0.4], [0, -70]);
  const hintOpacity = useTransform(p, [0, 0.15], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[260vh]">
      <div className="scene sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        {/* ── Interior, seen through the doorway ─────────────── */}
        <motion.div
          style={{ z: interiorZ, opacity: interiorOpacity, scale: interiorScale }}
          className="preserve-3d absolute inset-0"
        >
          {video === 'found' ? (
            <video
              className="h-full w-full object-cover"
              src={asset(MEDIA.hero)}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={asset(scenery.interior.stock)}
            />
          ) : (
            <SmartImage
              priority
              src={scenery.interior.own}
              fallbackSrc={scenery.interior.stock}
              alt={`Inside ${salon.legalName}`}
              className="h-full w-full object-cover"
            />
          )}
          {/* warm ivory grade so the photo matches the brand palette */}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory-100/45 via-ivory-100/10 to-ivory-200/70" />
          <div className="absolute inset-x-[14%] top-[8%] h-1 rounded-full bg-gradient-to-r from-transparent via-gold-200 to-transparent blur-[1px]" />
        </motion.div>

        {/* ── Glass door ─────────────────────────────────────── */}
        <motion.div
          style={{ z: doorZ, scale: doorScale }}
          className="preserve-3d pointer-events-none absolute inset-x-[8%] bottom-[6%] top-[16%]"
        >
          <motion.div
            style={{ x: leftDoor }}
            className="absolute inset-y-0 left-0 w-1/2 rounded-l-xl border-y-2 border-l-2 border-gold-400/70 bg-gradient-to-br from-white/70 via-white/35 to-ivory-300/50 backdrop-blur-[2px]"
          >
            <span className="absolute right-3 top-1/2 h-16 w-1.5 rounded-full bg-gold-400/80" />
          </motion.div>
          <motion.div
            style={{ x: rightDoor }}
            className="absolute inset-y-0 right-0 w-1/2 rounded-r-xl border-y-2 border-r-2 border-gold-400/70 bg-gradient-to-bl from-white/70 via-white/35 to-ivory-300/50 backdrop-blur-[2px]"
          >
            <span className="absolute left-3 top-1/2 h-16 w-1.5 rounded-full bg-gold-400/80" />
          </motion.div>
        </motion.div>

        {/* ── Facade: the signboard above the door ───────────── */}
        <motion.div
          style={{ z: facadeZ, opacity: facadeOpacity, filter: facadeBlur }}
          className="preserve-3d absolute inset-x-0 top-[8%] z-20 mx-auto w-[min(94%,54rem)] px-2"
        >
          <Signboard />
        </motion.div>

        {/* ── Copy + CTAs, fade out as you step in ──────────── */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="absolute inset-x-0 bottom-[8%] z-30 px-5 text-center"
        >
          <span className="chip mx-auto shadow-card">
            <Star size={12} className="fill-gold-400 text-gold-400" />
            {salon.stats[0].value} on Google · {salon.address.line2}, {salon.address.city}
          </span>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {salon.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={() => openBooking({ from: 'entrance' })}>
              Book your slot
            </Button>
            <LinkButton
              size="lg"
              variant="whatsapp"
              external
              href={waLink(`Hi ${salon.legalName}! Aaj ka slot available hai?`)}
              icon={<MessageCircle size={17} />}
              onClick={() => track('Contact', { method: 'whatsapp', placement: 'entrance' })}
            >
              WhatsApp
            </LinkButton>
            <LinkButton
              size="lg"
              variant="dark"
              href={telLink()}
              icon={<Phone size={16} />}
              onClick={() => track('Contact', { method: 'call', placement: 'entrance' })}
            >
              {salon.phone.replace('+91', '')}
            </LinkButton>
          </div>

          <motion.p
            style={{ opacity: hintOpacity }}
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-7 inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.35em] text-ink-muted"
          >
            Scroll to walk in <ChevronDown size={13} />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
