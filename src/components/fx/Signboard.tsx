import Logo from '@/components/layout/Logo';
import { salon } from '@/data/salon';

/**
 * A faithful rebuild of the shop's signboard: ivory board, gold channel
 * letters, charcoal plates for LUXE SALON / HIM-HER and the service list.
 *
 * `compact` is the hero variant — smaller type and tighter padding so it never
 * fights with the fixed navigation.
 */
export default function Signboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`board w-full ${compact ? 'px-4 py-4 sm:px-5' : 'px-4 py-5 sm:px-7 sm:py-6'}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <Logo className={compact ? 'h-14 w-14 shrink-0 sm:h-16 sm:w-16' : 'h-20 w-20 sm:h-24 sm:w-24'} />

        <div className="min-w-0 flex-1">
          <p
            className={`sign-letters leading-[0.98] ${
              compact ? 'text-[1.5rem] sm:text-[2.1rem]' : 'text-[1.9rem] sm:text-[3rem]'
            }`}
          >
            Glow Station
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="plate">Luxe Salon</span>
            <span className="plate">{salon.audience}</span>
            <span className="plate">Mob. {salon.phone.replace('+91', '')}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
        {salon.boardPlates.map((label) => (
          <span key={label} className="plate w-full">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
