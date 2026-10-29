# Content guide — kya kahan badalna hai

Sab kuch ek hi file me hai: **`src/data/salon.ts`**. Jo bhi `// TODO` likha hai,
wahan asli information daalni hai.

## 1. Sabse pehle ye 6 cheezein (must-do)

| Field | Kahan | Kyun zaroori hai |
| --- | --- | --- |
| `phone` | `salon.phone` | Call button kaam karega |
| `whatsapp` | `salon.whatsapp` | **Booking isi number par aayegi.** Format: `91XXXXXXXXXX` (country code + number, no `+`, no space) |
| `address.city` / `serviceAreas` | `salon` | Kin areas me home service milti hai — contact, footer, offer page |
| `serviceModes` | `salon.serviceModes` | Home visit / studio on-off. Studio nahi hai to `studio.enabled: false` |
| `mapsLink` / `mapsEmbed` | `salon` | Sirf studio ho to — khaali rahe to map ki jagah "home service" card dikhta hai |
| `googleReviewLink` | `salon` | Review CTA. Khaali rahe to WhatsApp feedback button dikhta hai |
| `artist` | `artist` (same file) | Diksha ka bio, experience, certificates, photo |
| `hours` | `salon.hours` | Booking slots inhi timings se banti hain |

> `hours.openHour` aur `hours.closeHour` 24-hour format me hain (10 = 10 AM,
> 21 = 9 PM). Slot ka gap `slotMinutes` se control hota hai.

## 2. Services aur prices

`categories` array me 6 category hain. Har service ka format:

```ts
{
  id: 'hair-cut-women',        // unique, chhote letters, space ke bajaye dash
  name: 'Haircut & blow dry (Women)',
  blurb: 'Consultation + wash + finish styling',   // ek selling line
  price: 599,                  // starting price (INR)
  mrp: 799,                    // optional — kaat kar dikhane wala price
  minutes: 45,                 // slot duration isse decide hoti hai
  popular: true,               // "Hot" chip lagega
}
```

Service hatani ho to poora object delete kar do; nayi jodni ho to copy-paste
karke value badal do.

## 3. Packages (sales ka main hathiyar)

`packages` array. Har package me:

- `bestFor` — kis customer ke liye hai (customer khud pehchan leta hai)
- `price` + `mrp` — site khud calculate karti hai "Aap bachate ho ₹X"
- `validity` — kitne din chalega
- `seatsLeft` — scarcity counter. **Har hafte update karo**, warna trust jata hai
- `usps` — 3 differentiators. Yahi sale close karte hain, isliye har USP me
  ek number ya ek concrete promise ho ("Save ₹900", "Fixed 15-min slot")
- `includes` — sab included services ki list
- `payment` — jaise "2 easy instalments possible"

## 4. Offers aur coupons

1. `offers` array me offer add karo (`code`, `expires`, `tone`).
2. Us code ka discount % **`src/lib/booking.ts`** ke `COUPONS` object me daalo:
   ```ts
   const COUPONS = { DIVINE10: 10, WEEKDAY15: 15, BRIDE10: 10, FRIEND10: 10 };
   ```
   Warna booking form "Ye code valid nahi hai" dikhayega.

`expires` date nikal jaane par offer apne aap chhup jata hai.

## 5. Photos (bahut zaroori)

Asli photos se conversion 2–3x hota hai. Steps:

1. Photos `public/images/` folder me daalo (jpg/webp, 1200px se chhoti,
   150 KB se kam rakho — site fast rahegi).
2. `gallery` array me `src` set karo:
   ```ts
   { id: 'g1', label: 'Bridal glam look', tag: 'Makeup', src: 'images/bridal-1.jpg', tall: true },
   ```
3. Diksha ki photo ke liye `artist.photo = 'images/diksha.jpg'`.
4. Asli reviews `testimonials` array me daalo (fake reviews kabhi nahi).

Jab tak photo nahi hai, styled gradient tile dikhta hai — layout kabhi toota
hua nahi lagta.

## 6. Logo

Abhi built-in "DT" vector monogram dikhta hai. Asli Divine Touch logo lagane ke liye:

- Logo file (square PNG, transparent ya dark background, ~512px) `public/images/logo.png` me rakho
- `salon.ts` me `logoSrc: 'images/logo.png'` likho — navbar, footer, menu sab jagah logo aa jayega
- App icon bhi same chahiye to logo ko `public/icons/icon-192.png`, `icon-512.png`,
  `apple-touch-icon.png` (180px) aur `maskable-512.png` (logo beech me, 20% padding) se replace karo

## 7. Text ki language

Site jaan-boojh kar **Hinglish** me likhi hai (jaise local customer baat karta
hai) aur service names English me. Poori English chahiye to sirf `salon.ts` aur
section headings badalni hongi.
