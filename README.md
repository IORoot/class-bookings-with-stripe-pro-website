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

Add metadata `type=renewal` on the renewal Payment Link so webhook extends entitlement correctly.

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
