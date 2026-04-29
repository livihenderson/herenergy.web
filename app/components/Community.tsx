"use client";

import { useLocale } from "../lib/LocaleProvider";
import { copy } from "../lib/copy";

export function Community() {
  const { t } = useLocale();
  return (
    <section className="relative bg-bone py-28 md:py-36 overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
              04 — {t(copy.community.eyebrow)}
            </div>
            <h2 className="mt-5 font-serif text-5xl md:text-7xl leading-[0.92] text-ink">
              {t(copy.community.title)}
            </h2>
            <p className="mt-6 max-w-xl text-lg md:text-xl text-ink/80 leading-relaxed">
              {t(copy.community.body)}
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                "/dychani.jpg",
                "/punch.jpg",
                "/zebrik.jpg",
                "/ramena.jpg",
              ].map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden ${i % 2 ? "translate-y-6" : ""}`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
