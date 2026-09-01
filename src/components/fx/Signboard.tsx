import Logo from '@/components/layout/Logo';
import { salon } from '@/data/salon';

/**
 * A faithful rebuild of the shop's signboard: ivory ACP board, gold channel
 * letters, and the charcoal plates for LUXE SALON / HIM-HER / services.
 * Used as the storefront the visitor walks through on arrival.
 */
export default function Signboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="board w-full px-4 py-4 sm:px-7 sm:py-6">
      {/* top row: mobile plate, like the real board */}
      <div className="mb-3 flex justify-end">
        <span className="plate">Mob. {salon.phone.replace('+91', '')}</span>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <Logo className={compact ? 'h-14 w-14' : 'h-20 w-20 sm:h-28 sm:w-28'} />

        <div className="min-w-0 flex-1">
          <h1
            className={`sign-letters leading-[0.95] ${
              compact ? 'text-[1.6rem]' : 'text-[2rem] sm:text-[3.4rem] lg:text-[4.2rem]'
            }`}
          >
            Glow Station
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="plate">Luxe Salon</span>
            <span className="plate">{salon.audience}</span>
          </div>
        </div>
      </div>

      {/* service plates row */}
      <div className="mt-4 grid grid-cols-3 gap-1.5 sm:grid-cols-5 sm:gap-2">
        {salon.boardPlates.map((label) => (
          <span key={label} className="plate w-full">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
