---
title: Emails
description: Customer and admin confirmation emails, templates, editors, merge tags, and test sends.
order: 11
category: Settings
---

## What this tab does

When a booking is marked **paid**, the plugin sends instant **customer** and **admin** emails via WordPress `wp_mail()`. Configure subjects and bodies here. For reminder and post-class messages, see [Scheduled emails](/docs/settings-scheduled-emails).

![Emails settings — admin sub-tab](/docs/images/settings-emails-admin.png)

## WordPress email delivery

WordPress sends mail through PHP `mail()` by default, which many hosts block or deliver to spam. For reliable delivery:

1. Install an SMTP plugin (e.g. **WP Mail SMTP**, **Easy WP SMTP**).
2. Connect your provider (Google Workspace, SendGrid, Amazon SES, etc.).
3. Send a test from **Settings → Emails** after SMTP is configured.

See [Troubleshooting](/docs/troubleshooting) for common delivery issues.

## Sub-tabs

| Sub-tab | Recipient | When it sends |
|---------|-----------|---------------|
| **Admin** | Studio inbox | On successful payment |
| **Customer** | Booker email | On successful payment |

Scheduled reminder and post-class tabs are documented in [Scheduled emails](/docs/settings-scheduled-emails).

## Field reference — Admin

| Field | What it does |
|-------|----------------|
| **Notification email address** | Where admin alerts are sent |
| **Subject** | Email subject; merge tags allowed |
| **Body editor mode** | **Visual** (plain text / WYSIWYG) or **HTML** (raw fragment) |
| **Body** | Message content — fragment only, not a full HTML document |
| **Send test email** | Sends sample with merge tags filled in |

## Field reference — Customer

| Field | What it does |
|-------|----------------|
| **Subject** | Confirmation subject; merge tags allowed |
| **Body editor mode** | Visual or HTML |
| **Body** | Confirmation body fragment |
| **Send test email** | Sends sample with merge tags filled in |

![Emails settings — customer sub-tab](/docs/images/settings-email-customer.png)

## Body editors

| Mode | Behaviour |
|------|-----------|
| **Visual (default)** | Plain text or WYSIWYG content. Unless the body already looks like HTML, it is wrapped with `wpautop()` into `<p>` tags before sending. |
| **HTML** | Raw HTML fragment used as-is (no `wpautop`). Use for Beefree, Unlayer, or hand-coded markup. Content is placed inside the email wrapper `<body>`. |

Default template files (`email-customer.php`, `email-admin.php`) are plain text and get `wpautop()` when used as defaults.

## How emails are built

Every booking email passes through `Emails::to_html()` before `wp_mail()`:

1. Body content is prepared (visual vs HTML mode as above).
2. The plugin reads `assets/cbfs-booking-email.css` and injects it in a `<style>` tag in `<head>`.
3. Body is wrapped in `<div class="cbfs-mail">…</div>` inside a full HTML document.

There is **no** CSS inlining step (no Emogrifier). Layout relies on the `<style>` block and `.cbfs-mail`. Many clients (Gmail, Outlook) strip `<head>` styles — only **inline styles** in your HTML (or the test-mode banner) are reliable across clients.

For cross-client styling, use inline styles in HTML mode or accept simpler typography from the wrapper CSS.

## Merge tags

Subjects and bodies support tags like `{customer_name}` and `{class_date}`. Full reference: [Merge tags](/docs/merge-tags). The admin UI includes an **Available merge tags** accordion on each email sub-tab.

## Extras (bottom of Emails tab)

| Field | What it does |
|-------|----------------|
| **Local test mode** | Redirects all plugin email to the test recipient; banner shows intended recipient |
| **Test recipient** | Inbox used when local test mode is on (falls back to admin notification email) |
| **Scheduled email tools** | Backfill queue and run test dispatch — see [Scheduled emails](/docs/settings-scheduled-emails) |

![Emails settings — extras and test tools](/docs/images/settings-email-extra.png)

## See also

- [Merge tags](/docs/merge-tags)
- [Scheduled emails](/docs/settings-scheduled-emails)
- [Class email overrides](/docs/classes-emails)
- [Troubleshooting — email](/docs/troubleshooting)
