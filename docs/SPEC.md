# Class Bookings with Stripe Pro — Website Specification

Version 1.0 · June 2026

## Overview

Marketing and commerce site for **Class Bookings with Stripe Pro**, a WordPress plugin sold as a standalone product. The site is a static SvelteKit app deployed on Netlify, connected to Stripe for payments and GitHub for support.

| Item | Value |
|------|-------|
| **Product** | Class Bookings with Stripe Pro |
| **Author / brand** | IORoot |
| **Price** | £49.99 GBP (one-time) |
| **Updates** | 1 year of updates and downloads from purchase date |
| **Renewal** | £49.99 GBP for another year (manual Payment Link) |
| **After expiry** | Installed plugin continues to work; downloads serve last release from licence window until renewal |

## Repositories

| Repo | Visibility | Purpose |
|------|------------|---------|
| [IORoot/class-bookings-with-stripe-pro-website](https://github.com/IORoot/class-bookings-with-stripe-pro-website) | Public | This website, markdown docs, GitHub Issues for support |
| [IORoot/class-bookings-with-stripe-pro](https://github.com/IORoot/class-bookings-with-stripe-pro) | Private | Plugin source; GitHub Releases supply download ZIPs |

Free plugin (lite alternative): [WordPress.org — class-bookings-with-stripe](https://wordpress.org/plugins/class-bookings-with-stripe/). Pro does **not** require the free plugin.

## Hosting

- **Platform:** Netlify (subdomain initially; custom domain later)
- **Build:** `npm run build` → static output + serverless functions
- **SEO:** prerendered HTML, meta tags, Open Graph, `sitemap.xml`, `robots.txt`

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | SvelteKit 2 (adapter-static) |
| Styling | Tailwind CSS v4 |
| Animation | GSAP (level B — hero, scroll reveals, comparison table) |
| Docs | Markdown in repo, Shaders-inspired sidebar |
| Payments | Stripe Payment Links (purchase + renewal) |
| Email | Resend (`Class Bookings Pro <pro@ioroot.com>`) |
| Entitlement | Netlify Blobs + Stripe API verification |
| Downloads | Private GitHub Release assets via API |

## Purchase & fulfillment flow

```
Customer clicks Buy → Stripe Payment Link → checkout.session.completed webhook
  → Netlify function validates signature
  → Store entitlement (email, purchasedAt) in Netlify Blobs
  → Resend email with signed download URL (/api/asset-download?token=…)
  → Customer downloads latest release ZIP from private GitHub repo
```

### Entitlement rules

- **Active:** `purchasedAt + 365 days > now` (renewal sets a fresh year from payment date)
- **Expired:** may still download the newest stable release with `published_at ≤ expiresAt`
- **Download token:** JWT with `jti`, 30-minute expiry, single-use; one active token per email
- **Active downloads:** latest stable GitHub Release
- **Resend:** `/download` → POST email → generic response → new link if licence exists
- **Rate limits:** 5 resends/hour per IP, 1 per email per 5 minutes (Netlify Blobs)
- **Webhook:** idempotent on `session.id`; stores `stripeCustomerId` + `stripeSessionId`

### Release pipeline (private repo)

On git tag (e.g. `v1.0.1`), GitHub Action:

1. Build plugin ZIP
2. Create GitHub Release with ZIP asset

Documented in private repo; website reads `latest` via `GITHUB_TOKEN`.

## Stripe configuration

Two Payment Links per mode (test and live), same price, same success/cancel URLs:

| Link | Purpose | Env vars |
|------|---------|----------|
| Purchase | New customers | `STRIPE_PAYMENT_LINK_TEST` / `STRIPE_PAYMENT_LINK_LIVE` |
| Renewal | Extend entitlement 1 year (`metadata.type=renewal`) | `STRIPE_RENEWAL_LINK_TEST` / `STRIPE_RENEWAL_LINK_LIVE` |

Buy buttons hit `/api/buy` and `/api/renew`, which redirect at **runtime** using `STRIPE_MODE` — no rebuild required to switch test/live.

Success URL: `{SITE_URL}/purchase/success`  
Cancel URL: `{SITE_URL}/purchase/cancelled`

Webhook endpoint (both test and live dashboards): `{SITE_URL}/api/stripe-webhook`  
Event: `checkout.session.completed`

### `STRIPE_MODE`

| Value | Behaviour |
|-------|-----------|
| `live` (default) | Uses `*_LIVE` credentials and Payment Links |
| `test` | Uses `*_TEST` credentials and Payment Links |

Set both test and live credential sets in Netlify env vars. Flip `STRIPE_MODE` in the Netlify UI to test purchases on the same deployment. A banner appears when `STRIPE_MODE=test`.

For local `npm run dev` without `netlify dev`, optional `PUBLIC_STRIPE_MODE` + `PUBLIC_STRIPE_*_TEST/LIVE` fall back to direct Payment Link URLs.

### Server environment variables (Netlify)

| Variable | Purpose |
|----------|---------|
| `STRIPE_MODE` | `test` or `live` (default `live`) |
| `STRIPE_SECRET_KEY_TEST` / `STRIPE_SECRET_KEY_LIVE` | Stripe API secret for each mode |
| `STRIPE_WEBHOOK_SECRET_TEST` / `STRIPE_WEBHOOK_SECRET_LIVE` | Webhook signature verification |
| `STRIPE_PAYMENT_LINK_TEST` / `STRIPE_PAYMENT_LINK_LIVE` | Purchase Payment Link |
| `STRIPE_RENEWAL_LINK_TEST` / `STRIPE_RENEWAL_LINK_LIVE` | Renewal Payment Link |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Optional legacy fallback when `STRIPE_MODE=live` |
| `RESEND_API_KEY` | Transactional email |
| `EMAIL_FROM` | Default `Class Bookings Pro <pro@ioroot.com>` |
| `GITHUB_TOKEN` | Fine-grained PAT: `contents:read` on private repo |
| `GITHUB_REPO` | `IORoot/class-bookings-with-stripe-pro` |
| `DOWNLOAD_TOKEN_SECRET` | JWT signing secret |
| `SITE_URL` | Canonical site URL for links in emails |

## Site map

| Route | Type | Description |
|-------|------|-------------|
| `/` | Marketing | Hero, benefits, bento features, pricing CTA |
| `/details` | Marketing | Free vs Pro feature comparison matrix |
| `/docs` | Docs index | Links to all guides |
| `/docs/*` | Docs | Markdown guides with sidebar, videos, placeholders |
| `/support` | Link hub | GitHub Issues CTA |
| `/purchase/success` | Post-checkout | Check email, docs links |
| `/purchase/cancelled` | Post-checkout | Return to buy |
| `/download` | Self-service | Resend download link by email |
| `/legal/terms` | Legal | Terms of sale |
| `/legal/privacy` | Legal | Privacy policy |
| `/legal/refunds` | Legal | No refund if ZIP downloaded |

## Pages — content requirements

### Homepage

- SEO title/description targeting WordPress class booking + Stripe
- Primary CTA: Buy Pro (£49.99)
- Secondary: Details, Docs, Free on WordPress.org
- Bento grid: Stripe Checkout, classes, emails, reports, appointments (Pro), themes (Pro)
- Social proof placeholder (IORoot brand)
- GSAP hero stagger + section reveals

### Details

- Full comparison table: Free vs Pro per feature
- Pro-only highlights: appointments, scheduled emails, booking themes
- Link to free WordPress.org plugin
- Animated row reveals (GSAP)

### Docs (7 guides)

| Slug | Title | Videos |
|------|-------|--------|
| `getting-started` | Getting started | Quick start, Full setup |
| `stripe-setup` | Stripe setup | Webhook setup |
| `class-types` | Class types | Weekly, One-off |
| `emails` | Emails | Email setup |
| `themes` | Booking themes | — (Pro written guide) |
| `shortcode-elementor` | Shortcode & Elementor | Result pages & Help |
| `changelog` | Changelog | — |

Cross-links: Extra fields video on getting-started; reports video linked from emails/changelog.

Pro sections (written, no video): appointments in class-types; scheduled emails in emails; themes page full Pro guide.

### Support

- Link to `https://github.com/IORoot/class-bookings-with-stripe-pro-website/issues`
- Brief guidance: bugs vs questions

### Legal

- **Terms:** 1-year updates, personal/site license, no redistribution
- **Privacy:** Stripe, Resend, GitHub Issues; email on `/download`
- **Refunds:** No refunds once ZIP has been downloaded

## Design system

### Inspiration

- [Raycast](https://www.raycast.com/) — colour, grain, blocks, minimal layout
- [Pieces](https://pieces.app/) — grainy dark backgrounds, spacing
- [Warp Oz](https://www.warp.dev/oz) — bento blocks, restrained palette
- [Shaders docs](https://shaders.com/docs/guide/props-reactivity) — docs sidebar, categories

### Direction

- Dark charcoal base (`#0a0c10`), not pure black
- Global film grain overlay (CSS)
- **Teal** accent (`#0e7490`, `#0f766e`) — CTAs, borders, glows
- **Gold** (`#c6a27c`) — display/serif headlines only
- Plugin logos copied from `assets/logo_plugin.svg`, `logo.svg`
- Subtle blob/grid hero (from plugin admin welcome panel)
- `prefers-reduced-motion` respected

### Typography

- Display: Cormorant Garamond (gold headlines)
- UI: system sans stack (Inter-like via `font-sans`)

## Feature comparison (Details page)

| Feature | Free | Pro |
|---------|------|-----|
| Stripe Checkout booking | ✓ | ✓ |
| Weekly & one-off classes | ✓ | ✓ |
| External booking links | ✓ | ✓ |
| Capacity & soft holds | ✓ | ✓ |
| Customer & admin emails | ✓ | ✓ |
| Merge tags | ✓ | ✓ |
| Reports dashboard | ✓ | ✓ |
| Elementor widget & shortcode | ✓ | ✓ |
| Form extras (waiver, Mailchimp, ACF) | ✓ | ✓ |
| **Appointment booking** | — | ✓ |
| **Scheduled email rules** | — | ✓ |
| **Booking form themes** | — | ✓ |
| **Theme preview & installer** | — | ✓ |

## YouTube embeds

| Video | URL |
|-------|-----|
| Quick start | https://youtu.be/8B6TxXcDt2E |
| Full installation | https://youtu.be/7HBBGPZfZL0 |
| Stripe webhook | https://youtu.be/54MQBsW8qWA |
| Result pages & Help | https://youtu.be/8mMCkKxIH-s |
| Weekly classes | https://youtu.be/k5dlDzCyvoA |
| One-off events | https://youtu.be/gzN3yzXWajo |
| Extra fields & ACF | https://youtu.be/BivPyMuCGbQ |
| Email setup | https://youtu.be/dqg_DweIVAo |
| Bookings & reports | https://youtu.be/D2UpGlkhJWs |

## Netlify functions

| Function | Method | Path | Purpose |
|----------|--------|------|---------|
| `stripe-webhook` | POST | `/api/stripe-webhook` | Handle `checkout.session.completed` |
| `download-resend` | POST | `/api/download-resend` | Resend link by email |
| `asset-download` | GET | `/api/asset-download` | Validate token, proxy GitHub asset |

## Out of scope (v1)

- License key validation inside WordPress plugin
- Customer account portal
- Multi-currency Stripe prices
- Custom domain DNS (use Netlify subdomain until configured)
- Live interactive booking demos on docs

## Success criteria

- [x] `npm run build` passes
- [x] All routes prerender except API redirects
- [x] Buy buttons use env Payment Link URLs
- [x] Docs render all 7 guides with sidebar navigation
- [x] README documents Netlify env setup
- [x] SPEC.md matches implementation

## Appendix: Private repo release workflow

Add `.github/workflows/release.yml` to `IORoot/class-bookings-with-stripe-pro`:

```yaml
name: Release
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - name: Build ZIP
        run: zip -r class-bookings-with-stripe-pro.zip . -x '*.git*' -x 'node_modules/*' -x '.github/*'
      - uses: softprops/action-gh-release@v2
        with:
          files: class-bookings-with-stripe-pro.zip
          generate_release_notes: true
```

Adjust the zip command to match your plugin build process (exclude `vendor` dev files, etc.).
