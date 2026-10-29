import { CalendarHeart } from 'lucide-react';
import Reveal from '@/components/fx/Reveal';
import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useBooking } from '@/context/BookingProvider';
import { enabledModes, howItWorks, salon } from '@/data/salon';

/** Explains the solo / doorstep model so first-time clients feel safe booking. */
export default function HowItWorks() {
  const { openBooking } = useBooking();

  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Booking sirf"
      highlight="4 steps me"
      subtitle="Na parlour ki line, na phone par lambi baat. Aap choose karo, baaki hum sambhal lenge."
    >
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08} from="up">
            <li className="float-card relative h-full p-6">
              <span className="absolute right-5 top-4 font-display text-5xl text-white/[0.06]">
                {i + 1}
              </span>
              <span aria-hidden className="inline-block animate-floaty text-3xl">
                {s.glyph}
              </span>
              <h3 className="mt-4 font-display text-xl text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{s.detail}</p>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.2}>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {enabledModes.map((m) => {
            const mode = salon.serviceModes[m];
            return (
              <div key={m} className="glass-soft rounded-2xl p-5">
                <p className="font-display text-lg text-gold-100">
                  {m === 'home' ? '🏡' : '🌸'} {mode.label}
                </p>
                <p className="mt-1 text-sm text-white/60">{mode.detail}</p>
                {mode.travelNote && <p className="mt-2 text-xs text-white/40">{mode.travelNote}</p>}
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Button size="lg" icon={<CalendarHeart size={17} />} onClick={() => openBooking({ from: 'how-it-works' })}>
            Start booking
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
