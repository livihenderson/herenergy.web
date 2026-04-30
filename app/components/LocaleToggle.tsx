"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { i18n, type Locale } from "@/i18n-config";
import { getLocalizedRoute, stripLocaleFromPath } from "@/lib/route-utils";

const OPTIONS: { code: Locale; label: string }[] = [
  { code: "cs", label: "CZ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export function LocaleToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ lang?: string }>();
  const current = ((params?.lang as Locale | undefined) ??
    i18n.defaultLocale) as Locale;
  const isDark = tone === "dark";

  const switchTo = (next: Locale) => {
    if (next === current) return;
    const bare = stripLocaleFromPath(pathname || "/");
    router.push(getLocalizedRoute(bare, next));
  };

  return (
    <div
      className={`inline-flex items-center gap-1 border ${
        isDark ? "border-ink/30" : "border-bone/30"
      } rounded-full px-1 py-1 font-display tracking-[0.18em] text-[11px] uppercase`}
    >
      {OPTIONS.map((opt) => {
        const active = current === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => switchTo(opt.code)}
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
