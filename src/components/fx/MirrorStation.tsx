import { motion } from 'framer-motion';
import { VanityBulbs } from '@/components/fx/SalonArt';
import { salon } from '@/data/salon';

/**
 * A real styling station: gold-framed vanity mirror ringed with warm bulbs,
 * a marble counter with tools, and the salon name reflected in the glass.
 * This is the hero visual — it reads instantly as "premium salon".
 */
export default function MirrorStation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* ── Mirror ─────────────────────────────────────────── */}
      <div className="relative mx-auto aspect-[4/5] w-full">
        <div className="gold-frame absolute inset-0 overflow-hidden rounded-[14rem_14rem_2rem_2rem] border border-gold-300/50">
          {/* glass */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(160deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 38%, rgba(231,195,93,0.10) 72%, rgba(255,255,255,0.12) 100%)',
            }}
          />
          {/* reflected room: fluted wall + counter line */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.01) 5px, rgba(0,0,0,0.35) 22px)',
            }}
          />
          {/* moving light streak across the glass */}
          <motion.span
            className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-lg"
            animate={{ x: ['0%', '320%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
          />

          {/* engraved name in the glass */}
          <div className="absolute inset-x-0 top-[30%] text-center">
            <p className="font-display text-4xl text-white/85 drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
              {salon.name}
            </p>
            <p className="mt-1.5 text-[0.55rem] uppercase tracking-[0.5em] text-gold-200/90">
              {salon.suffix}
            </p>
            <p className="mx-auto mt-4 h-px w-16 bg-gold-200/50" />
            <p className="mt-4 px-10 text-[0.68rem] leading-relaxed text-white/55">
              {salon.address.line2}, {salon.address.city}
            </p>
          </div>
        </div>

        {/* bulbs around the mirror */}
        <VanityBulbs count={7} className="absolute inset-x-16 -top-1.5 z-10" />
        <div className="absolute -left-1.5 top-1/3 z-10 flex h-1/3 flex-col justify-between">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 animate-twinkle rounded-full bg-gold-100 shadow-[0_0_14px_4px_rgba(253,248,236,0.5)]"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
        </div>
        <div className="absolute -right-1.5 top-1/3 z-10 flex h-1/3 flex-col justify-between">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 animate-twinkle rounded-full bg-gold-100 shadow-[0_0_14px_4px_rgba(253,248,236,0.5)]"
              style={{ animationDelay: `${0.3 + i * 0.6}s` }}
            />
          ))}
        </div>
      </div>

      {/* ── Marble counter with tools ──────────────────────── */}
      <div className="relative mx-auto -mt-2 h-24 w-[112%] max-w-none -translate-x-[5%]">
        <div className="marble absolute inset-x-0 top-0 h-6 rounded-t-md shadow-[0_16px_40px_-14px_rgba(0,0,0,0.9)]" />
        <div className="absolute inset-x-0 top-6 h-10 bg-gradient-to-b from-[#1b1220] to-transparent" />

        {/* tools resting on the counter */}
        <div className="absolute -top-7 left-[12%] flex items-end gap-3">
          {/* scissors */}
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold-200/85" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="6" cy="19" r="2.4" />
              <circle cx="13" cy="19" r="2.4" />
              <path d="M7.4 16.8 17 4M11.6 16.8 5 8" />
            </g>
          </svg>
          {/* comb */}
          <svg viewBox="0 0 30 14" className="h-6 w-14 text-white/60" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M1 4h28" />
              {Array.from({ length: 11 }).map((_, i) => (
                <path key={i} d={`M${3 + i * 2.4} 4v7`} />
              ))}
            </g>
          </svg>
        </div>

        {/* product bottles */}
        <div className="absolute -top-12 right-[12%] flex items-end gap-2.5">
          <span className="h-12 w-5 rounded-t-sm rounded-b bg-gradient-to-b from-rose-400/80 to-rose-500/40 shadow-float" />
          <span className="h-14 w-5 rounded-t-sm rounded-b bg-gradient-to-b from-gold-200/90 to-gold-500/40 shadow-float" />
          <span className="h-10 w-5 rounded-t-sm rounded-b bg-gradient-to-b from-lilac-300/80 to-lilac-500/40 shadow-float" />
        </div>

        {/* reflection under the counter */}
        <div className="absolute inset-x-6 top-16 h-8 rounded-[100%] bg-[radial-gradient(closest-side,rgba(231,195,93,0.22),transparent)] blur-md" />
      </div>
    </motion.div>
  );
}
