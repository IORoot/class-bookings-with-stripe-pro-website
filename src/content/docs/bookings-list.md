---
title: Bookings list
description: Sorting, filters, columns, and status meanings in the bookings table.
order: 31
category: Bookings
---

## What the list shows

**Stripe Class Pro → Bookings** lists every booking with sortable columns for quick studio operations.

![Bookings list table](/docs/images/bookings-list-table.png)

## Columns

| Column | Description |
|--------|-------------|
| **Image** | Thumbnail from linked class |
| **Booking** | Post title (customer · class · date after payment) |
| **Class** | Link to class edit screen |
| **Class date** | Session date |
| **Customer** | Name and mailto email link |
| **Seats** | Places booked |
| **Amount** | Total paid |
| **Status** | Pending, Paid, Expired, or Refunded |
| **Stripe ID** | Checkout Session ID |
| **Created** | When the booking record was created |

## Sorting

Click column headers to sort. Supported sort keys include **class date**, **status**, **booking title**, and **created** date.

## Filter by customer

From **Reports → Customers**, **View bookings** links to this list filtered by customer email (`?clasbpro_customer_email=…`).

## Status quick reference

| Status | Typical cause |
|--------|----------------|
| **Pending** | Customer on Stripe Checkout; hold active |
| **Paid** | Webhook `checkout.session.completed` processed |
| **Expired** | Hold expired, session expired, or payment failed |
| **Refunded** | Manual status or refund workflow |

## See also

- [Bookings overview](/docs/bookings-overview)
- [Reports — customers](/docs/reports-customers)
- [Troubleshooting](/docs/troubleshooting)
