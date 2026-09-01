/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  SINGLE SOURCE OF TRUTH FOR ALL SALON CONTENT                        │
 * │  Ye ek file edit karo -> poori website + app update ho jayegi.        │
 * │  Jahan "TODO" likha hai, wahan asli salon ki detail daalni hai.       │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export type ServiceItem = {
  id: string;
  name: string;
  /** Short selling line shown under the name. */
  blurb: string;
  /** Starting price in INR. */
  price: number;
  /** Optional "was" price to show a strike-through discount. */
  mrp?: number;
  /** Approximate duration in minutes, used by the booking slot logic. */
  minutes: number;
  /** Marks the row with a "Bestseller" chip. */
  popular?: boolean;
};

export type ServiceCategory = {
  id: string;
  name: string;
  /** Emoji or short glyph used in the floating category pills. */
  glyph: string;
  tagline: string;
  /** Tailwind gradient classes for the animated card. */
  gradient: string;
  items: ServiceItem[];
};

export type Stylist = {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialities: string[];
  /** Optional photo in /public/images. Falls back to initials avatar. */
  photo?: string;
};

export type Package = {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  badge?: string;
  includes: string[];
  highlight?: boolean;
  /** One-line "who is this for" — helps the customer self-select. */
  bestFor: string;
  /** How long the package stays valid. */
  validity: string;
  /** The 3 differentiators that close the sale. */
  usps: { title: string; detail: string }[];
  /** Scarcity counter shown on the card. Update weekly. */
  seatsLeft?: number;
  /** Optional instalment line, e.g. '2 easy payments'. */
  payment?: string;
};

export type Offer = {
  id: string;
  title: string;
  detail: string;
  code: string;
  /** ISO date; offer hides itself after this date. */
  expires: string;
  tone: 'gold' | 'rose' | 'lilac';
};

export type Testimonial = {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
};

export const salon = {
  // ── Identity ────────────────────────────────────────────────────────────
  name: 'Glow Station',
  suffix: 'Luxe Salon',
  legalName: 'Glow Station Luxe Salon',
  tagline: 'Look Luxe. Feel Luxe.',
  intro:
    'Hair, skin, nails, makeup aur bridal — sab kuch ek premium studio me. Trained stylists, branded products aur hygiene-first setup.',
  establishedYear: 2021, // TODO: confirm

  // ── Contact ─────────────────────────────────────────────────────────────
  /** TODO: asli number daalo. Format: country code + number, no spaces. */
  phone: '+910000000000',
  /** WhatsApp number in wa.me format (digits only, with country code). */
  whatsapp: '910000000000',
  email: 'hello@glowstationluxesalon.com', // TODO
  instagram: 'https://www.instagram.com/glow_station_luxe_salon/',
  instagramHandle: '@glow_station_luxe_salon',
  facebook: '', // TODO: page URL (needed for Meta ads)
  /** TODO: Google Maps "share" link + review link from your Business Profile. */
  mapsLink: 'https://maps.google.com/?q=Glow+Station+Luxe+Salon',
  mapsEmbed:
    'https://www.google.com/maps?q=Glow%20Station%20Luxe%20Salon&output=embed',
  googleReviewLink: 'https://g.page/r/YOUR_PLACE_ID/review', // TODO

  address: {
    line1: 'Shop No. 00, Ground Floor', // TODO
    line2: 'Main Market Road', // TODO
    city: 'Your City', // TODO
    state: 'Your State', // TODO
    pincode: '000000', // TODO
  },

  hours: {
    weekdays: '10:00 AM – 9:00 PM',
    weekends: '9:30 AM – 9:30 PM',
    closedDay: 'Open all days', // e.g. 'Closed on Tuesday'
    /** Booking engine uses these 24h values. */
    openHour: 10,
    closeHour: 21,
    slotMinutes: 30,
  },

  /** Shown on the trust strip. */
  stats: [
    { value: '4.9★', label: 'Google rating' },
    { value: '12k+', label: 'Happy clients' },
    { value: '15+', label: 'Expert stylists' },
    { value: '100%', label: 'Sanitised tools' },
  ],

  usps: [
    {
      title: 'Certified stylists',
      detail: 'Loreal & Schwarzkopf trained team, regular in-house academy sessions.',
      glyph: '✂️',
    },
    {
      title: 'Only branded products',
      detail: 'Original L\u2019Oreal, Schwarzkopf, O3+ & Kerastase — no local mixing.',
      glyph: '🧴',
    },
    {
      title: 'Hygiene first',
      detail: 'Single-use disposables, UV-sterilised tools, sanitised stations.',
      glyph: '🧼',
    },
    {
      title: 'On-time slots',
      detail: 'Pre-booked appointments so you never wait in queue.',
      glyph: '⏱️',
    },
  ],

  /** Loyalty programme rules (fully client-side, no backend needed). */
  loyalty: {
    stampsForReward: 6,
    reward: 'Free hair spa + head massage',
    pointsPerHundred: 5,
  },

  referral: {
    friendDiscount: 20,
    yourDiscount: 20,
  },

  /** First-visit popup shown once per device. */
  welcomeOffer: {
    enabled: true,
    headline: 'Pehli visit par 25% OFF',
    sub: 'Naye customers ke liye — koi bhi ek service par.',
    code: 'GLOW25',
  },
};

export const categories: ServiceCategory[] = [
  {
    id: 'hair',
    name: 'Hair Studio',
    glyph: '💇‍♀️',
    tagline: 'Cut, colour, keratin & repair',
    gradient: 'from-lilac-500/30 via-lilac-400/10 to-transparent',
    items: [
      {
        id: 'hair-cut-women',
        name: 'Haircut & blow dry (Women)',
        blurb: 'Consultation + wash + finish styling',
        price: 599,
        mrp: 799,
        minutes: 45,
        popular: true,
      },
      {
        id: 'hair-cut-men',
        name: 'Haircut & beard styling (Men)',
        blurb: 'Machine + scissor cut with hot towel finish',
        price: 299,
        minutes: 30,
      },
      {
        id: 'global-colour',
        name: 'Global hair colour',
        blurb: 'Ammonia-free, includes colour lock serum',
        price: 2499,
        mrp: 3200,
        minutes: 120,
        popular: true,
      },
      {
        id: 'highlights',
        name: 'Balayage / highlights',
        blurb: 'Free-hand painting for a sun-kissed finish',
        price: 3999,
        minutes: 150,
      },
      {
        id: 'keratin',
        name: 'Keratin / botox treatment',
        blurb: 'Frizz-free, salon-smooth hair for up to 5 months',
        price: 4999,
        mrp: 6500,
        minutes: 180,
        popular: true,
      },
      {
        id: 'hair-spa',
        name: 'Hair spa & scalp detox',
        blurb: 'Deep conditioning with steam + head massage',
        price: 899,
        minutes: 60,
      },
    ],
  },
  {
    id: 'skin',
    name: 'Skin Bar',
    glyph: '✨',
    tagline: 'Facials, peels & glow rituals',
    gradient: 'from-rose-500/30 via-rose-400/10 to-transparent',
    items: [
      {
        id: 'clean-up',
        name: 'Express clean-up',
        blurb: '30-minute refresh before any event',
        price: 699,
        minutes: 30,
      },
      {
        id: 'hydra-facial',
        name: 'Hydra glow facial',
        blurb: 'Deep cleanse + hydration + LED glow',
        price: 1999,
        mrp: 2600,
        minutes: 75,
        popular: true,
      },
      {
        id: 'derma-peel',
        name: 'Dermatologist-grade peel',
        blurb: 'For pigmentation, tan and acne marks',
        price: 2499,
        minutes: 60,
      },
      {
        id: 'dtan',
        name: 'D-tan face & neck',
        blurb: 'Instant brightening, wedding-season favourite',
        price: 599,
        minutes: 30,
      },
    ],
  },
  {
    id: 'makeup',
    name: 'Makeup & Bridal',
    glyph: '👰',
    tagline: 'HD, airbrush & bridal looks',
    gradient: 'from-gold-500/30 via-gold-300/10 to-transparent',
    items: [
      {
        id: 'party-makeup',
        name: 'Party / guest makeup',
        blurb: 'HD base with lashes and hairstyling',
        price: 2499,
        minutes: 75,
      },
      {
        id: 'engagement-makeup',
        name: 'Engagement makeup',
        blurb: 'Airbrush finish, saree/lehenga draping included',
        price: 5999,
        minutes: 120,
        popular: true,
      },
      {
        id: 'bridal-makeup',
        name: 'Bridal makeup (full look)',
        blurb: 'Trial + HD/airbrush + hair + draping + touch-up kit',
        price: 14999,
        mrp: 18999,
        minutes: 180,
        popular: true,
      },
    ],
  },
  {
    id: 'nails',
    name: 'Nail Lounge',
    glyph: '💅',
    tagline: 'Extensions, gel & nail art',
    gradient: 'from-rose-400/30 via-lilac-400/10 to-transparent',
    items: [
      {
        id: 'gel-polish',
        name: 'Gel polish',
        blurb: 'Chip-free shine for 3+ weeks',
        price: 999,
        minutes: 45,
      },
      {
        id: 'nail-extension',
        name: 'Acrylic nail extensions',
        blurb: 'Custom length + shape with free basic art',
        price: 2199,
        mrp: 2800,
        minutes: 105,
        popular: true,
      },
      {
        id: 'mani-pedi',
        name: 'Luxe manicure + pedicure',
        blurb: 'Scrub, mask, massage & paraffin dip',
        price: 1499,
        minutes: 75,
      },
    ],
  },
  {
    id: 'grooming',
    name: 'Waxing & Threading',
    glyph: '🪞',
    tagline: 'Rica, chocolate & painless waxing',
    gradient: 'from-gold-400/25 via-rose-300/10 to-transparent',
    items: [
      {
        id: 'full-arms-legs',
        name: 'Rica full arms + full legs',
        blurb: 'Low-temperature wax, less pain',
        price: 1099,
        minutes: 60,
        popular: true,
      },
      {
        id: 'full-body-wax',
        name: 'Full body waxing',
        blurb: 'Includes underarms and back',
        price: 2799,
        minutes: 110,
      },
      {
        id: 'threading',
        name: 'Eyebrow + upper lip threading',
        blurb: 'Precision shaping by senior artist',
        price: 99,
        minutes: 15,
      },
    ],
  },
  {
    id: 'spa',
    name: 'Spa & Body',
    glyph: '🌿',
    tagline: 'Massage, polishing & detox',
    gradient: 'from-lilac-400/25 via-gold-300/10 to-transparent',
    items: [
      {
        id: 'body-massage',
        name: 'Aroma relaxation massage (60 min)',
        blurb: 'Full body, therapist of your preferred gender',
        price: 1999,
        minutes: 60,
      },
      {
        id: 'body-polish',
        name: 'Body polishing & de-tan',
        blurb: 'Even-tone glow for bridal prep',
        price: 3499,
        minutes: 90,
      },
    ],
  },
];

export const packages: Package[] = [
  {
    id: 'glow-monthly',
    name: 'Glow Member (Monthly)',
    price: 1499,
    mrp: 2400,
    badge: 'Best value',
    highlight: true,
    bestFor: 'Har mahine grooming karne wali working women & students',
    validity: '30 days from first visit',
    seatsLeft: 8,
    payment: 'Pay once — UPI / card / cash',
    includes: [
      '1 haircut + blow dry',
      '1 clean-up or D-tan facial',
      '1 eyebrow + upper lip threading',
      'Flat 10% off on every other service',
      'Priority weekend slot booking',
      'Free hair & skin consultation',
    ],
    usps: [
      {
        title: 'Save ₹900 every month',
        detail: 'Same services individually cost ₹2,400. Ek visit me hi paisa vasool.',
      },
      {
        title: 'Zero waiting, priority slots',
        detail: 'Members ko weekend aur evening ke reserved slots pehle milte hain.',
      },
      {
        title: 'Same senior stylist every time',
        detail: 'Aapke baal aur skin ka record maintain hota hai, result consistent rehta hai.',
      },
    ],
  },
  {
    id: 'bridal-pro',
    name: 'Bridal Pre-Wedding Pack',
    price: 24999,
    mrp: 32000,
    badge: 'Most booked',
    bestFor: 'Brides jinki shaadi 45–90 din me hai',
    validity: '4 months, transferable to sister/mother',
    seatsLeft: 4,
    payment: '2 easy instalments possible',
    includes: [
      '4 glow facials + 2 dermat-grade peels',
      'Full body polishing + de-tan',
      '3 hair spa sittings + colour touch-up',
      'Bridal HD/airbrush makeup with trial',
      'Complimentary mehendi-day hairstyling',
      'Saree/lehenga draping on all functions',
      'Dedicated bridal manager on WhatsApp',
    ],
    usps: [
      {
        title: '90-day glow calendar',
        detail:
          'Har sitting ki date pehle se plan hoti hai — last-minute panic aur breakout ka risk zero.',
      },
      {
        title: 'Trial se pehle final look lock',
        detail: 'Makeup trial included hai, so shaadi wale din koi surprise nahi.',
      },
      {
        title: 'Save ₹7,000 + free hairstyling',
        detail: 'Individual booking par yahi sab ₹32,000 padta hai.',
      },
    ],
  },
  {
    id: 'gents-club',
    name: 'Gents Grooming Club',
    price: 999,
    mrp: 1600,
    bestFor: 'Office-going men jinko monthly clean look chahiye',
    validity: '45 days',
    seatsLeft: 12,
    payment: 'Pay once — UPI / card / cash',
    includes: [
      '2 haircuts (senior stylist)',
      '1 beard design + hot towel finish',
      '1 charcoal de-tan facial',
      'Free head massage on every visit',
      '10% off on hair colour & spa',
    ],
    usps: [
      {
        title: 'Fixed 15-min slots',
        detail: 'App se slot book karo, seedha chair par baitho — no queue.',
      },
      {
        title: 'Save ₹600 + free massage',
        detail: 'Do haircut aur ek facial alag lene par ₹1,600 lagta hai.',
      },
      {
        title: 'Same barber, same style',
        detail: 'Aapka fade aur beard shape record ho jata hai, result repeat hota hai.',
      },
    ],
  },
];

/** Reasons that make a package obviously better than pay-per-visit. */
export const packageUsps = [
  {
    glyph: '💸',
    title: 'Upto 38% saving',
    detail: 'Package rate always individual rate se kam hota hai — likhit me, no fine print.',
  },
  {
    glyph: '⚡',
    title: 'Priority booking',
    detail: 'Members ke liye peak-hour slots reserve rehte hain.',
  },
  {
    glyph: '🎁',
    title: 'Free add-ons',
    detail: 'Head massage, consultation aur touch-up bilkul free.',
  },
  {
    glyph: '🔁',
    title: 'Transferable & flexible',
    detail: 'Family member ko de sakte ho, sittings apni marzi se schedule karo.',
  },
];

export const offers: Offer[] = [
  {
    id: 'first-visit',
    title: '25% OFF first visit',
    detail: 'Naye customers ke liye kisi bhi ek service par. App se book karo.',
    code: 'GLOW25',
    expires: '2027-12-31',
    tone: 'gold',
  },
  {
    id: 'weekday-happy',
    title: 'Weekday Happy Hours',
    detail: 'Mon–Thu, 11 AM–3 PM: hair spa + threading combo at ₹899.',
    code: 'HAPPY899',
    expires: '2027-12-31',
    tone: 'rose',
  },
  {
    id: 'bridal-early',
    title: 'Bridal early-bird',
    detail: 'Shaadi 60+ din door hai? Bridal pack par ₹3,000 off.',
    code: 'DULHAN3000',
    expires: '2027-12-31',
    tone: 'lilac',
  },
];

export const stylists: Stylist[] = [
  {
    id: 'st-1',
    name: 'Aarti Sharma', // TODO
    role: 'Creative Director – Hair',
    experience: '11 yrs',
    specialities: ['Balayage', 'Keratin', 'Precision cuts'],
  },
  {
    id: 'st-2',
    name: 'Rahul Verma', // TODO
    role: 'Senior Stylist',
    experience: '8 yrs',
    specialities: ['Men’s grooming', 'Beard design', 'Fades'],
  },
  {
    id: 'st-3',
    name: 'Neha Kapoor', // TODO
    role: 'Bridal Makeup Artist',
    experience: '9 yrs',
    specialities: ['Airbrush', 'HD bridal', 'Draping'],
  },
  {
    id: 'st-4',
    name: 'Simran Kaur', // TODO
    role: 'Skin & Nail Specialist',
    experience: '6 yrs',
    specialities: ['Hydra facial', 'Peels', 'Nail art'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya M.',
    service: 'Keratin treatment',
    rating: 5,
    text: 'Hair itna smooth pehle kabhi nahi hua. Staff ne pura process samjhaya aur after-care tips bhi diye.',
  },
  {
    id: 't2',
    name: 'Ankit R.',
    service: 'Haircut & beard',
    rating: 5,
    text: 'Booking WhatsApp par 1 minute me ho gayi, zero waiting. Best grooming experience in the area.',
  },
  {
    id: 't3',
    name: 'Sneha & family',
    service: 'Bridal package',
    rating: 5,
    text: 'Meri shaadi ka look sabne notice kiya. Trial se lekar final day tak sab perfectly planned tha.',
  },
  {
    id: 't4',
    name: 'Ritu S.',
    service: 'Hydra glow facial',
    rating: 5,
    text: 'Skin literally glowing thi next day. Products original hai, yeh clearly dikhta hai.',
  },
];

export const faqs = [
  {
    q: 'Appointment kaise book karein?',
    a: 'Website ya app se service select karo, date-time choose karo, aur “Confirm on WhatsApp” dabao. Aapki booking summary seedha hamare WhatsApp par aa jayegi aur hum 10 minute me confirm kar denge.',
  },
  {
    q: 'Walk-in allowed hai?',
    a: 'Haan, lekin weekend aur evening slots jaldi bhar jaate hain. Pre-booking karne par waiting nahi hoti aur app users ko priority slot milta hai.',
  },
  {
    q: 'Products original hote hain?',
    a: 'Bilkul. Hum sirf authorised distributors se L’Oréal, Schwarzkopf, Kérastase aur O3+ mangwate hain. Aap chahen to product ka box aur batch number check kar sakte hain.',
  },
  {
    q: 'Bridal booking kitne pehle karni chahiye?',
    a: 'Peak wedding season (Oct–Feb) me 45–60 din pehle. Early-bird booking par ₹3,000 tak discount bhi milta hai.',
  },
  {
    q: 'Payment options kya hain?',
    a: 'UPI, cards, aur cash — sab accept karte hain. Membership aur bridal packages par installment bhi possible hai.',
  },
  {
    q: 'Home service milti hai?',
    a: 'Bridal aur party makeup ke liye home/venue service available hai (travel charges alag). WhatsApp par pin location bhejiye, hum quote de denge.',
  },
];

/** Flattened list — handy for search and the booking dropdown. */
export const allServices: (ServiceItem & { categoryId: string; categoryName: string })[] =
  categories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryId: c.id, categoryName: c.name })),
  );

export const findService = (id: string) => allServices.find((s) => s.id === id);

export const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);


/**
 * Gallery tiles. Drop real photos into `public/images/` and set `src`
 * (e.g. src: 'images/balayage.jpg'). Until then a styled gradient tile with
 * the label is shown, so the layout never looks broken.
 */
export const gallery: {
  id: string;
  label: string;
  tag: string;
  src?: string;
  tall?: boolean;
}[] = [
  { id: 'g1', label: 'Balayage transformation', tag: 'Hair colour', tall: true },
  { id: 'g2', label: 'Bridal HD look', tag: 'Bridal' },
  { id: 'g3', label: 'Keratin smooth finish', tag: 'Hair care' },
  { id: 'g4', label: 'Glass-skin facial', tag: 'Skin', tall: true },
  { id: 'g5', label: 'Almond nail extensions', tag: 'Nails' },
  { id: 'g6', label: 'Men’s textured fade', tag: 'Grooming' },
];
