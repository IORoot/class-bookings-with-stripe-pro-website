---
title: Getting started
description: Install Class Bookings with Stripe Pro, requirements, and your first paid booking.
order: 1
category: Getting started
---

## What you get with Pro

Class Bookings with Stripe Pro is a **standalone** WordPress plugin. You do not need the free WordPress.org version. Pro includes Stripe Checkout booking, appointments, scheduled emails, booking form themes, reports, and more.

## Requirements

| Requirement | Minimum |
|-------------|---------|
| WordPress | 6.0+ |
| PHP | 7.4+ |
| Stripe account | Publishable + secret keys, webhook signing secret |
| ACF | Free or Pro (bundled ACF Free loads if ACF is not already active) |
| Elementor | Optional — for Elementor widgets only |

**Recommended:** Reliable WordPress cron (real server cron calling `wp-cron.php`) for scheduled emails and booking hold expiry.

## Install the plugin

1. Purchase Pro and download the ZIP from your email link ([resend download](/download) if needed).
2. In WordPress go to **Plugins → Add New → Upload Plugin**.
3. Choose the ZIP and click **Install Now**, then **Activate**.
4. You should see **Stripe Class Pro** in the admin menu (Classes, Bookings, Reports, Settings, Themes).

If you previously had the free plugin active, **deactivate one version** — running both causes duplicate shortcodes and split booking data.

## First-time setup checklist

| Step | Where | Guide |
|------|-------|-------|
| 1. Stripe keys & mode | **Settings → Stripe** | [Stripe settings](/docs/settings-stripe) |
| 2. Webhook | Stripe Dashboard → endpoint URL from Settings | [Stripe settings](/docs/settings-stripe) |
| 3. Email templates | **Settings → Emails** | [Email settings](/docs/settings-emails) |
| 4. SMTP (recommended) | Host or plugin like WP Mail SMTP | [Troubleshooting](/docs/troubleshooting) |
| 5. Create a class | **Classes → Add New** | [Classes overview](/docs/classes-overview) |
| 6. Embed the form | Page shortcode or Elementor | [Shortcodes](/docs/shortcodes) |
| 7. Result pages | Created on activation; assign under Settings | [Result pages](/docs/settings-result-pages) |

![Setup guide in Settings → Help](/docs/images/settings-help-setup.png)

## Create your first class (weekly example)

1. Go to **Stripe Class Pro → Classes → Add New**.
2. Set **Schedule type** to **Weekly class**.
3. Configure day of week, start time, duration, price, and capacity.
4. Ensure **Class active** is enabled and publish.
5. Note the **Class ID** in the publish box (also shown in the class list).
6. Add to a page:

```
[clasbpro_booking class_id="123"]
```

Replace `123` with your class post ID.

## Test a booking

1. Set **Settings → Stripe → Mode** to **Test**.
2. Use [Stripe test card numbers](https://docs.stripe.com/testing#cards) (e.g. `4242 4242 4242 4242`).
3. Complete checkout on your booking page.

![Stripe Checkout payment screen](/docs/images/stripe-payment.png)

4. Confirm the booking appears under **Bookings** with status **Paid**.
5. Check customer and admin emails (enable **Local test mode** under Settings → Emails if you want all mail redirected to one inbox).

## Pro-only features

These are not in the free WordPress.org plugin:

- [Appointments](/docs/classes-appointments) — calendar UI and slot rules
- [Scheduled emails](/docs/settings-scheduled-emails) — reminders and post-class messages
- [Booking themes](/docs/themes) — gallery, live preview, install to theme

## See also

- [Stripe settings](/docs/settings-stripe)
- [Shortcodes](/docs/shortcodes)
- [Troubleshooting](/docs/troubleshooting)
