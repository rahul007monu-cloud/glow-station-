import { useEffect, useState, type ReactNode } from 'react';

type Props = {
  /** The salon's own photo, e.g. `images/gallery-1.jpg`. */
  src?: string;
  alt: string;
  className?: string;
  /** Brand-styled block shown until the photo is uploaded. */
  fallback: ReactNode;
  /** `eager` for above-the-fold imagery. */
  priority?: boolean;
};

const resolve = (src: string) =>
  /^(https?:)?\/\//.test(src) ? src : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;

/**
 * Renders the salon's photo, or a designed placeholder while it is missing.
 *
 * We deliberately never fall back to stock photography — a stranger's salon
 * photo undermines a premium brand. Upload `public/images/<name>.jpg` and it
 * takes over automatically, with no code change.
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  fallback,
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (!src || failed) return <>{fallback}</>;

  return (
    <img
      src={resolve(src)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
