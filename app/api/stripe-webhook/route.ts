import { NextResponse } from "next/server";
import Stripe from "stripe";
import { render } from "@react-email/render";
import HerEnergyDayConfirmation from "@/emails/HerEnergyDayConfirmation";
import { getContent } from "@/get-content";
import { resolveLocale } from "@/lib/email-locale";
import { getResend, FROM_EMAIL } from "@/lib/resend";
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

    const sendResult = await getResend().emails.send({
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
