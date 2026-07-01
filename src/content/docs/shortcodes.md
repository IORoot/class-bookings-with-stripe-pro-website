---
title: Shortcodes
description: Booking form, schedule calendar, and result page shortcodes with attributes.
order: 60
category: Shortcodes
---

## Overview

Three shortcodes embed booking UI on any page, post, or widget area:

| Shortcode | Purpose |
|-----------|---------|
| `[clasbpro_booking]` | Single-class booking form |
| `[clasbpro_schedule]` | Multi-class week calendar |
| `[clasbpro_booking_status]` | Result page after Stripe Checkout |

Legacy aliases `stripe_booking_pro` and `stripe_booking_status_pro` still work.

![Booking shortcode on a page](/docs/images/shortcodes-page.png)

## Adding shortcodes

| Method | How |
|--------|-----|
| **Block editor** | Shortcode block → paste tag |
| **Classic editor** | Paste into content |
| **PHP template** | `echo do_shortcode('[clasbpro_booking class_id="123"]');` |
| **Elementor** | Shortcode widget or Pro booking widgets — [Elementor](/docs/shortcodes-elementor) |

## `[clasbpro_booking]`

Renders the booking form for one class.

```
[clasbpro_booking]
[clasbpro_booking class_id="123"]
```

| Attribute | Description |
|-----------|-------------|
| `class_id` | Numeric Class post ID (**recommended**) |
| `class_slug` | Class post slug instead of ID |
| `clasbpro_class_stripe_id` | Alias for `class_id` (Elementor / legacy) |
| `class_stripe_id` | Another alias for `class_id` |
| `heading` | `1` (default) show class title; `0` hide |
| `preset_date` | Pre-select date `Y-m-d` (weekly / one-off) |
| `preset_slot_rule_id` | Pre-select appointment slot rule ID |

Without `class_id`, the shortcode shows “No class selected.”

### Previews by class type

- **Weekly** — date dropdown or calendar + seats + pay button
- **One-off** — event date + checkout
- **Appointments** — month calendar + time slots

## `[clasbpro_schedule]`

Renders the multi-class schedule calendar. Classes default from **Settings → Result pages** unless overridden.

```
[clasbpro_schedule]
[clasbpro_schedule class_ids="12,34,56"]
```

| Attribute | Description |
|-----------|-------------|
| `class_ids` | Optional comma-separated Class post IDs |

Clicking a session opens an inline booking panel (loads form via REST).

## `[clasbpro_booking_status]`

Place on result pages assigned under Settings. Type is usually fixed per page:

```
[clasbpro_booking_status type="success"]
[clasbpro_booking_status type="cancelled"]
[clasbpro_booking_status type="error"]
```

| Attribute | Description |
|-----------|-------------|
| `type` | `success`, `cancelled`, or `error` |

**Success** reads `session_id` and token from the URL after Stripe redirect. **Cancelled** shows when customer backs out of Checkout. **Error** shows validation or payment failures with a reason code.

## See also

- [Elementor widgets](/docs/shortcodes-elementor)
- [Result pages](/docs/settings-result-pages)
- [Themes](/docs/themes)
