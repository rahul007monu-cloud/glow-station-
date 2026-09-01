import { motion } from 'framer-motion';

/**
 * The backdrop the whole site sits on.
 *
 * Earlier this drew literal wooden slats; at screen scale a repeating stripe
 * reads as corrugated cardboard, which cheapens everything on top of it. So the
 * texture is gone: what is left is a warm ivory gradient, two very large soft
 * light pools in the brand's gold and blush, and a whisper of grain. Calm,
 * expensive, and it never competes with the photography.
 */
export default function RoomShell() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[9] overflow-hidden">
      {/* warm ivory base */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(175deg, #fffdfa 0%, #fdfaf4 38%, #f7f2e9 72%, #f2ece1 100%)',
        }}
      />

      {/* soft gold light pool, top */}
      <motion.div
        className="absolute -top-[22%] left-1/2 h-[70vh] w-[130vw] -translate-x-1/2 rounded-[100%] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(208,169,85,0.16), rgba(208,169,85,0.05) 55%, transparent 75%)',
        }}
        animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* blush pool, lower left — picks up the logo's pink */}
      <motion.div
        className="absolute -left-[18%] top-[45%] h-[60vh] w-[70vw] rounded-[100%] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(231,158,192,0.14), rgba(231,158,192,0.04) 60%, transparent 78%)',
        }}
        animate={{ opacity: [0.6, 0.95, 0.6], y: [0, -24, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* champagne pool, right */}
      <motion.div
        className="absolute -right-[14%] top-[18%] h-[55vh] w-[60vw] rounded-[100%] blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(247,235,203,0.5), rgba(247,235,203,0.12) 60%, transparent 80%)',
        }}
        animate={{ opacity: [0.7, 1, 0.7], x: [0, -18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* single hairline of gold, instead of panelling */}
      <div className="absolute inset-x-[12%] top-[13vh] h-px bg-gradient-to-r from-transparent via-gold-400/25 to-transparent" />

      {/* light pooling on the floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[22vh]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, transparent 0%, rgba(255,253,250,0.55) 45%, rgba(242,236,225,0.9) 100%)',
        }}
      />

      {/* fine grain keeps the gradients from looking flat or banded */}
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
