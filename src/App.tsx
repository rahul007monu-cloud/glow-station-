import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BookingModal from '@/components/booking/BookingModal';
import FloatingBackground from '@/components/fx/FloatingBackground';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import FloatingActions from '@/components/layout/FloatingActions';
import Footer from '@/components/layout/Footer';
import MobileDock from '@/components/layout/MobileDock';
import Navbar from '@/components/layout/Navbar';
import WelcomeOffer from '@/components/marketing/WelcomeOffer';
import { BookingProvider, useBooking } from '@/context/BookingProvider';
import Admin from '@/pages/Admin';
import Home from '@/pages/Home';
import OfferLanding from '@/pages/OfferLanding';
import { captureAttribution, initGA, initMetaPixel, trackPageView } from '@/lib/analytics';
import { useOnlineStatus } from '@/lib/hooks';

export default function App() {
  useEffect(() => {
    captureAttribution();
    initMetaPixel();
    initGA();
  }, []);

  return (
    <BookingProvider>
      <FloatingBackground />
      <AnnouncementBar />
      <Navbar />
      <OfflineNotice />
      <RouteEffects />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer" element={<OfferLanding />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
      <MobileDock />
      <FloatingActions />
      <BookingModal />
      <WelcomeOffer />
    </BookingProvider>
  );
}

/** Tracks SPA page views and honours the `?action=book` app shortcut. */
function RouteEffects() {
  const location = useLocation();
  const { openBooking } = useBooking();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'book') openBooking({ from: 'app-shortcut' });
    if (params.get('action') === 'loyalty') {
      document.getElementById('rewards')?.scrollIntoView({ behavior: 'smooth' });
    }
    const ref = params.get('ref');
    if (ref) openBooking({ coupon: 'FRIEND20', from: `referral-${ref}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return null;
}

function OfflineNotice() {
  const online = useOnlineStatus();
  if (online) return null;
  return (
    <div className="fixed inset-x-0 top-0 z-[100] bg-rose-500/90 py-2 text-center text-xs font-medium text-white">
      Aap offline ho — menu aur prices dikhte rahenge, booking online hone par bhej payenge.
    </div>
  );
}
