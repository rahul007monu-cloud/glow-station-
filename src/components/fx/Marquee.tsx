type Props = { items: string[]; className?: string };

/** Infinite scrolling strip used for the brand / trust ticker. */
export default function Marquee({ items, className = '' }: Props) {
  const row = [...items, ...items];
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`} aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10 py-3">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap text-sm uppercase tracking-[0.28em] text-ink-muted"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-gold-300/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
