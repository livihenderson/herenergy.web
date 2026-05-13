# HER energy DAY — branded confirmation email

**Date:** 2026-05-13
**Owner:** Olivia
**Status:** Approved (design); implementation pending
**Builds on:** `2026-05-09-her-energy-day-stripe-design.md` (the existing Stripe Payment Link flow already in production)

## Goal

After a buyer successfully pays for a HER energy DAY ticket, send them a **branded, locale-aware confirmation email** that mirrors the on-site `/dekujeme` thank-you page. The email supplements Stripe's auto-receipt; it's the buyer's portable copy of event details (date, schedule, location, what to bring) in their inbox.

## Decisions

| Question | Decision | Why |
|---|---|---|
| Email content | Mirror `/dekujeme` — date, location, full schedule, what to bring, contact info | Reuses existing content layout; buyer gets everything they need in one place |
| Locale | Auto-match buyer's site locale (cs/en/ru) | Stripe Checkout Session preserves the `?locale=` we set on the Payment Link URL; webhook reads `session.locale` |
| Email service | Resend (`resend.com`) with verified `herenergy.cz` domain | Purpose-built for transactional email; verified domain = good deliverability |
| Sender | `noreply@herenergy.cz` | No inbox needed — only a DNS-verified sender. Buyers see a professional address. |
| Reply-To | None set; replies bounce | Email body directs buyers to IG / Gmail for questions instead |
| Contact info in body | Instagram `@her__energy` + email `herenergyclass@gmail.com` | Both included so buyers can pick their preferred channel |
| Refund emails | Not built — rely on Stripe's automatic refund receipt | Refunds are rare for one-off events; Stripe's auto-email is adequate proof |
| Email design | Branded HTML via React Email matching site palette (ink/ember/bone/wine, serif italic) | Buyer's first owned-inbox interaction; plain-text would feel mismatched after a 1190 Kč purchase |

## Architecture

```
Buyer pays at Stripe Checkout
        │
        ▼
Stripe fires webhook → POST https://herenergy.cz/api/stripe-webhook
        │
        ▼
Webhook handler (app/api/stripe-webhook/route.ts):
   1. Read raw request body + Stripe-Signature header
   2. Verify signature using STRIPE_WEBHOOK_SECRET
   3. Filter event.type — only handle `checkout.session.completed`
   4. Read from session: email, customer_details.name, locale, id
   5. Idempotency check: have we processed this event.id already?
   6. Look up event details from content/{locale}.ts (date, schedule, etc.)
   7. Render React Email template with locale-specific strings + buyer info
   8. Call Resend API: From noreply@herenergy.cz → buyer's email
   9. Return 200 OK to Stripe
        │
        ▼
Buyer receives branded email within ~1 minute
```

The webhook is independent of the existing `/cs/dekujeme` redirect — both happen after payment but they don't depend on each other. The buyer always sees `/cs/dekujeme` immediately; the email arrives moments later.

## Components

### New files

| Path | Responsibility | Approx LOC |
|---|---|---:|
| `app/api/stripe-webhook/route.ts` | POST handler: verify signature, route on event type, dispatch email | ~70 |
| `lib/stripe.ts` | Single shared server-side Stripe client | ~5 |
| `lib/resend.ts` | Single shared Resend client | ~5 |
| `emails/HerEnergyDayConfirmation.tsx` | React Email template — branded HTML matching site palette | ~150 |

### Modified files

| Path | Change |
|---|---|
| `dictionaries/cs.json`, `en.json`, `ru.json` | Add ~10 new email-specific strings (greeting, intro, signoff, "questions? contact"). Reuses the existing `useDictionary`-style key/value pattern. |
| `.env.example` | Document `RESEND_API_KEY` and `STRIPE_WEBHOOK_SECRET` |
| `package.json` | Add runtime deps: `resend`, `@react-email/components`, `@react-email/render`. Dev dep: `react-email` (for the preview CLI). New script: `"email:dev": "email dev --dir emails"`. |

### External services

- **Stripe Live** — fires webhook, source of buyer/event data
- **Resend** — sends the email; `herenergy.cz` verified as sending domain
- **Deployik** — hosts the webhook endpoint at `https://herenergy.cz/api/stripe-webhook`; env vars set in Production environment

### Environment variables (server-side, secret)

- `RESEND_API_KEY` — generated in Resend dashboard
- `STRIPE_WEBHOOK_SECRET` — given by Stripe when registering the webhook endpoint

Both go in Deployik Production. Local dev gets them via `.env.local` (already gitignored).

## Data flow detail — what the webhook reads from Stripe

From the `Checkout.Session` object in the webhook payload:

| Field | Used for |
|---|---|
| `id` (e.g. `cs_live_…`) | Idempotency key — skip if already processed |
| `customer_details.email` | Recipient of the email |
| `customer_details.name` | Greeting in the email body |
| `locale` | Selects cs/en/ru template strings |
| `amount_total` | Optional — could surface in email; v1 just shows ticket info, not amount (Stripe receipt has it) |

All event details (date, schedule, what to bring) come from our own `content/{locale}.ts` — Stripe doesn't need to know any of that.

## Locale handling

The `?locale=cs|en|ru` we append to the Payment Link URL when rendering the button (in `EventCard.tsx`) determines the language of the Stripe checkout page. Stripe stores this on the Checkout Session as `session.locale`. Our webhook reads it and uses it to:

1. Pick the right dictionary subset for email strings
2. Pull event details from `content/{locale}.ts`

If `session.locale` is missing or unrecognized, fall back to Czech (matches `i18n.defaultLocale`).

## Security: signature verification

Every Stripe webhook request includes a `Stripe-Signature` header. The handler verifies this against `STRIPE_WEBHOOK_SECRET` using Stripe's library (`stripe.webhooks.constructEvent`). Requests with invalid or missing signatures get a 400 response and are dropped.

**Why this matters:** Without verification, anyone who learns the URL `https://herenergy.cz/api/stripe-webhook` could POST forged events and trigger arbitrary emails. Signature verification is the standard, non-negotiable pattern.

## Idempotency

Stripe retries failed webhook deliveries — if our handler returns non-2xx, Stripe will deliver the same event again (up to 3 days with exponential backoff). Without dedup, we'd send duplicate emails.

**v1 approach:** in-memory Set of processed `event.id` values. Lifetime: the Node process. Survives short-window retries (seconds–minutes); not durable across Deployik restarts but that window is acceptable for a 40-seat event. If a redeploy happens between Stripe's first attempt and retry (rare), we'd send a duplicate — acceptable cost.

**Future:** if we scale to recurring events with higher volume, swap in Redis or a `processed_events` database table.

## Failure modes and recovery

| Case | Behaviour | Recovery |
|---|---|---|
| Resend API returns 5xx | Webhook returns 5xx; Stripe retries | Self-heals on Stripe's next attempt |
| Resend API returns 4xx (e.g. invalid recipient email) | Webhook logs and returns 200 (no retry — wouldn't help) | Manual: Olivia contacts the buyer via the email they used at checkout |
| Buyer typo'd their email at checkout | Email vanishes | `/dekujeme` page is the backup — they saw all info immediately after paying. Email is supplementary. |
| Deployik restart between Stripe attempts | Possible duplicate email (in-memory dedup lost) | Acceptable for this event's scale |
| Stripe webhook secret rotated / wrong | All emails fail (signatures rejected) | Update `STRIPE_WEBHOOK_SECRET` in Deployik, redeploy |

## Testing plan

### Local dev (using Stripe sandbox)

1. **Stripe CLI** — `stripe listen --forward-to localhost:3000/api/stripe-webhook` proxies live webhook events to local dev server
2. **React Email preview** — `npm run email:dev` renders the template in a browser at `localhost:3001`; iterate on design without sending emails
3. **Manual test purchase** — buy a ticket in Stripe sandbox checkout (test card `4242…`); confirm email lands in your real inbox with right content + right language; repeat for cs/en/ru
4. **Locale fallback** — temporarily set the URL to a locale Stripe doesn't recognize (e.g. `?locale=de`); confirm email still sends in Czech

### Production smoke test

1. Buy a real ticket on `https://herenergy.cz/cs` with real card
2. Confirm email arrives within ~1 minute
3. Verify the email's "From" shows `noreply@herenergy.cz` (not `resend.dev`)
4. Refund yourself in Stripe — Stripe's auto-refund receipt arrives; no custom refund email (by design)

## Going-live ordering

1. **Olivia:** Resend account + verify `herenergy.cz` domain via DNS (~10 min). Can start now in parallel with code work — DNS propagation has its own delay.
2. **Olivia:** Generate Resend API key, save it securely (we'll use it in step 6).
3. **Me:** Build code on a new feature branch, locally tested with Stripe CLI forwarding sandbox webhooks.
4. **Olivia + Me:** Merge feature branch into `main`.
5. **Olivia:** In Stripe Live → **Developers → Webhooks → Add endpoint**. URL: `https://herenergy.cz/api/stripe-webhook`. Event: `checkout.session.completed`. Stripe shows the **signing secret** (starts with `whsec_…`) — copy it.
6. **Olivia:** In Deployik Production env, set **two** env vars:
   - `RESEND_API_KEY` = the key from step 2
   - `STRIPE_WEBHOOK_SECRET` = the secret from step 5
7. **Olivia:** Trigger production deploy in Deployik.
8. **Olivia + Me:** Real-card smoke test on `https://herenergy.cz/cs`. Verify the email arrives in the right language. Refund yourself in Stripe.

## Out of scope (v2.1+)

- Branded refund email (rely on Stripe auto-refund receipt for v2)
- Multiple email events per buyer (e.g. "event tomorrow" reminder day before)
- Admin page to manually resend confirmation emails
- Database-backed processed-events table for high-scale idempotency
- A/B testing or analytics on email opens
- Subscriber list / newsletter (only transactional emails here)
