---
title: Class listings
description: The Classes admin table — image, ID, columns, and shortcodes.
order: 25
category: Classes
---

## What the list shows

**Stripe Class Pro → Classes** shows all class posts in a sortable table. Use it to scan schedules, copy IDs, and jump into editing.

![Classes list table](/docs/images/classes-list-table.png)

## Columns

| Column | Description |
|--------|-------------|
| **Image** | Class image thumbnail (48×48), or empty placeholder |
| **Title** | Class name (post title) |
| **Class ID** | Numeric post ID — use in `[clasbpro_booking class_id="…"]` |
| **Location** | Configured venue / online label |
| **When** | Day or date range + start time + duration |
| **Type** | Pill: **Class**, **One-off event**, or **External link** |
| **Price** | Formatted price in site currency |
| **Capacity** | Max seats per session |
| **Status** | **Active** or **Cancelled** (class inactive) |

## Class ID for shortcodes

The ID is the WordPress post ID (`#123` in the list). On the class edit screen, the publish box shows:

- Class ID
- Ready-to-copy shortcode: `[clasbpro_booking class_id="123"]`

Elementor and dynamic fields can use the same ID — see [Elementor](/docs/shortcodes-elementor).

## Images

Images come from the **Class image** field on each post. They also appear on booking rows and optionally on the schedule calendar.

## See also

- [Classes overview](/docs/classes-overview)
- [Shortcodes](/docs/shortcodes)
- [Global calendar](/docs/classes-global-calendar)
