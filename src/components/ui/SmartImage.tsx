import { useEffect, useState, type ReactNode } from 'react';

type Props = {
  /** The salon's own photo, e.g. `images/gallery-1.jpg`. Always wins. */
  src?: string;
  /** Licensed placeholder used until the real photo is uploaded. */
  fallbackSrc?: string;
  alt: string;
  className?: string;
  /** Rendered only if both photos are missing. */
  fallback?: ReactNode;
  /** `eager` for above-the-fold imagery. */
  priority?: boolean;
};

const resolve = (src: string) =>
  /^(https?:)?\/\//.test(src) ? src : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;

/**
 * Photo with a graceful chain: owner's upload → licensed stock → styled block.
 *
 * The salon can drop `public/images/gallery-1.jpg` in at any time and it takes
 * over automatically, with no code change and no broken-image state in between.
 */
export default function SmartImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  fallback = null,
  priority = false,
}: Props) {
  const chain = [src, fallbackSrc].filter(Boolean) as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [src, fallbackSrc]);

  if (chain.length === 0 || index >= chain.length) return <>{fallback}</>;

  return (
    <img
      src={resolve(chain[index])}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setIndex((i) => i + 1)}
      className={className}
    />
  );
}
