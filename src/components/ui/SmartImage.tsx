import { useEffect, useState, type ReactNode } from 'react';
import { photoManifest } from '@/data/photoManifest';

type Props = {
  /** The salon's own photo, e.g. `images/hair.jpg`. */
  src?: string;
  /** Licensed placeholder used until the real photo is uploaded. */
  fallbackSrc?: string;
  alt: string;
  className?: string;
  /** Brand-styled block shown when no photo is available at all. */
  fallback?: ReactNode;
  /** `eager` + high priority for above-the-fold imagery. */
  priority?: boolean;
  /** CSS sizes hint — how wide the photo renders at each breakpoint. */
  sizes?: string;
};

const resolve = (src: string) =>
  /^(https?:)?\/\//.test(src) ? src : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;

/**
 * Photo with a graceful chain (owner's upload → placeholder photo → branded
 * block) that also serves the sharpest size each screen can use.
 *
 * When `scripts/process-photos.mjs` has generated variants for the file, this
 * renders a <picture> with WebP + JPEG `srcset` up to 3200px, so 4K and retina
 * displays get a crisp image while phones stay on a small file.
 */
export default function SmartImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  fallback = null,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px',
}: Props) {
  const chain = [src, fallbackSrc].filter(Boolean) as string[];
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [src, fallbackSrc]);

  if (chain.length === 0 || index >= chain.length) return <>{fallback}</>;

  const current = chain[index];
  const variants = photoManifest[current];
  const onError = () => setIndex((i) => i + 1);
  const loading = priority ? 'eager' : 'lazy';

  if (!variants || variants.widths.length === 0) {
    return (
      <img
        src={resolve(current)}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onError={onError}
        className={className}
      />
    );
  }

  const srcset = (ext: 'webp' | 'jpg') =>
    variants.widths
      .map((w) => `${resolve(`${variants.base}-${w}.${ext}`)} ${w}w`)
      .join(', ');

  const largest = variants.widths[variants.widths.length - 1];

  return (
    <picture>
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={resolve(`${variants.base}-${largest}.jpg`)}
        srcSet={srcset('jpg')}
        sizes={sizes}
        alt={alt}
        width={variants.width}
        height={variants.height}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onError={onError}
        className={className}
      />
    </picture>
  );
}
