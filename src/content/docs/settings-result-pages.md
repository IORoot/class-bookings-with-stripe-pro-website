---
title: Result pages
description: Success, cancelled, and error pages after Stripe Checkout, plus schedule calendar settings.
order: 14
category: Settings
---

## What this tab does

After Stripe Checkout, customers return to your WordPress site on **success**, **cancel**, or **error** pages. This tab assigns those pages and configures which classes appear on the global schedule calendar.

![Result pages settings](/docs/images/settings-result-pages.png)

## Result pages

On plugin activation, three pages are created with the correct shortcodes. Assign them here if you recreate pages or use a custom set.

| Field | Stripe redirect | Shortcode on page |
|-------|-----------------|-------------------|
| **Booking confirmed page** | Success URL | `[clasbpro_booking_status type="success"]` |
| **Booking cancelled page** | Cancel URL | `[clasbpro_booking_status type="cancelled"]` |
| **Booking error page** | Error / validation failures | `[clasbpro_booking_status type="error"]` |

The success page reads `session_id` and a status token from the URL query string after redirect.

If webhooks are slow, customers may briefly see a processing state — the page polls the REST API until payment is confirmed. Ensure webhooks are configured: [Stripe settings](/docs/settings-stripe).

## Schedule calendar

| Field | What it does |
|-------|----------------|
| **Schedule calendar classes** | Classes shown on `[clasbpro_schedule]` when no `class_ids` attribute is set |
| **Schedule weeks ahead** | How many weeks the calendar navigation allows (global default) |

Inactive classes are hidden on the front-end calendar. Override class list per shortcode: [Shortcodes](/docs/shortcodes).

Per-class card styling: [Global calendar settings](/docs/classes-global-calendar).

## Styling result pages

Success, cancel, and error layouts use the active **booking theme** when one is enabled. See [Themes](/docs/themes) and [Customising themes](/docs/customising-themes).

## See also

- [Shortcodes — booking status](/docs/shortcodes)
- [Stripe settings](/docs/settings-stripe)
- [Global calendar](/docs/classes-global-calendar)
