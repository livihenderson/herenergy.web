"use client";

import { useDictionary } from "./DictionaryProvider";

const reviews = [
  "/recenze1.jpg",
  "/recenze2.jpg",
  "/recenze3.jpg",
  "/recenze4.jpg",
];

export function Reviews() {
  const { t } = useDictionary();
  return (
    <section className="relative bg-bone-warm py-28 md:py-36 overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-6xl leading-[0.95] text-ink max-w-2xl">
            {t("What women say about HER ENERGY")}
          </h2>
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
            05 — {t("Reviews")}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-start">
          {reviews.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="block w-full h-auto mix-blend-multiply"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
