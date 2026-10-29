# Divine Touch by Diksha Gupta — Website + installable app (PWA)

*Where Beauty Meets Perfection · Enhance. Elegance. Empower.*

Website for **Divine Touch**, an individual beauty startup run by Diksha Gupta
(this is a solo professional, not a parlour). Clients book eyebrows, waxing,
mani-pedi, massages, hair styling, facials, body treatments, makeup and skin
consultations at home or at the studio. The same site installs on any phone as
an app (PWA). There is no backend and no monthly server cost: each booking
reaches Diksha's WhatsApp with every detail pre-filled.

**Live demo:** https://rahul007monu-cloud.github.io/glow-station-/
**Ad landing page:** https://rahul007monu-cloud.github.io/glow-station-/offer
**Owner dashboard:** https://rahul007monu-cloud.github.io/glow-station-/admin (default PIN `1234`)

---

## What's inside

| Area | What it does for the business |
| --- | --- |
| Brand theme | Purple/magenta + gold from the Divine Touch flyer, script "Touch" wordmark, floating animated UI |
| The Divine Experience | 9 service categories from the flyer, 32 services, search, starting prices |
| Home or studio booking | 3 steps → choose services, date/time + **home visit or studio** (address for home), then WhatsApp |
| How it works | 4-step explainer so first-time clients trust a solo, doorstep service |
| Meet Diksha | Artist profile (bio, experience, certificates, photo) instead of a "team" |
| Packages | Monthly Divine Care, Party Ready Glow, Bridal Divine Pack, with savings maths |
| Offers | `DIVINE10` 10% off the first service (from the flyer), weekday and bridal codes, live countdown |
| Loyalty & referral | 6 visits = free fruit facial, refer & earn `FRIEND10` |
| Reviews | Real reviews only. Until the first one is added, shows a "share feedback" card |
| **Installable app** | Android/desktop: one-tap install banner + menu option. iPhone: Share → Add to Home Screen guide. Works offline, app shortcuts (Book / Offers / Rewards) |
| Marketing | Meta Pixel + GA4 events, UTM & `fbclid` capture, dedicated `/offer` ad page |
| Owner dashboard | All booking requests with location/address, status tags, CSV export |

## Editing content (no coding needed)

Everything the customer reads lives in **[`src/data/salon.ts`](src/data/salon.ts)**
— phone, service areas, home/studio modes, hours, services, prices, packages,
offers, Diksha's profile, reviews, FAQs and the logo path. Change a value, save, and the whole site updates.

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
