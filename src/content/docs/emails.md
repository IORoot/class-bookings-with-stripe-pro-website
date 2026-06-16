---
title: Emails
description: Instant customer and admin emails on payment, template editing, merge tags, and SMTP delivery.
order: 6
category: Emails
video: emails
---

## Overview

When a booking is marked **paid**, the plugin sends:

1. **Customer confirmation** — receipt-style email with class details
2. **Admin notification** — optional alert to your studio inbox

Mail is sent via WordPress `wp_mail()`. For reliable delivery, configure SMTP on your host or use an SMTP plugin — see [Troubleshooting](/docs/troubleshooting).

**Scheduled** reminders and post-class emails are a separate Pro system — see [Scheduled emails](/docs/scheduled-emails).

## Edit templates

**Class Bookings with Stripe → Settings → Emails**

Sub-tabs typically include:

- **Customer** — subject and HTML body for confirmations
- **Admin** — subject and body; set **Admin email address**

Use the visual editor or HTML. Merge tags are listed in the accordion on the Emails tab and in [Merge tags](/docs/merge-tags).

![Settings Page — Email Settings](/docs/screenshots/screenshot-2.png)

## Default subjects

| Email | Default subject pattern |
|-------|-------------------------|
| Customer | Your booking is confirmed: {class_name} on {class_date} |
| Admin | New booking: {customer_name} for {class_name} on {class_date} |

## Common merge tags

| Tag | Output |
|-----|--------|
| `{customer_name}` | Booker name |
| `{customer_email}` | Booker email |
| `{class_name}` | Class title |
| `{class_date}` | Formatted date |
| `{class_time}` | Start time |
| `{location}` | Class location |
| `{seats}` | Number of places |
| `{amount_total}` | Total paid |
| `{booking_id}` | Internal booking reference |
| `{extra_fields}` | Form extras summary |

Full list: [Merge tags](/docs/merge-tags).

## When emails send

| Event | Emails |
|-------|--------|
| Stripe `checkout.session.completed` | Customer + admin (instant) |
| Scheduled rule due (Pro) | Per rule — see [Scheduled emails](/docs/scheduled-emails) |

Emails do **not** send on pending/expired bookings.

## HTML tips

- Keep layouts simple — many clients strip complex CSS.
- Test with Gmail, Apple Mail, and a phone client.
- Include location, date, time, and what to bring.

## Admin copies on scheduled emails (Pro)

Scheduled rules can optionally **CC admin** on reminder/post-class sends — configured per rule in [Scheduled emails](/docs/scheduled-emails).

## Related videos

- [Email setup](https://youtu.be/dqg_DweIVAo) (featured above)
- [Bookings list & reports](https://youtu.be/D2UpGlkhJWs) — see [Reports](/docs/reports)

## Related guides

- [Scheduled emails (Pro)](/docs/scheduled-emails)
- [Troubleshooting — email delivery](/docs/troubleshooting)
