import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, MessageCircle, Phone, Plus, Star, X } from 'lucide-react';
import { useState } from 'react';
import { salon } from '@/data/salon';
import { track } from '@/lib/analytics';
import { telLink, waLink } from '@/lib/booking';
import { useScrolled } from '@/lib/hooks';

const quickMessage = `Hi ${salon.legalName}! Mujhe appointment ke baare me jaankari chahiye.`;

/**
 * Floating action cluster (desktop right edge / above the mobile dock).
 * WhatsApp is the primary conversion path for Indian salons, so it stays
 * one tap away on every screen.
 */
export default function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const scrolled = useScrolled(600);

  const actions = [
    {
      label: 'WhatsApp',
      href: waLink(quickMessage),
      external: true,
      icon: <MessageCircle size={18} />,
      className: 'bg-[#25D366] text-[#04310f]',
      onClick: () => track('Contact', { method: 'whatsapp', placement: 'fab' }),
    },
    {
      label: 'Call now',
      href: telLink(),
      icon: <Phone size={18} />,
      className: 'bg-gold-sheen text-ink',
      onClick: () => track('Contact', { method: 'call', placement: 'fab' }),
    },
    {
      label: 'Review us',
      href: salon.googleReviewLink,
      external: true,
      icon: <Star size={18} />,
      className: 'bg-white/75 text-ink',
      onClick: () => track('Contact', { method: 'google-review', placement: 'fab' }),
    },
  ];

  return (
    <div className="fixed bottom-24 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-8 sm:right-6">
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="glass rounded-full p-3 text-ink-soft hover:text-ink"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded &&
          actions.map((a, i) => (
            <motion.a
              key={a.label}
              href={a.href}
              onClick={a.onClick}
              {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              initial={{ opacity: 0, y: 16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.8 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-2 rounded-full py-2.5 pl-4 pr-3 text-sm font-semibold shadow-lift ${a.className}`}
            >
              {a.label}
              {a.icon}
            </motion.a>
          ))}
      </AnimatePresence>

      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? 'Close quick actions' : 'Open quick actions'}
        className="relative animate-floaty rounded-full bg-[#25D366] p-4 text-[#04310f] shadow-[0_0_44px_-8px_rgba(37,211,102,0.9)] transition active:scale-95"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50" />
        {expanded ? <X size={22} /> : <MessageCircle size={22} />}
        {!expanded && (
          <span className="absolute -right-0.5 -top-0.5 rounded-full bg-ink p-0.5">
            <Plus size={10} className="text-gold-500" />
          </span>
        )}
      </button>
    </div>
  );
}
