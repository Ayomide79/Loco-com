# LOCO.com (simple version, no database) for Vercel

Plain HTML site. Your cars live in `cars.js`. Booking requests are emailed to you through Formspree (free).

## 1. Booking emails (Formspree)
1. formspree.io -> sign up -> **New form** -> enter the email that should receive requests.
2. Copy the form link (looks like `https://formspree.io/f/abcd1234`).
3. Open `cars.js`, paste it between the quotes in `window.FORM_ENDPOINT = "";`, and save.
4. Formspree emails you a confirmation link the first time. Click it.

## 2. Put it online
GitHub (private repo, upload these files) -> vercel.com -> Add New -> Project -> import the repo.
Set **Framework Preset: Other**. Leave Build Command, Output Directory, and Install Command empty. Deploy.

## Change, add, hide cars
Edit `cars.js` on GitHub (pencil icon, then Commit). Vercel redeploys in about a minute.
Photos: upload next to the other files and use `name.jpg` in `cars.js`. Keep each under 1 MB.

## Stop double bookings
When you accept a request, add its dates to that car's `booked` list in `cars.js`. The form then blocks those dates. This is checked in the visitor's browser, so glance at new requests yourself.

## Limits
- No admin login or dashboard. Whoever can edit your GitHub or Vercel account can change cars.
- Date blocking is not database-enforced.
- No online payment and no ID verification. Payment is only a preference.
- Formspree's free plan has a monthly submission limit.
