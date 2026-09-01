# Deploy guide

## Current setup (already live)

- GitHub Pages serves the **`gh-pages`** branch.
- Live URL: https://rahul007monu-cloud.github.io/glow-station-/
- Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and
  force-pushes `dist/` to `gh-pages`. Deploy takes ~1–2 minutes.

Manual deploy from your laptop:

```bash
VITE_BASE=/glow-station-/ npm run build
# then publish dist/ to the gh-pages branch
```

## Secrets (GitHub → Settings → Secrets and variables → Actions)

| Secret | Purpose |
| --- | --- |
| `VITE_META_PIXEL_ID` | Meta Pixel — required before spending on ads |
| `VITE_GA_ID` | Google Analytics 4 (optional) |
| `VITE_ADMIN_PIN` | PIN for `/admin`. **Change from 1234.** |

Secrets are baked in at build time, so re-run the workflow after adding them.

## Custom domain (recommended before advertising)

A real domain (`glowstationluxesalon.com`) looks more trustworthy in ads and
ranks better locally.

1. Buy the domain (GoDaddy / Namecheap / Hostinger).
2. GitHub repo → Settings → Pages → Custom domain → enter the domain.
3. At the registrar add DNS records:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `rahul007monu-cloud.github.io`
4. Wait for DNS, then tick **Enforce HTTPS**.
5. Set `VITE_BASE=/` in the workflow (root domain, no sub-path).
6. Update the URLs in `index.html` (canonical + OG), `public/sitemap.xml` and
   `public/robots.txt`.

## Alternative hosts

Both are free for this size and give instant rollbacks + preview URLs.

**Netlify** — connect the repo, then:
- Build command: `npm run build`
- Publish directory: `dist`
- Add a `_redirects` file containing `/* /index.html 200` for SPA routes
- No `VITE_BASE` needed (served from root)

**Vercel** — import the repo; the Vite preset is detected automatically.

## Checklist before showing it to customers

- [ ] Real WhatsApp number in `salon.whatsapp` (test a booking end-to-end)
- [ ] Real address + Google Maps embed
- [ ] Real prices verified with the salon owner
- [ ] `VITE_ADMIN_PIN` changed
- [ ] At least 6 real photos in the gallery
- [ ] Meta Pixel id added and "Test events" showing green in Events Manager
- [ ] Install test: open on Android Chrome → "Add to Home screen" → app opens
      full-screen; on iPhone use Safari → Share → Add to Home Screen
