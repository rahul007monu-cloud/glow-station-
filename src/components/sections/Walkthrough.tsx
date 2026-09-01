import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import {
  BridalSuiteArt,
  HairStudioArt,
  NailLoungeArt,
  ReceptionArt,
  SkinBarArt,
  VanityBulbs,
} from '@/components/fx/SalonArt';
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/context/BookingProvider';
import { formatINR, categories } from '@/data/salon';

type Room = {
  id: string;
  step: string;
  name: string;
  line: string;
  detail: string;
  /** Which service category this room books. */
  categoryId?: string;
  art: () => JSX.Element;
};

const rooms: Room[] = [
  {
    id: 'reception',
    step: 'Step 01',
    name: 'The Reception',
    line: 'Aap andar aate ho — naam counter par already ready hai.',
    detail:
      'Marble counter, fresh orchids aur ilaichi chai. Aapka slot pre-booked hai, isliye seedha chair tak.',
    art: ReceptionArt,
  },
  {
    id: 'hair',
    step: 'Step 02',
    name: 'The Hair Studio',
    line: 'Mirror wall, warm bulbs aur aapka personal stylist.',
    detail:
      'Consultation pehle, scissors baad me. Cut, global colour, balayage ya keratin — sab branded products se.',
    categoryId: 'hair',
    art: HairStudioArt,
  },
  {
    id: 'skin',
    step: 'Step 03',
    name: 'The Skin Bar',
    line: 'Halka sangeet, steam aur glass-skin glow.',
    detail:
      'Skin analysis ke baad hi facial choose hota hai. Hydra glow, dermat-grade peel ya express clean-up.',
    categoryId: 'skin',
    art: SkinBarArt,
  },
  {
    id: 'nails',
    step: 'Step 04',
    name: 'The Nail Lounge',
    line: 'Har shade, sterilised tools, zero rush.',
    detail:
      'Gel polish, acrylic extensions aur custom art. Tools UV-sterilised, files single-use.',
    categoryId: 'nails',
    art: NailLoungeArt,
  },
  {
    id: 'bridal',
    step: 'Step 05',
    name: 'The Bridal Suite',
    line: 'Chandelier ke neeche, aapka big-day look.',
    detail:
      'Private suite, dedicated bridal manager aur trial se pehle final look lock. Family ke liye alag seating.',
    categoryId: 'makeup',
    art: BridalSuiteArt,
  },
];

/**
 * Scroll-driven virtual tour of the salon.
 *
 * The section is 5 screens tall; the visual stays pinned while each room fades,
 * scales and drifts as the customer scrolls — so the page feels like walking
 * from the reception to the bridal suite.
 */
export default function Walkthrough() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="experience" ref={ref} className="relative" style={{ height: `${rooms.length * 100}vh` }}>
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden px-5 sm:px-8">
        {/* ambience heading */}
        <div className="pointer-events-none absolute inset-x-0 top-24 z-30 text-center sm:top-28">
          <p className="text-[0.6rem] uppercase tracking-[0.45em] text-gold-300/80">
            Virtual walkthrough
          </p>
          <p className="mt-1 font-display text-xl text-white/70 sm:text-2xl">
            Scroll karo — poora salon ghoom lo
          </p>
        </div>

        <div className="relative h-full w-full">
          {rooms.map((room, i) => (
            <RoomScene
              key={room.id}
              room={room}
              index={i}
              total={rooms.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* progress rail */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {rooms.map((room, i) => (
            <RoomDot key={room.id} index={i} total={rooms.length} progress={scrollYProgress} />
          ))}
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-8 right-6 hidden items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/35 sm:flex"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          Scroll <ArrowDown size={12} />
        </motion.div>
      </div>
    </section>
  );
}

function RoomScene({
  room,
  index,
  total,
  progress,
}: {
  room: Room;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;

  /**
   * Each room owns its own slice of the scroll, and the fade-out of one room
   * finishes exactly where the next one starts — so only a single room is ever
   * on screen. The first room is visible the moment the section is pinned.
   */
  const isFirst = index === 0;
  const isLast = index === total - 1;
  /* First room is visible on entry; the last one stays until the section ends. */
  const opacity = useTransform(
    progress,
    [isFirst ? -0.001 : start, start + span * 0.16, isLast ? 1 : end - span * 0.16, isLast ? 1.001 : end],
    [0, 1, 1, isLast ? 1 : 0],
  );
  const scale = useTransform(progress, [start - span * 0.5, end + span * 0.5], [0.93, 1.05]);
  const artY = useTransform(progress, [start - span * 0.5, end + span * 0.5], [50, -50]);
  const textY = useTransform(progress, [start - span * 0.5, end + span * 0.5], [32, -32]);

  const { openBooking } = useBooking();
  const category = categories.find((c) => c.id === room.categoryId);
  const cheapest = category
    ? Math.min(...category.items.map((item) => item.price))
    : undefined;
  const Art = room.art;

  return (
    <>
      {/* Copy — first on mobile, left on desktop */}
      <motion.div
        style={{ opacity, y: textY }}
        className="absolute inset-x-1 top-[17dvh] z-20 sm:inset-x-4 lg:inset-x-0 lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))]"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold-300/85">{room.step}</p>
        <h3 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
          {room.name}
        </h3>
        <VanityBulbs count={5} className="mt-4 max-w-[9rem]" />
        <p className="mt-5 max-w-md text-base text-white/75 sm:text-lg">{room.line}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">{room.detail}</p>

        {category && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              onClick={() => openBooking({ from: `walkthrough-${room.id}` })}
            >
              Book {category.name}
            </Button>
            {cheapest !== undefined && (
              <span className="chip">Starting {formatINR(cheapest)}</span>
            )}
          </div>
        )}
      </motion.div>

      {/* Room visual */}
      <motion.div
        style={{ opacity, scale, y: artY }}
        className="absolute inset-x-2 bottom-16 z-10 h-[32dvh] sm:inset-x-8 sm:h-[36dvh] lg:inset-x-auto lg:bottom-auto lg:right-0 lg:top-1/2 lg:h-[62vh] lg:w-[48%] lg:-translate-y-1/2 lg:pr-[max(1.5rem,calc((100vw-72rem)/2))]"
      >
        <div className="h-full w-full opacity-90">
          <Art />
        </div>
      </motion.div>
    </>
  );
}

function RoomDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start - 0.02, start, end, end + 0.02], [0.25, 1, 1, 0.25]);
  const width = useTransform(progress, [start - 0.02, start, end, end + 0.02], [8, 28, 28, 8]);

  return (
    <motion.span
      style={{ opacity, width }}
      className="h-1.5 rounded-full bg-gold-200"
      aria-hidden
    />
  );
}
