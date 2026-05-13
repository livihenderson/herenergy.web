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
