import Logo from '@/components/layout/Logo';

/**
 * Brand-styled stand-in for a photo that has not been uploaded yet.
 *
 * Deliberately *not* stock photography: a random stranger's salon photo makes a
 * premium brand look fake. This uses the salon's own colours (blush · gold ·
 * wood) plus the logo, so an empty slot still looks designed — and the moment
 * `public/images/<name>.jpg` is uploaded it is replaced by the real photo.
 */
export default function PhotoPlaceholder({
  label,
  hint,
  className = '',
  showLogo = true,
}: {
  label?: string;
  hint?: string;
  className?: string;
  showLogo?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-ivory-100 ${className}`}
    >
      {/* blush → wood wash */}
      <div className="absolute inset-0 bg-[linear-gradient(150deg,#fbe6f0_0%,#fdf6e3_45%,#f0dcbc_100%)]" />

      {/* soft diagonal sheen instead of a stripe texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(115deg, rgba(255,255,255,0.7) 0%, transparent 42%, rgba(208,169,85,0.10) 100%)',
        }}
      />

      {/* soft vanity-light glow */}
      <div className="absolute -top-8 left-1/2 h-32 w-40 -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),transparent)] blur-xl" />

      <div className="relative flex flex-col items-center px-4 text-center">
        {showLogo && <Logo className="h-14 w-14 opacity-90" />}
        {label && (
          <p className="mt-3 font-display text-lg leading-tight text-ink">{label}</p>
        )}
        <p className="mt-1 text-[0.58rem] uppercase tracking-[0.28em] text-gold-600">
          {hint ?? 'Photo coming soon'}
        </p>
      </div>

      <span className="absolute inset-3 rounded-lg border border-gold-400/25" />
    </div>
  );
}
