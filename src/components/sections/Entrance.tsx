import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone, Star } from 'lucide-react';
import { useRef } from 'react';
import Logo from '@/components/layout/Logo';
import { Button, LinkButton } from '@/components/ui/Button';
import ScrollScrubVideo from '@/components/fx/ScrollScrubVideo';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import SmartImage from '@/components/ui/SmartImage';
import { useBooking } from '@/context/BookingProvider';
import { MEDIA } from '@/data/media';
import { salon, scenery } from '@/data/salon';
import { track } from '@/lib/analytics';
import { telLink, waLink } from '@/lib/booking';
import { useMediaExists } from '@/lib/media';

/**
 * Arrival scene.
 *
 * Layer order is deliberate and flat — background footage, an ivory wash for
 * legibility, the two glass doors that slide aside as you scroll, then the
 * content. Nothing is pushed through the camera here, so it can never collide
 * with the navigation; the dramatic 3D happens in the exploded-board section.
 */
export default function Entrance() {
  const ref = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  /** Uses the salon's own footage as soon as it is uploaded. */
  const video = useMediaExists(MEDIA.hero);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  /* Background drifts and settles — the "walking in" feeling. */
  const bgScale = useTransform(p, [0, 1], [1.14, 1]);
  const bgY = useTransform(p, [0, 1], ['0%', '6%']);

  /* Doors part in the first half of the scroll. */
  const leftDoor = useTransform(p, [0, 0.4], ['0%', '-102%']);
  const rightDoor = useTransform(p, [0, 0.4], ['0%', '102%']);
  const doorFade = useTransform(p, [0.28, 0.45], [1, 0]);

  /* Content lifts away as the room takes over. */
  const contentY = useTransform(p, [0, 1], [0, -90]);
  const contentOpacity = useTransform(p, [0, 0.45, 0.7], [1, 1, 0]);
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);
  /* Footage gets brighter as the copy clears, so the salon is actually visible. */
  const washOpacity = useTransform(p, [0, 0.5, 1], video === 'found' ? [0.72, 0.4, 0.28] : [1, 1, 1]);

  return (
    <section
      id="top"
      ref={ref}
      className={`relative ${video === 'found' ? 'h-[320vh]' : 'h-[200vh]'}`}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* ── Background: salon footage or photo ─────────────── */}
        <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
          {video === 'found' ? (
            /* Salon footage, scrubbed by the scroll position. */
            <ScrollScrubVideo
              src={MEDIA.hero}
              poster={scenery.interior.stock}
              progress={p}
              className="h-full w-full object-cover"
            />
          ) : (
            <SmartImage
              priority
              src={scenery.interior.own}
              fallbackSrc={scenery.interior.stock}
              alt={`Inside ${salon.legalName}`}
              className="h-full w-full object-cover"
              fallback={<PhotoPlaceholder showLogo={false} />}
            />
          )}
        </motion.div>

        {/* Ivory wash keeps the brand palette and the copy readable */}
        <motion.div
          style={{ opacity: washOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-ivory-100/92 via-ivory-100/70 to-ivory-200/96"
        />
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_35%,rgba(255,253,249,0.55),transparent)]" />

        {/* ── Glass doors sliding aside (only without footage) ── */}
        {video !== 'found' && (
        <motion.div style={{ opacity: doorFade }} className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ x: leftDoor }}
            className="absolute inset-y-0 left-0 w-1/2 border-r border-gold-400/40 bg-gradient-to-br from-white/45 to-white/10 backdrop-blur-[3px]"
          >
            <span className="absolute right-4 top-1/2 h-20 w-1.5 -translate-y-1/2 rounded-full bg-gold-400/70" />
          </motion.div>
          <motion.div
            style={{ x: rightDoor }}
            className="absolute inset-y-0 right-0 w-1/2 border-l border-gold-400/40 bg-gradient-to-bl from-white/45 to-white/10 backdrop-blur-[3px]"
          >
            <span className="absolute left-4 top-1/2 h-20 w-1.5 -translate-y-1/2 rounded-full bg-gold-400/70" />
          </motion.div>
        </motion.div>
        )}

        {/* ── Content ────────────────────────────────────────── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-14 pt-28 sm:px-6 sm:pt-32"
        >
          {/* The footage already carries the branding, so the overlay only
              repeats it when there is no video to show. */}
          {video !== 'found' && (
            <>
              <Logo className="h-16 w-16 drop-shadow-[0_10px_24px_rgba(32,37,43,0.35)] sm:h-20 sm:w-20" />
              <p className="sign-letters mt-3 text-center text-[1.75rem] leading-none sm:text-[3rem]">
                Glow Station
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
                <span className="plate">Luxe Salon</span>
                <span className="plate">{salon.audience}</span>
                {salon.boardPlates.map((label) => (
                  <span key={label} className="plate hidden sm:inline-flex">
                    {label}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Frosted panel keeps the copy readable over moving footage */}
          <div className="mt-auto w-full max-w-xl rounded-2xl border border-white/60 bg-white/75 px-5 py-5 text-center shadow-card backdrop-blur-md">
            <span className="chip bg-white">
              <Star size={12} className="fill-gold-400 text-gold-400" />
              {salon.stats[0].value} on Google · {salon.address.line2}, {salon.address.city}
            </span>

            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              {salon.intro}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <Button size="md" onClick={() => openBooking({ from: 'entrance' })}>
              Book your slot
            </Button>
            <LinkButton
              variant="whatsapp"
              external
              href={waLink(`Hi ${salon.legalName}! Aaj ka slot available hai?`)}
              icon={<MessageCircle size={16} />}
              onClick={() => track('Contact', { method: 'whatsapp', placement: 'entrance' })}
            >
              WhatsApp
            </LinkButton>
            <LinkButton
              variant="dark"
              href={telLink()}
              icon={<Phone size={15} />}
              onClick={() => track('Contact', { method: 'call', placement: 'entrance' })}
            >
              {salon.phone.replace('+91', '')}
            </LinkButton>
          </div>

          </div>

          <motion.p
            style={{ opacity: hintOpacity }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-ink-muted backdrop-blur"
          >
            Scroll to walk in <ChevronDown size={12} />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
