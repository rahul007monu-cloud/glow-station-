/** Row of warm vanity bulbs, like the frame of a make-up mirror. */
export function VanityBulbs({ count = 9, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`flex justify-between ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 animate-twinkle rounded-full bg-gold-50 shadow-[0_0_14px_4px_rgba(253,246,227,0.75)]"
          style={{ animationDelay: `${(i % 5) * 0.45}s` }}
        />
      ))}
    </div>
  );
}
