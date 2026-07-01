---
title: Form extras
description: Waivers, Mailchimp opt-in, coupon codes, and custom ACF fields on the booking form.
order: 13
category: Settings
---

## What this tab does

**Form extras** add optional fields and integrations to every booking form: liability waivers, mailing-list opt-in, Stripe promotion codes, and custom questions via ACF.

![Form extras settings](/docs/images/settings-form-extras.png)

## ACF fields on forms

The plugin can render extra Advanced Custom Fields on the booking form. Create a field group in ACF with location rule **Class Bookings with Stripe → Booking form**. Field values are stored on the booking and available in merge tags.

Full guide: [Customising ACF](/docs/customising-acf).

## Field reference

### Waiver

| Field | What it does |
|-------|----------------|
| **Require waivers** | Checkbox must be ticked before checkout |
| **Waiver label** | Text beside the checkbox; basic HTML allowed |
| **Waiver URL** | Optional link to full waiver page (opens in new tab) |

### Mailchimp

| Field | What it does |
|-------|----------------|
| **Mailchimp opt-in** | Show mailing-list checkbox on the form |
| **Opt-in label** | Checkbox label text |
| **Mailchimp API key** | From Mailchimp → Account → Extras → API keys |
| **Mailchimp Audience ID** | List ID to subscribe opted-in customers |
| **Mailchimp double opt-in** | Use Mailchimp’s confirmation email flow |

Subscribers are added after payment succeeds (webhook), not at form submit.

### Coupons

| Field | What it does |
|-------|----------------|
| **Allow coupon codes** | Enables Stripe promotion codes on Checkout |

Customers can enter codes Stripe has created in your Dashboard. The plugin enables `allow_promotion_codes` on the Checkout Session.

## Booking metadata

Waiver acceptance and Mailchimp opt-in are stored on the booking and visible in the booking summary. ACF answers appear under **Additional fields** and in `{extra_fields}` / `{acf:field_key}` merge tags.

## See also

- [Customising ACF](/docs/customising-acf)
- [Merge tags](/docs/merge-tags)
- [Bookings overview](/docs/bookings-overview)
