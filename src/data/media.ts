/**
 * Optional video files. Upload them to `public/media/` with these exact names
 * and the site starts using them automatically — nothing renders while they are
 * missing, so there is never a broken player.
 *
 *   public/media/hero.mp4    → hero background + scroll-scrubbed section
 *   public/media/tour.mp4    → salon tour loop inside the walkthrough
 *
 * Recommended: MP4 (H.264 + AAC), 1080p, 10–20 seconds, under 20 MB, no sound
 * needed (it plays muted).
 */
export const MEDIA = {
  hero: 'media/hero.mp4',
  tour: 'media/tour.mp4',
} as const;
