---
title: REST API
description: Checkout, webhooks, availability, and calendar endpoints.
order: 83
category: Customising
---

## Base URL

All routes live under:

```
/wp-json/clasbpro/v1/
```

The plugin localises this base to front-end scripts as `clasbpro.rest_url`.

## Authentication

| Endpoint | Access |
|----------|--------|
| Most routes | Public (`permission_callback` true) — used by booking forms |
| `booking-status` | Public with valid `session` + `token`, or site admin |

Webhook verifies Stripe signature header — not WordPress auth.

## Endpoints

### `POST /checkout`

Creates pending booking + Stripe Checkout Session.

**Body parameters:**

| Param | Required | Description |
|-------|----------|-------------|
| `class_id` | Yes | Class post ID |
| `class_date` | Yes | `Y-m-d` session date |
| `seats` | Yes | Integer ≥ 1 |
| `customer_name` | No* | Required for successful validation |
| `customer_email` | No* | Valid email required |
| `slot_rule_id` | Appointments | Slot rule key |
| `origin_url` | No | Return URL base (sanitised) |
| `waiver_accepted` | No | Boolean if waivers enabled |
| `mailchimp_opt_in` | No | Boolean |
| `extra_fields` | No | Object of ACF field values |

**Success response:** `{ "url": "https://checkout.stripe.com/…", "booking_id": 123 }`

**Error response:** `{ "error": true, "reason": "capacity_full", "message": "…" }`

### `POST /stripe-webhook`

Stripe event receiver. Events handled:

- `checkout.session.completed` → mark paid, send emails, queue scheduled mail
- `checkout.session.expired` / `checkout.session.async_payment_failed` → expire hold

### `GET /booking-status`

Poll payment state after redirect.

| Param | Description |
|-------|-------------|
| `session` | Stripe Checkout Session ID (`cs_…`) |
| `token` | Per-booking status token from success URL |

**Response:** `status`, `booking_id`, `class_name`, `class_date`, `class_time`, `location`, `seats`, `amount_total`, `customer_name`

### `GET /availability`

| Param | Description |
|-------|-------------|
| `class_id` | Refresh bookable dates after errors |

Returns `class_active` and `dates` array.

### `GET /appointment-calendar`

| Param | Description |
|-------|-------------|
| `class_id`, `year`, `month` | Month grid availability for appointments |

### `GET /appointment-slots`

| Param | Description |
|-------|-------------|
| `class_id`, `date` | Time slots for one day |

### `GET /class-calendar`

| Param | Description |
|-------|-------------|
| `class_id`, `year`, `month` | Recurring class date calendar |

### `GET /schedule-calendar`

| Param | Description |
|-------|-------------|
| `week` | Monday of week (`Y-m-d`) |
| `class_ids` | Optional comma-separated IDs |

Returns week grid payload for `[clasbpro_schedule]`.

### `GET /schedule-booking-form`

| Param | Description |
|-------|-------------|
| `class_id` | Class to render |
| `preset_date` | Optional pre-selected date |
| `preset_slot_rule_id` | Optional appointment slot |

Returns `{ "html": "…" }` for schedule modal panel.

## Example — availability check

```bash
curl "https://yoursite.com/wp-json/clasbpro/v1/availability?class_id=42"
```

## See also

- [Stripe settings](/docs/settings-stripe)
- [Hooks](/docs/customising-hooks)
- [Troubleshooting](/docs/troubleshooting)
