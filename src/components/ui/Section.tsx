import type { PropsWithChildren } from 'react';
import Reveal from '@/components/fx/Reveal';

type Props = PropsWithChildren<{
  id?: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  center?: boolean;
}>;

export default function Section({
  id,
  eyebrow,
  title,
  highlight,
  subtitle,
  children,
  className = '',
  center = true,
}: Props) {
  return (
    <section id={id} className={`section-pad relative ${className}`}>
      <div className="shell">
        <Reveal>
          <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300/80">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
              {title} {highlight && <span className="gold-text">{highlight}</span>}
            </h2>
            {subtitle && <p className="mt-4 text-sm text-white/60 sm:text-base">{subtitle}</p>}
            <div className="hairline mt-8" />
          </div>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
