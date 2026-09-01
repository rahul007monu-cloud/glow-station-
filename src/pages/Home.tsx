import Walkthrough from '@/components/sections/Walkthrough';
import Contact from '@/components/sections/Contact';
import FAQ from '@/components/sections/FAQ';
import Gallery from '@/components/sections/Gallery';
import Hero from '@/components/sections/Hero';
import Offers from '@/components/sections/Offers';
import Packages from '@/components/sections/Packages';
import Rewards from '@/components/sections/Rewards';
import Services from '@/components/sections/Services';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import WhyUs from '@/components/sections/WhyUs';

export default function Home() {
  return (
    <>
      <Hero />
      <Walkthrough />
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
