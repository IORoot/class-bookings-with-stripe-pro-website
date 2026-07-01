---
title: Hooks
description: Actions and filters for templates, shortcodes, labels, and integrations.
order: 81
category: Customising
---

## Overview

The plugin exposes WordPress hooks for customising data and templates without forking core. Namespace prefix: `clasbpro_` (legacy free-plugin templates may still fire `clasbowi_` in default templates).

## Actions

| Hook | When it fires | Typical use |
|------|----------------|-------------|
| `clasbpro_booking_template_start` | Start of booking form theme template | Open wrapper, analytics |
| `clasbpro_booking_template_end` | End of booking form theme template | Close wrapper |
| `clasbowi_booking_template_start` | Start of **plugin default** booking template | Legacy alias |
| `clasbowi_booking_template_end` | End of plugin default booking template | Legacy alias |
| `clasbpro_status_template_start` | Start of status theme template | `$type`, `$booking` |
| `clasbpro_status_template_end` | End of status theme template | |
| `clasbpro_before_render_booking_template` | Before including booking layout PHP | `$template_args`, `$layout_path` |
| `clasbpro_after_render_booking_template` | After booking layout included | |
| `clasbpro_before_render_status_template` | Before status layout | |
| `clasbpro_after_render_status_template` | After status layout | |
| `clasbpro_before_render_schedule_template` | Before schedule layout | |
| `clasbpro_after_render_schedule_template` | After schedule layout | |

## Filters — shortcodes & data

| Filter | Arguments | Purpose |
|--------|-----------|---------|
| `clasbpro_shortcode_booking_atts` | `$atts` | Modify `[clasbpro_booking]` attributes |
| `clasbpro_shortcode_schedule_atts` | `$atts` | Modify schedule shortcode attributes |
| `clasbpro_shortcode_status_atts` | `$atts` | Modify status shortcode attributes |
| `clasbpro_booking_class_data` | `$class_data`, `$atts` | Alter class array before render |
| `clasbpro_booking_template_args` | `$args`, `$class_data`, `$atts` | Template arguments for booking form |
| `clasbpro_schedule_template_args` | `$args`, `$atts` | Schedule template arguments |
| `clasbpro_status_template_args` | `$args`, `$atts` | Status template arguments |
| `clasbpro_booking_title` | `$title`, `$class_data` | Class title on front end |

## Filters — labels & HTML

| Filter | Arguments | Purpose |
|--------|-----------|---------|
| `clasbpro_booking_labels` | `$labels`, `$class_data`, `$dates` | All form UI strings |
| `clasbpro_schedule_labels` | `$labels` | Schedule calendar strings |
| `clasbpro_status_reason_messages` | `$messages`, `$type`, `$reason`, `$booking` | Error page copy |
| `clasbpro_booking_html` | `$html`, `$template_args`, `$layout_path` | Final booking form HTML |
| `clasbpro_status_html` | `$html`, `$template_args`, `$layout_path` | Final status HTML |
| `clasbpro_schedule_html` | `$html`, `$template_args`, `$layout_path` | Final schedule HTML |
| `clasbowi_waiver_label_html` | `$html`, `$class_data` | Waiver checkbox label (default template) |
| `clasbowi_waiver_page_link_text` | `$text`, `$class_data` | Waiver link text |

## Filters — paths & admin

| Filter | Purpose |
|--------|---------|
| `clasbpro_template_path` | Override full path to a layout template |
| `clasbpro_component_path` | Override component partial path |
| `clasbpro_settings_intro_template_path` | Settings tab intro partial |
| `clasbpro_stripe_currencies` | Allowed currency list in settings |
| `clasbpro_waiver_label_kses` | Allowed HTML in waiver label |
| `clasbpro_themes_capability` | Capability required for Themes screen (default `manage_options`) |
| `clasbpro_mailchimp_payload` | Mailchimp API member payload before subscribe |

## Example — custom button label

```php
add_filter( 'clasbpro_booking_labels', function ( $labels, $class_data, $dates ) {
    $labels['book_button'] = 'Join class — ' . $class_data['price_formatted'];
    return $labels;
}, 10, 3 );
```

## See also

- [Customising themes](/docs/customising-themes)
- [REST API](/docs/customising-api)
- [Customising ACF](/docs/customising-acf)
