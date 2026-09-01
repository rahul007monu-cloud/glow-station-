# Paid Meta (Facebook + Instagram) ads playbook

Ye site ads chalane ke liye already taiyaar hai: Pixel, events, UTM capture aur
ek dedicated landing page (`/offer`). Neeche step-by-step plan hai.

> Ad platform ke rules aur rates badalte rehte hain — final budget/policy
> Meta Ads Manager me confirm kar lena.

## 1. Setup (one time, ~30 minutes)

1. **Meta Business Suite** account banao → business.facebook.com
2. Instagram (`@glow_station_luxe_salon`) ko Business/Creator account banao aur
   Facebook Page se connect karo. **Ads ke liye Facebook Page zaroori hai.**
3. Events Manager → Data Sources → **Create Pixel** → Pixel ID copy karo.
4. Us ID ko GitHub → Settings → Secrets → `VITE_META_PIXEL_ID` me daalo aur
   workflow re-run karo.
5. Events Manager → **Test Events** me site kholo aur check karo ki
   `PageView`, `AddToCart`, `Schedule`, `Lead` events aa rahe hain.
6. Aggregated Event Measurement me `Lead` ko priority 1 aur `Schedule` ko
   priority 2 set karo (iOS users ke liye zaroori).

## 2. Site kaun-kaun se events bhejti hai

| Event | Kab fire hota hai | Kis kaam ka |
| --- | --- | --- |
| `PageView` | har page | audience building |
| `ViewContent` | category / service dekhne par | retargeting |
| `Search` | service search karne par | intent signal |
| `AddToCart` | service ya offer select karne par | mid-funnel |
| `InitiateCheckout` | booking form step 2 / package click | high intent |
| **`Lead`** | form submit, package enquiry | **campaign optimisation event** |
| **`Schedule`** | booking confirm | **sabse valuable event** |
| `Contact` | call / WhatsApp / directions click | walk-in intent |
| Custom | `BookingSentToWhatsApp`, `CouponCopied`, `ReferralShared`, `WelcomeOfferClaimed` | funnel debugging |

Har event ke saath `utm_*` aur `fbclid` bhi jaate hain, aur WhatsApp message me
lead source likha hota hai — isse pata chalta hai kaunsa ad paisa kama raha hai.

## 3. Campaign structure (chhote salon ke liye best)

Do campaign kaafi hain:

### A. "Leads" campaign — naye customers
- **Objective:** Leads (ya Sales if you set up Conversions API later)
- **Conversion location:** Website · **Event:** `Lead`
- **Ad sets (ek-ek se shuru karo):**
  1. **Local cold** — 3–5 km radius around the salon, age 18–45, all genders
     (women-only ad set alag banao agar bridal push karna hai)
  2. **Interest layer** — beauty salon, haircut, bridal makeup, skincare
- **Destination:** `/offer?utm_source=meta&utm_medium=paid&utm_campaign=first-visit-25`
- **Placements:** Advantage+ (Meta ko choose karne do)

### B. "Retargeting" campaign — jo aaye lekin book nahi kiya
- **Audience:** Website visitors 30 days (Pixel), minus `Schedule` karne wale
- **Plus:** Instagram engagers 365 days
- **Message:** package/membership push, ya "aapka GLOW25 code abhi valid hai"
- **Budget:** total ka ~25%

### C. WhatsApp click-to-message ads (optional, bahut effective)
- Objective: Engagement → Messaging apps → WhatsApp
- Sasta lead source, lekin lead Pixel me nahi aayega — inhe alag track karo.

## 4. Budget plan (India, local salon)

| Phase | Daily budget | Kya karna hai |
| --- | --- | --- |
| Week 1–2 (learning) | ₹300–500/day | 1 campaign, 2 ad set, 3 creative. **Kuch mat badlo** 50 conversions tak |
| Week 3–4 (scale) | ₹600–1,000/day | jo ad set kaam kar raha hai usi ka budget 20% badhao, baaki band |
| Ongoing | 15–20% of monthly revenue target | 70% leads / 25% retargeting / 5% new creative testing |

Target benchmarks (Tier-2/3 India, salon): cost per lead ₹40–₹120, lead→visit
conversion 25–40%. Har lead ka ₹ value nikaalne ke liye average bill × repeat
rate use karo — package bikta hai to CPL ₹200 bhi profitable hai.

## 5. Creatives — kya chalta hai

**Best performing formats (priority order):**
1. **Before/after Reel** (7–15 sec, trending audio, jump cut on the reveal)
2. **Carousel** — 5 transformations, last card offer
3. **Static offer post** — bada discount number, price, address, "Book on WhatsApp"

**Rules:**
- Har creative me salon ka naam aur area likho (local relevance)
- Text image ke 20% se kam rakho
- Face + emotion dikhao, sirf product nahi
- 3 creative har 2 hafte me refresh karo (ad fatigue)

**Ad copy templates (Hinglish — jaisa local audience padhta hai):**

> **Primary text A (offer)**
> Pehli visit par **25% OFF** ✨
> Haircut, facial, nails ya bridal — sab ek premium studio me.
> ✔️ Certified stylists ✔️ 100% original products ✔️ Fixed slot, no waiting
> 📍 {Area}, {City} · Book on WhatsApp 👇
> *Headline:* 25% OFF first visit · *CTA:* Book Now

> **Primary text B (package / USP push)**
> Har mahine salon jaate ho? Phir full price kyun? 💸
> Glow Member: haircut + clean-up + threading sirf ₹1,499 (₹2,400 value).
> Priority slot + same senior stylist + free consultation.
> Sirf 8 seats is mahine.
> *Headline:* Save ₹900 every month · *CTA:* Learn More

> **Primary text C (bridal)**
> Shaadi 60 din door hai? 👰
> Bridal pre-wedding pack: 4 facials, body polishing, hair spa, HD makeup with
> trial — ₹24,999 (₹32,000 value). Early-bird par ₹3,000 extra off.
> *Headline:* Bridal glow, perfectly planned · *CTA:* Send Message

## 6. Retargeting audiences banane ka tareeka

Events Manager → Audiences → Create Custom Audience → Website:
- `AddToCart` in last 14 days, exclude `Schedule` → "cart abandoners"
- `ViewContent` where content_name contains "Bridal" → "bridal intent"
- Visitors 180 days → lookalike 1% (naye area me expand karne ke liye)

## 7. Har hafte ye 5 numbers dekho

1. **Cost per Lead** (Ads Manager)
2. **Leads → actual visits** (`/admin` dashboard me lead source column)
3. **Average bill** (counter se)
4. **Package conversion %** — kitne leads ne package liya
5. **Repeat rate** — loyalty stamps se andaza

Rule of thumb: agar CPL target se 2x zyada hai to creative badlo, audience nahi.
Agar leads aa rahe hain lekin visit nahi ho rahi to WhatsApp reply speed aur
offer clarity theek karo — ad theek hai.

## 8. Organic ke saath combine karo (free growth)

- Har client ka before/after Reel (consent lekar) — hafte me 3
- Google Business Profile: photos weekly, review link har bill par
- Review dene wale ko next visit 5% off (site par already likha hai)
- Referral code (site me built-in) — staff har customer ko batayein
- WhatsApp Business ka **catalog** + **greeting message** set karo, aur website
  link status/bio me rakho

## 9. Aage ka upgrade (jab volume badhe)

- **Conversions API** — iOS tracking loss recover karne ke liye (server needed)
- **WhatsApp Business API** — automatic confirmation + reminder messages
- **Online payment** (Razorpay) — advance booking se no-show 60% tak kam hota hai
- **Google Ads Search** — "salon near me" jaise high-intent keywords
