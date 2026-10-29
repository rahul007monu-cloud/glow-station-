import { Award, CalendarHeart, Instagram, MessageCircle } from 'lucide-react';
import Reveal from '@/components/fx/Reveal';
import { Button, LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useBooking } from '@/context/BookingProvider';
import { artist, asset, salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { waLink } from '@/lib/booking';

/** One artist, one face — the trust anchor of a solo beauty brand. */
export default function About() {
  const { openBooking } = useBooking();
  const initials = artist.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Section
      id="about"
      eyebrow="Meet the artist"
      title="Hi, main hoon"
      highlight={artist.name}
      subtitle="Divine Touch koi badi chain nahi — ek artist, poori attention sirf aap par."
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal from="scale">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs">
            <span className="absolute -inset-3 animate-spin-slow rounded-[2.5rem] bg-gradient-to-tr from-gold-300/40 via-rose-400/30 to-lilac-500/40 blur-xl" />
            {artist.photo ? (
              <img
                src={asset(artist.photo)}
                alt={artist.name}
                loading="lazy"
                className="relative h-full w-full rounded-[2rem] border border-gold-300/30 object-cover"
              />
            ) : (
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[2rem] border border-gold-300/30 bg-gradient-to-br from-lilac-500/30 via-rose-500/20 to-gold-300/20">
                <span className="font-display text-7xl text-gold-100">{initials}</span>
                <span className="script mt-2 text-3xl text-rose-300">{salon.legalName}</span>
              </div>
            )}
            <span className="glass absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-xs text-gold-100">
              {artist.experience} experience
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="float-card p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-300/85">{artist.title}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">{artist.bio}</p>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Specialities</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {artist.specialities.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {artist.certifications.length > 0 && (
              <ul className="mt-5 space-y-2">
                {artist.certifications.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-white/70">
                    <Award size={15} className="shrink-0 text-gold-300" /> {c}
                  </li>
                ))}
              </ul>
            )}

            <p className="script mt-6 text-3xl text-gold-200">{salon.motto}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button icon={<CalendarHeart size={15} />} onClick={() => openBooking({ from: 'about' })}>
                Book with {artist.name.split(' ')[0]}
              </Button>
              <LinkButton
                variant="whatsapp"
                external
                href={waLink(`Hi ${artist.name.split(' ')[0]}! Mujhe ek service ke baare me poochna hai.`)}
                icon={<MessageCircle size={15} />}
                onClick={() => track('Contact', { method: 'whatsapp', placement: 'about' })}
              >
                Chat
              </LinkButton>
              <LinkButton variant="ghost" external href={salon.instagram} icon={<Instagram size={15} />}>
                My work
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
