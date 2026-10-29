import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import FAQ from '@/components/sections/FAQ';
import Gallery from '@/components/sections/Gallery';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Offers from '@/components/sections/Offers';
import Packages from '@/components/sections/Packages';
import Rewards from '@/components/sections/Rewards';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import WhyUs from '@/components/sections/WhyUs';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Offers />
      <Packages />
      <WhyUs />
      <About />
      <Gallery />
      <Testimonials />
      <Rewards />
      <FAQ />
      <Contact />
    </>
  );
}
