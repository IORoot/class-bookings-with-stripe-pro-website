---
title: Reports
description: Yearly booking charts, upcoming attendance, guest lists by class, and exporting booking data.
order: 9
category: Administration
video: reports
---

## Overview

**Class Bookings with Stripe → Reports** gives a dashboard of booking activity without exporting to spreadsheets first.

## Yearly overview

Charts show booking volume and revenue trends across the current year (based on paid bookings). Use this for season planning and marketing retrospectives.

![Reports Page](/docs/screenshots/screenshot-13.png)

## Upcoming attendance

See who is booked into upcoming class dates:

- Filter by class
- View customer name, email, seats, and date
- Useful for instructor prep and room setup

## Guest lists

Generate **guest lists** per class session — print or share with teachers. Includes booked customers for a selected date.

## Bookings list

**Class Bookings with Stripe → Bookings** lists all booking posts with status:

| Status | Meaning |
|--------|---------|
| **Pending** | Soft hold; checkout in progress |
| **Paid** | Payment confirmed via Stripe |
| **Expired** | Hold or session expired without payment |

Open a booking to see Stripe session ID, customer details, class date, seats, and form extras.

![Bookings Listing Page](/docs/screenshots/screenshot-11.png)

![Booking details](/docs/screenshots/screenshot-12.png)

## Stripe reconciliation

Each paid booking stores Stripe Checkout Session metadata. Cross-reference with Stripe Dashboard → Payments using customer email or date.

## Related video

[Bookings list & reports](https://youtu.be/D2UpGlkhJWs) (featured above)

## Related

- [Emails](/docs/emails)
- [Scheduled emails (Pro)](/docs/scheduled-emails)
- [Troubleshooting](/docs/troubleshooting)
