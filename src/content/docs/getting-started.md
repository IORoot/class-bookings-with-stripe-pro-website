---
title: Getting started
description: Install Class Bookings with Stripe Pro, requirements, activation, and your first paid booking.
order: 1
category: Getting started
---

## What you get with Pro

Class Bookings with Stripe Pro is a **standalone** WordPress plugin. You do not need the free WordPress.org version. Pro includes everything required to sell class places with Stripe Checkout, plus:

- **Appointment booking** with calendar UI and slot rules
- **Scheduled email rules** (reminders and post-class messages)
- **Booking form themes** with live preview and one-click install

## Requirements

| Requirement | Minimum |
|-------------|---------|
| WordPress | 6.0+ |
| PHP | 7.4+ |
| Stripe account | Publishable + secret keys, webhook signing secret |
| ACF | Free or Pro (bundled ACF Free loads if ACF is not active) |
| Elementor | Optional — for the Elementor widget only |

**Recommended:** Reliable WordPress cron (real server cron triggering `wp-cron.php`) for scheduled emails and hold expiry.

## Install the plugin

1. Purchase Pro and download the ZIP from your email link ([resend download](/download) if needed).
2. In WordPress go to **Plugins → Add New → Upload Plugin**.
3. Choose the ZIP and click **Install Now**, then **Activate**.
4. You should see **Class Bookings with Stripe** in the admin menu.

If you previously had the free plugin active, **deactivate one version** — running both causes duplicate shortcodes and split booking data.

## First-time setup checklist

1. **Stripe tab** — add publishable and secret keys; choose test or live mode. See [Stripe setup](/docs/stripe-setup).

2. **Webhook** — register the REST webhook URL in Stripe Dashboard. See [Stripe setup](/docs/stripe-setup).
3. **Emails tab** — review customer and admin templates. See [Emails](/docs/emails).
4. **Create a class** — **Class Bookings with Stripe → Classes → Add New**. See [Class types](/docs/class-types).
5. **Embed the form** — shortcode or Elementor widget on a public page. See [Shortcode & Elementor](/docs/shortcode-elementor).

## Create your first class (weekly example)

1. Add a new **Class** post.
2. Set **Booking type** to **Weekly class**.
3. Configure day, start time, duration, price (GBP), and capacity.
4. Publish and note the post **ID** (visible in the URL or list table).
5. Place on a page:

```
[clasbpro_booking class_id="123"]
```

Replace `123` with your class post ID.

## Test a booking

1. Use **Stripe test keys** and [test card numbers](https://docs.stripe.com/testing).
2. Open the page with the booking form in a private/incognito window.
3. Pick a date, enter name and email, submit **Book & pay with Stripe**.
4. Complete Checkout on Stripe's hosted page.
5. Confirm redirect to your **Booking Confirmed** result page and check **Class Bookings with Stripe → Bookings** for a paid entry.

## Settings overview

Open **Class Bookings with Stripe → Settings**. Tabs include:

| Tab | Purpose |
|-----|---------|
| **Stripe** | API keys, mode, webhook secret |
| **Emails** | Instant confirmation templates + global scheduled rules (Pro) |
| **Form extras** | Waiver, Mailchimp, global defaults |
| **Pages** | Result page IDs (created on activation) |
| **Developer** | REST routes, hooks, template overrides |
| **Help** | In-plugin quick reference |

## Related guides

- [Stripe webhook setup](/docs/stripe-setup)
- [Pro appointments](/docs/appointments)
- [Pro scheduled emails](/docs/scheduled-emails)
- [Pro booking themes](/docs/themes)
