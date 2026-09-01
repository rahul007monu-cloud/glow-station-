import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { salon, testimonials } from '@/data/salon';
import { track } from '@/lib/analytics';

export default function Testimonials() {
  /* Duplicated so the row can loop seamlessly. */
  const row = [...testimonials, ...testimonials];

  return (
    <Section
      eyebrow="Reviews"
      title="Clients kya"
      highlight="kehte hain"
      subtitle={`${salon.stats[0].value} average rating from ${salon.stats[1].value} visits.`}
    >
      <div className="mask-fade-x overflow-hidden">
        <motion.div
          className="flex w-max gap-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              className="glass w-[19rem] shrink-0 rounded-3xl p-6 sm:w-[22rem]"
            >
              <Quote className="text-gold-300/60" size={22} />
              <blockquote className="mt-3 text-sm leading-relaxed text-white/75">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/45">{t.service}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} size={13} className="fill-gold-300 text-gold-300" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>

      <div className="mt-10 text-center">
        <LinkButton
          external
          variant="outline"
          href={salon.googleReviewLink}
          icon={<Star size={15} />}
          onClick={() => track('Contact', { method: 'google-review', placement: 'testimonials' })}
        >
          Apna review likhiye
        </LinkButton>
        <p className="mt-3 text-xs text-white/40">
          Review dikhane par next visit par 5% extra discount 🎁
        </p>
      </div>
    </Section>
  );
}
