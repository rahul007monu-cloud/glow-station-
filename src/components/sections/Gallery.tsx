import { motion } from 'framer-motion';
import { Camera, Instagram } from 'lucide-react';
import Reveal from '@/components/fx/Reveal';
import { LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { gallery, salon } from '@/data/salon';

const tints = [
  'from-lilac-500/40 via-rose-400/20',
  'from-rose-500/40 via-gold-300/20',
  'from-gold-500/40 via-lilac-400/20',
  'from-lilac-400/40 via-gold-200/20',
  'from-rose-400/40 via-lilac-500/20',
  'from-gold-400/40 via-rose-300/20',
];

export default function Gallery() {
  return (
    <Section
      id="gallery"
      eyebrow="Lookbook"
      title="Our"
      highlight="transformations"
      subtitle="Real clients, real results. Roz naye looks Instagram par post hote hain."
    >
      <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] md:grid-cols-3">
        {gallery.map((item, i) => (
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            whileHover={{ y: -8 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 ${
              item.tall ? 'row-span-2' : ''
            }`}
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br to-transparent ${
                  tints[i % tints.length]
                }`}
              >
                <Camera className="animate-floaty text-white/25" size={30} />
              </div>
            )}

            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4">
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-gold-300/90">
                {item.tag}
              </span>
              <p className="mt-0.5 text-sm font-medium text-white">{item.label}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="glass mt-10 flex flex-col items-center gap-4 rounded-3xl p-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-2xl text-white">Full portfolio Instagram par hai</h3>
            <p className="mt-1 text-sm text-white/55">
              Daily reels, client reviews aur before-after — {salon.instagramHandle}
            </p>
          </div>
          <LinkButton
            external
            href={salon.instagram}
            variant="outline"
            icon={<Instagram size={16} />}
          >
            Follow us
          </LinkButton>
        </div>
      </Reveal>
    </Section>
  );
}
