import { CalendarHeart } from 'lucide-react';
import Parallax from '@/components/fx/Parallax';
import Reveal from '@/components/fx/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useBooking } from '@/context/BookingProvider';
import { stylists } from '@/data/salon';

export default function Team() {
  const { openBooking } = useBooking();

  return (
    <Section
      id="team"
      eyebrow="Our artists"
      title="Milye hamari"
      highlight="expert team se"
      subtitle="Har artist certified hai aur regular training se guzarta hai. Apna favourite stylist choose karke book karo."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stylists.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08}>
            <Parallax speed={i % 2 ? 40 : 16} tilt={i % 2 ? -0.6 : 0.6}>
            <article className="vitrine group h-full p-6 text-center">
              <div className="relative mx-auto h-24 w-24">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-300/20" />
                <SmartImage
                  src={s.photo}
                  alt={s.name}
                  className="relative h-24 w-24 rounded-full border border-gold-300/30 object-cover"
                  fallback={
                    <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold-300/30 bg-gradient-to-br from-gold-300/25 to-lilac-400/20 font-display text-3xl text-gold-100">
                      {s.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  }
                />
              </div>

              <h3 className="mt-4 font-display text-xl text-white">{s.name}</h3>
              <p className="text-xs uppercase tracking-[0.18em] text-gold-300/85">{s.role}</p>
              <p className="mt-1 text-xs text-white/45">{s.experience} experience</p>

              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {s.specialities.map((sp) => (
                  <span key={sp} className="chip text-[0.65rem]">
                    {sp}
                  </span>
                ))}
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="mt-5"
                icon={<CalendarHeart size={13} />}
                onClick={() => openBooking({ from: `stylist-${s.id}` })}
              >
                Book with {s.name.split(' ')[0]}
              </Button>
            </article>
            </Parallax>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
