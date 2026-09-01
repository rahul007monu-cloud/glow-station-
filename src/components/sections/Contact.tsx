import { CalendarHeart, Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import Reveal from '@/components/fx/Reveal';
import { Button, LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useBooking } from '@/context/BookingProvider';
import { salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { telLink, waLink } from '@/lib/booking';

export default function Contact() {
  const { openBooking } = useBooking();

  return (
    <Section
      id="contact"
      eyebrow="Visit us"
      title="Aaj hi"
      highlight="milte hain"
      subtitle="Walk-in welcome hai, lekin slot book karke aayen to waiting zero."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="float-card h-full p-6">
            <ul className="space-y-5">
              <li className="flex gap-3">
                <span className="rounded-2xl border border-gold-300/25 bg-gold-300/10 p-2.5 text-gold-200">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Address
                  </span>
                  <span className="mt-1 block text-sm text-white/80">
                    {salon.address.line1}, {salon.address.line2}
                    <br />
                    {salon.address.city}, {salon.address.state} – {salon.address.pincode}
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="rounded-2xl border border-gold-300/25 bg-gold-300/10 p-2.5 text-gold-200">
                  <Clock size={18} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Timings
                  </span>
                  <span className="mt-1 block text-sm text-white/80">
                    Mon–Fri · {salon.hours.weekdays}
                    <br />
                    Sat–Sun · {salon.hours.weekends}
                    <br />
                    <span className="text-white/45">{salon.hours.closedDay}</span>
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="rounded-2xl border border-gold-300/25 bg-gold-300/10 p-2.5 text-gold-200">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Call / WhatsApp
                  </span>
                  <a href={telLink()} className="mt-1 block text-sm text-white/80 hover:text-white">
                    {salon.phone}
                  </a>
                </span>
              </li>
            </ul>

            <div className="mt-7 space-y-2.5">
              <Button full icon={<CalendarHeart size={16} />} onClick={() => openBooking({ from: 'contact' })}>
                Book appointment
              </Button>
              <div className="grid grid-cols-2 gap-2.5">
                <LinkButton
                  variant="whatsapp"
                  external
                  href={waLink(`Hi ${salon.legalName}! Slot available hai?`)}
                  icon={<MessageCircle size={15} />}
                  onClick={() => track('Contact', { method: 'whatsapp', placement: 'contact' })}
                >
                  WhatsApp
                </LinkButton>
                <LinkButton
                  variant="dark"
                  external
                  href={salon.mapsLink}
                  icon={<Navigation size={15} />}
                  onClick={() => track('Contact', { method: 'directions', placement: 'contact' })}
                >
                  Directions
                </LinkButton>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full min-h-[22rem] overflow-hidden rounded-3xl p-1.5">
            <iframe
              title={`${salon.legalName} location map`}
              src={salon.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[21rem] w-full rounded-[1.35rem] grayscale-[35%] contrast-[1.1]"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
