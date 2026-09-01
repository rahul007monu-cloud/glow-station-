import { Instagram } from 'lucide-react';
import PhotoRing from '@/components/fx/PhotoRing';
import Reveal from '@/components/fx/Reveal';
import { LinkButton } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { gallery, salon } from '@/data/salon';

export default function Gallery() {
  return (
    <Section
      id="gallery"
      eyebrow="Lookbook"
      title="Our"
      highlight="transformations"
      subtitle="Ring ko drag karke ghumao. Roz naye looks Instagram par post hote hain."
    >
      <PhotoRing items={gallery} />

      <Reveal delay={0.1}>
        <div className="glass mt-10 flex flex-col items-center gap-4 rounded-3xl p-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-2xl text-ink">Full portfolio Instagram par hai</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Daily reels, client reviews aur before-after — {salon.instagramHandle}
            </p>
          </div>
          <LinkButton
            external
            href={salon.instagram}
            variant="outline"
            icon={<Instagram size={16} />}
          >
            Follow us
          </LinkButton>
        </div>
      </Reveal>
    </Section>
  );
}
