---
title: Developer reference
description: REST API routes, WordPress hooks, template overrides, and custom integration patterns.
order: 13
category: Reference
---

## REST API

Namespace: **`clasbpro/v1`**

Base URL: `https://yoursite.com/wp-json/clasbpro/v1`

| Method | Path | Access | Purpose |
|--------|------|--------|---------|
| POST | `/checkout` | Public (nonce) | Create Stripe Checkout Session |
| POST | `/stripe-webhook` | Stripe signature | Payment events |
| GET | `/booking-status` | Session token | Poll booking after redirect |

### Checkout

Called by front-end JavaScript with class ID, date, seats, customer fields, and WordPress nonce. Returns Stripe redirect URL.

### Webhook

Only Stripe may POST. Verify signing secret in plugin settings.

### Booking status

Used on success page. Requires session ID and per-booking status token from return URL (or `manage_options` for admins).

## Payment flow (integrators)

1. Form POST → `/checkout`
2. Redirect → Stripe
3. Webhook → booking paid
4. Optional poll → `/booking-status`

## Filters

| Hook | Arguments | Use |
|------|-----------|-----|
| `clasbpro_booking_template_args` | `$args, $context` | Modify class data before render |
| `clasbpro_status_template_args` | `$args, $context` | Status page args |
| `clasbpro_booking_html` | `$html, $args, $path` | Wrap/replace form HTML |
| `clasbpro_status_html` | `$html, $args, $path` | Wrap/replace status HTML |
| `clasbpro_booking_labels` | `$labels, $class_data, $dates` | Button copy, hints |
| `clasbpro_booking_title` | `$title, $class_data` | Form heading |
| `clasbpro_template_path` | `$path, $relative, $context` | Layout PHP path |
| `clasbpro_component_path` | `$path, $layout, $slug` | Component partial path |
| `clasbpro_themes_capability` | `$cap` | Who can manage Themes screen |

### Example: rename pay button

```php
add_filter( 'clasbpro_booking_labels', function ( $labels, $class_data, $dates ) {
	$labels['book_button'] = __( 'Pay securely', 'my-theme' );
	return $labels;
}, 10, 3 );
```

## Actions

| Hook | When |
|------|------|
| `clasbpro_booking_template_start` | Before form layout |
| `clasbpro_booking_template_end` | After form layout |
| `clasbpro_status_template_start` | Before status layout |
| `clasbpro_status_template_end` | After status layout |
| `clasbpro_before_render_booking_template` | Around template render |
| `clasbpro_after_render_booking_template` | After template render |

## Template overrides

Place files in your child theme:

```
class-bookings-with-stripe/
  booking-form.php
  booking-form/name-field.php
  booking-status.php
  booking-status/title.php
```

Or use Pro **Themes** installer — see [Booking themes](/docs/themes).

## Shortcodes

| Shortcode | Purpose |
|-----------|---------|
| `[clasbpro_booking class_id="N"]` | Booking form |
| `[clasbpro_booking_status type="success\|cancelled\|error"]` | Result pages |

## ACF on booking form

Location rule: **Booking form class ID** → select Class post. Supported field types listed in plugin Help tab.

## Local testing

```bash
stripe listen --forward-to https://yoursite.test/wp-json/clasbpro/v1/stripe-webhook
```

## Related

- [Stripe setup](/docs/stripe-setup)
- [Booking themes (Pro)](/docs/themes)
- [Shortcode & Elementor](/docs/shortcode-elementor)
