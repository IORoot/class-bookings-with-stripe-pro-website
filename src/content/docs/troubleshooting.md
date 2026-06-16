---
title: Troubleshooting
description: Common issues — webhooks, pending bookings, email delivery, cron, and plugin conflicts.
order: 14
category: Reference
---

## Bookings stuck on pending

**Cause:** Stripe webhook not reaching WordPress or wrong signing secret.

**Fix:**

1. Confirm endpoint URL: `https://yoursite.com/wp-json/clasbpro/v1/stripe-webhook`
2. All three event types subscribed — see [Stripe setup](/docs/stripe-setup)
3. Signing secret matches active endpoint (test vs live)
4. Check Stripe Dashboard → Webhooks → recent deliveries for HTTP errors
5. Security plugins / firewalls — allow `POST` to `/wp-json/`

Manually complete a test payment and watch webhook logs in real time.

## Payment OK in Stripe but no confirmation email

1. Webhook must fire first — fix webhook if booking still pending
2. Test `wp_mail()` — install SMTP plugin; check spam
3. Review **Settings → Emails** templates for PHP errors in HTML
4. Host blocking outbound mail — contact host or use SendGrid/SES SMTP

## Scheduled emails not sending (Pro)

1. **Cron** — ensure system cron triggers WordPress every minute
2. Rules configured on **Emails** tab or per-class
3. Run **backfill** tool after adding rules to old bookings
4. Check booking is **paid** and class date is in the future (reminders)

See [Scheduled emails](/docs/scheduled-emails).

## Wrong dates or timezone

WordPress timezone: **Settings → General → Timezone**. Class dates store in site timezone context. Compare booking admin date with class schedule.

## Capacity shows full but spots available

- Pending holds count for 30 minutes
- Expired bookings should release — verify cron
- Cancelled dates on weekly classes remove occurrences

## Appointment calendar empty

- Booking type must be **Appointments**
- At least one valid **slot rule** required
- Calendar months ahead must include dates with rules
- See [Appointments](/docs/appointments)

## Elementor / caching

- Exclude booking page from full-page cache
- Exclude `/wp-json/clasbpro/*` from cache
- Clear cache after theme or plugin updates

## Free + Pro both active

Deactivate one plugin. Both register similar shortcodes and split data.

## REST / permalink 404

**Settings → Permalinks → Save** to flush rewrite rules.

## Debug checklist

| Step | Action |
|------|--------|
| 1 | Stripe test mode end-to-end |
| 2 | Webhook delivery log green |
| 3 | Booking post status = paid |
| 4 | `wp_mail` test plugin |
| 5 | Browser console on booking form |

## Get help

[GitHub Issues](https://github.com/IORoot/class-bookings-with-stripe-pro-website/issues) — include WP version, PHP version, plugin version, Stripe mode, and steps to reproduce.
