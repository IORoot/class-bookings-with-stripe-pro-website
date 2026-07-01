---
title: Bookings overview
description: Booking reference, status, metadata, Stripe fields, and email delivery status.
order: 30
category: Bookings
---

## What a booking is

Each successful (or attempted) checkout creates a **Booking** post under **Stripe Class Pro → Bookings**. Bookings are created automatically — you cannot add them manually.

![Single booking edit screen](/docs/images/bookings-edit.png)

## Reference

The booking **title** updates after payment to a readable summary: customer name, class title, and class date. The numeric post ID is the internal **booking reference** (`{booking_id}` in emails, shown as `#123`).

## Booking status

| Status | Meaning |
|--------|---------|
| **Pending** | Checkout started; seats on soft hold (~30 minutes) |
| **Paid** | Stripe payment confirmed; confirmation emails sent |
| **Expired** | Hold timed out or checkout abandoned without payment |
| **Refunded** | Marked refunded (manual or integration) |

## Metadata summary

The booking edit screen shows a read-only summary card:

| Field | Description |
|-------|-------------|
| **Class** | Linked class post |
| **When** | Class date and time (slot time for appointments) |
| **Where** | Location from class or slot |
| **Seats** | Number of places booked |
| **Total** | Amount charged (Stripe currency) |
| **Customer** | Name and email |
| **Waiver** | Accepted or not (if waivers enabled) |
| **Mailing list** | Mailchimp opt-in status |
| **Additional fields** | Answers from ACF form extras |

## Stripe status

| Field | Description |
|-------|-------------|
| **Session ID** | Stripe Checkout Session (`cs_…`) |
| **Payment Intent** | Stripe PaymentIntent ID when available |

## Email sent status

The **Emails** panel lists four message types with status pills:

| Type | Description |
|------|-------------|
| Admin email | Instant notification on payment |
| Customer email | Instant confirmation |
| Reminder | Scheduled pre-class email |
| Post-class | Scheduled follow-up |

### Status pill meanings

| Pill | Meaning |
|------|---------|
| **Sent** | Delivered successfully |
| **Error** | `wp_mail` failed — detail shows error message |
| **Not sent** | Not yet dispatched |
| **Past date** | Class date passed before send was due |
| **Disabled** | Rule or override turned off |
| **Waiting payment** | Booking not paid yet |
| **Cancelled** | Booking not active for send |
| **Not recorded** | No log entry (legacy or pre-feature booking) |

## See also

- [Bookings list](/docs/bookings-list)
- [Email settings](/docs/settings-emails)
- [Stripe settings](/docs/settings-stripe)
