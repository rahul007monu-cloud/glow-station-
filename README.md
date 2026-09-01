# Glow Station Luxe Salon — Website + PWA

Animated "floating" theme website that also installs as an app (PWA) on any
phone. No backend, no monthly server cost: bookings are delivered to the
salon's WhatsApp with every detail pre-filled.

**Live demo:** https://rahul007monu-cloud.github.io/glow-station-/
**Ad landing page:** https://rahul007monu-cloud.github.io/glow-station-/offer
**Owner dashboard:** https://rahul007monu-cloud.github.io/glow-station-/admin (default PIN `1234`)

---

## What's inside

| Area | What it does for the business |
| --- | --- |
| Animated floating theme | Aurora background, drifting orbs, 3D tilt cards, glass UI — premium feel that justifies premium pricing |
| Service menu | 6 categories, 21 services, search, transparent starting prices |
| **Packages with USPs** | Savings maths (`Aap bachate ho ₹901`), validity, seats-left scarcity, and a pay-per-visit vs member comparison |
| Booking flow | 3 steps → WhatsApp message with name, phone, services, slot, coupon, total and lead source |
| Offers | Copyable coupon codes with live countdown timers |
| Loyalty card | 6 visits = free reward, points tracker, saved on the customer's phone |
| Refer & earn | Auto-generated code, one-tap native share / WhatsApp |
| Welcome popup | One-time 25% first-visit offer (once per device) |
| Reviews | Auto-scrolling testimonials + Google review CTA |
| PWA | Installable, works offline, app shortcuts (Book / Offers / Loyalty) |
| Marketing | Meta Pixel + GA4 events, UTM & `fbclid` capture, dedicated `/offer` ad page |
| Owner dashboard | All booking requests, status tags, CSV export |
| SEO | LocalBusiness JSON-LD, OG image, sitemap, robots |

## Editing content (no coding needed)

Everything the customer reads lives in **[`src/data/salon.ts`](src/data/salon.ts)**
— phone number, address, hours, services, prices, packages, offers, staff,
testimonials, FAQs. Change a value, save, and the whole site updates.

Every placeholder that still needs real information is marked `// TODO`.
See [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run icons      # regenerate PWA icons + OG cover
```

## Configuration

Copy `.env.example` to `.env`:

```
VITE_META_PIXEL_ID=   # Meta Pixel — needed before running paid ads
VITE_GA_ID=           # Google Analytics 4 (optional)
VITE_ADMIN_PIN=1234   # change this before going live
```

On GitHub these go in **Settings → Secrets and variables → Actions**.

## Deploying

Merging to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes it to the `gh-pages` branch. Details, plus custom-domain and Netlify /
Vercel instructions: [`docs/DEPLOY.md`](docs/DEPLOY.md).

## Running paid Meta ads

Campaign structure, budgets, audiences, ad copy in Hinglish, and how to read
results: [`docs/META_ADS_PLAYBOOK.md`](docs/META_ADS_PLAYBOOK.md).

## Tech

Vite · React 18 · TypeScript · Tailwind CSS · Framer Motion · vite-plugin-pwa.
Static output — hostable free on GitHub Pages, Netlify, Vercel or Cloudflare.
