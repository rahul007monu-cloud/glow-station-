import type { PropsWithChildren } from 'react';
import Parallax from '@/components/fx/Parallax';
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
    <section id={id} className={`section-pad light-beams relative ${className}`}>
      <div className="shell relative">
        <Parallax speed={26}>
          <Reveal>
            <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
              {eyebrow && (
                <div className="ornament mb-4">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em]">
                    {eyebrow}
                  </span>
                </div>
              )}
              <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
                {title} {highlight && <span className="gold-text">{highlight}</span>}
              </h2>
              {subtitle && <p className="mt-4 text-sm text-ink-muted sm:text-base">{subtitle}</p>}
              <div className="ornament mt-8">
                <span className="text-xs">❖</span>
              </div>
            </div>
          </Reveal>
        </Parallax>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
