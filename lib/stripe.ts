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
