---
title: Elementor
description: Class Booking and Schedule Calendar Pro widgets and dynamic class fields.
order: 61
category: Shortcodes
---

## Overview

If Elementor is active, two widgets appear under **Class Bookings with Stripe (Pro)**:

- **Class Booking with Stripe (Pro)**
- **Class Schedule Calendar (Pro)**

They wrap the same shortcodes with visual controls and style tabs.

## Class Booking widget

### Class source — Manual

Pick a class from the **Stripe Class** dropdown. Equivalent to:

```
[clasbpro_booking class_id="123" heading="1"]
```

![Class Booking widget — Content tab](/docs/images/elementor-class-widget-content.png)

### Class source — Current post

Reads a field on the **page being edited**:

| Control | Default field key |
|---------|-------------------|
| **Field key on current post** | `clasbpro_class_stripe_id` |

Add a custom field (ACF or post meta) on landing pages so each page auto-loads its class without hard-coding IDs. Value is the numeric class post ID (with or without `#` prefix).

### Show class heading

Maps to shortcode `heading="1"` or `heading="0"`.

### Style tabs

| Tab | Targets |
|-----|---------|
| **Book & Pay button** | Primary Stripe checkout button |
| **External link button** | Classes using external booking URL |

![Class Booking widget — Style tab](/docs/images/elementor-class-widget-style.png)

## Class Schedule Calendar widget

| Control | Description |
|---------|-------------|
| **Classes shown** | Use plugin settings list **or** hand-pick classes for this widget |
| **Class selection** | Multi-select when not using global settings |
| **Style — width** | Container width constraints |

![Schedule Calendar widget — Content tab](/docs/images/elementor-global-calendar-content.png)

Equivalent shortcode:

```
[clasbpro_schedule class_ids="12,34"]
```

![Schedule calendar on the front end](/docs/images/shortcode-schedule.png)

## Tips

- Use **Current post** source on reusable Elementor templates — one template, many class landing pages.
- Match result page URLs in Stripe return flow — [Result pages](/docs/settings-result-pages).
- Theme styles apply to widget output when a gallery theme is active.

## See also

- [Shortcodes](/docs/shortcodes)
- [Class listings](/docs/classes-listings)
- [Themes](/docs/themes)
