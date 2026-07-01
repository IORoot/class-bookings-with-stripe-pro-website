---
title: Class emails
description: Per-class overrides for admin, customer, reminder, and post-class emails.
order: 24
category: Classes
---

## What class emails do

Each class can **override** global email templates from **Settings → Emails**. Use this when one workshop needs different copy, timing, or admin recipient than your studio-wide defaults.

Open any class → **Class emails** meta box (sub-tabs mirror global settings).

## Override types

| Email | Override options |
|-------|------------------|
| **Admin** | Enable override, recipient, subject, body, editor mode, send test |
| **Customer** | Enable override, subject, body, editor mode, send test |
| **Scheduled reminder** | Enable/disable for this class, offset, admin copy, subject, body, test |
| **Scheduled post-class** | Same as reminder, but after class ends |

## Field reference (each type)

| Field | What it does |
|-------|----------------|
| **Enabled** | Use class-specific template instead of global |
| **Email address** (admin only) | Override notification recipient |
| **Send time + unit** (scheduled only) | Override global offset for this class |
| **Send admin a copy** (scheduled only) | CC admin on scheduled sends |
| **Subject** | Merge tags supported |
| **Body editor mode** | Visual or HTML |
| **Body** | Template fragment |
| **Send test** | Sample email with merge tags |
| **Reset to global defaults** | Clears class override fields |

When override is disabled, global rules from [Email settings](/docs/settings-emails) and [Scheduled emails](/docs/settings-scheduled-emails) apply.

## Merge tags

Same tags as global templates. See [Merge tags](/docs/merge-tags).

## See also

- [Email settings](/docs/settings-emails)
- [Scheduled emails](/docs/settings-scheduled-emails)
- [Bookings overview](/docs/bookings-overview) — email delivery status per booking
