---
title: Booking themes
description: Pro form themes — browse, live preview, install, switch, override in your child theme, and bundled theme packs.
order: 8
category: Pro features
pro: true
---

## Overview

**Booking themes** change the HTML structure, components, and CSS of:

- The front-end **booking form**
- **Booking status** pages (confirmed, cancelled, error)

Pro ships many theme packs. Install with one click or copy into your child theme for full control.

Browse the full gallery on the site: **[Booking themes](/themes)** — screenshots and links to each pack in the [themes repository](https://github.com/IORoot/class-bookings-with-stripe-pro-themes).

Open **Class Bookings with Stripe → Themes** in the admin menu.

## Themes admin screen

The gallery lists every bundled pack with:

- **Preview** — live iframe preview with sample class data
- **View files** — browse PHP/CSS source with syntax highlighting
- **Install** — copy theme into your active theme directory
- **Enable** — activate installed pack without re-copying files
- **Download** — export pack as ZIP

### Live preview

Preview loads a sandbox URL with non-production class data. Switch preview class from the dropdown if multiple samples exist.

## Install vs enable

| Action | Result |
|--------|--------|
| **Install** | Copies files to `wp-content/themes/your-theme/class-bookings-with-stripe/` |
| **Enable** | Sets which installed pack the plugin loads |
| **Switch files** | Replace active pack files from a bundled version (careful — overwrites custom edits) |

Always use a **child theme** if you customise files — parent theme updates would wipe installs.

## Bundled theme packs

Production-ready styles:

| Slug | Style |
|------|-------|
| **atelier** | Studio / editorial |
| **horizon** | Clean horizontal layout |
| **lime** | Bright accent |
| **noir** | Dark minimal |
| **secure-checkout** | Trust-focused checkout |
| **summit** | Bold outdoor / fitness |
| **wellspring** | Soft wellness |
| **yoga-split** | Split layout for yoga |

Utility / starter packs:

| Slug | Purpose |
|------|---------|
| **single-column** | Narrow single column |
| **styled-button** | Emphasis on CTA |
| **custom-labels** | Label positioning example |

**Tutorial series** (`tutorial-01` … `tutorial-11`) — incremental examples for learning the template system (button label, field order, dark theme, fullscreen background, etc.).

## Template structure

Each pack contains:

```
class-bookings-with-stripe/
  booking-form.php          ← layout shell
  booking-form/             ← components (name-field, date-field, …)
  booking-status.php
  booking-status/
  style.css
  assets/components/…       ← optional per-component CSS
```

Components are rendered with `$view->render( 'slug' )` from the layout file.

## Override without installing

Copy individual files to your child theme's `class-bookings-with-stripe/` folder, or use filters:

- `clasbpro_template_path` — change layout file path
- `clasbpro_component_path` — change one component

Examples in [Developer](/docs/developer).

## CSS variables

Themes use `--cbfs-*` custom properties for colours, radius, and borders. Override in your theme `style.css`:

```css
.cbfs-form {
  --cbfs-accent: #0e7490;
  --cbfs-bg: #0a0c10;
}
```

## Status pages

Themes style success/cancel/error pages. Ensure result pages use `[clasbpro_booking_status]` shortcodes — see [Result pages](/docs/result-pages).

## Related

- [Shortcode & Elementor](/docs/shortcode-elementor)
- [Developer — templates & hooks](/docs/developer)
- [Appointments](/docs/appointments) — calendar UI inherits active theme where supported
