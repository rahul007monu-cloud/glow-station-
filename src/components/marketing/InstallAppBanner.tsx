import { AnimatePresence, motion } from 'framer-motion';
import { Download, Share, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';
import { salon } from '@/data/salon';
import { trackCustom } from '@/lib/analytics';
import { useInstallPrompt } from '@/lib/hooks';
import { KEYS, read, write } from '@/lib/storage';

/**
 * "Install the Divine Touch app" card.
 *
 * Android / desktop Chrome & Edge: one tap opens the native install dialog.
 * iPhone Safari has no install API, so we show the Share → Add to Home Screen
 * steps instead. Dismissing hides it on this device for 7 days.
 */
const SNOOZE_DAYS = 7;

export default function InstallAppBanner() {
  const { canInstall, installed, promptInstall, isIOS } = useInstallPrompt();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissedAt = read<number>(KEYS.installDismissed, 0);
    const snoozed = Date.now() - dismissedAt < SNOOZE_DAYS * 864e5;
    if (installed || snoozed || !(canInstall || isIOS)) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => setVisible(true), 12000);
    return () => clearTimeout(t);
  }, [canInstall, installed, isIOS]);

  const dismiss = () => {
    write(KEYS.installDismissed, Date.now());
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed inset-x-3 bottom-24 z-[75] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[22rem]"
          role="dialog"
          aria-label="Install app"
        >
          <div className="glass rounded-3xl border-rose-300/25 p-4 shadow-glow-rose">
            <div className="flex items-start gap-3">
              <Logo className="h-11 w-11 shrink-0" />
              <div className="flex-1">
                <p className="font-display text-lg leading-tight text-white">
                  {salon.legalName} app install karo
                </p>
                <p className="mt-0.5 text-xs text-white/55">
                  1-tap booking, offers aur loyalty card — Play Store ki zaroorat nahi.
                </p>
              </div>
              <button onClick={dismiss} aria-label="Dismiss" className="p-1 text-white/40 hover:text-white">
                <X size={16} />
              </button>
            </div>

            {canInstall ? (
              <Button
                full
                size="sm"
                className="mt-3"
                icon={<Download size={14} />}
                onClick={async () => {
                  const outcome = await promptInstall();
                  trackCustom('AppInstallPrompt', { outcome, placement: 'banner' });
                  if (outcome !== 'accepted') dismiss();
                }}
              >
                Install app
              </Button>
            ) : (
              <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs leading-relaxed text-white/65">
                Safari me neeche <Share size={12} className="inline text-gold-200" />{' '}
                <strong>Share</strong> dabao → <strong>Add to Home Screen</strong>.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
