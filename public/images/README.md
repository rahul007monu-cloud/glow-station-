# Photos yahan upload karein

**Naam ki tension mat lo** — jaise naam hain waise hi saari photos ek saath
drag-drop karke commit kar do. Baaki main set kar dunga.

## Upload kaise karein (browser se, 30 second)

1. Repo → `public/images` folder → **Add file → Upload files**
2. Saari photos drag karo (`WhatsApp Image 2026-...jpeg` bhi chalega)
3. **Commit changes** dabao

## HD / 4K conversion — automatic hai

Upload ke baad build khud `npm run photos` chalata hai, jo har photo ke liye
banata hai:

- **480 · 768 · 1200 · 1600 · 2400 · 3200 px** — jitne pixel original me hain
  wahan tak (isse zyada upscale nahi karte, warna photo blur hoti hai)
- **WebP + JPEG** dono — WebP 30–40% halki hoti hai, JPEG purane browsers ke liye
- **Light unsharp mask** — resize ke baad wali softness hat jaati hai, photo crisp lagti hai
- EXIF rotation theek, metadata strip, JPEG 4:4:4 chroma (gold/skin tones saaf)

Browser khud screen ke hisaab se sahi size uthata hai: 4K monitor par 3200px
wali, phone par 480px wali. Isliye photo **sharp** dikhti hai aur site **fast**
rehti hai.

> Best result ke liye: phone se original quality me bhejein (WhatsApp se aayi
> compressed photo pehle se hi ~1000px ki hoti hai — usme 4K detail nahi hoti).
> Camera roll se seedha upload karein.

## Naam pata ho to ye rakhein (turant lag jayengi)

| Filename | Kahan lagegi |
| --- | --- |
| `interior.jpg` | hero background (jab video na ho) |
| `reception.jpg` | walkthrough — Reception |
| `hair.jpg` | walkthrough + HAIR card |
| `colour.jpg` | hair colour card |
| `skin.jpg` | Skin Bar |
| `nails.jpg` | Nail Lounge |
| `makeup.jpg` | Makeup card |
| `bridal.jpg` | Bridal Suite |
| `academy.jpg` | Academy card |
| `gallery-1.jpg` … `gallery-6.jpg` | 3D rotating lookbook |
| `team-1.jpg` … `team-4.jpg` | stylists ke round photos |

Client photos sirf permission lekar use karein.
