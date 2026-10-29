import { CalendarHeart, Clock, Instagram, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import Reveal from '@/components/fx/Reveal';
import { Button, LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useBooking } from '@/context/BookingProvider';
import { salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { telLink, waLink } from '@/lib/booking';

export default function Contact() {
  const { openBooking } = useBooking();
  const { address } = salon;
  const studioLine = [address.line1, address.line2].filter(Boolean).join(', ');
  const cityLine = [address.city, address.state].filter(Boolean).join(', ') + (address.pincode ? ` – ${address.pincode}` : '');

  return (
    <Section
      id="contact"
      eyebrow="Connect with us"
      title="Let's"
      highlight="connect!"
      subtitle="Book your appointment today — WhatsApp, call ya Instagram, jo aapko easy lage."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="float-card h-full p-6">
            <ul className="space-y-5">
              <InfoRow icon={<MapPin size={18} />} label={salon.serviceModes.home.enabled ? 'Service area' : 'Studio'}>
                {salon.serviceModes.home.enabled ? (
                  <>Home service: {salon.serviceAreas.join(', ')}</>
                ) : null}
                {salon.serviceModes.studio.enabled && (studioLine || !salon.serviceModes.home.enabled) && (
                  <span className="block">
                    Studio: {studioLine ? `${studioLine}, ` : ''}
                    {cityLine}
                  </span>
                )}
              </InfoRow>
              <InfoRow icon={<Clock size={18} />} label="Timings">
                Mon–Fri · {salon.hours.weekdays}
                <br />
                Sat–Sun · {salon.hours.weekends}
                <br />
                <span className="text-white/45">{salon.hours.closedDay}</span>
              </InfoRow>
              <InfoRow icon={<Phone size={18} />} label="Call / WhatsApp">
                <a href={telLink()} className="hover:text-white">
                  {salon.phone}
                </a>
              </InfoRow>
              <InfoRow icon={<Instagram size={18} />} label="Instagram">
                <a href={salon.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {salon.instagramHandle}
                </a>
              </InfoRow>
            </ul>

            <div className="mt-7 space-y-2.5">
              <Button full icon={<CalendarHeart size={16} />} onClick={() => openBooking({ from: 'contact' })}>
                Book appointment
              </Button>
              <div className="grid grid-cols-2 gap-2.5">
                <LinkButton
                  variant="whatsapp"
                  external
                  href={waLink(`Hi ${salon.owner}! Slot available hai?`)}
                  icon={<MessageCircle size={15} />}
                  onClick={() => track('Contact', { method: 'whatsapp', placement: 'contact' })}
                >
                  WhatsApp
                </LinkButton>
                {salon.mapsLink ? (
                  <LinkButton
                    variant="dark"
                    external
                    href={salon.mapsLink}
                    icon={<Navigation size={15} />}
                    onClick={() => track('Contact', { method: 'directions', placement: 'contact' })}
                  >
                    Directions
                  </LinkButton>
                ) : (
                  <LinkButton
                    variant="dark"
                    href={telLink()}
                    icon={<Phone size={15} />}
                    onClick={() => track('Contact', { method: 'call', placement: 'contact' })}
                  >
                    Call
                  </LinkButton>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {salon.mapsEmbed ? (
            <div className="glass h-full min-h-[22rem] overflow-hidden rounded-3xl p-1.5">
              <iframe
                title={`${salon.legalName} studio location`}
                src={salon.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[21rem] w-full rounded-[1.35rem] grayscale-[35%] contrast-[1.1]"
              />
            </div>
          ) : (
            <div className="glass flex h-full min-h-[22rem] flex-col justify-center rounded-3xl bg-gradient-to-br from-lilac-500/20 via-rose-500/10 to-gold-300/10 p-8 text-center">
              <p className="text-5xl" aria-hidden>
                🏡
              </p>
              <h3 className="mt-4 font-display text-3xl text-white">
                Hum aate hain <span className="script text-rose-300">aapke paas</span>
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm text-white/60">
                Apni location WhatsApp par bhejo — Diksha sanitised kit ke saath aapke ghar pahunchengi.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {salon.serviceAreas.map((a) => (
                  <span key={a} className="chip">
                    <MapPin size={11} className="text-gold-300" /> {a}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-white/40">{salon.serviceModes.home.travelNote}</p>
              <LinkButton
                className="mx-auto mt-6"
                variant="outline"
                external
                href={waLink(`Hi ${salon.owner}! Kya aap mere area me home service dete ho? Mera area: `)}
                icon={<MessageCircle size={15} />}
              >
                Mera area check karo
              </LinkButton>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="h-fit rounded-2xl border border-gold-300/25 bg-gold-300/10 p-2.5 text-gold-200">{icon}</span>
      <span>
        <span className="block text-xs uppercase tracking-wider text-white/40">{label}</span>
        <span className="mt-1 block text-sm text-white/80">{children}</span>
      </span>
    </li>
  );
}
