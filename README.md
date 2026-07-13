# Class Bookings with Stripe Pro — Website

Marketing site, documentation, and purchase fulfilment for [Class Bookings with Stripe Pro](https://github.com/IORoot/class-bookings-with-stripe-pro).

See **[SPEC.md](./SPEC.md)** for the full product and technical specification.

## Stack

- SvelteKit (static) + Tailwind CSS v4 + GSAP
- Netlify hosting + serverless functions
- Stripe Payment Links + Resend + GitHub Releases

## Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set public URLs for local testing.

For Stripe checkout locally, use `netlify dev` (so `/api/buy` works) or set `PUBLIC_STRIPE_MODE` and the `PUBLIC_STRIPE_*_TEST/LIVE` fallbacks for plain `npm run dev`.

## Test vs live Stripe (one deployment)

Set **both** test and live credential sets in Netlify (see `.env.example`). Toggle `STRIPE_MODE` between `test` and `live` in the Netlify UI — no redeploy needed. Buy buttons use `/api/buy` and `/api/renew`, which read `STRIPE_MODE` at runtime.

Register the same webhook URL in both Stripe test and live dashboards: `https://YOUR_SITE/api/stripe-webhook`.

## Build

```bash
npm run build
npm run preview
```

## Deploy to Netlify

1. Connect [IORoot/class-bookings-with-stripe-pro-website](https://github.com/IORoot/class-bookings-with-stripe-pro-website)
2. Build command: `npm run build`
3. Publish directory: `build`
4. Set environment variables from `.env.example`
5. Create Stripe Payment Links for purchase and renewal (£49.99 GBP)
6. Point webhook to `https://YOUR_SITE/api/stripe-webhook` — event: `checkout.session.completed`
7. Verify `ioroot.com` domain in Resend for `pro@ioroot.com`

### Stripe Payment Link metadata (optional)

Add metadata `type=renewal` on the renewal Payment Link so the webhook treats the payment as a renewal.

### GitHub token for downloads

Create a **fine-grained PAT** scoped to `IORoot/class-bookings-with-stripe-pro` with **Contents: Read-only**. The Netlify function uses it to list releases and stream ZIP assets — purchasers never see the token or repo.

### Download security

- Entitlements stored in **Netlify Blobs** (email + Stripe IDs + expiry)
- Download links are **JWTs** (30 min, single-use, one active link per email)
- **Active licence** → latest stable release; **expired** → last stable release from licence window
- Resend rate limits in Netlify Blobs (5/hour per IP, 1 per 5 min per email)

## Project structure

```
src/
  content/docs/     # Markdown documentation
  content/legal/    # Legal pages
  lib/              # Shared site logic
  routes/           # SvelteKit pages
netlify/functions/  # Webhook, download, resend
static/             # Logos and static assets
```

## Licence

Website source is public. Plugin code is private and sold separately.
