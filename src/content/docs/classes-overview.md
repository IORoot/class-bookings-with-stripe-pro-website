---
title: Classes overview
description: Schedule types, activation, images, and how class posts are organised.
order: 20
category: Classes
---

## What the Classes screen is

Each **Class** is a WordPress post (**Stripe Class Pro → Classes**) that defines what customers can book: schedule, price, capacity, location, and emails. Bookings reference a class by post ID.

![Add new class screen](/docs/images/classes-edit-overview.png)

## Schedule types

| Type | Best for | Detail guide |
|------|----------|--------------|
| **Weekly class** | Recurring yoga, fitness, workshops on a fixed weekday | [Weekly classes](/docs/classes-weekly) |
| **One-off event** | Single or multi-day events, retreats | [One-off events](/docs/classes-one-off) |
| **Appointments** | 1:1 or small-group slots with a calendar UI | [Appointments](/docs/classes-appointments) |
| **External link** | Class marketed on site but booked elsewhere | Enable external URL on any type |

Choose **Schedule type** at the top of the class editor. Fields shown depend on the type selected.

## Activate / deactivate

| Field | What it does |
|-------|----------------|
| **Class active** | When off, the booking form shows unavailable and the class is hidden from the schedule calendar |

Deactivating does not delete existing bookings.

## Class image

Upload an image in the **Class image** sidebar box. Used on:

- Class list table thumbnail column
- Global schedule calendar cards (when **Show image on card** is enabled)
- Booking list thumbnails (inherits class image)

## Sidebar & meta areas

| Area | Purpose |
|------|---------|
| **Class image** | Featured image for listings and calendar |
| **Global calendar** | Card colour, icon, show image — [Global calendar](/docs/classes-global-calendar) |
| **Class emails** | Per-class email overrides — [Class emails](/docs/classes-emails) |
| **Publish box** | Class ID and copy-ready `[clasbpro_booking]` shortcode |

## Cancelled dates

Recurring classes, one-off events, and appointments support **Cancelled dates** — specific dates when the class does not run (holidays, instructor away). Bookings cannot be made on cancelled dates.

## See also

- [Class listings](/docs/classes-listings)
- [Shortcodes](/docs/shortcodes)
- [Getting started](/docs/getting-started)
