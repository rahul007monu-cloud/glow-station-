/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  SINGLE SOURCE OF TRUTH FOR ALL "DIVINE TOUCH" CONTENT               │
 * │  Ye ek file edit karo -> poori website + app update ho jayegi.        │
 * │  Jahan "TODO" likha hai, wahan asli detail / price daalni hai.        │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Divine Touch ek individual beauty startup hai (salon / parlour nahi):
 * Diksha Gupta khud har client ki service karti hain — client ke ghar par
 * (home visit) ya apne studio par. Isliye "team / stylist" ki jagah ek
 * artist profile hai, aur booking me "service kahan chahiye" poocha jata hai.
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
  /** Real capacity limit (one artist = limited slots). Update weekly. */
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

export type ServiceMode = 'home' | 'studio';

export const salon = {
  // ── Identity ────────────────────────────────────────────────────────────
  name: 'Divine',
  suffix: 'Touch',
  legalName: 'Divine Touch',
  owner: 'Diksha Gupta',
  tagline: 'Where Beauty Meets Perfection',
  motto: 'Enhance. Elegance. Empower.',
  intro:
    'Eyebrows se lekar bridal makeup tak — Diksha Gupta khud aapki har service karti hain. Aapke ghar par ya studio par, premium products aur personalised care ke saath.',
  /**
   * Official logo. Logo ki PNG/SVG file `public/images/logo.png` me daalo aur
   * yahan 'images/logo.png' likho. Khaali rahe to built-in vector logo dikhega.
   */
  logoSrc: '',

  // ── Contact ─────────────────────────────────────────────────────────────
  phone: '+919057003469',
  /** WhatsApp number in wa.me format (digits only, with country code). */
  whatsapp: '919057003469',
  email: '', // TODO: optional — khaali rahe to website par nahi dikhega
  instagram: 'https://www.instagram.com/divine_touch_/',
  instagramHandle: '@divine_touch_',
  facebook: '', // TODO: page URL (needed for Meta ads)
  /** TODO: Google Business Profile banne ke baad review link daalo. */
  googleReviewLink: '',
  /** TODO: studio ka Google Maps link (sirf agar studio hai). */
  mapsLink: '',
  /** TODO: studio map embed URL. Khaali rahe to map section nahi dikhega. */
  mapsEmbed: '',

  /** Studio address (agar studio nahi hai to sirf city/state bharo). */
  address: {
    line1: '', // TODO
    line2: '', // TODO
    city: 'Your City', // TODO: apna shehar
    state: 'Your State', // TODO
    pincode: '', // TODO
  },

  /**
   * Service kahan milegi. Jo mode available nahi hai use `enabled: false` karo —
   * booking form apne aap adjust ho jayega.
   */
  serviceModes: {
    home: {
      enabled: true,
      label: 'At my home',
      detail: 'Diksha sanitised kit ke saath aapke ghar aayengi',
      /** Shown to the customer; 0 = free. */
      travelNote: 'Travel charge area ke hisaab se, booking confirm karte waqt bataya jayega', // TODO
    },
    studio: {
      enabled: true, // TODO: studio nahi hai to false
      label: 'At the studio',
      detail: 'Private, hygienic studio setup — sirf appointment par',
      travelNote: '',
    },
  } satisfies Record<ServiceMode, { enabled: boolean; label: string; detail: string; travelNote: string }>,

  /** Areas jahan home service milti hai. TODO: apne areas likho. */
  serviceAreas: ['Your City — all major areas'],

  hours: {
    weekdays: '9:00 AM – 8:00 PM',
    weekends: '9:00 AM – 8:00 PM',
    closedDay: 'Bridal bookings ke liye early-morning slots bhi', // e.g. 'Closed on Tuesday'
    /** Booking engine uses these 24h values. */
    openHour: 9,
    closeHour: 20,
    slotMinutes: 30,
  },

  /** Shown on the trust strip. Sirf sach likho — naya brand hai, fake numbers mat daalo. */
  stats: [
    { value: '9', label: 'Service types' },
    { value: 'Doorstep', label: 'Home service' },
    { value: '100%', label: 'Sanitised kit' },
    { value: '10%', label: 'Off first service' },
  ],

  /** "Why choose us" — flyer wale points. */
  usps: [
    {
      title: 'Experienced & certified',
      detail: 'Trained beauty professional — har service khud Diksha karti hain, koi junior nahi.',
      glyph: '🎓',
    },
    {
      title: 'Premium quality products',
      detail: 'Sirf branded, skin-safe products. Aap chahein to product pehle dekh sakte hain.',
      glyph: '🧴',
    },
    {
      title: 'Hygienic & safe',
      detail: 'Har client ke liye fresh disposables, sanitised tools aur clean setup.',
      glyph: '🧼',
    },
    {
      title: 'Personalised care',
      detail: 'Service se pehle skin / hair consultation — aapke type ke hisaab se treatment.',
      glyph: '💗',
    },
    {
      title: 'Ghar baithe service',
      detail: 'Traffic aur waiting nahi. Aapke time par, aapke ghar par.',
      glyph: '🏡',
    },
    {
      title: 'Satisfaction guaranteed',
      detail: 'Result pasand nahi aaya? 48 ghante me batao, free touch-up karenge.', // TODO: confirm policy
      glyph: '✨',
    },
  ],

  /** Loyalty programme rules (fully client-side, no backend needed). */
  loyalty: {
    stampsForReward: 6,
    reward: 'Free fruit facial',
    pointsPerHundred: 5,
  },

  referral: {
    /** Coupon jo referred friend ko milta hai. */
    code: 'FRIEND10',
    friendDiscount: 10,
    yourDiscount: 10,
  },

  /** First-visit popup shown once per device. Flyer wala "10% OFF for discovering us". */
  welcomeOffer: {
    enabled: true,
    headline: '10% OFF — for discovering us!',
    sub: 'Pehli service par flat 10% off. Aaj hi appointment book karo.',
    code: 'DIVINE10',
  },
};

/** The artist behind the brand — replaces the old "team" section. */
export const artist = {
  name: salon.owner,
  title: 'Founder & Beauty Professional',
  /** TODO: Diksha ki photo `public/images/diksha.jpg` me daal kar 'images/diksha.jpg' likho. */
  photo: '',
  experience: '5+ years', // TODO: confirm
  bio: 'Divine Touch ki shuruaat ek simple soch se hui — har ladki ko premium beauty care mile, bina parlour ki bheed aur waiting ke. Main har client ki service khud karti hoon, consultation se lekar final look tak, taaki result hamesha consistent aur personal rahe.', // TODO: apne shabdon me
  specialities: ['Bridal & party makeup', 'Facials & skin care', 'Waxing & threading', 'Hair styling'],
  /** TODO: asli certificates / courses ke naam. */
  certifications: ['Certified Beauty Professional', 'Advanced Makeup Course'],
};

export const categories: ServiceCategory[] = [
  {
    id: 'eyebrows',
    name: 'Eyebrows',
    glyph: '👁️',
    tagline: 'Shape and define your brows',
    gradient: 'from-lilac-500/30 via-lilac-400/10 to-transparent',
    items: [
      {
        id: 'eyebrow-threading',
        name: 'Eyebrow threading',
        blurb: 'Face shape ke hisaab se precise shaping',
        price: 50,
        minutes: 15,
        popular: true,
      },
      {
        id: 'upper-lip',
        name: 'Upper lip / forehead threading',
        blurb: 'Quick, clean finish',
        price: 30,
        minutes: 10,
      },
      {
        id: 'full-face-threading',
        name: 'Full face threading',
        blurb: 'Eyebrows, upper lip, chin, forehead & sides',
        price: 150,
        minutes: 30,
      },
      {
        id: 'brow-tint',
        name: 'Brow tint & shaping',
        blurb: 'Fuller, defined brows for 3–4 weeks',
        price: 399,
        minutes: 30,
      },
    ],
  },
  {
    id: 'waxing',
    name: 'Waxing & Hair Removal',
    glyph: '🍯',
    tagline: 'Smooth, flawless skin',
    gradient: 'from-gold-400/25 via-rose-300/10 to-transparent',
    items: [
      {
        id: 'arms-legs-rica',
        name: 'Rica full arms + full legs',
        blurb: 'Low-temperature wax, kam dard, sensitive skin friendly',
        price: 899,
        mrp: 1099,
        minutes: 60,
        popular: true,
      },
      {
        id: 'full-arms',
        name: 'Full arms (normal wax)',
        blurb: 'Includes underarms',
        price: 299,
        minutes: 25,
      },
      {
        id: 'full-legs',
        name: 'Full legs (normal wax)',
        blurb: 'Smooth finish with soothing gel',
        price: 399,
        minutes: 30,
      },
      {
        id: 'face-wax',
        name: 'Face waxing (peel-off)',
        blurb: 'Upper lip, chin & sides — gentle peel-off wax',
        price: 249,
        minutes: 20,
      },
      {
        id: 'full-body-rica',
        name: 'Full body Rica wax',
        blurb: 'Arms, legs, underarms, back & stomach',
        price: 1999,
        mrp: 2499,
        minutes: 110,
      },
    ],
  },
  {
    id: 'mani-pedi',
    name: 'Manicure & Pedicure',
    glyph: '💅',
    tagline: 'Expert hand and foot care',
    gradient: 'from-rose-400/30 via-lilac-400/10 to-transparent',
    items: [
      {
        id: 'classic-manicure',
        name: 'Classic manicure',
        blurb: 'Soak, cuticle care, shaping & polish',
        price: 399,
        minutes: 35,
      },
      {
        id: 'classic-pedicure',
        name: 'Classic pedicure',
        blurb: 'Soak, scrub, callus care & polish',
        price: 499,
        minutes: 45,
      },
      {
        id: 'spa-mani-pedi',
        name: 'Spa manicure + pedicure',
        blurb: 'Scrub, mask, massage — full relaxing ritual',
        price: 1199,
        mrp: 1499,
        minutes: 80,
        popular: true,
      },
      {
        id: 'gel-polish',
        name: 'Gel polish (hands)',
        blurb: 'Chip-free shine for 2–3 weeks',
        price: 699,
        minutes: 40,
      },
    ],
  },
  {
    id: 'massage',
    name: 'Massages',
    glyph: '💆‍♀️',
    tagline: 'Relax and rejuvenate your body',
    gradient: 'from-lilac-400/25 via-gold-300/10 to-transparent',
    items: [
      {
        id: 'head-massage',
        name: 'Head & shoulder massage (30 min)',
        blurb: 'Warm oil, stress release',
        price: 299,
        minutes: 30,
      },
      {
        id: 'foot-massage',
        name: 'Foot reflexology (30 min)',
        blurb: 'Thakaan door, better sleep',
        price: 399,
        minutes: 30,
      },
      {
        id: 'body-massage',
        name: 'Full body relaxing massage (60 min)',
        blurb: 'Aroma oil, women only',
        price: 1299,
        minutes: 60,
        popular: true,
      },
    ],
  },
  {
    id: 'hair',
    name: 'Hair Styling',
    glyph: '💇‍♀️',
    tagline: 'Style and treat your hair',
    gradient: 'from-lilac-500/30 via-rose-400/10 to-transparent',
    items: [
      {
        id: 'hair-spa',
        name: 'Hair spa',
        blurb: 'Deep conditioning + head massage',
        price: 799,
        minutes: 60,
        popular: true,
      },
      {
        id: 'blow-dry',
        name: 'Blow-dry / curls / straightening',
        blurb: 'Party-ready finish with heat protection',
        price: 499,
        minutes: 40,
      },
      {
        id: 'party-hairstyle',
        name: 'Party hairstyle',
        blurb: 'Bun, braid ya open-hair look',
        price: 799,
        minutes: 45,
      },
      {
        id: 'root-touchup',
        name: 'Root touch-up (hair colour)',
        blurb: 'Ammonia-free colour, roots only',
        price: 899,
        minutes: 60,
      },
    ],
  },
  {
    id: 'facials',
    name: 'Facials',
    glyph: '✨',
    tagline: 'Revitalise and nourish your skin',
    gradient: 'from-rose-500/30 via-rose-400/10 to-transparent',
    items: [
      {
        id: 'clean-up',
        name: 'Clean-up',
        blurb: 'Deep cleanse + scrub + mask — 40 minute refresh',
        price: 599,
        minutes: 40,
      },
      {
        id: 'dtan',
        name: 'D-tan face & neck',
        blurb: 'Instant brightening',
        price: 499,
        minutes: 30,
      },
      {
        id: 'fruit-facial',
        name: 'Fruit facial',
        blurb: 'Natural glow, all skin types',
        price: 899,
        minutes: 60,
      },
      {
        id: 'gold-facial',
        name: 'Gold / glow facial',
        blurb: 'Party ya function se pehle ka favourite',
        price: 1499,
        mrp: 1799,
        minutes: 75,
        popular: true,
      },
    ],
  },
  {
    id: 'body',
    name: 'Body Treatments',
    glyph: '🌸',
    tagline: 'Refresh and rejuvenate your skin',
    gradient: 'from-gold-500/25 via-lilac-300/10 to-transparent',
    items: [
      {
        id: 'body-polishing',
        name: 'Full body polishing',
        blurb: 'Scrub + pack + moisturise — even-tone glow',
        price: 2499,
        mrp: 2999,
        minutes: 90,
        popular: true,
      },
      {
        id: 'body-dtan',
        name: 'Full body D-tan',
        blurb: 'Sun tan removal for arms, legs & back',
        price: 1499,
        minutes: 60,
      },
      {
        id: 'back-polish',
        name: 'Back polishing',
        blurb: 'Backless outfit se pehle ka must',
        price: 799,
        minutes: 40,
      },
    ],
  },
  {
    id: 'makeup',
    name: 'Makeup',
    glyph: '💄',
    tagline: 'Glam up for every occasion',
    gradient: 'from-gold-500/30 via-gold-300/10 to-transparent',
    items: [
      {
        id: 'party-makeup',
        name: 'Party makeup',
        blurb: 'HD base + lashes, hairstyle alag',
        price: 2499,
        minutes: 75,
        popular: true,
      },
      {
        id: 'engagement-makeup',
        name: 'Engagement / reception makeup',
        blurb: 'HD finish + hairstyle + draping',
        price: 4999,
        minutes: 120,
      },
      {
        id: 'bridal-makeup',
        name: 'Bridal makeup (full look)',
        blurb: 'Trial + HD makeup + hairstyle + draping + touch-up',
        price: 11999,
        mrp: 14999,
        minutes: 180,
        popular: true,
      },
      {
        id: 'saree-draping',
        name: 'Saree / dupatta draping',
        blurb: 'Neat pleats, pinned to last all day',
        price: 399,
        minutes: 20,
      },
    ],
  },
  {
    id: 'consultation',
    name: 'Skin Consultation',
    glyph: '📋',
    tagline: 'Personalised skin care advice',
    gradient: 'from-lilac-400/30 via-rose-300/10 to-transparent',
    items: [
      {
        id: 'skin-consultation',
        name: 'Personal skin consultation',
        blurb: 'Skin type analysis + home-care routine. Kisi bhi facial ke saath free.',
        price: 199,
        minutes: 20,
      },
    ],
  },
];

export const packages: Package[] = [
  {
    id: 'monthly-care',
    name: 'Monthly Divine Care',
    price: 1599,
    mrp: 2177,
    badge: 'Best value',
    highlight: true,
    bestFor: 'Har mahine grooming karne wali working women & students',
    validity: '30 days, 1–2 sittings',
    payment: 'Pay once — UPI / cash',
    includes: [
      'Eyebrow + upper lip threading',
      'Rica full arms + full legs wax',
      'Fruit facial',
      'Head & shoulder massage',
      'Free skin consultation',
    ],
    usps: [
      {
        title: 'Save ₹578 every month',
        detail: 'Yahi services alag lene par ₹2,177 lagta hai.',
      },
      {
        title: 'Ghar par, aapke time par',
        detail: 'Ek hi visit me sab — parlour jaane aur wait karne ki zaroorat nahi.',
      },
      {
        title: 'Same artist, same result',
        detail: 'Diksha aapki skin aur preference yaad rakhti hain, har baar consistent result.',
      },
    ],
  },
  {
    id: 'party-ready',
    name: 'Party Ready Glow',
    price: 3299,
    mrp: 3977,
    badge: 'Most booked',
    bestFor: 'Shaadi ke guest, birthday, office party ya photoshoot',
    validity: 'Same day / 1 day before the event',
    payment: 'Pay once — UPI / cash',
    includes: [
      'Clean-up (1 day pehle ya same day)',
      'Party makeup (HD base + lashes)',
      'Party hairstyle',
      'Eyebrow + upper lip threading',
    ],
    usps: [
      {
        title: 'Save ₹678',
        detail: 'Alag-alag booking par ₹3,977 padta hai.',
      },
      {
        title: 'Look pehle discuss',
        detail: 'Outfit ki photo WhatsApp karo — makeup aur hairstyle uske hisaab se plan hoga.',
      },
      {
        title: 'Venue / ghar par ready',
        detail: 'Ghar se hi tayyar hokar nikliye, koi bhaag-daud nahi.',
      },
    ],
  },
  {
    id: 'bridal-divine',
    name: 'Bridal Divine Pack',
    price: 18999,
    mrp: 22991,
    bestFor: 'Brides jinki shaadi 30–90 din me hai',
    validity: '3 months before the wedding',
    seatsLeft: 4,
    payment: '2 easy instalments possible',
    includes: [
      'Bridal makeup with trial',
      '3 gold / glow facials (pre-wedding)',
      'Full body polishing',
      'Full body Rica wax',
      'Spa manicure + pedicure',
      'Draping for 2 pre-wedding functions',
    ],
    usps: [
      {
        title: 'Pre-wedding glow plan',
        detail: 'Har sitting ki date pehle se fix — last-minute breakout ka risk kam.',
      },
      {
        title: 'Trial se look lock',
        detail: 'Makeup trial included, so shaadi wale din koi surprise nahi.',
      },
      {
        title: 'Limited brides per month',
        detail: 'Ek hi artist hai, isliye mahine me gini-chuni bridal bookings li jaati hain.',
      },
    ],
  },
];

/** Reasons that make a package obviously better than pay-per-visit. */
export const packageUsps = [
  {
    glyph: '💸',
    title: 'Upto 27% saving',
    detail: 'Package rate hamesha individual rate se kam — likhit me, no fine print.',
  },
  {
    glyph: '🏡',
    title: 'Ek visit, sab kuch',
    detail: 'Saari services ek hi appointment me, aapke ghar par.',
  },
  {
    glyph: '🎁',
    title: 'Free consultation',
    detail: 'Har package ke saath skin consultation bilkul free.',
  },
  {
    glyph: '📅',
    title: 'Flexible sittings',
    detail: 'Sittings apni suvidha ke hisaab se schedule karo.',
  },
];

/** "How it works" steps — explains the solo / doorstep model in 4 steps. */
export const howItWorks = [
  {
    glyph: '💫',
    title: 'Service choose karo',
    detail: 'Menu se ek ya zyada service select karo — price turant dikhega.',
  },
  {
    glyph: '📍',
    title: 'Slot & location',
    detail: 'Date, time aur jagah chuno — aapka ghar ya studio.',
  },
  {
    glyph: '💬',
    title: 'WhatsApp par confirm',
    detail: 'Booking details seedha Diksha ke WhatsApp par jaati hain, wahi confirm karti hain.',
  },
  {
    glyph: '🌸',
    title: 'Relax & glow',
    detail: 'Diksha sanitised kit ke saath time par pahunchti hain. Aap bas relax karo.',
  },
];

/**
 * Offers renew every month, so the countdown always shows a believable
 * "ends in X days" instead of a fake year-long timer — and nothing ever
 * silently expires on the site.
 *
 * @param monthsAhead 0 = end of this month, 1 = end of next month
 */
function endOfMonth(monthsAhead = 0) {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() + monthsAhead + 1, 0, 23, 59, 0);
  return d.toISOString();
}

export const offers: Offer[] = [
  {
    id: 'first-service',
    title: '10% OFF your first service',
    detail: 'Divine Touch ko discover karne ke liye shukriya! Pehli booking par flat 10% off.',
    code: 'DIVINE10',
    expires: endOfMonth(0),
    tone: 'gold',
  },
  {
    id: 'weekday-glow',
    title: 'Weekday Glow',
    detail: 'Mon–Thu, 11 AM–4 PM ke slots par kisi bhi service par 15% off.',
    code: 'WEEKDAY15',
    expires: endOfMonth(0),
    tone: 'rose',
  },
  {
    id: 'bridal-early',
    title: 'Bridal early-bird',
    detail: 'Shaadi 60+ din door hai? Bridal Divine Pack par extra 10% off.',
    code: 'BRIDE10',
    expires: endOfMonth(1),
    tone: 'lilac',
  },
];

/**
 * Real client reviews only. Jaise hi pehle reviews aayein (WhatsApp / Instagram
 * / Google), yahan add karo. Khaali rahega to section "pehla review" CTA dikhayega.
 *
 * Example:
 *   { id: 't1', name: 'Priya M.', service: 'Party makeup', rating: 5, text: '...' },
 */
export const testimonials: Testimonial[] = [];

export const faqs = [
  {
    q: 'Appointment kaise book karein?',
    a: 'Website ya app se service select karo, date-time aur location (ghar / studio) choose karo, aur “Confirm on WhatsApp” dabao. Aapki booking details seedha Diksha ke WhatsApp par aa jayengi aur woh jaldi confirm kar dengi.',
  },
  {
    q: 'Kya aap ghar par aate ho?',
    a: 'Haan! Divine Touch ki saari services home visit par available hain. Diksha apna poora sanitised kit, disposables aur products saath laati hain — aapko bas ek chair aur thodi jagah chahiye.',
  },
  {
    q: 'Travel charge lagta hai?',
    a: 'Area ke hisaab se chhota sa travel charge ho sakta hai, jo booking confirm karte waqt pehle hi bata diya jata hai. Koi hidden charge nahi.', // TODO: confirm
  },
  {
    q: 'Products kaunse use hote hain?',
    a: 'Sirf branded, skin-safe aur premium quality products. Agar aapki skin sensitive hai ya kisi cheez se allergy hai to booking ke notes me zaroor likhein.',
  },
  {
    q: 'Bridal booking kitne pehle karni chahiye?',
    a: 'Kam se kam 30–60 din pehle, kyunki ek hi artist hone ki wajah se har mahine limited bridal bookings li jaati hain. 60+ din pehle book karne par early-bird discount bhi milta hai.',
  },
  {
    q: 'Payment kaise karna hai?',
    a: 'UPI aur cash dono accept hote hain. Bridal pack ke liye booking amount lekar slot reserve kiya jata hai, baaki 2 instalments me.', // TODO: confirm
  },
  {
    q: 'Booking cancel / reschedule kar sakte hain?',
    a: 'Haan, kam se kam 4 ghante pehle WhatsApp par bata dijiye. Ek artist ki schedule hoti hai, isliye time par batana zaroori hai.', // TODO: confirm
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

/** Resolves a file in `public/` against the deployed base path. */
export const asset = (src: string) =>
  /^https?:\/\//.test(src) ? src : `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;

/** Service modes that are switched on, in display order. */
export const enabledModes = (Object.keys(salon.serviceModes) as ServiceMode[]).filter(
  (m) => salon.serviceModes[m].enabled,
);

/**
 * Gallery tiles. Drop real photos into `public/images/` and set `src`
 * (e.g. src: 'images/bridal-1.jpg'). Until then a styled gradient tile with
 * the label is shown, so the layout never looks broken.
 */
export const gallery: {
  id: string;
  label: string;
  tag: string;
  src?: string;
  tall?: boolean;
}[] = [
  { id: 'g1', label: 'Bridal glam look', tag: 'Makeup', tall: true },
  { id: 'g2', label: 'Defined brows', tag: 'Eyebrows' },
  { id: 'g3', label: 'Glow facial results', tag: 'Facials' },
  { id: 'g4', label: 'Party hairstyle', tag: 'Hair styling', tall: true },
  { id: 'g5', label: 'Spa mani-pedi', tag: 'Nails' },
  { id: 'g6', label: 'Engagement look', tag: 'Makeup' },
];
