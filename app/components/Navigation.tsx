"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDictionary } from "./DictionaryProvider";
import { LocaleLink } from "./LocaleLink";
import { BrandMark } from "./BrandMark";
import { LocaleToggle } from "./LocaleToggle";
import { stripLocaleFromPath } from "@/lib/route-utils";

export function Navigation() {
  const { t } = useDictionary();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkPage = stripLocaleFromPath(pathname || "/") === "/box";

  const headerBg = scrolled
    ? isDarkPage
      ? "bg-ink/85 backdrop-blur-md border-b border-bone/10"
      : "bg-bone/85 backdrop-blur-md border-b border-ink/10"
    : "bg-transparent";

  const linkColor = isDarkPage ? "text-bone" : "text-ink";
  const reserveBtn = isDarkPage
    ? "bg-bone text-ink hover:bg-wine hover:text-bone"
    : "bg-ink text-bone hover:bg-wine";
  const hamburgerBorder = isDarkPage ? "border-bone/30" : "border-ink/20";
  const hamburgerBar = isDarkPage ? "bg-bone" : "bg-ink";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${headerBg}`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <LocaleLink href="/" className="flex items-center" aria-label="HER ENERGY">
          <BrandMark size="md" invert={isDarkPage} />
        </LocaleLink>

        <nav className={`hidden md:flex items-center gap-10 ${linkColor}`}>
          <LocaleLink href="/" className="link-fancy font-display tracking-[0.18em] text-[12px] uppercase">
            {t("Home")}
          </LocaleLink>
          <LocaleLink
            href="/box"
            className="link-fancy font-display tracking-[0.18em] text-[12px] uppercase"
          >
            {t("Box")}
          </LocaleLink>
          <LocaleLink
            href="/yoga"
            className="link-fancy font-display tracking-[0.18em] text-[12px] uppercase"
          >
            {t("Kamasutra Yoga")}
          </LocaleLink>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleToggle tone={isDarkPage ? "light" : "dark"} />
          <LocaleLink
            href="/#rezervace"
            className={`hidden md:inline-flex items-center gap-2 px-4 py-2 font-display tracking-[0.2em] text-[11px] uppercase transition-colors ${reserveBtn}`}
          >
            {t("Reserve")}
          </LocaleLink>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden w-10 h-10 inline-flex flex-col items-center justify-center gap-1.5 border rounded-full ${hamburgerBorder}`}
          >
            <span className={`w-4 h-px transition-transform ${hamburgerBar} ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`w-4 h-px transition-transform ${hamburgerBar} ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-bone border-t border-ink/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            <LocaleLink href="/" onClick={() => setOpen(false)} className="font-serif text-2xl text-ink">
              {t("Home")}
            </LocaleLink>
            <LocaleLink href="/box" onClick={() => setOpen(false)} className="font-serif text-2xl text-ink">
              {t("Box")}
            </LocaleLink>
            <LocaleLink href="/yoga" onClick={() => setOpen(false)} className="font-serif text-2xl text-ink">
              {t("Kamasutra Yoga")}
            </LocaleLink>
            <LocaleLink
              href="/#rezervace"
              onClick={() => setOpen(false)}
              className="inline-flex w-fit items-center gap-2 bg-ink text-bone px-4 py-2 font-display tracking-[0.2em] text-[11px] uppercase"
            >
              {t("Reserve")}
            </LocaleLink>
          </div>
        </div>
      )}
    </header>
  );
}
