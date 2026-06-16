---
title: Result pages
description: Booking Confirmed, Cancelled, and Error pages — URLs, shortcodes, and Stripe return flow.
order: 11
category: Embedding
---

## Overview

Stripe Checkout redirects customers back to your WordPress site after payment or cancellation. The plugin creates three pages on **activation**:

| Page | Shortcode | Purpose |
|------|-----------|---------|
| Booking Confirmed | `[clasbpro_booking_status type="success"]` | Thank you + booking summary |
| Booking Cancelled | `[clasbpro_booking_status type="cancelled"]` | Customer left Checkout |
| Booking Error | `[clasbpro_booking_status type="error"]` | Something went wrong |

Find page IDs under **Settings → Pages** (or the Pages tab in settings).

![Settings Page — Result pages](/docs/screenshots/screenshot-4.png)

## Success page behaviour

1. Stripe redirects with session ID query args.
2. Status template shows spinner while confirming.
3. JavaScript polls the REST **booking-status** endpoint until webhook marks booking paid (or timeout).
4. Confirmation details render with merge data (class, date, seats).

If webhook is slow, customers may briefly see "processing" — ensure webhooks are configured — see [Stripe setup](/docs/stripe-setup).

## Customising content

- Edit page title and surrounding Gutenberg/Elementor content normally.
- Keep the shortcode in the page body.
- Style via active **booking theme** (Pro) — see [Booking themes](/docs/themes).

## Changing page URLs

If you change slugs, flush permalinks (**Settings → Permalinks → Save**). Stripe return URLs are built from site URL + page path at session creation.

## Cancel and error flows

- **Cancelled** — no booking charge; hold expires via cron/webhook.
- **Error** — show support link; check Stripe Dashboard and plugin bookings list.

![Frontend Confirmation](/docs/screenshots/screenshot-15.png)

![Frontend Error](/docs/screenshots/screenshot-16.png)

![Frontend Cancelled](/docs/screenshots/screenshot-17.png)

## Related video

[Result pages, Developer & Help tabs](https://youtu.be/8mMCkKxIH-s)

## Related

- [Shortcode & Elementor](/docs/shortcode-elementor)
- [Stripe setup](/docs/stripe-setup)
