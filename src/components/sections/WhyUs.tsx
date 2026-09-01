import Reveal from '@/components/fx/Reveal';
import Section from '@/components/ui/Section';
import { salon } from '@/data/salon';

export default function WhyUs() {
  return (
    <Section
      eyebrow="Why Glow Station"
      title="Sirf service nahi,"
      highlight="ek experience"
      subtitle="Hamare 4 promises jo har visit par constant rehte hain."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {salon.usps.map((u, i) => (
          <Reveal key={u.title} delay={i * 0.09} from="scale">
            <div className="vitrine group relative h-full overflow-hidden p-6">
              <span
                aria-hidden
                className="absolute -right-6 -top-8 font-display text-[6rem] leading-none text-white/[0.04]"
              >
                0{i + 1}
              </span>
              <span aria-hidden className="inline-block animate-floaty text-3xl">
                {u.glyph}
              </span>
              <h3 className="mt-4 font-display text-xl text-white">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{u.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
