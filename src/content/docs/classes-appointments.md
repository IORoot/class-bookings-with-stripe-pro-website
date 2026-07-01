---
title: Appointments
description: Slot rules, calendar UI, lead time, and per-slot pricing.
order: 23
category: Classes
pro: true
---

## What appointments are

**Appointments** let customers pick a **date** and **time slot** from a calendar — ideal for 1:1 sessions, consultations, or limited-capacity timed slots.

> **Pro only** — not available in the free WordPress.org plugin.

![Appointment booking form with calendar](/docs/images/classes-appointments-form.png)

## Class-level fields

| Field | What it does |
|-------|----------------|
| **Price** | Default price per booking (slots can override) |
| **Capacity** | Default seats per slot (often `1` for 1:1) |
| **Calendar months ahead** | How far customers can browse dates |
| **Minimum lead time (hours)** | Earliest bookable slot must be at least this many hours from now |
| **Description** | Shown in emails and merge tags |
| **Cancelled dates** | Whole dates unavailable |

## Slot rules

Slots are defined in the **Appointment slot rules** repeater. Each rule is either **Recurring** or **One-off date**.

### Recurring slot

| Field | What it does |
|-------|----------------|
| **Day** | Weekday the slot repeats |
| **From / Until** | Date range the recurrence applies |
| **Start time** | Slot start |
| **Duration** | Minutes |
| **Location** | Optional override |
| **Label** | Display name (e.g. “Morning session”) — `{slot_label}` in emails |
| **Price override** | Optional per-slot price |
| **Skip dates** | Exceptions within the recurrence |

### One-off date slot

| Field | What it does |
|-------|----------------|
| **Date** | Specific calendar day |
| **Start time** | Slot start |
| **Duration** | Minutes |
| **Location** | Optional |
| **Label** | Display label |
| **Price override** | Optional |
| **Skip dates** | Rarely needed on one-off rows |

## Front-end behaviour

1. Customer selects a highlighted day on the month calendar.
2. Available times load for that date (`/appointment-slots` REST endpoint).
3. Taken slots show as booked; selecting a slot sets hidden `slot_rule_id` and date fields.
4. Checkout uses slot snapshot for time, location, duration, and price.

## Scheduled emails

Reminder and post-class offsets use the **slot start datetime** for appointments.

## Custom labels

Calendar strings (“Available”, “Booked”, “Choose a date & time”) can be changed via `clasbpro_booking_labels` — [Hooks](/docs/customising-hooks).

## See also

- [Classes overview](/docs/classes-overview)
- [Scheduled emails](/docs/settings-scheduled-emails)
- [Themes](/docs/themes)
- [Merge tags](/docs/merge-tags) — `{slot_label}`, `{class_time}`, `{duration}`
