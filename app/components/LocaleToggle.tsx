"use client";

import { useLocale } from "../lib/LocaleProvider";
import type { Locale } from "../lib/copy";

const OPTIONS: { code: Locale; label: string }[] = [
  { code: "cs", label: "CZ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export function LocaleToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, setLocale } = useLocale();
  const isDark = tone === "dark";

  return (
    <div
      className={`inline-flex items-center gap-1 border ${
        isDark ? "border-ink/30" : "border-bone/30"
      } rounded-full px-1 py-1 font-display tracking-[0.18em] text-[11px] uppercase`}
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code)}
            aria-pressed={active}
            className={`px-3 py-1 rounded-full transition-colors ${
              active
                ? "bg-wine text-bone"
                : isDark
                ? "text-ink/40 hover:text-ink"
                : "text-bone/40 hover:text-bone"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
