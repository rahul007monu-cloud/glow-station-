import { asset, salon } from '@/data/salon';

/**
 * Brand mark used in the navbar, footer and menus.
 *
 * If `salon.logoSrc` is set (e.g. 'images/logo.png' in /public), the official
 * Divine Touch logo is shown. Otherwise a vector monogram in the same style —
 * gold ring, leaf sprig, pink script "T" and a sparkle — keeps things on-brand.
 */
export default function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  if (salon.logoSrc) {
    return (
      <span className={`relative inline-block ${className}`}>
        <img
          src={asset(salon.logoSrc)}
          alt={`${salon.legalName} logo`}
          className="h-full w-full rounded-full object-cover"
        />
      </span>
    );
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-rose-400/25" />
      <svg viewBox="0 0 64 64" className="relative h-full w-full" role="img" aria-label={`${salon.legalName} logo`}>
        <defs>
          <linearGradient id="dtGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdf8ec" />
            <stop offset="45%" stopColor="#e7c35d" />
            <stop offset="100%" stopColor="#a77616" />
          </linearGradient>
          <linearGradient id="dtPink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3d7dc" />
            <stop offset="100%" stopColor="#d68fa0" />
          </linearGradient>
          <radialGradient id="dtBg" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#2a1a16" />
            <stop offset="100%" stopColor="#0b0908" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#dtBg)" />
        {/* open gold ring like the official logo */}
        <path d="M14 50 A26 26 0 1 1 50 50" fill="none" stroke="url(#dtGold)" strokeWidth="1.6" strokeLinecap="round" />
        {/* leaf sprig, bottom-left */}
        <g fill="url(#dtGold)" opacity="0.9">
          <ellipse cx="13" cy="44" rx="1.6" ry="3.2" transform="rotate(-35 13 44)" />
          <ellipse cx="10.5" cy="38" rx="1.4" ry="2.8" transform="rotate(-15 10.5 38)" />
          <ellipse cx="17.5" cy="49" rx="1.5" ry="3" transform="rotate(-60 17.5 49)" />
        </g>
        <text
          x="27"
          y="40"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="24"
          fontWeight="600"
          fill="url(#dtGold)"
        >
          D
        </text>
        <text
          x="39"
          y="44"
          textAnchor="middle"
          fontFamily="Great Vibes, Brush Script MT, cursive"
          fontSize="24"
          fill="url(#dtPink)"
        >
          T
        </text>
        {/* sparkle */}
        <path d="M47 13l1.4 3.8L52 18l-3.6 1.3L47 23l-1.4-3.7L42 18l3.6-1.2z" fill="#fdf8ec" opacity="0.9" />
      </svg>
    </span>
  );
}

/** Wordmark: serif "Divine", script "Touch", small "by Diksha Gupta". */
export function Wordmark({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const lg = size === 'lg';
  return (
    <span className="leading-none">
      <span className={`block whitespace-nowrap ${lg ? 'text-2xl' : 'text-lg'}`}>
        <span className="font-display tracking-wide text-gold-100">{salon.name}</span>{' '}
        <span className={`script text-rose-300 ${lg ? 'text-3xl' : 'text-2xl'}`}>{salon.suffix}</span>
      </span>
      <span
        className={`block uppercase text-gold-300/80 ${
          lg ? 'mt-1 text-[0.65rem] tracking-[0.32em]' : 'text-[0.55rem] tracking-[0.28em]'
        }`}
      >
        by {salon.owner}
      </span>
    </span>
  );
}
