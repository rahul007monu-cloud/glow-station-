/**
 * Vector monogram used in the navbar, footer and app icons.
 * Replace with the salon's official logo file when available.
 */
export default function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-300/25" />
      <svg viewBox="0 0 64 64" className="relative h-full w-full" role="img" aria-label="Glow Station logo">
        <defs>
          <linearGradient id="gsGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdf8ec" />
            <stop offset="45%" stopColor="#e7c35d" />
            <stop offset="100%" stopColor="#a77616" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#130c1c" stroke="url(#gsGold)" strokeWidth="1.5" />
        <text
          x="32"
          y="41"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="26"
          fontWeight="600"
          fill="url(#gsGold)"
        >
          GS
        </text>
        {/* sparkle */}
        <path
          d="M48 16l1.6 4.4L54 22l-4.4 1.6L48 28l-1.6-4.4L42 22l4.4-1.6z"
          fill="#fdf8ec"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}
