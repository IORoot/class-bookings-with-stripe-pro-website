---
title: Responsiveness
description: How booking forms, calendars, and themes adapt on desktop, tablet, and mobile.
order: 70
category: Responsiveness
---

## Overview

Booking forms, schedule calendars, and gallery themes are built to work on **desktop, tablet, and mobile**. Layouts reflow with CSS media queries; touch targets are sized for phones where themes define mobile rules.

## Default plugin breakpoints

Core front-end CSS (`cbfs-booking.css`) uses:

| Breakpoint | Typical effect |
|------------|----------------|
| **max-width: 900px** | Form rows stack; calendar grid tightens |
| **max-width: 600px** | Full-width buttons; reduced padding |

Appointment and class date calendars share calendar core styles with similar stacking behaviour.

## Theme breakpoints

Gallery themes add their own queries. Common patterns in bundled packs:

| Breakpoint | Themes using it |
|------------|-----------------|
| **860px** | Horizon, Lime, Yoga Split — two-column forms → single column |
| **768px** | Noir — status page layout |
| **640px** | Summit, Wellspring — typography and spacing |
| **480px** | Secure Checkout, Yoga Split — compact status cards |

Each theme’s `style.css` documents its exact rules. Preview with **Themes → Live preview** and browser dev tools.

## Schedule calendar

The week grid scrolls horizontally on narrow screens when many classes are shown. Filter chips and week navigation remain usable at tablet widths.

## Admin screens

Plugin admin CSS uses WordPress-standard breakpoints (`782px`, `960px`, `1100px`) for settings, reports, and theme gallery — relevant when managing the plugin from a tablet.

## Reduced motion

Several themes include `@media (prefers-reduced-motion: reduce)` to limit animations for accessibility.

## Customising

Override breakpoints in your theme’s `class-bookings-with-stripe/style.css` after **Install to theme**. See [Customising themes](/docs/customising-themes).

## See also

- [Themes](/docs/themes)
- [Customising themes](/docs/customising-themes)
- [Shortcodes](/docs/shortcodes)
