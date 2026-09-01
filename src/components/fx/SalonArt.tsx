/**
 * Hand-built CSS/SVG salon interiors. No stock photos needed, nothing to
 * download, and everything stays crisp on every screen. Jab asli photos aayen
 * to inhe background image se replace kiya ja sakta hai.
 */

/** Row of warm vanity bulbs, like a make-up mirror frame. */
export function VanityBulbs({ count = 9, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`flex justify-between ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 animate-twinkle rounded-full bg-gold-100 shadow-[0_0_14px_4px_rgba(253,248,236,0.55)]"
          style={{ animationDelay: `${(i % 5) * 0.45}s` }}
        />
      ))}
    </div>
  );
}

/** Reception: marble counter, gold signage, waiting sofa. */
export function ReceptionArt() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
      <div className="absolute inset-0 marble opacity-90" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 to-transparent" />

      {/* signage */}
      <div className="absolute left-1/2 top-10 -translate-x-1/2 text-center">
        <p className="font-display text-3xl text-gold-100 drop-shadow-[0_0_18px_rgba(231,195,93,0.5)]">
          Glow Station
        </p>
        <p className="mt-1 text-[0.55rem] uppercase tracking-[0.45em] text-white/60">Luxe Salon</p>
      </div>

      {/* counter */}
      <div className="absolute inset-x-8 bottom-10 h-28 rounded-2xl border border-white/15 bg-gradient-to-b from-white/25 to-white/[0.06] backdrop-blur-sm">
        <div className="absolute inset-x-6 top-3 h-px bg-gradient-to-r from-transparent via-gold-200/60 to-transparent" />
        {/* orchid vase */}
        <div className="absolute -top-12 left-8 flex flex-col items-center">
          <span className="h-8 w-1 rounded bg-lilac-400/70" />
          <span className="h-3 w-3 -translate-y-1 rounded-full bg-rose-300 shadow-glow-rose" />
          <span className="h-6 w-5 rounded-b-xl bg-white/25" />
        </div>
      </div>

      {/* pendant lights */}
      {[28, 50, 72].map((left, i) => (
        <div key={left} className="absolute top-0" style={{ left: `${left}%` }}>
          <span className="block h-16 w-px bg-white/20" />
          <span
            className="block h-7 w-7 animate-floaty rounded-b-full bg-gradient-to-b from-gold-200 to-gold-500/40 shadow-glow"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        </div>
      ))}
    </div>
  );
}

/** Hair studio: mirror wall with bulbs and a styling chair. */
export function HairStudioArt() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#1b1026] to-[#0b0710]">
      {/* mirror */}
      <div className="absolute inset-x-10 top-8 bottom-24 rounded-[1.5rem] border-2 border-gold-300/40 bg-gradient-to-br from-white/[0.14] via-white/[0.05] to-white/[0.12] shadow-glow">
        <VanityBulbs className="absolute inset-x-6 -top-1.5" />
        <VanityBulbs className="absolute inset-x-6 -bottom-1.5" count={9} />
        {/* reflection streak */}
        <span className="absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md" />
      </div>

      {/* styling chair silhouette */}
      <svg
        viewBox="0 0 120 90"
        className="absolute bottom-2 left-1/2 h-28 -translate-x-1/2 text-black/70"
        aria-hidden
      >
        <path
          d="M35 20c0-8 6-14 25-14s25 6 25 14v26H35z"
          fill="currentColor"
          stroke="rgba(231,195,93,0.35)"
        />
        <rect x="30" y="44" width="60" height="10" rx="5" fill="currentColor" stroke="rgba(231,195,93,0.3)" />
        <rect x="57" y="54" width="6" height="20" fill="currentColor" />
        <path d="M40 82h40l6 6H34z" fill="currentColor" stroke="rgba(231,195,93,0.25)" />
      </svg>
    </div>
  );
}

/** Skin bar: treatment bed, rising steam, soft light. */
export function SkinBarArt() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#231433] via-[#160d20] to-[#0b0710]">
      {/* halo lamp */}
      <div className="absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 animate-floaty-slow rounded-full border border-gold-200/40 bg-gold-200/10 blur-[1px] shadow-glow" />

      {/* steam */}
      {[30, 45, 60, 72].map((left, i) => (
        <span
          key={left}
          className="absolute bottom-28 h-24 w-10 rounded-full bg-white/12 blur-xl"
          style={{
            left: `${left}%`,
            animation: `floaty-slow ${7 + i}s ease-in-out ${i * 0.8}s infinite`,
          }}
        />
      ))}

      {/* bed */}
      <div className="absolute inset-x-10 bottom-12 h-24 rounded-[1.4rem] border border-white/12 bg-gradient-to-b from-white/20 to-white/[0.05]">
        <span className="absolute left-6 top-4 h-8 w-14 rounded-full bg-white/25" />
      </div>
      <div className="absolute inset-x-16 bottom-6 h-4 rounded-b-2xl bg-black/50" />
    </div>
  );
}

/** Nail lounge: polish bottles on a marble shelf. */
export function NailLoungeArt() {
  const bottles = [
    { c: 'bg-rose-500', h: 'h-14' },
    { c: 'bg-gold-300', h: 'h-16' },
    { c: 'bg-lilac-400', h: 'h-12' },
    { c: 'bg-rose-300', h: 'h-16' },
    { c: 'bg-gold-500', h: 'h-14' },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#2a1533] to-[#0b0710]">
      <div className="absolute inset-x-0 top-1/3 h-3 marble" />
      <div className="absolute inset-x-8 bottom-16 flex items-end justify-center gap-4">
        {bottles.map((b, i) => (
          <span
            key={i}
            className={`relative w-8 ${b.h} animate-floaty rounded-b-lg rounded-t-sm ${b.c} shadow-float`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <span className="absolute -top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-sm bg-white/30" />
            <span className="absolute inset-x-1 top-1 h-2 rounded bg-white/25" />
          </span>
        ))}
      </div>
      {/* hand rest */}
      <div className="absolute inset-x-14 bottom-6 h-8 rounded-full border border-white/12 bg-white/10" />
    </div>
  );
}

/** Bridal suite: chandelier, drape, sparkle. */
export function BridalSuiteArt() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#2b1024] via-[#1a0b1c] to-[#0b0710]">
      {/* drape */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.015) 18px, rgba(0,0,0,0.25) 40px)',
        }}
      />

      {/* chandelier */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <span className="mx-auto block h-10 w-px bg-gold-200/50" />
        <div className="relative h-16 w-32 animate-floaty-slow rounded-b-full border-b border-gold-200/50 bg-gradient-to-b from-gold-200/30 to-transparent shadow-glow">
          {[...Array(7)].map((_, i) => (
            <span
              key={i}
              className="absolute top-full h-6 w-px bg-gold-100/50"
              style={{ left: `${8 + i * 14}%` }}
            >
              <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-twinkle rounded-full bg-gold-50" />
            </span>
          ))}
        </div>
      </div>

      {/* lehenga silhouette */}
      <svg viewBox="0 0 120 100" className="absolute bottom-0 left-1/2 h-40 -translate-x-1/2" aria-hidden>
        <defs>
          <linearGradient id="bridalSilk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(241,119,165,0.5)" />
            <stop offset="100%" stopColor="rgba(231,195,93,0.15)" />
          </linearGradient>
        </defs>
        <path d="M60 8c6 0 9 5 9 11l-4 12 20 62c-14 5-36 5-50 0l20-62-4-12c0-6 3-11 9-11z" fill="url(#bridalSilk)" />
      </svg>
    </div>
  );
}
