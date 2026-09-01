import { Star } from 'lucide-react';
import Marquee from '@/components/fx/Marquee';
import Reveal from '@/components/fx/Reveal';
import { salon } from '@/data/salon';

const brands = [
  "L'Oréal Professionnel",
  'Schwarzkopf',
  'Kérastase',
  'O3+',
  'Rica Wax',
  'Olaplex',
];

/** Numbers + brand ticker, right after the customer steps inside. */
export default function TrustStrip() {
  return (
    <section className="relative px-5 py-14 sm:px-8">
      <div className="shell">
        <Reveal>
          <div className="mb-8 text-center">
            <span className="chip bg-white shadow-card">
              <Star size={12} className="fill-gold-400 text-gold-400" />
              {salon.stats[0].value} on Google · {salon.address.line2}, {salon.address.city}
            </span>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
              {salon.intro}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {salon.stats.map((s) => (
              <div key={s.label} className="vitrine px-4 py-5 text-center">
                <dt className="font-display text-3xl text-gold-600">{s.value}</dt>
                <dd className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-ink-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-10">
          <Marquee items={brands} />
        </div>
      </div>
    </section>
  );
}
