import { Clock, Instagram, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/components/layout/Logo';
import { salon } from '@/data/salon';
import { telLink, waLink } from '@/lib/booking';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 border-t border-white/[0.08] px-5 pb-28 pt-16 sm:px-8 sm:pb-12">
      <div className="shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-11 w-11" />
            <div>
              <p className="font-display text-2xl text-white">{salon.name}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-300/80">
                {salon.suffix}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">{salon.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip">
              <ShieldCheck size={13} className="text-gold-300" /> Hygiene certified
            </span>
            <span className="chip">★ {salon.stats[0].value} rated</span>
            <span className="chip">Since {salon.establishedYear}</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Visit us
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-300" />
              <a href={salon.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {salon.address.line1}, {salon.address.line2}
                <br />
                {salon.address.city}, {salon.address.state} – {salon.address.pincode}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-gold-300" />
              <span>
                Mon–Fri {salon.hours.weekdays}
                <br />
                Sat–Sun {salon.hours.weekends}
                <br />
                <span className="text-white/40">{salon.hours.closedDay}</span>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Reach us
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li>
              <a href={telLink()} className="flex items-center gap-2.5 hover:text-white">
                <Phone size={16} className="text-gold-300" /> {salon.phone}
              </a>
            </li>
            <li>
              <a
                href={waLink(`Hi ${salon.legalName}, mujhe booking karni hai.`)}
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
            <li>
              <a href={`mailto:${salon.email}`} className="flex items-center gap-2.5 hover:text-white">
                <Mail size={16} className="text-gold-300" /> {salon.email}
              </a>
            </li>
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
        © {year} {salon.legalName}. All rights reserved. · Prices are starting prices and may vary
        with hair length, product choice and service add-ons.
      </p>
    </footer>
  );
}
