---
title: Stripe setup
description: API keys, Checkout Sessions, webhooks, test mode, and local development with Stripe CLI.
order: 2
category: Getting started
---

## Overview

The plugin uses **Stripe Checkout** — customers pay on Stripe's hosted page. Card data never touches your WordPress server. The plugin creates Checkout Sessions via the bundled `stripe-php` SDK using inline `price_data` in **GBP** (no Stripe Products required per class).

## API keys

In **Class Bookings with Stripe → Settings → Stripe**:

| Field | Where to find it |
|-------|------------------|
| **Publishable key** | Stripe Dashboard → Developers → API keys (`pk_test_…` or `pk_live_…`) |
| **Secret key** | Same page (`sk_test_…` or `sk_live_…`) — server-side only |
| **Mode** | Must match your keys: **Test** or **Live** |

Never expose the secret key in front-end code or public repositories.

## Webhook endpoint

Stripe must notify WordPress when payment completes, expires, or fails asynchronously.

**Endpoint URL** (replace with your domain):

```
https://yoursite.com/wp-json/clasbpro/v1/stripe-webhook
```

### Required events

Subscribe to all three:

- `checkout.session.completed`
- `checkout.session.expired`
- `checkout.session.async_payment_failed`

Copy the **Signing secret** (`whsec_…`) into the plugin's **Webhook signing secret** field.

### What webhooks do

1. **completed** — mark booking **paid**, release hold logic, send customer/admin emails, optional Mailchimp sync, queue scheduled emails (Pro).
2. **expired** — mark booking **expired**, free capacity.
3. **async_payment_failed** — handle delayed payment methods that never complete.

## Payment flow

1. Customer submits the booking form.
2. Plugin creates a **pending** booking (30-minute soft hold) and a Checkout Session.
3. Browser redirects to Stripe Checkout.
4. On success, Stripe fires a webhook; plugin updates booking and sends emails.
5. Customer lands on your **success** result page; JavaScript may poll `/booking-status` if webhook is slow.

## Return URLs

Success and cancel URLs are built from your WordPress **Settings → General** site URL and the result pages created on plugin activation. If redirects go to the wrong domain, fix the WordPress site URL first.

## Test mode

1. Use test API keys in the plugin.
2. Use [Stripe test cards](https://docs.stripe.com/testing) (e.g. `4242 4242 4242 4242`).
3. Create a **test mode** webhook endpoint in Stripe Dashboard (or use Stripe CLI locally).

## Local development with Stripe CLI

Forward webhooks to your local/tunnelled site:

```bash
stripe listen --forward-to https://yoursite.test/wp-json/clasbpro/v1/stripe-webhook
```

Use the `whsec_…` secret the CLI prints in the plugin while testing.

For localhost without HTTPS, use **ngrok**, **Cloudflare Tunnel**, or similar — Stripe requires a reachable HTTPS endpoint for Dashboard webhooks.

## Currency

Checkout uses **GBP** with amounts in pence from each class price field. Multi-currency is not configurable in v1.

## Troubleshooting

| Symptom | Check |
|---------|--------|
| Payment succeeds but booking stays pending | Webhook URL, signing secret, required events, server can reach REST route |
| 404 on webhook URL | Permalinks flushed? REST API enabled? Security plugin blocking `/wp-json/`? |
| Wrong environment | Test keys + test webhook vs live keys + live webhook |

See [Troubleshooting](/docs/troubleshooting) for more.

## Related

- [Developer reference — REST routes](/docs/developer)
- [Result pages](/docs/result-pages)
