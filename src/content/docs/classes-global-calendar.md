---
title: Global calendar
description: Card colour, icon, and image settings for the schedule calendar.
order: 26
category: Classes
---

## What global calendar settings do

Each class can customise how it appears on the multi-class **`[clasbpro_schedule]`** calendar: accent colour, optional SVG icon, and whether the class image shows on the card.

Settings are in the **Global calendar** box on the class edit screen.

## Field reference

| Field | What it does |
|-------|----------------|
| **Card colour** | Background/accent colour for this class’s sessions on the week grid |
| **Card icon (SVG)** | Small icon top-left of card; paste inline SVG markup |
| **Show image on card** | Uses class image as card visual when enabled |

## Where cards appear

- `[clasbpro_schedule]` shortcode on any page
- Elementor **Class Schedule Calendar (Pro)** widget
- Clicking a session opens a booking panel (loads form via REST)

Which classes appear is configured under [Result pages](/docs/settings-result-pages) or overridden with `class_ids` on the shortcode.

## Inactive classes

Classes with **Class active** off are excluded from the front-end calendar even if still selected in settings.

## See also

- [Result pages](/docs/settings-result-pages)
- [Shortcodes — schedule](/docs/shortcodes)
- [Class listings](/docs/classes-listings)
