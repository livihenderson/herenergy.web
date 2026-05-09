# HER energy DAY — Stripe payment integration

**Date:** 2026-05-09
**Owner:** Olivia
**Status:** Approved (design); implementation pending

## Goal

Sell tickets to the **HER energy DAY** event (30 May 2026, 890 CZK) directly from the homepage `EventCard` CTA, using Stripe. Other CTAs on the site (Box · Phoenix, Yoga · Yuliya) keep their existing Reservio link and are out of scope.

## Constraints and decisions

| Question | Decision | Why |
|---|---|---|
| Which CTAs use Stripe in v1? | HER energy DAY only | One-off event; per-class CTAs will use Reservio later |
| Ticket variants | One: 890 CZK | No tiers, no early-bird |
| Quantity per checkout | 1 ticket per checkout | Lets us use Stripe's built-in payment-count cap as the inventory enforcer with zero code |
| Venue capacity | 40 attendees | Hard physical limit |
| Stripe Payment Link cap | **45 payments** | +5 buffer to absorb refunds/cancellations, since Stripe's cap does not auto-restore a seat after a refund |
| VAT | Neplátce DPH | No invoicing system needed; Stripe receipt is sufficient |
| Confirmation email | Stripe receipt only | Event details (date, harmonogram, location) are baked into the Stripe **product description** so they appear in the receipt |
| Hosting | Deployik (own server, runs the Next.js app) | Server-side capability available, not used in v1 |

Approach chosen: **Stripe Payment Links** (the simplest of the three Stripe integration styles). Rejected: Prebuilt Checkout (with custom backend) and Custom payment flow (Stripe Elements) — both were overengineered for one event.

## Architecture

```
Homepage EventCard CTA
        │
        │ <a href="https://buy.stripe.com/..."> (Payment Link, locale appended)
        ▼
Stripe-hosted checkout page
   • Email + name collected
   • 890 CZK, quantity locked to 1
   • Cap auto-enforced at 45
   • Receipt email sent by Stripe (contains product description)
        │
        ├── success → /cs/dekujeme  (thank-you page on our site)
        └── cancel  → /  (homepage)
```

No webhook, no API route, no database, no email service, no inventory math on our side. **Stripe is the source of truth and the only moving part.**

## Components

### Stripe (sandbox first, then live)

1. **Product:** "HER energy DAY"
   - Price: 890 CZK, one-time
   - Description (markdown): event date · location · harmonogram · "what to bring" · "see you there" line in HER Energy voice. **This text is what shows up in the buyer's receipt** — invest in it.
   - Image: optional, an event poster

2. **Payment Link** generated from the product
   - Quantity: locked to 1 (no quantity selector)
   - Collect: **email** (default) and **name**. Do not collect: phone, address.
   - Limit number of payments: **45** with auto-disable on
   - After payment: redirect to `https://herenergy.cz/cs/dekujeme`
   - **Single redirect for all locales** — Stripe Payment Links allow only one fixed success URL. v1 ships with the Czech thank-you page for everyone (acceptable trade-off; multilingual buyers see Czech for ~5 seconds before they read their email). v2 can split into one Payment Link per locale if it becomes a real issue.
   - Localized **checkout**: append `?locale=cs|en|ru` to the Payment Link URL when rendering the button so Stripe's checkout page itself shows in the visitor's language.

### Code (small, in this repo)

| File | Action |
|---|---|
| `app/components/EventCard.tsx` | Replace `href="https://www.reservio.com/"` with the Payment Link URL, building `?locale=` from the current dictionary locale |
| `app/[lang]/dekujeme/page.tsx` | New thank-you page rendered for cs/en/ru. Fully static; ignores any query params. Does not call Stripe. |
| `dictionaries/{cs,en,ru}.json` | Add thank-you-page strings: heading, body, "back to home" |
| `content/{cs,en,ru}.ts` | Add thank-you-page content if it follows the existing content-separation pattern |
| `app/sitemap.ts` | Add `/dekujeme` (or exclude — to be confirmed in plan) |

### Environment

The Payment Link URL itself is **not secret** — it's a public URL. We can hard-code it or put it in `.env` for cleanliness. Recommend: `.env` so swapping sandbox/live is one var change, not a code edit.

```
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/test_xxx
```

## Data flow per visitor

1. Visitor lands on `/cs` (or `/en`, `/ru`).
2. `EventCard` renders the Rezervovat button with `href = ${PAYMENT_LINK}?locale=cs` (or matching locale).
3. Click → Stripe-hosted checkout in the chosen language.
4. Pay → Stripe sends receipt email with product description; redirects to `/cs/dekujeme` (Czech thank-you page for all locales in v1).
5. Cap of 45 reached → Stripe auto-shows its built-in "no longer available" page on next click. No code change required from us.

## Error handling and edge cases

| Case | Behavior | Mitigation |
|---|---|---|
| Buyer enters wrong email at checkout | Receipt vanishes | Thank-you page tells them to email Olivia if no receipt arrives within ~5 min |
| Cap (45) hit during sales push | Stripe's "no longer available" page; no buyer can purchase | Olivia decides if she wants to manually raise the cap (Stripe dashboard, one click) |
| Buyer abandons checkout | Returns to homepage | No seat consumed (Stripe only counts completed checkouts toward the cap) |
| Refund issued after the cap is reached | Cap stays at 45, seat is *not* auto-restored | Olivia manually bumps cap in Stripe (45 → 46) if she wants to resell |
| All 45 actually show up | 5 over capacity | Squeeze in / refund last buyer / close link manually before 45 if room is filling |

## Going-live checklist

1. Build everything against the **sandbox** Payment Link, smoke test (see Testing).
2. Complete Stripe **business verification** (slow step — hours to days).
3. Switch Stripe to **live mode**; recreate Product + Price + Payment Link (sandbox data does not carry over).
4. Update `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` in Deployik to the live URL; redeploy.
5. Buy a real ticket as a final smoke test, refund it from the Stripe dashboard.

## Testing plan (sandbox)

- Successful purchase with Stripe test card `4242 4242 4242 4242` (any future expiry, any CVC).
- Verify the receipt email contains: event date, location, harmonogram, "what to bring".
- Verify success URL lands on `/cs/dekujeme` and the page renders correctly in cs, en, and ru.
- Verify cancel returns to the homepage.
- Set sandbox cap to **1**, complete one purchase, verify the next click shows Stripe's "no longer available" page.

## Out of scope (v1)

- Branded confirmation emails sent from our domain
- "X tickets left" counter on the homepage
- Inventory math beyond Stripe's payment-count cap
- Multi-quantity (groups buying together)
- Stripe payments for the per-class CTAs (Box, Yoga) — those will use Reservio
- VAT / proper Czech invoices (not required while neplátce DPH)
- Webhooks
- A database
