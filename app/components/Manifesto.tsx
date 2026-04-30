"use client";

import { useDictionary } from "./DictionaryProvider";

const MANIFESTO_LINES = [
  "HER ENERGY connects women through movement, emotion and energy.",
  "It’s not just about training — it’s about how you feel and who you share it with.",
  "From boxing and flow to dance, creativity and more.",
  "We’re building a community of women who want more.",
] as const;

export function Manifesto() {
  const { t } = useDictionary();
  return (
    <section id="manifest" className="relative bg-bone py-28 md:py-40 overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />
      {/* Giant outline word in background */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-10 flex justify-center pointer-events-none select-none"
      >
        <span
          className="font-serif italic font-light text-[22vw] leading-none text-transparent"
          style={{ WebkitTextStroke: "1px rgba(91,31,46,0.10)" }}
        >
          manifest
        </span>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <div className="flex items-center gap-3 font-display tracking-[0.4em] text-[11px] uppercase text-wine">
          <span className="inline-block w-8 h-px bg-wine" />
          {t("Manifesto")}
        </div>

        <div className="mt-10 space-y-8">
          {MANIFESTO_LINES.map((line, i) => (
            <p
              key={i}
              className={`font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight ${
                i === 0 ? "dropcap text-ink" : i % 2 === 1 ? "italic text-wine pl-0 md:pl-16" : "text-ink pl-0 md:pl-32"
              }`}
            >
              {t(line)}
            </p>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-end gap-6 justify-between">
          <p className="max-w-xl font-display tracking-[0.18em] uppercase text-sm md:text-base text-ink/80">
            {t("HER ENERGY events — a strong community of women.")}
          </p>
          <span className="font-serif italic text-wine text-lg">
            — HER ENERGY
          </span>
        </div>
      </div>
    </section>
  );
}
