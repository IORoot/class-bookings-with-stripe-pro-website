---
title: Shortcode & Elementor
description: Embed booking forms and status pages with shortcodes or the Elementor widget.
order: 10
category: Embedding
---

## Booking form shortcode

```
[clasbpro_booking class_id="123"]
```

| Attribute | Required | Description |
|-----------|----------|-------------|
| `class_id` | Yes | WordPress post ID of the Class |

Place on any page or post. The form loads class settings, availability, and Stripe Checkout flow.

### Multiple classes

Use one shortcode per class per page. For a schedule of many classes, create separate pages or build a custom archive with multiple shortcodes.

## Booking status shortcodes

Result pages (created on plugin activation) display outcome after Stripe redirect:

```
[clasbpro_booking_status type="success"]
[clasbpro_booking_status type="cancelled"]
[clasbpro_booking_status type="error"]
```

| type | When shown |
|------|------------|
| `success` | Payment completed (or processing); may poll until paid |
| `cancelled` | Customer abandoned Stripe Checkout |
| `error` | Validation or payment failure |

See [Result pages](/docs/result-pages).

## Elementor widget

If Elementor is active:

1. Edit a page with Elementor.
2. Search widgets for **Class Booking with Stripe**.
3. Drag onto the canvas.
4. Select **Class** in widget settings.

Styling inherits your active **booking theme** (Pro) and theme CSS.

## Block editor

Use a **Shortcode** block and paste `[clasbpro_booking class_id="123"]`.

## Developer tab

**Settings → Developer** documents:

- REST namespace `clasbpro/v1`
- Checkout and webhook paths
- Template override filters

See [Developer](/docs/developer).

## Related

- [Getting started](/docs/getting-started)
- [Booking themes (Pro)](/docs/themes)
