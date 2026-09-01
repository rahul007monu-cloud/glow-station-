import { CalendarHeart, Gift, Home, Scissors, Sparkles } from 'lucide-react';
import { useBooking } from '@/context/BookingProvider';

const items = [
  { label: 'Home', href: '#top', icon: Home },
  { label: 'Services', href: '#services', icon: Scissors },
  { label: 'Packages', href: '#packages', icon: Sparkles },
  { label: 'Rewards', href: '#rewards', icon: Gift },
];

/** App-like bottom navigation — makes the PWA feel native on phones. */
export default function MobileDock() {
  const { openBooking } = useBooking();

  return (
    <nav className="dock-safe fixed inset-x-0 bottom-0 z-[65] px-3 pb-2 sm:hidden">
      <div className="glass flex items-center justify-between rounded-3xl border-ivory-400/60 px-2 py-2">
        {items.slice(0, 2).map((item) => (
          <DockLink key={item.href} {...item} />
        ))}

        <button
          onClick={() => openBooking({ from: 'mobile-dock' })}
          className="-mt-7 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-gold-sheen bg-[length:200%_auto] text-ink shadow-glow"
          aria-label="Book appointment"
        >
          <CalendarHeart size={20} />
          <span className="text-[0.55rem] font-bold uppercase">Book</span>
        </button>

        {items.slice(2).map((item) => (
          <DockLink key={item.href} {...item} />
        ))}
      </div>
    </nav>
  );
}

function DockLink({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: typeof Home;
}) {
  return (
    <a
      href={href}
      className="flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 text-ink-muted transition active:scale-95 hover:text-gold-500"
    >
      <Icon size={18} />
      <span className="text-[0.6rem] font-medium tracking-wide">{label}</span>
    </a>
  );
}
