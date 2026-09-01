/**
 * The salon's actual logo mark, rebuilt as vector: an ivory disc with a gold
 * line-art face (eyes, lashes, lips and the hand-to-cheek pose) and the "GS"
 * monogram underneath — same as the signboard badge.
 */
export default function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Glow Station logo">
        <defs>
          <linearGradient id="gsGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdf6e3" />
            <stop offset="42%" stopColor="#d0a955" />
            <stop offset="100%" stopColor="#9c722c" />
          </linearGradient>
          <radialGradient id="gsDisc" cx="38%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#fffdf9" />
            <stop offset="100%" stopColor="#f2ece0" />
          </radialGradient>
        </defs>

        {/* ivory disc with a fine gold rim */}
        <circle cx="50" cy="50" r="47" fill="url(#gsDisc)" />
        <circle cx="50" cy="50" r="47" fill="none" stroke="url(#gsGold)" strokeWidth="1.6" />

        <g
          fill="none"
          stroke="url(#gsGold)"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* face outline */}
          <path d="M35 26c8-6 20-6 27 2 5 6 5 14 3 21-2 8-8 14-15 14s-13-6-15-14c-2-8-2-17 0-23z" />
          {/* brows */}
          <path d="M38 40c2.5-2 6-2 8.5 0M53 40c2.5-2 6-2 8.5 0" />
          {/* eyes with lashes */}
          <path d="M38.5 46c2-2.4 6-2.4 8 0-2 2.4-6 2.4-8 0z" />
          <path d="M53.5 46c2-2.4 6-2.4 8 0-2 2.4-6 2.4-8 0z" />
          <path d="M36.5 43.5 34 41.5M63.5 43.5 66 41.5" />
          {/* lips */}
          <path d="M45 57c2 1.6 8 1.6 10 0-1.6 3-8.4 3-10 0z" />
          {/* hand resting on the cheek */}
          <path d="M64 55c4 1 7 4 7 8 0 5-4 8-9 8" />
          <path d="M66 58.5c1.6.4 2.8 1.6 2.8 3.2M64.5 62c1.6.4 2.8 1.6 2.8 3.2" />
          {/* hair sweep */}
          <path d="M31 34c-3 9-3 19 1 27M69 34c3 9 3 19-1 27" />
        </g>

        {/* GS monogram */}
        <text
          x="50"
          y="86"
          textAnchor="middle"
          fontFamily="Montserrat, 'Plus Jakarta Sans', sans-serif"
          fontSize="21"
          fontWeight="700"
          letterSpacing="1"
          fill="url(#gsGold)"
        >
          GS
        </text>
      </svg>
    </span>
  );
}
