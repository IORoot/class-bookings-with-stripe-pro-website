---
title: Form extras
description: Waiver checkbox, Mailchimp opt-in, custom ACF fields on the booking form, and merge tags for extras.
order: 5
category: Classes & booking
video: extraFields
---

## Overview

**Form extras** extend the booking form beyond name, email, date, and seats. Configure global defaults under **Settings → Form extras**, and add per-class fields with ACF.

![Settings Page — Form extras](/docs/screenshots/screenshot-3.png)

## Waiver

1. Open **Settings → Form extras**.
2. Enable the **Waiver** checkbox.
3. Set checkbox label text and link to a **Waiver page** (WordPress page with full legal text).
4. Customers must tick the box before paying.

Waiver acceptance can appear in emails via `{extra_fields}` or ACF merge tags.

## Mailchimp opt-in

Optional mailing list signup on the form.

### Setup

1. **Settings → Form extras** — enable Mailchimp opt-in and set checkbox label.
2. **Settings → Form extras** (or dedicated fields) — enter **Mailchimp API key** and **Audience ID**.
3. Enable **double opt-in** if your audience requires pending confirmation.

### When sync runs

After a booking is marked **paid** (Stripe webhook), and only if:

- Mailchimp is configured
- Customer checked the opt-in box
- Booking has not already been synced

Data sent: email, first/last name (parsed from booking name), subscription status.

## Custom ACF fields

Add fields that appear only on specific classes (or all classes via location rules).

### Create a field group

1. **ACF → Field Groups → Add New**.
2. Add fields (text, email, number, textarea, select, radio, true/false supported).
3. **Location rule:** Class Bookings with Stripe → **Booking form class ID** → choose the Class post.

Fields render on the booking form and store on the booking record.

![ACF Field Group Rules](/docs/screenshots/screenshot-24.png)

### Use in emails

| Syntax | Purpose |
|--------|---------|
| `{extra_fields}` | HTML summary of all extras |
| `{acf:field_xxxxx}` | Single ACF field by key |
| `{field_xxxxx}` | Shorthand for same |

See [Merge tags](/docs/merge-tags).

**Video:** [Extra fields & ACF on the booking form](https://youtu.be/BivPyMuCGbQ)

## Validation

Required custom fields block checkout until filled. Test on mobile — long forms affect conversion.

## Privacy

Disclose Mailchimp and data collection in your site privacy policy. Document third-party services in your WordPress privacy policy page if required.

## Related

- [Emails](/docs/emails)
- [Merge tags](/docs/merge-tags)
- [Developer — ACF on booking form](/docs/developer)
