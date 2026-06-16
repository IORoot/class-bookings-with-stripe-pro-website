---
title: Appointments
description: Pro calendar booking — slot rules, recurring and one-off availability, capacity per slot, and customer flow.
order: 4
category: Pro features
pro: true
---

## Overview

**Appointments** is a Pro booking type for 1:1 sessions, consultations, or any class sold by **time slot** rather than a simple date list. Customers pick a day on a **calendar**, then choose an available **time**.

Use weekly/one-off types when everyone shares the same start time. Use appointments when each slot has its own start time and optional per-slot settings.

## Enable appointments on a class

1. Edit or create a **Class** post.
2. Set **Booking type** to **Appointments**.
3. Configure shared fields: title, description, default price, capacity, location.
4. Set **Calendar months ahead** — how many months customers can browse (default varies by setup).
5. Define **Slot rules** (see below).
6. Publish and embed `[clasbpro_booking class_id="…"]`.

## Slot rules

Slot rules define *when* appointments are offered. They appear in the **Slot rules** panel on the class editor.

Click **Add slot** for each rule. Each rule can be:

### Recurring weekly slots

- Choose **day(s) of week**
- **Start time** and **duration** (minutes)
- Optional **label** (e.g. "Morning session")
- Optional **location** override
- Optional **price** override (GBP)

Example: Every Monday and Wednesday, 09:00–10:00 and 14:00–15:00 → create rules for each start time/day combination.

### One-off slots

- Choose a **specific date**
- Start time, duration, label, location, price as needed

Use for extra availability outside the regular pattern.

## Capacity per slot

**Capacity** on the class is the maximum bookings per slot. For 1:1 appointments, set capacity to **1**. For small group sessions (e.g. 3 people per slot), set accordingly.

Availability subtracts paid bookings and active soft holds for that exact slot datetime.

## Customer experience

1. Customer opens the booking form.
2. **Calendar** highlights days that have at least one available slot.
3. Customer selects a day.
4. **Available times** list shows open slots; booked slots are marked unavailable.
5. Customer selects a slot, enters details, pays via Stripe Checkout.

Labels like "Available", "Selected", and "Booked" can be customised via the `clasbpro_booking_labels` filter — see [Developer](/docs/developer).

## Admin tips

- **No rules notice** — if booking type is Appointments but no valid rules exist, admins see a warning. Customers may see no dates.
- After changing rules, existing bookings are unaffected; only future availability changes.
- Test with a class far enough ahead that calendar navigation shows dates.

## Appointments vs weekly classes

| Feature | Weekly / one-off | Appointments |
|---------|------------------|--------------|
| UI | Date dropdown | Calendar + time list |
| Schedule | Class-level schedule | Slot rules engine |
| Best for | Group classes same start time | Variable times, 1:1 |

## Emails & reports

Appointment bookings use the same email templates and merge tags as other types. `{class_time}` and `{slot_label}` reflect the chosen slot. Reports list appointment bookings alongside other classes.

Scheduled reminder emails (Pro) use the slot's start datetime for offset calculations — see [Scheduled emails](/docs/scheduled-emails).

## Customisation

- Override booking form templates via **Themes** or child theme — see [Booking themes](/docs/themes) and [Developer](/docs/developer).
- Appointment-specific CSS: `cbfs-appointment-calendar.css` on the front end; slot rules UI uses admin assets in the class editor.

## Related

- [Class types](/docs/class-types)
- [Stripe setup](/docs/stripe-setup)
- [Merge tags](/docs/merge-tags) — `{slot_label}`, `{class_time}`, `{duration}`
