import "server-only";
import { Resend } from "resend";

let resendInstance: Resend | null = null;

/**
 * Lazily construct the Resend client. The SDK throws if the API key
 * is missing at construction time — but Next.js imports server modules
 * during the build (for route collection), and env vars may not be
 * available then. By deferring construction we avoid build-time failures
 * and only fail at actual send time if the key is missing.
 */
export function getResend(): Resend {
  if (resendInstance) return resendInstance;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set — cannot send confirmation emails.",
    );
  }
  resendInstance = new Resend(apiKey);
  return resendInstance;
}

export const FROM_EMAIL = "HER ENERGY <noreply@herenergy.cz>";
