"use client";

import { useLocale } from "../lib/LocaleProvider";

export function LocaleToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, setLocale } = useLocale();
  const isDark = tone === "dark";

  return (
    <div
      className={`inline-flex items-center gap-1 border ${
        isDark ? "border-ink/30" : "border-bone/30"
      } rounded-full px-1 py-1 font-display tracking-[0.18em] text-[11px] uppercase`}
    >
      <button
        type="button"
        onClick={() => setLocale("cs")}
        aria-pressed={locale === "cs"}
        className={`px-3 py-1 rounded-full transition-colors ${
          locale === "cs"
            ? "bg-wine text-bone"
            : isDark
            ? "text-ink/40 hover:text-ink"
            : "text-bone/40 hover:text-bone"
        }`}
      >
        CZ
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`px-3 py-1 rounded-full transition-colors ${
          locale === "en"
            ? "bg-wine text-bone"
            : isDark
            ? "text-ink/40 hover:text-ink"
            : "text-bone/40 hover:text-bone"
        }`}
      >
        EN
      </button>
    </div>
  );
}
