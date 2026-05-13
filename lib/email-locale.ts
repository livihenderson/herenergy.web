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
