/**
 * The salon's real logo, rebuilt as vector: blush-pink disc with a gold rim,
 * the glam face with black cat-eye sunglasses, red lips and red nails, and
 * "GLOW STATION · LUXE SALON" in gold underneath.
 */
export default function Logo({
  className = 'h-10 w-10',
  /** `mark` drops the in-badge wordmark — use it below ~64px, where the
      lettering would turn into unreadable mush next to real text. */
  variant = 'full',
}: {
  className?: string;
  variant?: 'full' | 'mark';
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full" role="img" aria-label="Glow Station Luxe Salon logo">
        <defs>
          <linearGradient id="gsRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f7ebcb" />
            <stop offset="45%" stopColor="#d0a955" />
            <stop offset="100%" stopColor="#9c722c" />
          </linearGradient>
          <radialGradient id="gsDisc" cx="38%" cy="28%" r="85%">
            <stop offset="0%" stopColor="#fbe6f0" />
            <stop offset="100%" stopColor="#f2c9de" />
          </radialGradient>
        </defs>

        {/* blush disc + gold rim */}
        <circle cx="60" cy="60" r="57" fill="url(#gsDisc)" />
        <circle cx="60" cy="60" r="57" fill="none" stroke="url(#gsRim)" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="51" fill="none" stroke="url(#gsRim)" strokeWidth="0.9" opacity="0.8" />

        {/* hair */}
        <path
          d="M32 46c1-16 13-27 28-27s27 11 28 27c-6-9-16-13-28-13s-22 4-28 13z"
          fill="#241a1f"
        />

        {/* brows */}
        <g stroke="#241a1f" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M40 44c5-3.5 12-3.5 17 0" />
          <path d="M63 44c5-3.5 12-3.5 17 0" />
        </g>

        {/* cat-eye sunglasses */}
        <g fill="#1b1418">
          <path d="M37 52c7-2 14-2 20 1 1 5-3 10-9 11s-11-3-12-8c-.3-1.6.4-3.4 1-4z" />
          <path d="M83 52c-7-2-14-2-20 1-1 5 3 10 9 11s11-3 12-8c.3-1.6-.4-3.4-1-4z" />
          <rect x="56" y="54" width="8" height="2.6" rx="1.3" />
        </g>

        {/* lips */}
        <path
          d="M52 76c3-2.6 13-2.6 16 0-2.2 4.6-13.8 4.6-16 0z"
          fill="#c8102e"
        />
        <path d="M52 76c3-1.4 13-1.4 16 0-3.4-3.4-12.6-3.4-16 0z" fill="#e0324a" />

        {/* hand resting at the chin, red nails */}
        <g fill="none" stroke="#241a1f" strokeWidth="2.2" strokeLinecap="round">
          <path d="M74 84c5-1 9 2 10 6" />
          <path d="M70 88c4-1.4 7.5.4 9 3.6" />
        </g>
        <g fill="#c8102e">
          <ellipse cx="85" cy="90" rx="2.6" ry="1.8" transform="rotate(-24 85 90)" />
          <ellipse cx="80" cy="92.5" rx="2.4" ry="1.7" transform="rotate(-18 80 92.5)" />
        </g>

        {/* brand text */}
        {variant === 'full' && (
          <>
        <text
          x="60"
          y="103"
          textAnchor="middle"
          fontFamily="Montserrat, 'Plus Jakarta Sans', sans-serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.6"
          fill="url(#gsRim)"
        >
          GLOW STATION
        </text>
        <text
          x="60"
          y="112"
          textAnchor="middle"
          fontFamily="Montserrat, 'Plus Jakarta Sans', sans-serif"
          fontSize="6.2"
          letterSpacing="2.4"
          fill="#a9743f"
        >
          LUXE SALON
        </text>
          </>
        )}
      </svg>
    </span>
  );
}
