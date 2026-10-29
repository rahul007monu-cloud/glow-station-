import ExplodedMenu from '@/components/sections/ExplodedMenu';
import ScrollFilm from '@/components/sections/ScrollFilm';
import ScrollStory from '@/components/sections/ScrollStory';
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
      {/* 3D: the emblem explodes into the 9 service cards */}
      <ExplodedMenu />
      {/* Scroll story: each scene opens its service options one by one */}
      <ScrollStory />
      {/* Scroll-scrubbed film (only once public/media/divine.mp4 is uploaded) */}
      <ScrollFilm />
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
