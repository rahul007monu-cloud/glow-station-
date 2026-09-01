import ScrollVideo from '@/components/fx/ScrollVideo';
import Contact from '@/components/sections/Contact';
import Entrance from '@/components/sections/Entrance';
import ExplodedBoard from '@/components/sections/ExplodedBoard';
import FAQ from '@/components/sections/FAQ';
import Gallery from '@/components/sections/Gallery';
import Offers from '@/components/sections/Offers';
import Packages from '@/components/sections/Packages';
import Rewards from '@/components/sections/Rewards';
import Services from '@/components/sections/Services';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import TrustStrip from '@/components/sections/TrustStrip';
import Walkthrough from '@/components/sections/Walkthrough';
import WhyUs from '@/components/sections/WhyUs';

export default function Home() {
  return (
    <>
      {/* 1. Arrive at the shop and walk in through the doors */}
      <Entrance />
      <TrustStrip />
      {/* 2. The signboard explodes into the service menu */}
      <ExplodedBoard />
      {/* 3. Scroll-scrubbed salon footage (renders only once a video is uploaded) */}
      <ScrollVideo
        heading="Glow Station"
        sub="Scroll karo — poora salon aapke saamne."
      />
      {/* 4. Walk room by room through the salon */}
      <Walkthrough />
      {/* 5. Everything you can book */}
      <Services />
      <Packages />
      <Offers />
      <WhyUs />
      <Gallery />
      <Team />
      <Testimonials />
      <Rewards />
      <FAQ />
      <Contact />
    </>
  );
}
