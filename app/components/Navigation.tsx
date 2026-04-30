"use client";

import { useEffect, useState } from "react";
import { useDictionary } from "./DictionaryProvider";
import { LocaleLink } from "./LocaleLink";
import { BrandMark } from "./BrandMark";
import { LocaleToggle } from "./LocaleToggle";

export function Navigation() {
  const { t } = useDictionary();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "bg-bone/85 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <LocaleLink href="/" className="flex items-center" aria-label="HER ENERGY">
          <BrandMark size="md" />
        </LocaleLink>

        <nav className="hidden md:flex items-center gap-10">
          <LocaleLink href="/" className="link-fancy font-display tracking-[0.18em] text-[12px] uppercase">
            {t("Home")}
          </LocaleLink>
          <LocaleLink
            href="/akce"
            className="link-fancy font-display tracking-[0.18em] text-[12px] uppercase"
          >
            {t("Other events")}
          </LocaleLink>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleToggle />
          <LocaleLink
            href="/#rezervace"
            className="hidden md:inline-flex items-center gap-2 bg-ink text-bone px-4 py-2 font-display tracking-[0.2em] text-[11px] uppercase hover:bg-wine transition-colors"
          >
            {t("Reserve")}
          </LocaleLink>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 inline-flex flex-col items-center justify-center gap-1.5 border border-ink/20 rounded-full"
          >
            <span className={`w-4 h-px bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`w-4 h-px bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-bone border-t border-ink/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            <LocaleLink href="/" onClick={() => setOpen(false)} className="font-serif text-2xl">
              {t("Home")}
            </LocaleLink>
            <LocaleLink href="/akce" onClick={() => setOpen(false)} className="font-serif text-2xl">
              {t("Other events")}
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
