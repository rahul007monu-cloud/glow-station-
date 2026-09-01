import { AnimatePresence, motion } from 'framer-motion';
import { CalendarHeart, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/layout/Logo';
import { Button, LinkButton } from '@/components/ui/Button';
import { useBooking } from '@/context/BookingProvider';
import { salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { telLink } from '@/lib/booking';
import { useScrolled } from '@/lib/hooks';

const links = [
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Offers', href: '#offers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const scrolled = useScrolled(30);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 md:pt-10"
      >
        <nav
          className={`shell flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
            scrolled ? 'glass border-gold-300/20 shadow-lift' : 'border border-transparent'
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5" aria-label={salon.legalName}>
            <Logo variant="mark" className="h-9 w-9" />
            <span className="leading-none">
              <span className="block font-display text-lg tracking-wide text-ink">
                {salon.name}
              </span>
              <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-gold-500/80">
                {salon.suffix}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative rounded-full px-3.5 py-2 text-sm text-ink-soft transition hover:text-ink"
                >
                  {l.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold-300 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LinkButton
              href={telLink()}
              variant="dark"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<Phone size={14} />}
              onClick={() => track('Contact', { method: 'call', placement: 'navbar' })}
            >
              Call
            </LinkButton>
            <Button
              size="sm"
              icon={<CalendarHeart size={15} />}
              onClick={() => openBooking({ from: 'navbar' })}
            >
              Book now
            </Button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-ivory-400/60 bg-white/75 p-2.5 text-ink-soft lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-ink/90 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 pt-6">
              <Logo variant="mark" className="h-10 w-10" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-ivory-400/60 bg-white/75 p-2.5 text-ink"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="mt-10 space-y-2 px-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-ivory-400/60 py-4 font-display text-3xl text-ink-soft"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 space-y-3 px-6">
              <Button
                full
                size="lg"
                onClick={() => {
                  setMenuOpen(false);
                  openBooking({ from: 'mobile-menu' });
                }}
              >
                Book an appointment
              </Button>
              <LinkButton full variant="dark" href={telLink()} icon={<Phone size={16} />}>
                {salon.phone}
              </LinkButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
