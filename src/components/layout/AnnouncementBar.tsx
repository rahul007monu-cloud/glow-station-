import { Sparkles } from 'lucide-react';
import { offers } from '@/data/salon';
import { useCountdown } from '@/lib/hooks';

/** Slim urgency strip above the fold — drives offer awareness on every visit. */
export default function AnnouncementBar() {
  const live = offers.filter((o) => new Date(o.expires).getTime() > Date.now());
  const featured = live[0];
  const t = useCountdown(featured?.expires ?? new Date().toISOString());

  if (!featured) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] hidden bg-ink-plate py-1.5 text-center text-xs text-ivory-100 md:block">
      <span className="inline-flex items-center gap-2">
        <Sparkles size={13} className="text-gold-300" />
        <strong className="font-semibold">{featured.title}</strong>
        <span className="text-gold-200">— code {featured.code}</span>
        {t.total > 0 && t.days < 60 && (
          <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 font-mono text-[0.65rem] tracking-wider text-ivory-50">
            {t.days}d {String(t.hours).padStart(2, '0')}h {String(t.minutes).padStart(2, '0')}m left
          </span>
        )}
      </span>
    </div>
  );
}
