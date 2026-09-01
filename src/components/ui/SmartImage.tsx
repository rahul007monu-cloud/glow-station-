import { useState, type ReactNode } from 'react';

type Props = {
  /** Path relative to `public/`, e.g. `images/gallery-1.jpg`. */
  src?: string;
  alt: string;
  className?: string;
  /** Shown while the photo is missing or fails to load. */
  fallback: ReactNode;
};

/**
 * Renders a photo if it exists, otherwise the styled placeholder.
 *
 * This lets us pre-wire the expected filenames (`images/gallery-1.jpg` …) so the
 * salon owner can simply upload photos with those names — no code change, and
 * the layout never shows a broken image icon in the meantime.
 */
export default function SmartImage({ src, alt, className = '', fallback }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  const resolved = /^(https?:)?\/\//.test(src)
    ? src
    : `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;

  return (
    <img
      src={resolved}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
