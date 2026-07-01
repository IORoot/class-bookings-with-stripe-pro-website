---
title: One-off events
description: Start and end dates, time, capacity, and multi-day events.
order: 22
category: Classes
---

## What one-off events are

**One-off events** cover workshops, retreats, or single sessions that are not tied to a weekly weekday. Customers book a date within the event’s start/end range.

## Field reference

| Field | What it does |
|-------|----------------|
| **Start date** | First day the event can be booked |
| **End date** | Last day (same as start for a single day) |
| **Start time** | Session start time |
| **Duration** | Length in minutes |
| **Price** | Per-seat price |
| **Capacity** | Maximum attendees for the event date |
| **Show seats remaining** | Show remaining places on the form |
| **Location** | Venue or online link text |
| **Description** | Event details for emails and merge tags |
| **Cancelled dates** | Specific dates removed from the bookable range |

## Booking behaviour

- The form typically offers the event date (or dates in range) rather than a long weekly list.
- Capacity and soft holds work the same as weekly classes.
- External booking link can still be enabled to send customers off-site instead of Stripe.

## Schedule calendar

One-off events appear on `[clasbpro_schedule]` on their configured dates. Style cards via [Global calendar settings](/docs/classes-global-calendar).

## See also

- [Weekly classes](/docs/classes-weekly)
- [Classes overview](/docs/classes-overview)
- [Shortcodes](/docs/shortcodes)
