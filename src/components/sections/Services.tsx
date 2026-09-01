import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Flame, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import Parallax from '@/components/fx/Parallax';
import Reveal from '@/components/fx/Reveal';
import TiltCard from '@/components/fx/TiltCard';
import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useBooking } from '@/context/BookingProvider';
import { allServices, categories, formatINR } from '@/data/salon';
import { track } from '@/lib/analytics';

export default function Services() {
  const [active, setActive] = useState(categories[0].id);
  const [query, setQuery] = useState('');
  const { openBooking } = useBooking();

  const visible = useMemo(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      return allServices.filter(
        (s) => s.name.toLowerCase().includes(q) || s.blurb.toLowerCase().includes(q),
      );
    }
    return allServices.filter((s) => s.categoryId === active);
  }, [active, query]);

  return (
    <Section
      id="services"
      eyebrow="Menu"
      title="Services &"
      highlight="starting prices"
      subtitle="Transparent pricing — koi hidden charge nahi. Final price hair length, product aur add-ons par depend karta hai; consultation free hai."
    >
      {/* Search */}
      <Reveal className="mx-auto mb-8 max-w-md">
        <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5">
          <Search size={16} className="text-gold-300" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length === 3) track('Search', { search_string: e.target.value });
            }}
            placeholder="Search e.g. keratin, facial, nails…"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            aria-label="Search services"
          />
        </div>
      </Reveal>

      {/* Floating category pills */}
      <div className="no-scrollbar -mx-5 mb-10 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {categories.map((c, i) => {
          const isActive = !query && c.id === active;
          return (
            <motion.button
              key={c.id}
              onClick={() => {
                setQuery('');
                setActive(c.id);
                track('ViewContent', { content_type: 'category', content_name: c.name });
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300 ${
                isActive
                  ? 'border-gold-300/60 bg-gold-300/15 text-gold-50 shadow-glow'
                  : 'border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white'
              }`}
            >
              <span aria-hidden className="text-base">
                {c.glyph}
              </span>
              {c.name}
            </motion.button>
          );
        })}
      </div>

      {/* Cards */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={query ? 'search' : active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((s, i) => (
            <Parallax key={s.id} speed={i % 3 === 1 ? 46 : 22} tilt={i % 2 ? 0.5 : -0.5}>
            <TiltCard className="vitrine group h-full p-5">
              <div className="relative z-20 flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl leading-snug text-white">{s.name}</h3>
                  {s.popular && (
                    <span className="chip shrink-0 border-rose-400/40 bg-rose-500/15 text-rose-300">
                      <Flame size={11} /> Hot
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.blurb}</p>

                <div className="mt-4 flex items-center gap-3 text-xs text-white/45">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {s.minutes} min
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/25" />
                  <span>{s.categoryName}</span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/[0.08] pt-4">
                  <div>
                    <p className="font-display text-2xl text-gold-100">{formatINR(s.price)}</p>
                    {s.mrp && (
                      <p className="text-xs text-white/35 line-through">{formatINR(s.mrp)}</p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<Plus size={13} />}
                    onClick={() => {
                      track('AddToCart', {
                        content_name: s.name,
                        value: s.price,
                        currency: 'INR',
                      });
                      openBooking({ serviceIds: [s.id], from: 'service-card' });
                    }}
                  >
                    Book
                  </Button>
                </div>
              </div>
            </TiltCard>
            </Parallax>
          ))}
        </motion.div>
      </AnimatePresence>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-white/50">
          Is service ka naam menu me nahi mila. WhatsApp par pooch lijiye — hum custom quote de denge.
        </p>
      )}
    </Section>
  );
}
