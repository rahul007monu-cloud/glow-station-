import { salon } from '@/data/salon';
import { KEYS, read, write } from '@/lib/storage';

export type LoyaltyState = {
  stamps: number;
  points: number;
  /** ISO timestamps of every recorded visit. */
  history: string[];
  rewardsClaimed: number;
};

const initial: LoyaltyState = { stamps: 0, points: 0, history: [], rewardsClaimed: 0 };

export function getLoyalty(): LoyaltyState {
  return read<LoyaltyState>(KEYS.loyalty, initial);
}

/** Called once a booking request is sent — one stamp per visit. */
export function addVisit(amountSpent: number): LoyaltyState {
  const state = getLoyalty();
  const next: LoyaltyState = {
    ...state,
    stamps: (state.stamps + 1) % salon.loyalty.stampsForReward,
    points: state.points + Math.floor((amountSpent / 100) * salon.loyalty.pointsPerHundred),
    history: [new Date().toISOString(), ...state.history].slice(0, 60),
    rewardsClaimed:
      state.stamps + 1 >= salon.loyalty.stampsForReward
        ? state.rewardsClaimed + 1
        : state.rewardsClaimed,
  };
  write(KEYS.loyalty, next);
  return next;
}

export function resetLoyalty() {
  write(KEYS.loyalty, initial);
}

/* ── Referral ─────────────────────────────────────────────────────────── */

export type ReferralState = { code: string; shares: number };

/** Deterministic, human-friendly code that the customer can share. */
export function getReferral(): ReferralState {
  const existing = read<ReferralState | null>(KEYS.referral, null);
  if (existing?.code) return existing;
  const code = `GLOW-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const fresh = { code, shares: 0 };
  write(KEYS.referral, fresh);
  return fresh;
}

export function countShare() {
  const state = getReferral();
  const next = { ...state, shares: state.shares + 1 };
  write(KEYS.referral, next);
  return next;
}

export function referralMessage(code: string, siteUrl: string) {
  return [
    `✨ *${salon.legalName}* try karo!`,
    `Mere referral code *${code}* se book karo aur pehli service par ${salon.referral.friendDiscount}% OFF pao.`,
    '',
    siteUrl,
  ].join('\n');
}
