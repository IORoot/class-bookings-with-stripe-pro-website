---
title: Customising themes
description: Override order, theme.json, bootstrap.php, and template files.
order: 80
category: Customising
---

## Override order

When resolving templates, the plugin checks (highest priority last):

1. **Plugin default** — `templates/` in the plugin
2. **Gallery theme** — enabled pack under `plugins/…/themes/{slug}/`
3. **Active WordPress theme** — files in your theme directory

Configure source under **Stripe Class Pro → Themes → Theme source**.

Typical path in your theme:

```
your-theme/
  class-bookings-with-stripe/
    booking-form.php
    booking-status.php
    style.css
    icons/
    illustrations/
  bootstrap.php          # optional, theme root
  theme.json             # gallery metadata if publishing a pack
  screenshot.jpg         # gallery thumbnail
```

## theme.json

JSON metadata for the theme gallery: name, slug, description, tags, version, author. Bundled themes use this for search/filter in admin.

## bootstrap.php

Optional PHP loaded when the theme is active. Common uses:

```php
add_filter( 'clasbpro_booking_labels', function ( $labels, $class_data, $dates ) {
    $labels['book_button'] = 'Reserve your spot';
    return $labels;
}, 10, 3 );

add_action( 'wp_enqueue_scripts', function () {
    // Extra assets
}, 30 );
```

## booking-form.php

Main form template. Receives `$view` (a `Booking_Form_View` instance).

```php
do_action( 'clasbpro_booking_template_start', $class_data, $dates );
// Your markup — include components or custom HTML
do_action( 'clasbpro_booking_template_end', $class_data, $dates );
```

### Useful `$view` properties

| Property | Description |
|----------|-------------|
| `$view->class_data` | Class configuration array |
| `$view->dates` | Available dates (non-appointment) |
| `$view->labels` | Translated UI strings |
| `$view->has_bookable_form()` | Whether to render inputs vs hints |
| `$view->is_appointments` | Appointment class flag |

Component partials live under `class-bookings-with-stripe/booking-form/{slug}.php` (name-field, submit-button, etc.).

## booking-status.php

Result page template for success / cancelled / error.

```php
$status_class = $view->get_status_class();
$session_attr = \IOROOT_STRIPE_BOOKINGS_PRO\Theme_Loader::status_session_attrs(
    $view->type,
    $view->session_id,
    $view->status_token
);

do_action( 'clasbpro_status_template_start', $type, $booking );
// Markup
do_action( 'clasbpro_status_template_end', $type, $booking );
```

## Assets

- **`icons/`** — SVG partials (e.g. `lock.svg.php`)
- **`illustrations/`** — Status page artwork
- **Per-component CSS** — `assets/components/booking-form/{slug}.css` auto-enqueued when present

## Install to theme

**Themes → Install to theme** copies the current gallery pack into your active theme so you can edit files in place without losing updates in the plugin copy.

## See also

- [Themes](/docs/themes)
- [Hooks](/docs/customising-hooks)
- [Responsiveness](/docs/responsiveness)
