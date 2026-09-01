import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Logo from '@/components/layout/Logo';
import { salon } from '@/data/salon';

/**
 * Velvet curtains part on the first visit of a session — the moment of
 * "walking into the salon". Runs once per tab so it never feels slow.
 */
export default function CurtainIntro() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('gs_curtain') === '1') return;
    sessionStorage.setItem('gs_curtain', '1');
    setDone(false);
    const openTimer = setTimeout(() => setOpen(true), 900);
    const doneTimer = setTimeout(() => setDone(true), 2600);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {(['left', 'right'] as const).map((side) => (
            <motion.div
              key={side}
              initial={{ x: 0 }}
              animate={{ x: open ? (side === 'left' ? '-101%' : '101%') : 0 }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              className={`absolute top-0 h-full w-1/2 ${side === 'left' ? 'left-0' : 'right-0'}`}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, #1a0d1f 0px, #2b1533 14px, #150a1a 30px), radial-gradient(120% 80% at 50% 0%, rgba(231,195,93,0.18), transparent 60%)',
                boxShadow: 'inset 0 0 120px rgba(0,0,0,0.9)',
              }}
            />
          ))}

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            animate={{ opacity: open ? 0 : 1, scale: open ? 1.15 : 1 }}
            transition={{ duration: 0.8 }}
          >
            <Logo className="h-16 w-16" />
            <p className="font-display text-3xl text-white">{salon.name}</p>
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-300/90">
              {salon.suffix}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
