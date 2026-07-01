---
title: Themes
description: Gallery themes, live preview, install to theme, and theme source options.
order: 50
category: Themes
pro: true
---

## What booking themes do

**Themes** change how booking forms and result pages look without editing plugin core. Pro ships a gallery of production packs plus tutorial themes.

> **Pro only** — not available in the free WordPress.org plugin.

Browse the public gallery: **[Booking themes](/themes)** (screenshots and download links).

![Themes gallery in WordPress admin](/docs/images/themes.png)

## Theme source

| Source | Behaviour |
|--------|-----------|
| **Plugin default** | Built-in templates in `templates/` |
| **Gallery theme** | Select a bundled pack from the gallery |
| **Theme files** | Use files in your active WordPress theme override directory |

Override order and file layout: [Customising themes](/docs/customising-themes).

## Gallery features

| Action | What it does |
|--------|----------------|
| **Search / sort / filter** | Find themes by name, tags, or what they provide |
| **Theme details** | Description, tags, file list |
| **Enable** | Activate gallery theme for the site |
| **Install to theme** | Copy theme files into your child theme for editing |
| **Live preview** | Modal preview of booking form appearance |
| **Download ZIP** | Export all theme files |
| **View files** | Read-only code viewer in admin |

![Theme file viewer](/docs/images/theme-view-files.png)

## What themes include

Typical pack files:

- `theme.json` — metadata for the gallery
- `screenshot.jpg` or `screenshot.svg` — gallery thumbnail
- `bootstrap.php` — register labels, enqueue CSS
- `class-bookings-with-stripe/booking-form.php` — form layout
- `class-bookings-with-stripe/booking-status.php` — result pages
- `class-bookings-with-stripe/style.css` — theme styles
- `icons/`, `illustrations/` — optional assets

## Live preview

Preview uses a nonce-protected URL (`?clasbpro_theme_preview=slug`) so you can test without enabling globally.

## See also

- [Customising themes](/docs/customising-themes)
- [Responsiveness](/docs/responsiveness)
- [Shortcodes](/docs/shortcodes)
