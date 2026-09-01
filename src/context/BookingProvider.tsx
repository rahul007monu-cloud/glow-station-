import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { trackCustom } from '@/lib/analytics';

type OpenOptions = {
  serviceIds?: string[];
  coupon?: string;
  /** Where the click came from — shows up in analytics funnels. */
  from?: string;
};

type BookingContextValue = {
  open: boolean;
  initialServiceIds: string[];
  initialCoupon: string;
  openBooking: (options?: OpenOptions) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [initialServiceIds, setInitialServiceIds] = useState<string[]>([]);
  const [initialCoupon, setInitialCoupon] = useState('');

  const openBooking = useCallback((options: OpenOptions = {}) => {
    setInitialServiceIds(options.serviceIds ?? []);
    setInitialCoupon(options.coupon ?? '');
    setOpen(true);
    trackCustom('BookingOpened', { from: options.from ?? 'unknown' });
  }, []);

  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, initialServiceIds, initialCoupon, openBooking, closeBooking }),
    [open, initialServiceIds, initialCoupon, openBooking, closeBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
