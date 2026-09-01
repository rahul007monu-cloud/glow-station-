import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { type PropsWithChildren, useEffect } from 'react';
import { useScrollLock } from '@/lib/hooks';

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  /** Bottom sheet on mobile, centred dialog on desktop. */
  size?: 'md' | 'lg';
}>;

export default function Modal({ open, onClose, title, subtitle, children, size = 'md' }: Props) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title ?? 'Dialog'}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className={`glass relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border-gold-300/20 p-5 sm:rounded-3xl sm:p-7 ${
              size === 'lg' ? 'sm:max-w-2xl' : 'sm:max-w-lg'
            }`}
          >
            <span
              aria-hidden
              className="mx-auto mb-4 block h-1 w-12 rounded-full bg-white/20 sm:hidden"
            />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/15 hover:text-white"
            >
              <X size={16} />
            </button>

            {title && (
              <header className="mb-5 pr-10">
                <h3 className="text-2xl">{title}</h3>
                {subtitle && <p className="mt-1 text-sm text-white/55">{subtitle}</p>}
              </header>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
