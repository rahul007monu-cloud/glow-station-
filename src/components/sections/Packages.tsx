import { motion } from 'framer-motion';
import { BadgeCheck, CalendarClock, Check, Crown, MessageCircle, Users } from 'lucide-react';
import Parallax from '@/components/fx/Parallax';
import Reveal from '@/components/fx/Reveal';
import TiltCard from '@/components/fx/TiltCard';
import { Button, LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useBooking } from '@/context/BookingProvider';
import { formatINR, packageUsps, packages, salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { waLink } from '@/lib/booking';

export default function Packages() {
  const { openBooking } = useBooking();

  return (
    <Section
      id="packages"
      eyebrow="Memberships"
      title="Packages jo"
      highlight="paisa bachate hain"
      subtitle="Ek-ek service alag lene se 25–38% zyada kharcha hota hai. Package lo, saving likhit me pao — aur priority slot bhi."
    >
      {/* Why a package at all — the USP strip */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {packageUsps.map((u, i) => (
          <Reveal key={u.title} delay={i * 0.08}>
            <div className="glass-soft h-full rounded-2xl p-5">
              <span aria-hidden className="text-2xl">
                {u.glyph}
              </span>
              <h3 className="mt-3 font-display text-lg text-gold-100">{u.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">{u.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {packages.map((p, i) => {
          const saving = p.mrp ? p.mrp - p.price : 0;
          const savingPct = p.mrp ? Math.round((saving / p.mrp) * 100) : 0;

          return (
            <Reveal key={p.id} delay={i * 0.1} from="up">
              <Parallax speed={i === 1 ? 52 : 20} tilt={i === 1 ? 0 : 0.6}>
              <TiltCard
                intensity={5}
                className={`vitrine h-full p-6 ${
                  p.highlight
                    ? 'border-gold-300/40 bg-gradient-to-b from-gold-300/[0.12] to-transparent shadow-glow'
                    : ''
                }`}
              >
                <div className="relative z-20 flex h-full flex-col">
                  {/* header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {p.badge && (
                        <span className="chip mb-2 border-gold-300/40 bg-gold-300/15 text-gold-100">
                          <Crown size={11} /> {p.badge}
                        </span>
                      )}
                      <h3 className="font-display text-2xl leading-tight text-white">{p.name}</h3>
                      <p className="mt-1.5 text-xs text-white/50">{p.bestFor}</p>
                    </div>
                    {savingPct > 0 && (
                      <div className="shrink-0 rounded-2xl border border-rose-400/30 bg-rose-500/15 px-3 py-2 text-center">
                        <p className="font-display text-xl leading-none text-rose-300">
                          {savingPct}%
                        </p>
                        <p className="text-[0.6rem] uppercase tracking-wider text-rose-200/80">
                          off
                        </p>
                      </div>
                    )}
                  </div>

                  {/* price block with explicit saving maths */}
                  <div className="mt-5 rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                    <div className="flex items-end gap-2.5">
                      <p className="font-display text-4xl text-gold-100">{formatINR(p.price)}</p>
                      {p.mrp && (
                        <p className="pb-1 text-sm text-white/35 line-through">
                          {formatINR(p.mrp)}
                        </p>
                      )}
                    </div>
                    {saving > 0 && (
                      <p className="mt-1.5 text-sm font-semibold text-[#5be584]">
                        Aap bachate ho {formatINR(saving)}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem] text-white/50">
                      <span className="chip">
                        <CalendarClock size={11} /> {p.validity}
                      </span>
                      {p.payment && <span className="chip">{p.payment}</span>}
                    </div>
                  </div>

                  {/* USPs — the actual selling points */}
                  <ul className="mt-5 space-y-3">
                    {p.usps.map((u) => (
                      <li key={u.title} className="flex gap-2.5">
                        <BadgeCheck size={16} className="mt-0.5 shrink-0 text-gold-300" />
                        <span>
                          <span className="block text-sm font-semibold text-white/90">
                            {u.title}
                          </span>
                          <span className="block text-xs leading-relaxed text-white/50">
                            {u.detail}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* what's inside */}
                  <div className="mt-5 border-t border-white/[0.08] pt-4">
                    <p className="mb-2.5 text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
                      Package me shaamil
                    </p>
                    <ul className="space-y-2">
                      {p.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                          <Check size={14} className="mt-0.5 shrink-0 text-[#5be584]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* scarcity + CTA */}
                  <div className="mt-6 space-y-2.5">
                    {typeof p.seatsLeft === 'number' && (
                      <div>
                        <div className="flex items-center justify-between text-[0.68rem] text-white/50">
                          <span className="inline-flex items-center gap-1">
                            <Users size={11} /> Is mahine ke seats
                          </span>
                          <span className="text-rose-300">only {p.seatsLeft} left</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.span
                            className="block h-full rounded-full bg-gradient-to-r from-rose-500 to-gold-300"
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${Math.min(100, 100 - p.seatsLeft * 6)}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    )}

                    <Button
                      full
                      variant={p.highlight ? 'gold' : 'outline'}
                      onClick={() => {
                        track('InitiateCheckout', {
                          content_name: p.name,
                          value: p.price,
                          currency: 'INR',
                          content_type: 'package',
                        });
                        openBooking({ from: `package-${p.id}` });
                      }}
                    >
                      Grab this package
                    </Button>
                    <LinkButton
                      full
                      size="sm"
                      variant="ghost"
                      external
                      href={waLink(
                        `Hi ${salon.legalName}! Mujhe *${p.name}* (${formatINR(
                          p.price,
                        )}) ke baare me detail chahiye. Kya is mahine seat available hai?`,
                      )}
                      icon={<MessageCircle size={14} />}
                      onClick={() =>
                        track('Lead', {
                          content_name: p.name,
                          value: p.price,
                          currency: 'INR',
                          method: 'whatsapp',
                        })
                      }
                    >
                      Ask on WhatsApp
                    </LinkButton>
                  </div>
                </div>
              </TiltCard>
              </Parallax>
            </Reveal>
          );
        })}
      </div>

      {/* Comparison: pay-per-visit vs member */}
      <Reveal delay={0.15}>
        <div className="glass mt-12 overflow-hidden rounded-3xl">
          <div className="grid divide-y divide-white/[0.08] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Without package
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/55">
                <li>• Har visit par full price</li>
                <li>• Peak hours par waiting</li>
                <li>• Stylist available ho to ho</li>
                <li>• Koi free add-on nahi</li>
              </ul>
            </div>
            <div className="bg-gold-300/[0.06] p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-gold-300">
                With Glow package
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                <li>✓ Upto 38% kam kharcha</li>
                <li>✓ Reserved priority slot</li>
                <li>✓ Fixed senior stylist</li>
                <li>✓ Free massage + consultation</li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
