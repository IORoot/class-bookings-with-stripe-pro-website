---
title: Weekly classes
description: Day, time, duration, price, capacity, date selection, and cancelled dates.
order: 21
category: Classes
---

## What weekly classes are

A **weekly class** repeats on the same weekday each week (e.g. every Tuesday 18:00). Customers pick an upcoming date, then complete Stripe Checkout.

## Field reference

| Field | What it does |
|-------|----------------|
| **Day of week** | Which weekday the class runs |
| **Start time** | Session start (24h or site time format) |
| **Duration** | Length in minutes |
| **Price** | Per-seat price in your Stripe currency |
| **Capacity** | Maximum seats per session date |
| **Show seats remaining** | Display remaining places on the form when enabled |
| **Date selection** | How customers pick a date — see below |
| **Upcoming dates count** | How many future dates appear in dropdown mode |
| **Calendar months ahead** | How far ahead the calendar date picker allows (calendar mode) |
| **Location** | Shown on form, emails, and reports |
| **Description** | Class details; available as `{description}` merge tag |
| **Cancelled dates** | Dates when this class does not run |

## Date selection modes

| Mode | Customer experience |
|------|---------------------|
| **Dropdown** | List of upcoming bookable dates |
| **Calendar** | Month grid; highlighted days are bookable |

Calendar mode loads availability via REST (`/class-calendar`) and respects capacity and cancelled dates per day.

## Capacity & holds

When a customer starts checkout, a **pending** booking holds seats for 30 minutes. Expired holds free capacity automatically (cron every 5 minutes).

## Example shortcode

```
[clasbpro_booking class_id="42" preset_date="2026-07-08"]
```

`preset_date` pre-selects a date (`Y-m-d`) when linking from the schedule calendar.

## See also

- [Classes overview](/docs/classes-overview)
- [One-off events](/docs/classes-one-off)
- [Global calendar](/docs/classes-global-calendar)
