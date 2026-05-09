# HER energy DAY — Stripe payment implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the homepage "Rezervovat your spot" CTA on `EventCard` to a Stripe Payment Link so visitors can buy HER energy DAY tickets (890 CZK, hard-capped at 45 purchases via Stripe), with a thank-you page on our site that carries the full event details.

**Architecture:** Stripe Payment Link (Stripe-hosted checkout, no backend code). One-line URL change in `EventCard.tsx` plus a new `/dekujeme` thank-you page rendered for cs/en/ru. Stripe enforces capacity via its built-in payment-count cap; nothing on our side counts tickets.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, TypeScript. No test runner is installed — verification is `npm run build`, `npm run lint`, browser smoke tests, and Stripe sandbox card payments.

**Spec:** `docs/superpowers/specs/2026-05-09-her-energy-day-stripe-design.md`

---

## File structure

| Path | Action | Why |
|---|---|---|
| `.env.local` | Create / append | Add `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` (sandbox URL during dev) |
| `.env.example` | Create | Document the env var so other devs / Deployik know it exists |
| `app/components/EventCard.tsx` | Modify | Replace the hard-coded Reservio href with the Payment Link URL + `?locale=` |
| `app/[lang]/dekujeme/page.tsx` | Create | Thank-you page; renders for cs/en/ru. Fully static. |
| `app/components/DekujemePage.tsx` | Create | The actual UI for the thank-you page (matches the site's BoxPage/YogaPage pattern) |
| `dictionaries/cs.json` | Modify | Add thank-you-page strings |
| `dictionaries/en.json` | Modify | Add thank-you-page strings |
| `dictionaries/ru.json` | Modify | Add thank-you-page strings |
| `app/sitemap.ts` | **Not modified** | `/dekujeme` is a transactional landing page; we deliberately do not list it for SEO. |

---

## Phase 1 — Stripe sandbox setup (dashboard, no code)

This is dashboard configuration. The user (Olivia) does these clicks. The agent verifies by inspecting dashboard state if possible, otherwise by asking the user to confirm screenshot. Each step is followed by an explicit "expected state" so the agent can recognise success.

### Task 1: Create the Stripe Product

**Where:** Stripe sandbox dashboard, **Product catalog** (left sidebar).

- [ ] **Step 1: Open Product catalog**

Click **Product catalog** in the left sidebar, then click the **+ Add product** button (top right).

- [ ] **Step 2: Fill in product name**

Set **Name** to: `HER energy DAY`

- [ ] **Step 3: Fill in product description**

Paste this into **Description** (Stripe enforces a **500-character** limit on this field — keep edits short. Markdown supported; this text shows on Stripe's hosted Checkout page and receipt URL).

```
Jeden den. Dva opozity. Komunita, která tě postaví na nohy.

📅 Sobota 30. května 2026 (od 11:00)
📍 Titan Gym, Ďáblická 2, Praha · Tram: Sídliště Ďáblice

Program: 11:00 Kamasutra Yoga · 12:30 Lunch · 14:00 Boxing Rave

Co s sebou: pohodlné oblečení, ručník, láhev na vodu.
Těšíme se na tebe!
```

- [ ] **Step 4: Set the price**

Under **Pricing**:
- **Pricing model:** Standard pricing
- **Price:** `890`
- **Currency:** CZK — Czech Koruna
- **Billing:** One-time

- [ ] **Step 5: (Optional) Upload product image**

If you have an event poster (square or 16:9), upload it under **Image**. Skip if you don't.

- [ ] **Step 6: Save the product**

Click **Add product** (or **Save**). You should land on the new product's detail page. Note the **Product ID** (starts with `prod_…`) for your own records — not used in code.

**Verify:** The product appears in **Product catalog** with name "HER energy DAY", price "Kč 890,00", and the description visible on the detail page.

---

### Task 2: Create the Payment Link

**Where:** From the product's detail page in Stripe sandbox.

- [ ] **Step 1: Start a new Payment Link**

On the **HER energy DAY** product detail page, click **Create payment link** (or open **Payments → Payment links** in the sidebar and click **+ New**, then choose the HER energy DAY product). Confirm the line item shows: **HER energy DAY × 1 × Kč 890,00**.

- [ ] **Step 2: Lock quantity to 1**

Under the line item, ensure the **"Customers can adjust quantity"** option is **OFF**. Quantity should be fixed at 1.

- [ ] **Step 3: Configure "Options" → information collection**

Open the **Options** panel (or **Customer information** depending on Stripe's current UI):
- **Billing address:** *Do not collect* (or "Auto" if "do not collect" is unavailable — uncheck the require box)
- **Phone number:** **Do not collect**
- **Customer name:** **Collect**
- **Email:** Collected by default — leave on
- **Allow promotion codes:** OFF

- [ ] **Step 4: Set the payment cap**

Under **Restrictions** (or **Limit number of payments**):
- Toggle on **"Limit the number of payments"**
- Set the limit to **45**
- Confirm "Stop accepting payments after limit is reached" is enabled

- [ ] **Step 5: Configure post-payment behaviour**

Under **After payment** (or **Confirmation page**):
- Choose **"Don't show confirmation page"** → **"Redirect to your website"**
- Set the redirect URL to: `https://herenergy.cz/cs/dekujeme`

**Why production URL even in sandbox:** Stripe Payment Links require HTTPS for redirect URLs, so `http://localhost` is rejected. We verify the `/dekujeme` page itself locally by visiting `http://localhost:3000/cs/dekujeme` directly. The full Stripe→thank-you redirect handshake is verified post-deploy in Phase 4.

- [ ] **Step 6: Save and capture the URL**

Click **Create link**. Stripe shows the Payment Link URL — looks like `https://buy.stripe.com/test_aBcDeFgHiJ...` for sandbox. **Copy this URL.** You'll paste it into `.env.local` next.

**Verify:** The Payment Link is listed under **Payments → Payment links**, status **Active**, with cap "45" visible. Clicking the URL opens Stripe's Checkout page in Czech (default), showing HER energy DAY 890 Kč × 1.

---

## Phase 2 — Code

All file edits assume the working directory is the repo root: `/Users/oliviahenderson/Documents/Projects/herenergy.web`.

### Task 3: Add the Payment Link URL to local env

**Files:**
- Create: `.env.local`
- Create: `.env.example`

- [ ] **Step 1: Create `.env.local` with the sandbox URL**

Create a new file at the repo root, **`.env.local`** (note the leading dot, this is the standard Next.js convention). Replace the URL with the one you copied from Task 2 Step 6:

```
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK
```

The `NEXT_PUBLIC_` prefix is required because the URL needs to be readable in the browser (the button is rendered client-side).

- [ ] **Step 2: Create `.env.example`**

Create **`.env.example`** at the repo root so other devs and Deployik can see what env vars exist:

```
# Public Stripe Payment Link for HER energy DAY ticket.
# Sandbox: starts with https://buy.stripe.com/test_...
# Live:    starts with https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=
```

- [ ] **Step 3: Verify `.env.local` is git-ignored**

Run:

```bash
git check-ignore -v .env.local
```

Expected output: a line referencing `.gitignore` (Next.js's default `.gitignore` template includes `.env*.local`). If `.env.local` is **not** ignored, stop and add `.env*.local` to `.gitignore` before continuing — never commit secrets, even sandbox ones.

- [ ] **Step 4: Commit `.env.example`**

```bash
git add .env.example
git commit -m "Add .env.example documenting NEXT_PUBLIC_STRIPE_PAYMENT_LINK"
```

---

### Task 4: Add thank-you-page dictionary strings (cs/en/ru)

**Files:**
- Modify: `dictionaries/cs.json`
- Modify: `dictionaries/en.json`
- Modify: `dictionaries/ru.json`

The codebase uses an English-key i18n pattern (the JSON keys are English sentences; values are translations). New keys must be added to **all three** files even if cs and en have identical values, because the dictionary loader expects every key to exist.

- [ ] **Step 1: Add keys to `dictionaries/cs.json`**

Insert these entries before the closing `}` (keep the existing entries; preserve trailing-comma rules — JSON does not allow a trailing comma on the last entry):

```json
"Thanks for your reservation": "Děkujeme za rezervaci",
"See you at HER energy DAY": "Uvidíme se na HER energy DAY",
"Your spot is confirmed. We've sent the receipt to your email.": "Tvé místo je potvrzeno. Potvrzení o platbě jsme ti poslali na e-mail.",
"What you need to know": "Co potřebuješ vědět",
"Date": "Datum",
"Saturday 30 May 2026": "Sobota 30. května 2026",
"Location": "Místo",
"Titan Gym · Ďáblická 2 · Prague · Tram: Sídliště Ďáblice": "Titan Gym · Ďáblická 2 · Praha · Tramvaj: Sídliště Ďáblice",
"What to bring": "Co s sebou",
"Comfortable clothing, a towel, a water bottle, and good vibes.": "Pohodlné oblečení, ručník, láhev na vodu a dobrou náladu.",
"Schedule for the day": "Program dne",
"No receipt? Email us at": "Nepřišel ti e-mail? Napiš nám na",
"Back to home": "Zpět na úvod"
```

- [ ] **Step 2: Add keys to `dictionaries/en.json`**

```json
"Thanks for your reservation": "Thanks for your reservation",
"See you at HER energy DAY": "See you at HER energy DAY",
"Your spot is confirmed. We've sent the receipt to your email.": "Your spot is confirmed. We've sent the receipt to your email.",
"What you need to know": "What you need to know",
"Date": "Date",
"Saturday 30 May 2026": "Saturday 30 May 2026",
"Location": "Location",
"Titan Gym · Ďáblická 2 · Prague · Tram: Sídliště Ďáblice": "Titan Gym · Ďáblická 2 · Prague · Tram: Sídliště Ďáblice",
"What to bring": "What to bring",
"Comfortable clothing, a towel, a water bottle, and good vibes.": "Comfortable clothing, a towel, a water bottle, and good vibes.",
"Schedule for the day": "Schedule for the day",
"No receipt? Email us at": "No receipt? Email us at",
"Back to home": "Back to home"
```

- [ ] **Step 3: Add keys to `dictionaries/ru.json`**

```json
"Thanks for your reservation": "Спасибо за бронирование",
"See you at HER energy DAY": "Увидимся на HER energy DAY",
"Your spot is confirmed. We've sent the receipt to your email.": "Твоё место забронировано. Чек мы отправили тебе на e-mail.",
"What you need to know": "Что тебе нужно знать",
"Date": "Дата",
"Saturday 30 May 2026": "Суббота, 30 мая 2026",
"Location": "Место",
"Titan Gym · Ďáblická 2 · Prague · Tram: Sídliště Ďáblice": "Titan Gym · Ďáblická 2 · Прага · Трамвай: Sídliště Ďáblice",
"What to bring": "Что взять с собой",
"Comfortable clothing, a towel, a water bottle, and good vibes.": "Удобная одежда, полотенце, бутылка воды и хорошее настроение.",
"Schedule for the day": "Программа дня",
"No receipt? Email us at": "Не пришёл чек? Напиши нам на",
"Back to home": "На главную"
```

- [ ] **Step 4: Verify JSON parses**

Run:

```bash
node -e "['cs','en','ru'].forEach(l => JSON.parse(require('fs').readFileSync('dictionaries/'+l+'.json','utf8')))"
```

Expected: no output (success). Any output means a JSON parse error — fix the trailing-comma issue.

- [ ] **Step 5: Commit**

```bash
git add dictionaries/cs.json dictionaries/en.json dictionaries/ru.json
git commit -m "Add thank-you page dictionary keys for cs/en/ru"
```

---

### Task 5: Create the thank-you page UI component

**Files:**
- Create: `app/components/DekujemePage.tsx`

This is a client component (uses `useDictionary` like `BoxPage` and `YogaPage`). It renders the "thanks for your reservation" message plus the full event details.

- [ ] **Step 1: Create the file**

Create `app/components/DekujemePage.tsx` with this exact content:

```tsx
"use client";

import { useDictionary } from "./DictionaryProvider";
import { LocaleLink } from "./LocaleLink";

export function DekujemePage() {
  const { t } = useDictionary();
  const scheduleRows = [
    { time: "11:00", title: "Kamasutra Yoga", host: "Yuliya Arkhiyereyeva" },
    { time: "12:30", title: "Lunch & Coffee Break", host: "Mr.Box" },
    { time: "14:00", title: "Boxing Rave", host: "Kateřina Čavajdová" },
  ];

  return (
    <section className="relative bg-ink text-bone overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="grain absolute inset-0 pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-6 -right-6 font-display tracking-[0.04em] text-[26vw] leading-[0.85] text-bone/[0.04] select-none pointer-events-none uppercase"
      >
        thanks
      </div>

      <div className="relative mx-auto max-w-3xl px-6 md:px-10">
        <div className="font-display tracking-[0.4em] text-[11px] uppercase text-ember">
          {t("Thanks for your reservation")}
        </div>
        <h1 className="mt-5 font-serif italic text-5xl md:text-7xl leading-[0.95]">
          {t("See you at HER energy DAY")}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-bone/80 leading-relaxed">
          {t("Your spot is confirmed. We've sent the receipt to your email.")}
        </p>

        <div className="mt-12 border border-bone/15 bg-ink-soft/60 backdrop-blur p-6 md:p-8">
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-bone/60 mb-5">
            {t("What you need to know")}
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                {t("Date")}
              </dt>
              <dd className="mt-1 font-serif text-2xl text-ember">
                {t("Saturday 30 May 2026")}
              </dd>
            </div>
            <div>
              <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                {t("Location")}
              </dt>
              <dd className="mt-1 font-serif text-xl">
                {t("Titan Gym · Ďáblická 2 · Prague · Tram: Sídliště Ďáblice")}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                {t("What to bring")}
              </dt>
              <dd className="mt-1 font-serif text-xl text-bone/90">
                {t("Comfortable clothing, a towel, a water bottle, and good vibes.")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10">
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-bone/60 mb-4">
            {t("Schedule for the day")}
          </div>
          <ul className="divide-y divide-bone/10">
            {scheduleRows.map((it, i) => (
              <li key={i} className="py-4 flex items-baseline gap-5">
                <span
                  className={`font-display tracking-[0.06em] text-2xl md:text-3xl ${
                    i === 1 ? "text-bone/50" : "text-ember"
                  }`}
                >
                  {it.time}
                </span>
                <div className="flex-1">
                  <div className="font-serif text-xl md:text-2xl text-bone leading-tight">
                    {it.title}
                  </div>
                  <div className="font-display tracking-[0.2em] text-[10px] uppercase text-bone/60 mt-1">
                    {it.host}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <LocaleLink
            href="/"
            className="group inline-flex items-center gap-3 bg-ember text-ink px-6 py-4 font-display tracking-[0.25em] text-xs uppercase hover:bg-bone transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            {t("Back to home")}
          </LocaleLink>
          <span className="text-bone/60 text-sm">
            {t("No receipt? Email us at")} <a href="mailto:hello@herenergy.cz" className="underline hover:text-bone">hello@herenergy.cz</a>
          </span>
        </div>
      </div>
    </section>
  );
}
```

**Note:** the schedule rows are hard-coded here intentionally — `getContent` is server-only (`import "server-only"`) and this is a client component. The schedule is small and event-specific; duplicating it is simpler than restructuring content loading. If/when we have a second event, refactor.

- [ ] **Step 2: Verify TypeScript compiles**

Run:

```bash
npx tsc --noEmit
```

Expected: no errors. (Or a note that the unused module hasn't been imported yet — that's fine, we wire it up next.)

---

### Task 6: Create the `/dekujeme` route

**Files:**
- Create: `app/[lang]/dekujeme/page.tsx`

Mirrors the pattern in `app/[lang]/box/page.tsx`.

- [ ] **Step 1: Create the page file**

Create `app/[lang]/dekujeme/page.tsx`:

```tsx
import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n-config";
import { DekujemePage } from "../../components/DekujemePage";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

const TITLES: Record<Locale, string> = {
  cs: "Děkujeme — HER ENERGY",
  en: "Thank you — HER ENERGY",
  ru: "Спасибо — HER ENERGY",
};

const DESCRIPTIONS: Record<Locale, string> = {
  cs: "Děkujeme za rezervaci na HER energy DAY. 30. května 2026, Titan Gym, Praha.",
  en: "Thanks for your HER energy DAY reservation. 30 May 2026, Titan Gym, Prague.",
  ru: "Спасибо за бронирование на HER energy DAY. 30 мая 2026, Titan Gym, Прага.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  return {
    title: TITLES[lang],
    description: DESCRIPTIONS[lang],
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <DekujemePage />;
}
```

The `robots: { index: false }` keeps this transactional page out of search results — buyers shouldn't reach `/dekujeme` from Google, only from a successful Stripe checkout.

- [ ] **Step 2: Verify the file structure**

Run:

```bash
ls "app/[lang]/dekujeme/"
```

Expected output: `page.tsx`

- [ ] **Step 3: Verify TypeScript compiles**

Run:

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit Tasks 5 + 6 together**

```bash
git add app/components/DekujemePage.tsx "app/[lang]/dekujeme/page.tsx"
git commit -m "Add /dekujeme thank-you page for HER energy DAY"
```

---

### Task 7: Wire EventCard to the Stripe Payment Link

**Files:**
- Modify: `app/components/EventCard.tsx`

Two changes: read the env var, append `?locale=` from the dictionary's `lang`.

- [ ] **Step 1: Edit `EventCard.tsx`**

Open `app/components/EventCard.tsx`. Make these changes:

**Change 1** — at the top of the function, replace:

```tsx
export function EventCard({ schedule }: { schedule: ScheduleItem[] }) {
  const { t } = useDictionary();
```

with:

```tsx
const PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";

export function EventCard({ schedule }: { schedule: ScheduleItem[] }) {
  const { t, lang } = useDictionary();
  const reserveHref = PAYMENT_LINK
    ? `${PAYMENT_LINK}?locale=${lang}`
    : "#rezervace";
```

**Change 2** — replace the existing `<a>` tag (the "Reserve your spot" button):

```tsx
              <a
                href="https://www.reservio.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-3 bg-ember text-ink px-6 py-4 font-display tracking-[0.25em] text-xs uppercase hover:bg-bone transition-colors"
              >
                {t("Reserve your spot")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
```

with:

```tsx
              <a
                href={reserveHref}
                className="group inline-flex items-center gap-3 bg-ember text-ink px-6 py-4 font-display tracking-[0.25em] text-xs uppercase hover:bg-bone transition-colors"
              >
                {t("Reserve your spot")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
```

We removed `target="_blank"` and `rel="noreferrer noopener"` because Stripe Checkout is now the destination — opening it in the same tab is the conventional checkout UX (and avoids browsers blocking it as a popup on mobile). If the env var is unset (e.g. local dev without `.env.local`), the button falls back to the page anchor `#rezervace` so the site still works.

- [ ] **Step 2: Verify TypeScript compiles**

Run:

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify lint passes**

Run:

```bash
npm run lint
```

Expected: no errors. Warnings about `useDictionary` returning `lang` are fine (we're using it).

- [ ] **Step 4: Commit**

```bash
git add app/components/EventCard.tsx
git commit -m "Wire HER energy DAY CTA to Stripe Payment Link"
```

---

## Phase 3 — Local smoke test (sandbox)

This is end-to-end verification before we touch live mode. Run with the **sandbox** Payment Link.

### Task 8: Run the full purchase flow locally

- [ ] **Step 1: Start the dev server**

Run:

```bash
npm run dev
```

Wait for "Ready" line. Visit http://localhost:3000/cs and scroll to the EventCard section.

- [ ] **Step 2: Build a fresh production bundle to catch SSR errors**

In a second terminal:

```bash
npm run build
```

Expected: clean build with `/[lang]/dekujeme` listed in the route output for cs, en, ru.

- [ ] **Step 3: Click "Rezervovat your spot"**

You should land on Stripe Checkout (sandbox banner at top). Verify:
- ✅ Product name: HER energy DAY
- ✅ Price: 890 Kč × 1
- ✅ Quantity is **not adjustable**
- ✅ Email and name fields are present, no phone, no address
- ✅ Page is in Czech (because `?locale=cs` was appended)

- [ ] **Step 4: Complete a test payment**

Use Stripe's test card:
- **Card number:** `4242 4242 4242 4242`
- **Expiry:** any future date (e.g. `12/34`)
- **CVC:** any 3 digits (e.g. `123`)
- **Name:** `Test Buyer`
- **Email:** your real email so you can see the receipt

Click **Pay**.

- [ ] **Step 5: Verify the redirect target**

After the test payment, Stripe will try to redirect to `https://herenergy.cz/cs/dekujeme`. **If the production site is not yet deployed with this code, you'll land on a 404 — that is expected during sandbox testing.** Acceptance criterion here: Stripe completed the test payment without errors. The `/dekujeme` page rendering is verified separately in Step 5b.

- [ ] **Step 5b: Verify the thank-you page renders locally**

Open `http://localhost:3000/cs/dekujeme` directly in the browser. Verify:
- ✅ Headline "Uvidíme se na HER energy DAY"
- ✅ Date, location, what-to-bring, schedule all visible
- ✅ "Zpět na úvod" button works (returns to `/cs`)
- ✅ Repeat with `/en/dekujeme` and `/ru/dekujeme` — page renders in those languages too

- [ ] **Step 6: Check the email receipt**

In your inbox, find the Stripe receipt (subject usually "Receipt from HER ENERGY"). Verify:
- ✅ Amount: Kč 890,00
- ✅ Description / line item shows "HER energy DAY"
- ✅ "View payment details" link opens a Stripe-hosted page that shows the full product description

- [ ] **Step 7: Test the locale switching**

Visit `/en` and click the CTA — Stripe Checkout should open in English. Visit `/ru` and click — Russian. **Note:** after payment in any locale, the user lands on `/cs/dekujeme` (the Czech thank-you page); this is the v1 trade-off documented in the spec.

- [ ] **Step 8: Test the cap behavior**

In Stripe sandbox, edit the Payment Link's "Limit number of payments" to **1**. Then in a fresh browser session, click the CTA. You should see Stripe's built-in "This payment link is no longer accepting payments" page. **After this test, set the cap back to 45.**

---

## Phase 4 — Going live (when ready)

These steps are not run during initial implementation. They're listed here so the engineer (or future-you) knows the full path. **Do not run these without explicit go-ahead from Olivia.**

### Task 9: Stripe business verification (slow, async)

- [ ] **Step 1: Switch to live mode**

In the Stripe dashboard, click **Switch to live account** in the top banner. Stripe will prompt for business info.

- [ ] **Step 2: Submit business details**

You'll need:
- Business type (OSVČ / right entity for HER ENERGY)
- IČO (if registered) or personal identification
- Czech bank account number for payouts
- Phone number (for SMS verification)
- ID upload (passport or občanský průkaz)

Verification can take from a few hours to a few business days. Stripe will email when approved.

- [ ] **Step 3: Wait for approval**

Don't proceed past this point until Stripe says you can charge live cards.

---

### Task 10: Recreate Product + Payment Link in live mode

Sandbox data does **not** carry over to live mode. You'll repeat Tasks 1 and 2 in live mode.

- [ ] **Step 1: Repeat Task 1 in live mode**

Same product name, description, price.

- [ ] **Step 2: Repeat Task 2 in live mode**

Same settings (collect email + name, cap at 45, redirect URL).

This time set the redirect URL to the **production** value: `https://herenergy.cz/cs/dekujeme`.

Copy the new live Payment Link URL (starts with `https://buy.stripe.com/` — no `test_` prefix).

---

### Task 11: Deploy to Deployik with live env var

- [ ] **Step 1: Set the env var on Deployik**

In Deployik's project settings → **Environments** (or **Settings → Variables**), add:

```
NEXT_PUBLIC_STRIPE_PAYMENT_LINK = <live URL from Task 10>
```

Apply to the **Production** environment.

- [ ] **Step 2: Trigger a production deploy**

Click **Deploy production** in Deployik. Watch the build log; it should succeed in ~30–40 seconds (matching prior production builds).

- [ ] **Step 3: Final live smoke test**

Visit https://herenergy.cz/cs and click the CTA. Use a real card to buy a real ticket (you can refund yourself in the Stripe dashboard immediately after).

Verify:
- ✅ Stripe Checkout loads with no sandbox banner
- ✅ Payment processes successfully
- ✅ Real receipt arrives by email
- ✅ Redirect to `https://herenergy.cz/cs/dekujeme` works

- [ ] **Step 4: Refund the test purchase**

In Stripe live dashboard → **Payments** → find your test transaction → **Refund**. Refund the full amount.

- [ ] **Step 5: Bump the cap by 1 (optional)**

Because you just consumed one of the 45 slots and refunded it (Stripe doesn't auto-restore), edit the Payment Link's cap from 45 → 46 in the live dashboard so total real customer capacity stays at 45.

---

## Out of scope (per spec)

- Branded confirmation emails sent from our domain
- "X tickets left" counter on the homepage
- Inventory math beyond Stripe's payment-count cap
- Multi-quantity (groups buying together)
- Stripe payments for the per-class CTAs (Box, Yoga) — those will use Reservio
- VAT / proper Czech invoices (not required while neplátce DPH)
- Webhooks
- A database

Do not add any of these as bonus work. If the user requests them, brainstorm a v2.
