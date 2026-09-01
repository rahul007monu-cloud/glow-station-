import { motion } from 'framer-motion';

/**
 * Crystal chandelier that sways very slowly — the single strongest "luxury
 * showroom" cue we can render without photography.
 */
export default function Chandelier({ className = '' }: { className?: string }) {
  const strands = [
    { left: '8%', len: 42, delay: 0 },
    { left: '22%', len: 70, delay: 0.4 },
    { left: '36%', len: 54, delay: 0.8 },
    { left: '50%', len: 86, delay: 0.2 },
    { left: '64%', len: 54, delay: 0.6 },
    { left: '78%', len: 70, delay: 1 },
    { left: '92%', len: 42, delay: 0.3 },
  ];

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ transformOrigin: 'top center' }}
      animate={{ rotate: [-1.4, 1.4, -1.4] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* cord */}
      <span className="mx-auto block h-14 w-px bg-gradient-to-b from-transparent to-gold-200/60" />

      {/* crown */}
      <div className="relative mx-auto h-10 w-44 rounded-b-[100%] border-b border-gold-200/60 bg-gradient-to-b from-gold-200/25 via-gold-300/10 to-transparent shadow-[0_0_60px_rgba(231,195,93,0.35)]">
        <span className="absolute inset-x-6 top-0 h-px bg-gold-100/70" />
      </div>

      {/* crystal strands */}
      <div className="relative mx-auto h-24 w-44">
        {strands.map((s) => (
          <span
            key={s.left}
            className="absolute top-0 w-px bg-gradient-to-b from-gold-100/70 to-transparent"
            style={{ left: s.left, height: s.len }}
          >
            <span
              className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 animate-twinkle bg-gold-50 shadow-[0_0_12px_3px_rgba(253,248,236,0.6)]"
              style={{ animationDelay: `${s.delay}s` }}
            />
          </span>
        ))}
      </div>

      {/* light pool */}
      <div className="mx-auto h-40 w-72 -translate-y-10 rounded-[100%] bg-[radial-gradient(closest-side,rgba(231,195,93,0.22),transparent)] blur-2xl" />
    </motion.div>
  );
}
