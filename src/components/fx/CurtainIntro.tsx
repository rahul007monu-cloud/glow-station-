import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Logo from '@/components/layout/Logo';
import { salon } from '@/data/salon';

/**
 * Velvet curtains in the flyer's purple part on the first visit of a session,
 * revealing the Divine Touch mark. Runs once per tab so it never feels slow.
 */
export default function CurtainIntro() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('dt_curtain') === '1') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sessionStorage.setItem('dt_curtain', '1');
    setDone(false);
    const openTimer = setTimeout(() => setOpen(true), 1100);
    const doneTimer = setTimeout(() => setDone(true), 2800);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[120] overflow-hidden" exit={{ opacity: 0 }}>
          {(['left', 'right'] as const).map((side) => (
            <motion.div
              key={side}
              initial={{ x: 0 }}
              animate={{ x: open ? (side === 'left' ? '-102%' : '102%') : 0 }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              className={`absolute top-0 h-full w-1/2 ${side === 'left' ? 'left-0' : 'right-0'}`}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(0,0,0,0.28) 0 2px, transparent 2px 46px), linear-gradient(100deg, #2a0f4a 0%, #4b1670 40%, #6a1b78 70%, #2a0f4a 100%)',
                boxShadow:
                  side === 'left'
                    ? 'inset -18px 0 40px rgba(231,195,93,0.35)'
                    : 'inset 18px 0 40px rgba(231,195,93,0.35)',
              }}
            >
              <span
                className={`absolute top-0 h-full w-[3px] bg-gradient-to-b from-gold-200 via-gold-400 to-gold-700 ${
                  side === 'left' ? 'right-0' : 'left-0'
                }`}
              />
            </motion.div>
          ))}

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: open ? 0 : 1, scale: open ? 1.25 : 1 }}
            transition={{ duration: 0.8 }}
          >
            <Logo className="h-24 w-24" />
            <p className="mt-4 text-4xl">
              <span className="gold-text font-display">{salon.name}</span>{' '}
              <span className="script text-5xl text-rose-300">{salon.suffix}</span>
            </p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.4em] text-gold-200/90">
              {salon.tagline}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
