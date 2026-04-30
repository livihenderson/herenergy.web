"use client";

import { useDictionary } from "./DictionaryProvider";
import { LocaleLink } from "./LocaleLink";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const { t } = useDictionary();
  return (
    <footer className="relative bg-ink text-bone overflow-hidden">
      <div className="grain-light grain absolute inset-0 pointer-events-none" />
      {/* Giant whisper word */}
      <div
        aria-hidden
        className="select-none pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 font-serif italic text-[28vw] leading-none text-bone/[0.04] whitespace-nowrap"
      >
        her energy
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <BrandMark size="lg" invert />
            <p className="mt-6 font-serif italic text-2xl leading-snug max-w-md text-bone/85">
              {t("Strength in sensuality. Sensuality in strength.")}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-display tracking-[0.2em] text-[11px] uppercase text-bone/50">
              {t("Contact")}
            </div>
            <ul className="mt-4 space-y-2 text-bone/80">
              <li>Titan Gym</li>
              <li>Ďáblická 2, Praha</li>
              <li>{t("Tram stop: Sídliště Ďáblice")}</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-display tracking-[0.2em] text-[11px] uppercase text-bone/50">
              {t("Follow")}
            </div>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  className="link-fancy font-serif text-2xl"
                  href="https://www.instagram.com/cavajda_thephoenix/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  @cavajda_thephoenix
                </a>
              </li>
              <li>
                <a
                  className="link-fancy font-serif text-2xl"
                  href="https://www.instagram.com/owl_s_mommy/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  @owl_s_mommy
                </a>
              </li>
              <li>
                <LocaleLink href="/akce" className="link-fancy text-bone/80">
                  {t("Other events")}
                </LocaleLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-bone/15 flex flex-col md:flex-row justify-between gap-4 text-bone/50 text-xs font-display tracking-[0.2em] uppercase">
          <div className="flex flex-col gap-1">
            <span>{t("© 2026 HER ENERGY. All rights reserved.")}</span>
            <span>Designed and created by Olivia</span>
          </div>
          <span>Praha · 2026</span>
        </div>
      </div>
    </footer>
  );
}
