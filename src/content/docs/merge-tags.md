---
title: Merge tags
description: Placeholders for email subjects and bodies, including ACF extras.
order: 90
category: Reference
---

## Overview

Merge tags are `{placeholder}` strings replaced when an email is sent or previewed. Use them in subjects and bodies under **Settings → Emails**, **Scheduled emails**, and **Class email** overrides.

The admin UI lists available tags in an accordion on each email sub-tab.

## Standard tags

| Tag | Output |
|-----|--------|
| `{customer_name}` | Booker’s name |
| `{customer_email}` | Booker’s email |
| `{class_name}` | Class title |
| `{class_date}` | Formatted session date |
| `{class_time}` | Start time |
| `{location}` | Class or slot location |
| `{slot_label}` | Appointment slot label |
| `{duration}` | Duration in minutes |
| `{price}` | Per-seat price (formatted) |
| `{seats}` | Number of places booked |
| `{amount_total}` | Total amount paid |
| `{booking_id}` | Reference like `#123` |
| `{description}` | Class description field |
| `{extra_fields}` | Summary block of ACF answers |

## Stripe Checkout item title

Under **Settings → Stripe**, the line item template also supports:

| Tag | Output |
|-----|--------|
| `{class_date_raw}` | Date in `Y-m-d` form |

Plus the standard class/customer tags listed above.

## ACF extra fields

| Pattern | Example |
|---------|---------|
| `{acf:field_key}` | `{acf:field_abc123}` |
| `{field_key}` | Shorthand when key is unique |

See [Customising ACF](/docs/customising-acf).

## Subjects vs bodies

Tags work in **both** subject lines and body content. Test with **Send test email** on each tab — local test mode redirects delivery while showing the intended recipient in a banner.

## Scheduled emails

Reminder and post-class templates use the same tag set. Timing is based on class (or appointment slot) start/end, not tag choice.

## See also

- [Email settings](/docs/settings-emails)
- [Scheduled emails](/docs/settings-scheduled-emails)
- [Class emails](/docs/classes-emails)
