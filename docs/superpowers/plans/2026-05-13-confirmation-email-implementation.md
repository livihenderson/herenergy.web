# HER energy DAY — Confirmation email implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Send a branded, locale-aware confirmation email via Resend after every successful HER energy DAY ticket purchase, triggered by a Stripe `checkout.session.completed` webhook.

**Architecture:** New API route `app/api/stripe-webhook/route.ts` receives Stripe events, verifies the signature, looks up the buyer's locale from `session.locale`, loads matching event content from `content/{locale}.ts`, renders a React Email template, and sends via Resend's SDK from `noreply@herenergy.cz` (domain already verified).

**Tech Stack:** Next.js 16 (App Router), React 19, Stripe Node SDK, Resend SDK, React Email. No test runner installed — verification is `npm run build`, Stripe CLI for local webhook forwarding, and real-card smoke tests.

**Spec:** `docs/superpowers/specs/2026-05-13-confirmation-email-design.md`

---

## File structure

| Path | Action | Purpose |
|---|---|---|
| `package.json` | Modify | Add `stripe`, `resend`, `@react-email/components`, `@react-email/render`. Dev: `react-email`. Script: `email:dev`. |
| `.env.example` | Modify | Document `RESEND_API_KEY` and `STRIPE_WEBHOOK_SECRET` |
| `.env.local` | Modify (manual) | Add sandbox `RESEND_API_KEY` and Stripe CLI's webhook secret (Olivia does this, gitignored) |
| `lib/stripe.ts` | Create | Shared server-side Stripe client |
| `lib/resend.ts` | Create | Shared Resend client |
| `lib/email-locale.ts` | Create | Tiny helper to resolve locale-aware dictionary + content for email rendering |
| `emails/HerEnergyDayConfirmation.tsx` | Create | React Email template — branded HTML matching site palette |
| `dictionaries/cs.json` | Modify | Add ~10 email-specific strings (cs) |
| `dictionaries/en.json` | Modify | Add ~10 email-specific strings (en) |
| `dictionaries/ru.json` | Modify | Add ~10 email-specific strings (ru) |
| `app/api/stripe-webhook/route.ts` | Create | POST handler: verify signature, dedupe, send email |

---

## Phase 1 — Dependencies and config

### Task 1: Install dependencies and add the email:dev script

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

Run from repo root:

```bash
npm install stripe resend @react-email/components @react-email/render
```

Expected: installs without errors. Versions at time of writing: `stripe@^17`, `resend@^4`, `@react-email/components@^0.0.32`, `@react-email/render@^1`.

- [ ] **Step 2: Install dev dependency for the email preview CLI**

```bash
npm install --save-dev react-email
```

- [ ] **Step 3: Add the email:dev script**

Open `package.json`. Inside `"scripts"`, after `"lint"`, add:

```json
"email:dev": "email dev --dir emails --port 3001"
```

Final scripts block should be:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "email:dev": "email dev --dir emails --port 3001"
}
```

- [ ] **Step 4: Verify install succeeded**

```bash
npx tsc --noEmit
```

Expected: no errors. (Some packages might emit warnings about types; errors would fail the build.)

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add Stripe, Resend, React Email dependencies"
```

---

### Task 2: Document env vars

**Files:**
- Modify: `.env.example`

- [ ] **Step 1: Append env var documentation**

Replace the contents of `.env.example` with:

```
# Public Stripe Payment Link for HER energy DAY ticket.
# Sandbox: starts with https://buy.stripe.com/test_...
# Live:    starts with https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=

# Server-only — sending confirmation emails via Resend.
# Generated in Resend dashboard > API Keys (least-privilege: "Sending access" only).
RESEND_API_KEY=

# Server-only — verifying Stripe webhook request signatures.
# For local dev: shown by `stripe listen --forward-to localhost:3000/api/stripe-webhook` (starts with whsec_...).
# For production: shown when registering the webhook endpoint in Stripe live dashboard.
STRIPE_WEBHOOK_SECRET=
```

- [ ] **Step 2: Add the new keys to `.env.local`** (DO NOT COMMIT)

Open `.env.local` and append (replace the placeholders with Olivia's actual values — the Resend key starts with `re_…`, the webhook secret will come from Stripe CLI in Task 7):

```
RESEND_API_KEY=re_REPLACE_WITH_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_REPLACE_AFTER_STRIPE_CLI_LISTEN
```

- [ ] **Step 3: Verify `.env.local` is still gitignored**

```bash
git check-ignore .env.local; echo "exit=$?"
```

Expected: `exit=0`.

- [ ] **Step 4: Commit only `.env.example`**

```bash
git add .env.example
git commit -m "Document RESEND_API_KEY and STRIPE_WEBHOOK_SECRET in .env.example"
```

---

## Phase 2 — Shared clients and helpers

### Task 3: Create shared Stripe + Resend clients

**Files:**
- Create: `lib/stripe.ts`
- Create: `lib/resend.ts`

- [ ] **Step 1: Create `lib/stripe.ts`**

```typescript
import "server-only";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

// Note: for *receiving* webhooks we don't actually need the secret key
// (we only use stripe.webhooks.constructEvent which uses the webhook
// secret instead). But exposing one shared client keeps things clean
// for any future API calls (e.g., refunds).
// API version is left as the SDK default so we don't need to track
// version literals as the SDK updates.
export const stripe = new Stripe(secretKey ?? "sk_unused_for_webhook_only");
```

- [ ] **Step 2: Create `lib/resend.ts`**

```typescript
import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  // Don't throw at module load — let the route handler fail with a clear
  // error if Resend is actually invoked without configuration.
  console.warn("RESEND_API_KEY is not set — confirmation emails will fail.");
}

export const resend = new Resend(apiKey ?? "");

export const FROM_EMAIL = "HER ENERGY <noreply@herenergy.cz>";
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/stripe.ts lib/resend.ts
git commit -m "Add shared Stripe and Resend server clients"
```

---

### Task 4: Add email-specific dictionary strings

**Files:**
- Modify: `dictionaries/cs.json`
- Modify: `dictionaries/en.json`
- Modify: `dictionaries/ru.json`

- [ ] **Step 1: Append to `dictionaries/cs.json`**

Insert these entries before the closing `}` (mind trailing commas — JSON does not allow a trailing comma on the last entry; add a comma after the current last entry):

```json
"Email subject — your ticket": "Tvoje vstupenka na HER energy DAY",
"Email preview text": "Vše, co potřebuješ vědět: program, místo a kdy přijít.",
"Hi": "Ahoj",
"Your spot at HER energy DAY is confirmed.": "Tvé místo na HER energy DAY je potvrzené.",
"Here's everything you need to know for the day.": "Tady je vše, co potřebuješ vědět na den akce.",
"Questions?": "Otázky?",
"Find us on Instagram": "Najdeš nás na Instagramu",
"Or email us at": "Nebo nám napiš na",
"See you there!": "Těšíme se na tebe!",
"Team HER ENERGY": "Tým HER ENERGY"
```

- [ ] **Step 2: Append to `dictionaries/en.json`**

Same structure, English values:

```json
"Email subject — your ticket": "Your ticket for HER energy DAY",
"Email preview text": "Everything you need to know: schedule, location, and what to bring.",
"Hi": "Hi",
"Your spot at HER energy DAY is confirmed.": "Your spot at HER energy DAY is confirmed.",
"Here's everything you need to know for the day.": "Here's everything you need to know for the day.",
"Questions?": "Questions?",
"Find us on Instagram": "Find us on Instagram",
"Or email us at": "Or email us at",
"See you there!": "See you there!",
"Team HER ENERGY": "Team HER ENERGY"
```

- [ ] **Step 3: Append to `dictionaries/ru.json`**

```json
"Email subject — your ticket": "Твой билет на HER energy DAY",
"Email preview text": "Всё, что нужно знать: программа, место и когда прийти.",
"Hi": "Привет",
"Your spot at HER energy DAY is confirmed.": "Твоё место на HER energy DAY забронировано.",
"Here's everything you need to know for the day.": "Вот всё, что нужно знать о дне мероприятия.",
"Questions?": "Вопросы?",
"Find us on Instagram": "Найди нас в Instagram",
"Or email us at": "Или напиши нам на",
"See you there!": "До встречи!",
"Team HER ENERGY": "Команда HER ENERGY"
```

- [ ] **Step 4: Verify JSON parses and all three files have matching key counts**

```bash
node -e "const fs=require('fs'); const counts={}; for (const l of ['cs','en','ru']) { const d=JSON.parse(fs.readFileSync('dictionaries/'+l+'.json','utf8')); counts[l]=Object.keys(d).length; } console.log(counts);"
```

Expected: same number for all three (e.g. `{ cs: 59, en: 59, ru: 59 }`). Mismatch means one file is missing a key or has an extra one.

- [ ] **Step 5: Commit**

```bash
git add dictionaries/cs.json dictionaries/en.json dictionaries/ru.json
git commit -m "Add email-specific dictionary keys for cs/en/ru"
```

---

### Task 5: Create email locale helper

**Files:**
- Create: `lib/email-locale.ts`

Responsibility: given a locale string from Stripe (which may be `null`, an unrecognized value, or a region variant like `en-US`), return a known `Locale` we can use to look up content + dictionary.

- [ ] **Step 1: Create the helper**

```typescript
import "server-only";
import { i18n, type Locale } from "@/i18n-config";

/**
 * Normalize a locale string (e.g., from Stripe Checkout Session) into one
 * of our supported locales. Defaults to cs.
 */
export function resolveLocale(input: string | null | undefined): Locale {
  if (!input) return i18n.defaultLocale;
  // Strip region suffix: "en-US" -> "en"
  const base = input.split("-")[0].toLowerCase();
  const supported = (i18n.locales as readonly string[]).includes(base);
  return (supported ? base : i18n.defaultLocale) as Locale;
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/email-locale.ts
git commit -m "Add resolveLocale helper for normalizing Stripe locale to our Locale type"
```

---

## Phase 3 — Email template

### Task 6: Build the React Email confirmation template

**Files:**
- Create: `emails/HerEnergyDayConfirmation.tsx`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p emails
```

- [ ] **Step 2: Create `emails/HerEnergyDayConfirmation.tsx`**

The template imports dictionaries directly (not via `useDictionary` — that's a client-side React hook; this template renders server-side via `@react-email/render`).

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import type { EventInfo, ScheduleItem } from "@/get-content";
import type { Locale } from "@/i18n-config";
import csDict from "@/dictionaries/cs.json";
import enDict from "@/dictionaries/en.json";
import ruDict from "@/dictionaries/ru.json";

const DICTS: Record<Locale, Record<string, string>> = {
  cs: csDict as Record<string, string>,
  en: enDict as Record<string, string>,
  ru: ruDict as Record<string, string>,
};

export type ConfirmationEmailProps = {
  customerName: string;
  lang: Locale;
  event: EventInfo;
  schedule: ScheduleItem[];
};

// Color palette mirrors the site (see globals.css):
//   ink:       #1a0f0d (dark background)
//   ink-soft:  #2a1a16
//   bone:      #f5ede4 (off-white text)
//   ember:     #d94a2b (accent)
//   wine:      #6b1e1e (HER pill)
const colors = {
  ink: "#1a0f0d",
  inkSoft: "#2a1a16",
  bone: "#f5ede4",
  boneDim: "rgba(245, 237, 228, 0.7)",
  boneFaint: "rgba(245, 237, 228, 0.5)",
  ember: "#d94a2b",
  wine: "#6b1e1e",
  border: "rgba(245, 237, 228, 0.15)",
};

const fonts = {
  display: "'Bebas Neue', 'Arial Narrow', Arial, sans-serif",
  serif: "'Bodoni Moda', 'Times New Roman', Georgia, serif",
  body: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
};

export default function HerEnergyDayConfirmation({
  customerName,
  lang,
  event,
  schedule,
}: ConfirmationEmailProps) {
  const dict = DICTS[lang] ?? DICTS.cs;
  const t = (key: string) => dict[key] ?? key;

  return (
    <Html lang={lang}>
      <Head />
      <Preview>{t("Email preview text")}</Preview>
      <Body
        style={{
          backgroundColor: colors.ink,
          color: colors.bone,
          fontFamily: fonts.body,
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            padding: "40px 24px",
          }}
        >
          {/* Brand line */}
          <Section style={{ marginBottom: "32px" }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.ember,
                margin: 0,
              }}
            >
              {t("Thanks for your reservation")}
            </Text>
          </Section>

          {/* Headline */}
          <Heading
            as="h1"
            style={{
              fontFamily: fonts.serif,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "36px",
              lineHeight: 1.1,
              color: colors.bone,
              margin: "0 0 16px 0",
            }}
          >
            {t("See you at HER energy DAY")}
          </Heading>

          {/* Greeting + intro */}
          <Text
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: colors.bone,
              margin: "0 0 12px 0",
            }}
          >
            {t("Hi")} {customerName},
          </Text>
          <Text
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: colors.boneDim,
              margin: "0 0 32px 0",
            }}
          >
            {t("Your spot at HER energy DAY is confirmed.")}{" "}
            {t("Here's everything you need to know for the day.")}
          </Text>

          {/* What you need to know */}
          <Section
            style={{
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.inkSoft,
              padding: "24px",
              marginBottom: "32px",
            }}
          >
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.boneDim,
                margin: "0 0 20px 0",
              }}
            >
              {t("What you need to know")}
            </Text>

            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: colors.boneFaint,
                margin: "0 0 4px 0",
              }}
            >
              {t("Date")}
            </Text>
            <Text
              style={{
                fontFamily: fonts.serif,
                fontSize: "22px",
                color: colors.ember,
                margin: "0 0 16px 0",
              }}
            >
              {event.fullDate}
            </Text>

            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: colors.boneFaint,
                margin: "0 0 4px 0",
              }}
            >
              {t("Location")}
            </Text>
            <Text
              style={{
                fontFamily: fonts.serif,
                fontSize: "18px",
                color: colors.bone,
                margin: "0 0 4px 0",
              }}
            >
              {t("Titan Gym · Ďáblická 2 · Prague")}
            </Text>
            <Text
              style={{
                fontSize: "13px",
                color: colors.boneDim,
                margin: "0 0 16px 0",
              }}
            >
              {t("Tram stop: Sídliště Ďáblice")}
            </Text>

            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: colors.boneFaint,
                margin: "0 0 4px 0",
              }}
            >
              {t("What to bring")}
            </Text>
            <Text
              style={{
                fontFamily: fonts.serif,
                fontSize: "16px",
                color: colors.bone,
                margin: 0,
              }}
            >
              {event.whatToBring}
            </Text>
          </Section>

          {/* Schedule */}
          <Section style={{ marginBottom: "32px" }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.boneDim,
                margin: "0 0 16px 0",
              }}
            >
              {t("Schedule for the day")}
            </Text>

            {schedule.map((it, i) => (
              <Section
                key={i}
                style={{
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderTop:
                    i === 0 ? "none" : `1px solid ${colors.border}`,
                }}
              >
                <table
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: "80px",
                          fontFamily: fonts.display,
                          fontSize: "22px",
                          letterSpacing: "0.06em",
                          color: i === 1 ? colors.boneFaint : colors.ember,
                          verticalAlign: "baseline",
                        }}
                      >
                        {it.time}
                      </td>
                      <td style={{ verticalAlign: "baseline" }}>
                        <div
                          style={{
                            fontFamily: fonts.serif,
                            fontSize: "18px",
                            color: colors.bone,
                            lineHeight: 1.2,
                          }}
                        >
                          {it.title}
                        </div>
                        <div
                          style={{
                            fontFamily: fonts.display,
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: colors.boneDim,
                            marginTop: "4px",
                          }}
                        >
                          {it.host}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>
            ))}
          </Section>

          <Hr style={{ borderColor: colors.border, margin: "32px 0" }} />

          {/* Contact info */}
          <Section style={{ marginBottom: "24px" }}>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: colors.boneDim,
                margin: "0 0 12px 0",
              }}
            >
              {t("Questions?")}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: colors.bone,
                margin: "0 0 6px 0",
              }}
            >
              {t("Find us on Instagram")}:{" "}
              <Link
                href="https://www.instagram.com/her__energy/"
                style={{ color: colors.ember, textDecoration: "underline" }}
              >
                @her__energy
              </Link>
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: colors.bone,
                margin: 0,
              }}
            >
              {t("Or email us at")}:{" "}
              <Link
                href="mailto:herenergyclass@gmail.com"
                style={{ color: colors.ember, textDecoration: "underline" }}
              >
                herenergyclass@gmail.com
              </Link>
            </Text>
          </Section>

          {/* Signoff */}
          <Section style={{ marginTop: "32px" }}>
            <Text
              style={{
                fontFamily: fonts.serif,
                fontStyle: "italic",
                fontSize: "18px",
                color: colors.bone,
                margin: "0 0 8px 0",
              }}
            >
              {t("See you there!")}
            </Text>
            <Text
              style={{
                fontFamily: fonts.display,
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: colors.boneDim,
                margin: 0,
              }}
            >
              {t("Team HER ENERGY")}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Sample preview props for `npm run email:dev`
HerEnergyDayConfirmation.PreviewProps = {
  customerName: "Anna",
  lang: "cs",
  event: {
    shortDate: "30 · 5 · 26",
    fullDate: "Sobota 30. května 2026",
    price: "1190 Kč",
    whatToBring: "Pohodlné oblečení, ručník, láhev na vodu a dobrou náladu.",
  },
  schedule: [
    { time: "12:00", title: "Boxing Rave", host: "Kateřina Čavajdová" },
    { time: "13:00", title: "Lunch & Coffee Break", host: "Vaření a ochutnávka s Termomixem" },
    { time: "14:00", title: "Kamasutra Yoga", host: "Yuliya Arkhiyereyeva" },
  ],
} satisfies ConfirmationEmailProps;
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors. If JSON imports complain, ensure `tsconfig.json` has `"resolveJsonModule": true` (it already does).

- [ ] **Step 4: Preview the email in a browser**

```bash
npm run email:dev
```

Open http://localhost:3001 in a browser. You should see the email rendered with the preview props (Czech version, customer name "Anna"). Verify:
- Dark background, ember accent, bone text
- Headline in serif italic
- Schedule lists Boxing 12:00 (ember), Lunch 13:00 (greyed), Yoga 14:00 (ember)
- Instagram link + email link visible

Iterate on the design here if you want tweaks. **Ctrl+C** to stop the preview server when done.

- [ ] **Step 5: Commit**

```bash
git add emails/HerEnergyDayConfirmation.tsx
git commit -m "Add HerEnergyDayConfirmation React Email template"
```

---

## Phase 4 — Webhook handler

### Task 7: Create the Stripe webhook route

**Files:**
- Create: `app/api/stripe-webhook/route.ts`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p "app/api/stripe-webhook"
```

- [ ] **Step 2: Create `app/api/stripe-webhook/route.ts`**

```typescript
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { render } from "@react-email/render";
import HerEnergyDayConfirmation from "@/emails/HerEnergyDayConfirmation";
import { getContent } from "@/get-content";
import { resolveLocale } from "@/lib/email-locale";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import csDict from "@/dictionaries/cs.json";
import enDict from "@/dictionaries/en.json";
import ruDict from "@/dictionaries/ru.json";

const DICTS: Record<string, Record<string, string>> = {
  cs: csDict as Record<string, string>,
  en: enDict as Record<string, string>,
  ru: ruDict as Record<string, string>,
};

export const runtime = "nodejs";
// Webhook handlers must read the raw request body to verify the signature.
// Disable Next.js's automatic body parsing.
export const dynamic = "force-dynamic";

// In-memory dedup. Survives short Stripe retry windows on the same Node
// process. A redeploy clears it (acceptable for this event's scale —
// see spec under "Idempotency").
const processedEventIds = new Set<string>();

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("Missing Stripe-Signature header or STRIPE_WEBHOOK_SECRET");
    return new NextResponse("Bad request", { status: 400 });
  }

  // Raw body is required for signature verification.
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // Dedup: skip events we've already processed in this process.
  if (processedEventIds.has(event.id)) {
    return NextResponse.json({ received: true, deduped: true });
  }

  // Only handle the one event type we care about.
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const customerEmail = session.customer_details?.email ?? session.customer_email;
  const customerName = session.customer_details?.name ?? "";
  const locale = resolveLocale(session.locale);

  if (!customerEmail) {
    console.error("Checkout session has no customer email", { sessionId: session.id });
    // 200 — Stripe retrying won't help, no email to send to.
    processedEventIds.add(event.id);
    return NextResponse.json({ received: true, error: "no-email" });
  }

  try {
    const { event: eventInfo, schedule } = await getContent(locale);

    const html = await render(
      HerEnergyDayConfirmation({
        customerName: customerName || "",
        lang: locale,
        event: eventInfo,
        schedule,
      }),
    );

    // Dictionary lookup for the subject line (same dictionaries used by the template).
    const subject =
      DICTS[locale]?.["Email subject — your ticket"] ??
      "Your ticket for HER energy DAY";

    const sendResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      subject,
      html,
    });

    if (sendResult.error) {
      console.error("Resend send failed", sendResult.error);
      // Return 5xx so Stripe retries.
      return new NextResponse("Email send failed", { status: 500 });
    }

    processedEventIds.add(event.id);
    return NextResponse.json({ received: true, emailId: sendResult.data?.id });
  } catch (err) {
    console.error("Unexpected error processing webhook", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify build succeeds**

```bash
npm run build
```

Expected: clean build, with `/api/stripe-webhook` listed as a route in the output.

- [ ] **Step 5: Commit**

```bash
git add app/api/stripe-webhook/route.ts lib/email-locale.ts
git commit -m "Add Stripe webhook handler that sends Resend confirmation email"
```

---

## Phase 5 — Local testing

### Task 8: Test the full flow locally with Stripe CLI

This task requires the Stripe CLI installed. On macOS: `brew install stripe/stripe-cli/stripe`. First-time use: `stripe login`.

- [ ] **Step 1: Start the dev server**

In terminal A, from the repo root:

```bash
npm run dev
```

Wait for "Ready", server runs at http://localhost:3000.

- [ ] **Step 2: Start the Stripe CLI webhook forwarder**

In terminal B:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Output will include a line like:

```
Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxxxxxxxxxxxxx
```

**Copy that `whsec_…` value.**

- [ ] **Step 3: Update `.env.local` with the CLI's webhook secret**

In `.env.local`, set `STRIPE_WEBHOOK_SECRET` to the value from Step 2. Save the file. **Restart the dev server** (Ctrl+C in terminal A, then `npm run dev` again) so Next.js picks up the new env value.

- [ ] **Step 4: Trigger a real test purchase against the sandbox**

In a new browser tab, ensure your `.env.local` `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` is set to the **sandbox** URL. (If it's currently set to live, temporarily swap it.)

Open http://localhost:3000/cs, scroll to the HER energy DAY card, click **Rezervovat**.

On Stripe Checkout, pay with test card `4242 4242 4242 4242`, expiry any future date, CVC `123`, name `Test Buyer`, **email = your real inbox**.

Click Pay.

- [ ] **Step 5: Verify the webhook fired and email was sent**

Watch terminal B (Stripe CLI). You should see a line like:

```
2026-05-13 12:34:56  --> checkout.session.completed [evt_...]
2026-05-13 12:34:56  <-- [200] POST http://localhost:3000/api/stripe-webhook
```

Watch terminal A (dev server). No errors should appear.

Check your real inbox within ~1 minute. You should receive:
- **From:** HER ENERGY <noreply@herenergy.cz>
- **Subject:** Tvoje vstupenka na HER energy DAY (Czech, because checkout was in Czech)
- **Body:** branded HTML with date, location, schedule, IG + email contact, signoff

Verify the rendering looks right. If the email doesn't arrive, check:
- Resend dashboard → **Emails** — should show the send attempt and any error
- Dev server logs — look for "Resend send failed" or "Stripe webhook signature verification failed"

- [ ] **Step 6: Test locale handling**

Visit http://localhost:3000/en, do another test purchase. Email should arrive in English with subject "Your ticket for HER energy DAY".

Visit http://localhost:3000/ru, do another test purchase. Email should arrive in Russian with subject "Твой билет на HER energy DAY".

- [ ] **Step 7: Test idempotency**

In terminal B, trigger a duplicate event manually:

```bash
stripe events resend evt_xxxxxxxxxxxxxxxxxxxx
```

(use the event ID from Step 5's output, starts with `evt_…`)

Watch the dev server — it should respond `{ received: true, deduped: true }` and **not** send a second email. Your inbox should not get a duplicate.

- [ ] **Step 8: Stop both servers and commit any tweaks**

Ctrl+C in both terminals.

If you needed to adjust anything during testing, commit those fixes:

```bash
git status
# review changes
git add <changed files>
git commit -m "..."
```

If no tweaks were needed, no commit needed.

---

## Phase 6 — Production deployment

**Do not proceed past this point until Task 8 (local sandbox testing) passes end-to-end.**

### Task 9: Set up live Stripe webhook + Deployik env vars

- [ ] **Step 1: Register the live webhook in Stripe**

Stripe **Live mode** dashboard (top-right toggle — make sure you're NOT in sandbox):

1. Left sidebar → **Developers → Webhooks** → **Add endpoint**
2. **Endpoint URL:** `https://herenergy.cz/api/stripe-webhook`
3. **Description:** `HER energy DAY confirmation email`
4. **Events to send:** click **Select events**, search for and check **`checkout.session.completed`** (only that one)
5. **Add endpoint**

On the next screen, Stripe shows the **Signing secret** (starts with `whsec_…`). **Click "Reveal" and copy it.**

- [ ] **Step 2: Set env vars in Deployik Production**

Deployik → herenergy-web → **Settings → Environments / Variables → Production**:

Add two new variables:

- **Key:** `RESEND_API_KEY`
  **Value:** Olivia's Resend API key (the `re_…` from Resend dashboard)

- **Key:** `STRIPE_WEBHOOK_SECRET`
  **Value:** the `whsec_…` from Step 1

Save.

- [ ] **Step 3: Merge feature branch to main and push**

(If you've been working on a feature branch — otherwise commits are already on main and you can skip the merge.)

```bash
git checkout main
git merge --no-ff <feature-branch> -m "Merge confirmation-email branch"
git push origin main
```

- [ ] **Step 4: Trigger production deploy in Deployik**

Click **Deploy production** in Deployik. Watch the build log. Expected: clean build in ~50–60s, deployment status Live.

The build will pick up the new env vars at build time (note: `RESEND_API_KEY` and `STRIPE_WEBHOOK_SECRET` are server-side only — they're read at runtime, not embedded into the client bundle, so no `NEXT_PUBLIC_` prefix is needed).

---

### Task 10: Production smoke test

- [ ] **Step 1: Buy a real ticket on production**

Open https://herenergy.cz/cs in an incognito window. Click Rezervovat. Pay with your **real** card. Use your real email.

- [ ] **Step 2: Verify the webhook fired**

Stripe Live → **Developers → Webhooks → click your endpoint → Webhook attempts** tab. Within ~1 minute you should see a `checkout.session.completed` attempt with status **Succeeded** (200 response).

If it shows a non-200 status, click the row to see the response body and check Deployik logs for the error.

- [ ] **Step 3: Verify the email arrived**

Within ~1 minute of payment, the confirmation email should land in your real inbox.

- ✅ From: **HER ENERGY <noreply@herenergy.cz>** (not Resend's domain)
- ✅ Subject in Czech (since you used /cs)
- ✅ Branded HTML rendered correctly (dark theme, ember accent)
- ✅ Date, location, schedule (Boxing 12:00 / Lunch 13:00 / Yoga 14:00), what to bring
- ✅ Instagram link goes to https://www.instagram.com/her__energy/
- ✅ Email link goes to mailto:herenergyclass@gmail.com

If something's wrong, check **Resend dashboard → Emails** for delivery status and rendered HTML.

- [ ] **Step 4: Refund yourself**

Stripe Live → **Payments** → find your transaction → **Refund**. Confirm full refund.

The Stripe auto-refund receipt will arrive. No custom refund email is sent (by design).

- [ ] **Step 5: Final verification**

Confirm:
- ✅ Real customers can now buy tickets at https://herenergy.cz/cs and receive a branded confirmation email
- ✅ Locale matches the buyer's site language (test cs/en/ru if you want extra coverage)
- ✅ Stripe webhook page in Live dashboard shows green Succeeded status

🎉 **Feature complete.**

---

## Out of scope (per spec)

- Branded refund email — rely on Stripe's auto-refund receipt
- Reminder emails (e.g., "your event is tomorrow")
- Admin page to manually resend confirmation emails
- Database-backed processed-events table (in-memory dedup is sufficient for this scale)
- Email opens / clicks analytics
- Newsletter or non-transactional emails

Do not add any of these as bonus work. If the user requests them, brainstorm a separate v2.1.
