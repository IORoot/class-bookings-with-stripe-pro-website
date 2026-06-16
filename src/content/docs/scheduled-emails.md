---
title: Scheduled emails
description: Pro automated reminders before class and post-class follow-ups — rules, queue, cron, per-class overrides, and testing.
order: 7
category: Pro features
pro: true
---

## Overview

**Scheduled emails** send automatically relative to each booking's class start (or end):

- **Reminders** — e.g. 24 hours before class
- **Post-class** — e.g. 2 hours after class ends, often with a feedback link

They are separate from instant confirmation emails — see [Emails](/docs/emails).

## Where to configure

### Global rules (default)

**Class Bookings with Stripe → Settings → Emails**

Scroll to **Scheduled emails** sections:

- **Reminder email rules**
- **Post-class email rules**

These apply to all classes unless a class overrides them.

### Per-class rules

On each **Class** post, open the **Scheduled emails** meta box:

| Option | Behaviour |
|--------|-----------|
| **Use global rules** | Inherit settings from Emails tab |
| **Use custom rules for this class** | Define rules only for this class |

Toggle **Send reminder emails** / **Send post-class emails** off to disable that type for the class.

## Creating a rule

Click **Add rule** in the rules builder. Each rule includes:

| Setting | Description |
|---------|-------------|
| **Rule name** | Internal label (e.g. "24h reminder") |
| **Send offset** | Amount + unit (minutes, hours, days, weeks, months) **before class start** (reminder) or **after class end** (post-class) |
| **Subject** | Email subject with merge tags |
| **Body** | HTML body (visual editor) |
| **Send copy to admin** | Optional admin notification |
| **Max sends per customer per class type** | Limit duplicate reminders across repeat bookings |
| **Feedback URL override** | Post-class only; defaults to global feedback URL |

Rules are stored as JSON and edited in a custom UI (ACF Free has no repeater — the plugin provides its own builder).

## How sending works

1. When a booking becomes **paid**, the plugin **queues** scheduled email rows for matching rules.
2. WordPress **cron** (hooked to the plugin's booking cron) processes due items.
3. Each queue row tracks status: pending, sent, skipped, cancelled.
4. **Deduplication** prevents duplicate sends when rules overlap or bookings change.

**Important:** Low-traffic sites may delay cron. Use a real server cron hitting `wp-cron.php` every minute for timely reminders.

## Merge tags

Same tags as instant emails, plus **`{feedback_url}`** for post-class templates (global default or per-rule override).

See [Merge tags](/docs/merge-tags).

## Admin tools

On the Emails tab, **Scheduled email tools** may include:

- **Backfill queue** — generate queue rows for existing paid bookings (after adding new rules)
- **Send test** — send a test message for a rule

Use backfill after enabling rules on a site with existing bookings.

## Per-class examples

| Scenario | Setup |
|----------|--------|
| Workshop needs 1 week reminder | Custom rules on that class only |
| Weekly yoga uses standard 24h reminder | Global rules |
| No post-class survey for one class | Disable post-class on that class |

## Appointments

Offsets are calculated from the **slot start time** (and duration for post-class). Ensure slot rules and timezones match your expectations.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Reminders never arrive | Cron running? Check queue in database/admin tools; test `wp_mail` |
| Duplicate emails | Review max-sends setting; check duplicate rules |
| Wrong send time | Verify class date/time on booking; check offset unit |
| Feedback link empty | Set global feedback URL or per-rule override |

See [Troubleshooting](/docs/troubleshooting).

## Related

- [Emails](/docs/emails) — instant confirmations
- [Appointments](/docs/appointments) — slot timing
- [Developer](/docs/developer) — hooks and filters
