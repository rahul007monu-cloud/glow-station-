import { Clock, Instagram, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo, { Wordmark } from '@/components/layout/Logo';
import { salon } from '@/data/salon';
import { telLink, waLink } from '@/lib/booking';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 border-t border-white/[0.08] px-5 pb-28 pt-16 sm:px-8 sm:pb-12">
      <div className="shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <Wordmark size="lg" />
          </div>
          <p className="script mt-4 text-2xl text-gold-200">{salon.motto}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55">{salon.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip">
              <ShieldCheck size={13} className="text-gold-300" /> Hygienic & safe
            </span>
            <span className="chip">🏡 Home service</span>
            <span className="chip">✨ Satisfaction guaranteed</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Where & when
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-300" />
              <span>{salon.serviceAreas.join(', ')}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-gold-300" />
              <span>
                Mon–Fri {salon.hours.weekdays}
                <br />
                Sat–Sun {salon.hours.weekends}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Connect with us
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li>
              <a href={telLink()} className="flex items-center gap-2.5 hover:text-white">
                <Phone size={16} className="text-gold-300" /> {salon.phone}
              </a>
            </li>
            <li>
              <a
                href={waLink(`Hi ${salon.owner}, mujhe booking karni hai.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white"
              >
                <span className="text-[#25D366]">◉</span> WhatsApp booking
              </a>
            </li>
            <li>
              <a
                href={salon.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white"
              >
                <Instagram size={16} className="text-rose-400" /> {salon.instagramHandle}
              </a>
            </li>
            {salon.email && (
              <li>
                <a href={`mailto:${salon.email}`} className="flex items-center gap-2.5 hover:text-white">
                  <Mail size={16} className="text-gold-300" /> {salon.email}
                </a>
              </li>
            )}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/35">
            <a href="#services" className="hover:text-white/70">
              Services
            </a>
            <a href="#packages" className="hover:text-white/70">
              Packages
            </a>
            <Link to="/offer" className="hover:text-white/70">
              Offers page
            </Link>
            <Link to="/admin" className="hover:text-white/70">
              Owner login
            </Link>
          </div>
        </div>
      </div>

      <div className="hairline mt-12" />
      <p className="shell mt-6 text-center text-xs text-white/35">
        © {year} {salon.legalName} by {salon.owner}. All rights reserved. · Prices are starting
        prices and may vary with hair length, products and add-ons. Home-visit travel charges, if
        any, are shared before confirmation.
      </p>
    </footer>
  );
}
