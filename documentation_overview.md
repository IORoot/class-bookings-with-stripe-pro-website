# Class Booking for stripe - Docs


### Getting Started

---
## Settings
### Stripe
- Mode
- Currency
- Stripe item title template
- Test api keys
- Live api keys
- Webhook signing secret + endpoint

### Emails
- Setting up email - How Wordpress Email work and using WP Easy SMTP
- Admin email
	- Notification email address - where to send the admin email
	- Subject - Can use merge tags in the subject 
	- Visual Editor / HTML Editor & Merge Tags - HTML Code allows for using services like beefree.io / Unlayer / etc... or coding your own. HTML is placed into the `<body>` tag of the email. Explain how emails are built
		- Every booking email goes through `Emails::to_html()` before `wp_mail()`. That wraps the body in a full HTML document:
		- The plugin reads `assets/cbfs-booking-email.css` and injects it into a `<style>` tag. That’s the only plugin-owned CSS. There is no step that inlines these rules onto elements (no Emogrifier or similar).
		- Inline styles on generated markup, The test-mode banner uses explicit `style=""` attributes
		- In HTML editor mode, the saved body is used as-is (no `wpautop`). Any inline styles in that HTML are sent through unchanged.
		- Body content by mode
		- Default templates (`email-customer.php`, `email-admin.php`) are plain text; they get `wpautop()`’d into `<p>` tags. Scheduled email defaults (reminder/post-class) are already HTML fragments.
		- Visual (default) = Plain text or WYSIWYG = wpautop() unless it already looks like HTML. HTML = Raw HTML fragment = Used as-is
		- No — not everything is inline. Layout and typography mostly rely on a `<style>` block and the `.cbfs-mail` class. Many clients (especially Gmail and Outlook) strip or ignore `<head>` styles, so the wrapper styling may not render consistently. Only inline styles (test banner, or what you put in HTML mode) are reliably applied across clients.
		- If you want more reliable cross-client styling, you’d need either inline styles in the template HTML or a CSS-inlining step at send time.
	- Explain all merge tags
	- Sending Test Emails

- Customer Emails - Email sent to customer one they have successfully made a purchase
	- Subject
	- Body (see admin body for details)
	- Send test email
- Scheduled Reminders - Optionally Send an email to a booked-in customer before the class.
	- Enabled / Disabled
	- Time Before + Unit
	- Send admin a copy
	- Subject
	- Body + Merge tags
	- Send Test Email
	- Explain based on Wordpress CRON - not exact time. Setup cron using server or pseudo-cron 
- Scheduled Post-Class Email - Optionally send email to customer after the class.
	- Enabled / Disabled
	- Time After + Unit
	- Send to admin
	- Subject
	- Body + Merge tags
	- Send test email
	- Explain based on Wordpress CRON - not exact time. Setup cron using server or pseudo-cron 
- Extras
	- Local test mode
	- Backfill and test

### Form Extras
- Explain the basics of ACF fields and using them in the forms
- Require waivers
	- Waiver Label
	- Waiver URL
- Mailchimp opt-in
	- Opt-in label
	- Mailchimp API key
	- Mailchimp Audience ID
	- Mailchimp double opt-in
- Allow coupon codes - allows customers to use any purchased coupon codes for the class

### Result Pages
- Booking Confirmed Page - used for stripe to redirect to once a successful result.
- Booking Cancelled Page - When the user backs out of purchase and returns back to site
- Booking Error Page - Problem with the payment
- Schedule Calendar Classes - List of classes to add to the global calendar (can be overridden in the shortcode)
- Schedule weeks ahead - number of weeks the global calendar will show the classes.

### Help
- Setup - How to get started with stripe, email, smtp, classes and publishing. Includes images.
- Shortcodes - Description and breakdown of all shortcodes available and how to use them.
- Developer - Help on how the plugin works, how to test, overrides, hooks, ACF and API


---

## Classes
- Schedule Types
- activate / deactivate
- Image - used on cards on global calendar and the bookings and class listings page.
- Weekly Classes
	- Day of week
	- start time
	- duration
	- price
	- capacity
	- show seats
	- date selection
		- Dropdown - dates in dropdown
		- Calendar - calendar months ahead
	- Location
	- Description
	- Cancelled dates
- One-off Events
	- Start Date
	- End Date
	- Start Time
	- Duration
	- Price
	- Capacity
	- Show seats remaining
	- Location
	- Description
	- Cancelled dates
- Appointments
	- Price
	- Capacity
	- Calendar Months Ahead
	- Minimum Lean time (hours)
	- Slots
		- Type - Recurring
			- Day
			- From
			- Until
			- Start Time
			- Duration
			- Location
			- Label
			- Price Override
			- Skip Dates
		- Type - One Off Date
			- Date
			- Start Time
			- Duration
			- Location
			- Label
			- Price Override
			- Skip Dates
	- Description
	- Cancelled Dates
- Class Emails
	- Admin Email Override
		- Enabled / Disabled
		- Email Address
		- Subject
		- Body (Visual / HTML) + Merge Tags
		- Send Test
		- Rest to global defaults
	- Customer Email Override
		- Enabled / Disabled
		- Subject
		- Body Editor + Merge Tags
		- Send Test
		- Rest to global defaults
	- Scheduled Reminders
		- Enable / Disable for class
		- Send time / unit + admin copy
		- Subject
		- Body Editor + Merge Tags
		- Send Test
		- Reset to global defaults
	- Scheduled post-class email
		- Enable / Disable for class
		- Send time / unit + admin copy
		- Subject
		- Body Editor + Merge Tags
		- Send Test
		- Reset to global defaults
- Global Calendar Settings
	- Card Colour Picker
	- Card Icon (SVG) - positioned top left corner of card
	- Show image on card - uses featured image.



## Class Listings
- Images from class
- Class ID for shortcode
- All Columns and description of each

---

## Bookings
- Reference
- Status of booking
- Metadata
	- class
	- when
	- where
	- seats
	- total
	- customer
	- email
	- waiver
	- mailing list
- Stripe Status
	- Session ID
	- Payment Intent
- additional fields (ACF) - this is when the results of any additional ACF fields are recorded.
- Email sent status for admin, customer, reminder, post-class. Explain possible status values.

### Bookings Listings
- sort by class date / status / booking / created
- status meanings



---

## Reports

### Summary
- Bookings by class graph - Shows each class and the number of participants for each - year selector
- Booked people for upcoming classes - overview of upcoming classes to show how many are booked in. Useful as a quick glance.
- Next three sessions per class - shows who is booked into the next three classes for each class. Good for list of people coming to class.

### Classes
- Class selector top right
- Summary line shows details
- Student per month - shows how many students on each date
- Revenue - money made per class
- Occupancy per session - how filled the class was
- Cumulative revenue - money made overall
- Bookings by day of week - discover popular classes



### Customers
- Summary line
- Search
- Download CSV
- Customers
	- Sort by header
	- Details per line
	- click to email the email
	- view bookings - filter 'bookings' listing page for just that user.


---

## Themes
- Theme source
	- Plugin Default - standard fallback
	- Gallery Theme - enable one of the supplied themes instead
	- Theme files - use customer supplied files located in theme override location
- search / sort / filter themes
- theme details, tags, provides
- Enable - use gallery theme
- Install to theme - copy the gallery theme code files into current theme so you can customise.
- Live preview - modal with preview of what forms will look like
- Download ZIP - get all the files for the theme in a zip file
- View Files - Shows a simple code viewer for all files in the theme. 

---

### Shortcodes
Explain every shortcode and how to use them. How to add to a page using: Gutenberg, Page editor, PHP, Elementor, etc...

`[clasbpro_booking]`
Renders the booking form for a single class. Use on any page or post.

`[clasbpro_booking class_id="123"]`
Attribute	Description
class_id	Numeric Class post ID (recommended).
class_slug	Class post slug instead of ID.
clasbpro_class_stripe_id	Alias for class_id (Elementor / legacy meta field name).
heading	1 (default) shows the class title; 0 hides it.
preset_date	Pre-select a date (Y-m-d) on recurring / one-off classes.
preset_slot_rule_id	Pre-select an appointment slot rule ID.
Default booking form shortcode preview
Recurring class with date dropdown preview
One-off event booking form preview
Appointment-style class booking form preview
`[clasbpro_schedule]`
Renders the multi-class schedule calendar. Classes are chosen under Settings → Result pages unless overridden below.

`[clasbpro_schedule]`
`[clasbpro_schedule class_ids="12,34,56"]`
Attribute	Description
class_ids	Optional comma-separated Class post IDs. Overrides the schedule list in settings.
Default schedule calendar shortcode preview

`[clasbpro_booking_status]` — Payment succeeded
Result page after Stripe Checkout. Assign pages under Settings → Result pages.

`[clasbpro_booking_status type="success"]`
On success, the page reads booking and session details from the URL query string after redirect from Stripe.

`[clasbpro_booking_status]` — Customer cancelled checkout
Result page after Stripe Checkout. Assign pages under Settings → Result pages.

`[clasbpro_booking_status type="cancelled"]`
Booking status shortcode — cancelled preview

`[clasbpro_booking_status]` — Payment failed or could not be verified
Result page after Stripe Checkout. Assign pages under Settings → Result pages.

`[clasbpro_booking_status type="error"]`


### Elementor Widgets
- Class Booking with Stripe (Pro) widget
	- Class Source - Manual
		- Stripe Class Dropdown
	- Class Source - Current post field - `stripe-booking-id` field and how that works.
		- Field key on current post - `clasbpro_class_stripe_id`
	- Show class heading
	- Style
		- Book & Pay Button
		- External Link button

- Class Schedule Calendar (Pro) widget
	- Classes Shown - Use plugin settings / Choose for this widget
	- Class selection
	- Style - width

---

## Responsiveness
- Themes and code have been adapted to work on both desktop, tablet and mobile. explain breakpoints and differences.



---

## Customising

- Themes
	- Order of overrides - setting in theme page
	- theme.json - what it is and how it works
	- screenshot.jpg - used for theme gallery
	- bootstrap.php
		- `clasbpro_booking_labels`
		- `wp_enqueue_scripts`
	- `class-bookings-with-stripe/booking-form.php`
		- Explain `$view` object
		- `do_action( $start, $class_data, $dates );`
		- `do_action( $end, $class_data, $dates );`
		- available variables from plugin
		- Explain how file works
	- `class-bookings-with-stripe/booking-status.php`
		- `$status_class = $view->get_status_class();`
		- `$session_attr = \IOROOT_STRIPE_BOOKINGS_PRO\Theme_Loader::status_session_attrs( $view->type, $view->session_id, $view->status_token );`
		- Explain how file works
		- available variables from plugin
		- `do_action( 'clasbpro_status_template_start', $type, $booking );`
		- `do_action( 'clasbpro_status_template_end', $type, $booking );`
	- assets / icons / illustrations - how to add them into the theme.
	- Show how to customise fields
	- Show how to customise ACF fields

- API / Hooks
	- list all actions available throughout the entire plugin - explain what each does and how they work, and what you would use them for.
	- list all filters available throughout the entrie plugin - explain what each does and how they work, and what you would use them for.
	- Explain the API, all endpoints and how it works. Show all variables and give examples

- ACF Fields
	- Show how to add ACF fields into the forms
