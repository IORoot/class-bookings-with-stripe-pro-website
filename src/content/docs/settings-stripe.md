---
title: Stripe
description: Test and live API keys, currency, checkout item title, and webhook setup.
order: 10
category: Settings
---

## What this tab does

The **Stripe** tab under **Stripe Class Pro → Settings** connects your WordPress site to Stripe Checkout. Customers pay on Stripe’s hosted page; the plugin creates bookings when Stripe confirms payment via webhook.

![Stripe settings tab](/docs/images/settings-stripe-tab.png)

## How to configure

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com/).
2. Open **Settings → Stripe** in WordPress.
3. Choose **Test** or **Live** mode (use Test while building).
4. Paste API keys for the active mode.
5. Copy the **Webhook URL** shown on this tab into Stripe → **Developers → Webhooks**.
6. Subscribe to **checkout.session.completed**, **checkout.session.expired**, and **checkout.session.async_payment_failed**.
7. Paste the webhook **Signing secret** back into WordPress.

## Field reference

| Field | What it does | Notes |
|-------|----------------|-------|
| **Mode** | Test or Live | Controls which key pair and webhook secret are used |
| **Currency** | Checkout currency (ISO 4217) | Lowercase code, e.g. `gbp`, `usd`, `eur` |
| **Stripe item title template** | Line item name in Checkout | Supports merge tags: `{class_name}`, `{class_date}`, `{class_time}`, `{location}`, `{seats}`, `{customer_name}`, `{booking_id}`, `{class_date_raw}` |
| **Test publishable key** | `pk_test_…` | Safe for front-end scripts |
| **Test secret key** | `sk_test_…` | Server only — never expose in browser |
| **Live publishable key** | `pk_live_…` | Used when Mode is Live |
| **Live secret key** | `sk_live_…` | Used when Mode is Live |
| **Webhook signing secret** | `whsec_…` | From the Stripe endpoint for this site’s URL |
| **Webhook URL** (read-only) | Your REST endpoint | `…/wp-json/clasbpro/v1/stripe-webhook` (exact URL shown in admin) |

![Webhook URL and signing secret fields](/docs/images/settings-stripe-webhook.png)

## Webhook URL

Always use the URL displayed in the plugin admin. WordPress generates it with `rest_url()`, which matches your permalink structure (pretty `/wp-json/…` vs `?rest_route=…` on plain permalinks).

If webhooks fail locally, use [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward events:

```bash
stripe listen --forward-to https://yoursite.test/wp-json/clasbpro/v1/stripe-webhook
```

Ensure **Settings → General → Site Address** matches the URL customers and Stripe use during testing.

## How it works under the hood

- Checkout is created via `POST /wp-json/clasbpro/v1/checkout`.
- Stripe sends events to `/stripe-webhook`; the plugin verifies the signature and marks bookings **paid** or **expired**.
- If the webhook is delayed, the success page can poll `GET /wp-json/clasbpro/v1/booking-status` and reconcile from Stripe directly.

## See also

- [Result pages](/docs/settings-result-pages)
- [REST API](/docs/customising-api)
- [Troubleshooting — webhooks](/docs/troubleshooting)
