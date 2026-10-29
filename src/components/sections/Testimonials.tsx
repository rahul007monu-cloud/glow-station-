import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Quote, Star } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { salon, testimonials } from '@/data/salon';
import { track } from '@/lib/analytics';
import { waLink } from '@/lib/booking';

/**
 * Shows real reviews from `testimonials` in salon.ts. Until the first ones are
 * added, a "be our first reviewer" card is shown instead of made-up quotes.
 */
export default function Testimonials() {
  const reviewHref =
    salon.googleReviewLink ||
    waLink(`Hi ${salon.owner}! Mera ${salon.legalName} experience share karna hai: `);

  return (
    <Section
      eyebrow="Reviews"
      title="Clients kya"
      highlight="kehte hain"
      subtitle={
        testimonials.length
          ? 'Divine Touch clients ke apne shabdon me.'
          : 'Naya brand, pehle clients — aapka feedback hamare liye sabse keemti hai.'
      }
    >
      {testimonials.length > 0 ? (
        <div className="mask-fade-x overflow-hidden">
          <motion.div
            className="flex w-max gap-5"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
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
      ) : (
        <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} size={18} className="fill-gold-300 text-gold-300" />
            ))}
          </div>
          <p className="mt-4 font-display text-2xl text-white">Hamare pehle reviewers me shamil ho</p>
          <p className="mt-2 text-sm text-white/55">
            Service ke baad apna experience share karo aur latest looks ke liye{' '}
            {salon.instagramHandle} follow karo.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <LinkButton
              external
              variant="whatsapp"
              size="sm"
              href={reviewHref}
              icon={<MessageCircle size={14} />}
              onClick={() => track('Contact', { method: 'review', placement: 'testimonials' })}
            >
              Share feedback
            </LinkButton>
            <LinkButton external variant="outline" size="sm" href={salon.instagram} icon={<Instagram size={14} />}>
              Instagram
            </LinkButton>
          </div>
        </div>
      )}

      {testimonials.length > 0 && (
        <div className="mt-10 text-center">
          <LinkButton
            external
            variant="outline"
            href={reviewHref}
            icon={<Star size={15} />}
            onClick={() => track('Contact', { method: 'google-review', placement: 'testimonials' })}
          >
            Apna review likhiye
          </LinkButton>
        </div>
      )}
    </Section>
  );
}
