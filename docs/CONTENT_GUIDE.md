# Content guide — kya kahan badalna hai

Sab kuch ek hi file me hai: **`src/data/salon.ts`**. Jo bhi `// TODO` likha hai,
wahan asli information daalni hai.

## 1. Sabse pehle ye 6 cheezein (must-do)

| Field | Kahan | Kyun zaroori hai |
| --- | --- | --- |
| `phone` | `salon.phone` | Call button kaam karega |
| `whatsapp` | `salon.whatsapp` | **Booking isi number par aayegi.** Format: `91XXXXXXXXXX` (country code + number, no `+`, no space) |
| `address` | `salon.address` | Footer, contact section aur Google me dikhega |
| `mapsLink` / `mapsEmbed` | `salon` | Directions button + map |
| `googleReviewLink` | `salon` | Review CTA (Google Business Profile → "Ask for reviews" link) |
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
   const COUPONS = { GLOW25: 25, HAPPY899: 15, DULHAN3000: 10, FRIEND20: 20 };
   ```
   Warna booking form "Ye code valid nahi hai" dikhayega.

`expires` date nikal jaane par offer apne aap chhup jata hai.

## 5. Photos (bahut zaroori)

Asli photos se conversion 2–3x hota hai. Steps:

1. Photos `public/images/` folder me daalo (jpg/webp, 1200px se chhoti,
   150 KB se kam rakho — site fast rahegi).
2. `gallery` array me `src` set karo:
   ```ts
   { id: 'g1', label: 'Balayage transformation', tag: 'Hair colour', src: 'images/balayage.jpg', tall: true },
   ```
3. Staff photos ke liye `stylists` me `photo: 'images/aarti.jpg'`.

Jab tak photo nahi hai, styled gradient tile dikhta hai — layout kabhi toota
hua nahi lagta.

## 6. Logo

`src/components/layout/Logo.tsx` me abhi "GS" monogram hai. Asli logo aane par:

- SVG ho to us file ka content Logo component me paste kar do
- PNG ho to `public/images/logo.png` rakho aur component me `<img>` use karo
- Uske baad `npm run icons` chalao taaki app icon bhi match kare

## 7. Text ki language

Site jaan-boojh kar **Hinglish** me likhi hai (jaise local customer baat karta
hai) aur service names English me. Poori English chahiye to sirf `salon.ts` aur
section headings badalni hongi.
