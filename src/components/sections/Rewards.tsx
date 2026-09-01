import { Check, Copy, Download, Gift, Share2, Sparkles } from 'lucide-react';
import { useCallback, useState } from 'react';
import Reveal from '@/components/fx/Reveal';
import { Button, LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { salon } from '@/data/salon';
import { trackCustom } from '@/lib/analytics';
import { waLink } from '@/lib/booking';
import { useInstallPrompt, useStoredValue } from '@/lib/hooks';
import { countShare, getLoyalty, getReferral, referralMessage } from '@/lib/loyalty';

export default function Rewards() {
  const [loyalty] = useStoredValue(getLoyalty);
  const [referral] = useStoredValue(getReferral);
  const { canInstall, installed, promptInstall, isIOS } = useInstallPrompt();
  const [copied, setCopied] = useState(false);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareMsg = referralMessage(referral.code, `${siteUrl}?ref=${referral.code}`);

  const share = useCallback(async () => {
    countShare();
    trackCustom('ReferralShared', { code: referral.code });
    if (navigator.share) {
      try {
        await navigator.share({ title: salon.legalName, text: shareMsg, url: siteUrl });
        return;
      } catch {
        /* user cancelled — fall through to WhatsApp */
      }
    }
    window.open(waLink(shareMsg, ''), '_blank');
  }, [referral.code, shareMsg, siteUrl]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(referral.code);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const total = salon.loyalty.stampsForReward;

  return (
    <Section
      id="rewards"
      eyebrow="Members club"
      title="Rewards,"
      highlight="referral & app"
      subtitle="Jitna aate ho, utna wapas milta hai. Sab kuch aapke phone me save rehta hai."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {/* ── Loyalty stamp card ─────────────────────────────── */}
        <Reveal>
          <div className="vitrine h-full p-6">
            <div className="flex items-center gap-2 text-gold-500">
              <Gift size={18} />
              <h3 className="font-display text-xl text-ink">Loyalty card</h3>
            </div>
            <p className="mt-2 text-sm text-ink-muted">
              {total} visits complete karo aur pao <strong className="text-gold-600">{salon.loyalty.reward}</strong> — bilkul free.
            </p>

            <div className="mt-5 grid grid-cols-6 gap-2">
              {Array.from({ length: total }).map((_, i) => {
                const filled = i < loyalty.stamps;
                return (
                  <span
                    key={i}
                    className={`flex aspect-square items-center justify-center rounded-full border text-xs transition-all duration-500 ${
                      filled
                        ? 'animate-floaty border-gold-300/60 bg-gold-300/20 text-gold-600 shadow-glow'
                        : 'border-dashed border-ivory-400/70 text-ink-muted'
                    }`}
                    style={filled ? { animationDelay: `${i * 0.2}s` } : undefined}
                  >
                    {filled ? <Check size={14} /> : i + 1}
                  </span>
                );
              })}
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-ivory-400/60 pt-4 text-center">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-wider text-ink-muted">Points</dt>
                <dd className="font-display text-2xl text-gold-600">{loyalty.points}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-wider text-ink-muted">
                  Rewards earned
                </dt>
                <dd className="font-display text-2xl text-gold-600">{loyalty.rewardsClaimed}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[0.68rem] text-ink-muted">
              Har ₹100 par {salon.loyalty.pointsPerHundred} points. Counter par ID batayein.
            </p>
          </div>
        </Reveal>

        {/* ── Referral ───────────────────────────────────────── */}
        <Reveal delay={0.08}>
          <div className="vitrine h-full border-clay-400/25 p-6">
            <div className="flex items-center gap-2 text-clay-300">
              <Share2 size={18} />
              <h3 className="font-display text-xl text-ink">Refer & earn</h3>
            </div>
            <p className="mt-2 text-sm text-ink-muted">
              Friend ko {salon.referral.friendDiscount}% off milega, aapko bhi apni next service par{' '}
              {salon.referral.yourDiscount}% off.
            </p>

            <button
              onClick={copyCode}
              className="mt-5 flex w-full items-center justify-between rounded-2xl border border-dashed border-clay-400/40 bg-ivory-300/70 px-4 py-3"
            >
              <span className="font-mono text-lg tracking-[0.15em] text-rose-200">
                {referral.code}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>

            <Button full className="mt-4" icon={<Share2 size={15} />} onClick={share}>
              Share with friends
            </Button>
            <p className="mt-3 text-center text-[0.68rem] text-ink-muted">
              {referral.shares > 0
                ? `${referral.shares} time(s) shared — keep going!`
                : 'Ek share = ek naya customer.'}
            </p>
          </div>
        </Reveal>

        {/* ── Install the app ────────────────────────────────── */}
        <Reveal delay={0.16}>
          <div className="vitrine h-full border-gold-300/25 p-6">
            <div className="flex items-center gap-2 text-gold-500">
              <Sparkles size={18} />
              <h3 className="font-display text-xl text-ink">Install the app</h3>
            </div>
            <p className="mt-2 text-sm text-ink-muted">
              Phone me app install karo — offline chalta hai, 1-tap booking, aur exclusive app-only
              offers.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li className="flex gap-2">
                <Check size={14} className="mt-0.5 text-[#2f9e5f]" /> Home screen icon, no Play Store
              </li>
              <li className="flex gap-2">
                <Check size={14} className="mt-0.5 text-[#2f9e5f]" /> Sirf 1 MB, phone slow nahi hota
              </li>
              <li className="flex gap-2">
                <Check size={14} className="mt-0.5 text-[#2f9e5f]" /> Loyalty card always saved
              </li>
            </ul>

            {installed ? (
              <p className="mt-5 rounded-2xl border border-[#2f9e5f]/30 bg-[#2f9e5f]/10 px-4 py-3 text-center text-sm text-[#2f9e5f]">
                App installed ✓ Enjoy!
              </p>
            ) : canInstall ? (
              <Button
                full
                className="mt-5"
                icon={<Download size={15} />}
                onClick={async () => {
                  const outcome = await promptInstall();
                  trackCustom('AppInstallPrompt', { outcome });
                }}
              >
                Install now
              </Button>
            ) : (
              <div className="mt-5 rounded-2xl border border-ivory-400/70 bg-white/75 p-4 text-xs leading-relaxed text-ink-muted">
                {isIOS ? (
                  <>
                    iPhone par: Safari me <strong>Share</strong> button dabao →{' '}
                    <strong>Add to Home Screen</strong>.
                  </>
                ) : (
                  <>
                    Browser menu (⋮) kholo → <strong>Add to Home screen</strong> /{' '}
                    <strong>Install app</strong>.
                  </>
                )}
              </div>
            )}

            <LinkButton
              full
              size="sm"
              variant="ghost"
              className="mt-3"
              external
              href={waLink(`Hi ${salon.legalName}! App install karne me help chahiye.`)}
            >
              Need help?
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
