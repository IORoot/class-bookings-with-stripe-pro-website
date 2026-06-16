---
title: Merge tags
description: Placeholders for email templates — customer, class, booking, extras, and feedback URLs.
order: 12
category: Reference
---

## Usage

Place tags in **email subjects and bodies** (instant and scheduled). The plugin replaces them when sending.

Tags are case-sensitive and include curly braces: `{customer_name}`.

## Customer & booking

| Tag | Description |
|-----|-------------|
| `{customer_name}` | Name from booking form |
| `{customer_email}` | Email address |
| `{booking_id}` | Internal ID (e.g. #123) |
| `{seats}` | Number of places booked |
| `{amount_total}` | Total charged (formatted GBP) |

## Class & session

| Tag | Description |
|-----|-------------|
| `{class_name}` | Class post title |
| `{class_date}` | Formatted session date |
| `{class_time}` | Start time |
| `{location}` | Location string |
| `{duration}` | Session duration |
| `{price}` | Per-seat or display price |
| `{slot_label}` | Appointment slot label (if set) |
| `{description}` | Class description (plain text) |

## Form extras

| Tag | Description |
|-----|-------------|
| `{extra_fields}` | HTML block summarising waiver, Mailchimp, ACF answers |
| `{acf:field_xxxxx}` | Single ACF field (replace with your field key) |
| `{field_xxxxx}` | Shorthand for same field key |

Create field keys in ACF → Field Groups. See [Form extras](/docs/form-extras).

## Post-class & scheduled (Pro)

| Tag | Description |
|-----|-------------|
| `{feedback_url}` | Link for post-class surveys (global default or per-rule override) |

Used in [Scheduled emails](/docs/scheduled-emails) post-class rules.

## Example customer body

```html
<p>Hi {customer_name},</p>
<p>You're booked for <strong>{class_name}</strong> on {class_date} at {class_time}.</p>
<p>Location: {location}</p>
<p>Seats: {seats} · Total: {amount_total}</p>
{extra_fields}
```

## Tips

- Preview by sending a real test booking in Stripe test mode.
- Missing tags render empty — check spelling.
- HTML emails: use `<p>`, `<ul>`, simple styles only.

## Related

- [Emails](/docs/emails)
- [Scheduled emails (Pro)](/docs/scheduled-emails)
