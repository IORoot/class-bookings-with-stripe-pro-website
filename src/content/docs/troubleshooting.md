---
title: Troubleshooting
description: Webhooks, email delivery, cron, bookings, and common errors.
order: 91
category: Reference
---

## Bookings stay pending after payment

1. Confirm **webhook** is registered in Stripe with the exact URL from **Settings → Stripe**.
2. Subscribe to `checkout.session.completed`, `checkout.session.expired`, and `checkout.session.async_payment_failed`.
3. Paste the correct **signing secret** for test vs live mode.
4. Check Stripe Dashboard → Webhooks → recent deliveries for `400` or `invalid_signature`.
5. On local dev, use Stripe CLI forwarding — [Stripe settings](/docs/settings-stripe).

The success page polls `/booking-status` and can reconcile if webhooks are delayed.

## Emails not arriving

1. Configure **SMTP** (WP Mail SMTP or host relay) — WordPress `mail()` is unreliable.
2. Check spam folders and SPF/DKIM for your sending domain.
3. Use **Settings → Emails → Local test mode** to route all plugin mail to one inbox while debugging.
4. On the booking edit screen, check **Emails** panel for **Error** status and detail text.
5. Enable `WP_DEBUG_LOG` and watch for `wp_mail_failed` entries.

## Scheduled emails late or missing

WordPress cron is visit-triggered unless server cron is configured:

```bash
*/5 * * * * curl -s https://yoursite.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

Use **Scheduled email tools** (backfill / test dispatch) under Settings → Emails. See [Scheduled emails](/docs/settings-scheduled-emails).

## “No class selected” on front end

- Add `class_id="123"` to `[clasbpro_booking]`.
- Elementor: pick class in widget or set `clasbpro_class_stripe_id` on the post.
- Confirm class is **published** and **active**.

## Capacity / date errors

| Reason code | Meaning |
|-------------|---------|
| `capacity_full` | Session sold out |
| `date_invalid` | Date cancelled or past |
| `class_inactive` | Class deactivated |
| `validation` | Missing name, email, waiver, or ACF field |

Customise messages via `clasbpro_status_reason_messages` — [Hooks](/docs/customising-hooks).

## Appointments — no slots

- Add at least one **slot rule** with valid date range.
- Check **minimum lead time** is not excluding all slots.
- Verify **cancelled dates** and existing paid bookings on slots.

## Theme not applying

- **Themes → Enable** the gallery theme and set source to **Gallery**.
- Clear caching plugins / CDN.
- After **Install to theme**, edit files in your theme folder — [Customising themes](/docs/customising-themes).

## Free + Pro plugin conflict

Deactivate either the free WordPress.org plugin or Pro — do not run both. Shortcodes and data stores conflict.

## See also

- [Stripe settings](/docs/settings-stripe)
- [Getting started](/docs/getting-started)
- [REST API](/docs/customising-api)
