---
title: Customising ACF
description: Add custom fields to booking forms and use values in emails.
order: 82
category: Customising
---

## Overview

Use **Advanced Custom Fields** to add questions to the booking form (phone number, experience level, dietary notes). Answers are validated on checkout, stored on the booking, and available in merge tags.

## Create a field group

1. **ACF → Field Groups → Add New**
2. Add fields (text, select, checkbox, etc.)
3. Set location rule: **Class Bookings with Stripe → Booking form**
4. Publish the field group

Fields appear on every booking form site-wide (or narrow with additional ACF location rules if you use ACF Pro).

![ACF field group location rule](/docs/images/customising-acf-location.png)

## Submission & validation

- Front-end JS collects `extra_fields` keyed by ACF field name
- `POST /checkout` validates required fields server-side
- Invalid submissions return field-specific error messages
- Stored JSON on booking meta → shown in booking summary

## Merge tags

| Tag pattern | Output |
|-------------|--------|
| `{acf:field_xxxxx}` | Single field by key |
| `{field_xxxxx}` | Shorthand for same key |
| `{extra_fields}` | HTML/text summary of all answers |

Field keys are visible in ACF field group editor (e.g. `field_abc123`).

Full list: [Merge tags](/docs/merge-tags).

## Per-class fields

To show fields only for certain classes, use ACF Pro location rules (e.g. post type + specific class post) in addition to the booking form location.

## Settings integration

Enable related features under [Form extras](/docs/settings-form-extras) (waiver, Mailchimp) — ACF extras are independent and stack with those checkboxes.

## See also

- [Form extras](/docs/settings-form-extras)
- [Bookings overview](/docs/bookings-overview)
- [Hooks](/docs/customising-hooks)
