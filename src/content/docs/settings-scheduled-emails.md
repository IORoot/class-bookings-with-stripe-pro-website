---
title: Scheduled emails
description: Reminder and post-class email rules, timing, WordPress cron, and test tools.
order: 12
category: Settings
pro: true
---

## What this does

Pro can send automated emails **before** or **after** a class session — for example a reminder 24 hours ahead, or a thank-you note two hours after class ends. These are separate from instant confirmation emails on payment.

> **Pro only** — not available in the free WordPress.org plugin.

## Sub-tabs

| Sub-tab | Purpose |
|---------|---------|
| **Scheduled reminders** | Email booked customers before class starts |
| **Scheduled post-class** | Email customers after class ends |

Per-class overrides: [Class emails](/docs/classes-emails).

## Field reference — Reminders

![Scheduled reminder email settings](/docs/images/settings-email-reminders.png)

| Field | What it does |
|-------|----------------|
| **Enabled** | Turn reminder rules on or off globally |
| **Time before + unit** | How far ahead to send (e.g. 24 hours, 2 days) |
| **Send admin a copy** | CC admin notification address |
| **Subject** | Merge tags supported |
| **Body** | Visual or HTML editor; merge tags supported |
| **Send test email** | Sample send via test recipient |

## Field reference — Post-class

![Scheduled post-class email settings](/docs/images/settings-email-post-class.png)

| Field | What it does |
|-------|----------------|
| **Enabled** | Turn post-class rules on or off globally |
| **Time after + unit** | How long after session end to send |
| **Send admin a copy** | CC admin on post-class sends |
| **Subject** | Merge tags supported |
| **Body** | Visual or HTML editor |
| **Send test email** | Sample send |

Default post-class templates are HTML fragments; reminders may be plain or HTML depending on your content.

## WordPress cron timing

Scheduled sends are queued when a booking is paid and processed by WordPress cron. **WP-Cron is not exact** — it runs when someone visits the site unless you configure a real server cron:

```bash
*/5 * * * * curl -s https://yoursite.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

For time-sensitive reminders, use server cron or a managed host with reliable background tasks.

## Scheduled email tools

At the bottom of **Settings → Emails → Extras**:

- **Backfill** — queue scheduled emails for existing paid bookings that pre-date a rule
- **Test dispatch** — process due queue items immediately (for debugging)

## Email sent status

On each booking edit screen, an **Emails** panel shows delivery status for admin, customer, reminder, and post-class. See [Bookings overview](/docs/bookings-overview).

## See also

- [Email settings](/docs/settings-emails)
- [Merge tags](/docs/merge-tags)
- [Class email overrides](/docs/classes-emails)
- [Troubleshooting — cron](/docs/troubleshooting)
