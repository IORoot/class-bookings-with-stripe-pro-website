---
title: Class types
description: Weekly recurring classes, one-off events, external booking links, capacity, and cancelled dates.
order: 3
category: Classes & booking
---

## Booking types

When editing a **Class**, choose **Booking type**:

| Type | Best for |
|------|----------|
| **Weekly class** | Regular schedule (e.g. every Tuesday 18:00) |
| **One-off event** | Workshops, single dates, short runs |
| **External link** | Registration handled on another platform |
| **Appointments** | Calendar + time slots (**Pro** — see [Appointments](/docs/appointments)) |

## Weekly recurring classes

1. Set **Booking type** to **Weekly class**.
2. Choose **Day of week**, **Start time**, and **Duration**.
3. Set **Price** (GBP) and **Capacity** (max seats per session).
4. Optional: **End date** for the recurrence.
5. Publish the class.

The front-end form shows a **date dropdown** of upcoming occurrences with live capacity (paid bookings + active soft holds).

## One-off events & workshops

1. Set **Booking type** to **One-off event**.
2. Add one or more **Event dates** with optional per-date capacity overrides.
3. Set price and default capacity.

Ideal for retreats, pop-ups, or courses that do not repeat weekly.

## External booking links

1. Set **Booking type** to **External link**.
2. Enter the **External booking URL**.
3. The form shows a **Continue to booking** button instead of Stripe Checkout.

Use when payment or registration happens on Eventbrite, Mindbody, or another system.

## Capacity & soft holds

- **Capacity** limits seats per date (or per slot for appointments).
- When a customer starts checkout, a **soft hold** reserves seats for **30 minutes** (matches Stripe Session expiry).
- Expired holds are cleared by webhook and WordPress cron.
- Only **paid** bookings count toward long-term capacity; pending holds block availability during checkout.

## Cancelled dates

On weekly classes you can **cancel individual dates** without unpublishing the whole class. Cancelled dates disappear from the customer date picker.

## Class fields (common)

| Field | Notes |
|-------|-------|
| **Title** | Class name shown on the form |
| **Description** | Optional; shown on the form |
| **Location** | Shown in emails and confirmation |
| **Price** | Per seat, GBP |
| **Capacity** | Per session |
| **Active** | Disable booking without deleting the class |

## Per-class scheduled emails (Pro)

On each class post, the **Scheduled emails** meta box lets you use **global rules** or **custom rules** for that class only. See [Scheduled emails](/docs/scheduled-emails).

## Next steps

- [Appointments (Pro)](/docs/appointments)
- [Form extras & ACF](/docs/form-extras)
- [Embed the booking form](/docs/shortcode-elementor)
