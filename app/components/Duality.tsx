"use client";

import { useDictionary } from "./DictionaryProvider";

export function Duality() {
  const { t } = useDictionary();
  return (
    <section className="relative">
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        {/* Soft side */}
        <div className="relative md:bg-blush/60 overflow-hidden min-h-[80vh] flex flex-col justify-end p-10 md:p-16">
          <div className="grain absolute inset-0 pointer-events-none hidden md:block" />

          {/* Mobile: full-width raw image. Desktop: w-2/3 with feathered inner edge + multiply blend */}
          <img
            src="/kamasutra_joga.jpg"
            alt="Kamasutra Yoga"
            className="absolute right-0 top-0 h-full w-full md:w-2/3 object-cover object-center md:mix-blend-multiply md:opacity-85"
          />
          {/* Inner-edge mask only on desktop */}
          <div
            aria-hidden
            className="hidden md:block absolute right-0 top-0 h-full w-2/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(243,236,227,0) 0%, rgba(243,236,227,0) 55%, rgba(233,196,188,0.9) 100%)",
            }}
          />
          {/* Desktop blush wash */}
          <div className="pointer-events-none absolute inset-0 hidden md:block bg-gradient-to-r from-blush/20 via-transparent to-blush/40 mix-blend-multiply" />
          {/* Mobile bottom contrast for text */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 md:hidden bg-gradient-to-t from-bone via-bone/70 to-transparent" />

          <div className="relative max-w-md">
            <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
              01 — {t("Sensuality")}
            </div>
            <h3 className="mt-4 font-serif italic text-5xl md:text-6xl text-ink leading-[0.95]">
              {t("Sensuality")}.
            </h3>
            <p className="mt-6 text-lg text-ink/80 leading-relaxed">
              {t("Tenderness, breath, femininity. Kamasutra yoga opens body and mind — slow, deep, true.")}
            </p>
          </div>
        </div>

        {/* Strong side */}
        <div className="relative md:bg-ink text-bone overflow-hidden min-h-[80vh] flex flex-col justify-end p-10 md:p-16">
          <div className="grain absolute inset-0 pointer-events-none hidden md:block" />

          <img
            src="/box_beztextu.png"
            alt="Box · Phoenix"
            className="absolute left-0 top-0 h-full w-full md:w-2/3 object-cover object-center md:opacity-95 md:saturate-90"
          />
          {/* Desktop inner-edge fade and washes */}
          <div
            aria-hidden
            className="hidden md:block absolute left-0 top-0 h-full w-2/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(12,8,9,0) 0%, rgba(12,8,9,0) 55%, rgba(12,8,9,0.95) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 hidden md:block bg-wine-deep/15 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 hidden md:block bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

          {/* Mobile bottom contrast for text */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 md:hidden bg-gradient-to-t from-ink via-ink/70 to-transparent" />

          <div className="relative max-w-md ml-auto text-right">
            <div className="font-display tracking-[0.4em] text-[11px] uppercase text-ember">
              02 — {t("Strength")}
            </div>
            <h3 className="mt-4 font-display tracking-[0.04em] text-6xl md:text-7xl text-bone leading-[0.9] uppercase">
              {t("Strength")}
            </h3>
            <p className="mt-6 text-lg text-bone/80 leading-relaxed">
              {t("Boxing as a ritual of resolve. Punches, breath, sweat. You’ll find a fighter you didn’t know was in you.")}
            </p>
          </div>
        </div>

        {/* Soft seam — narrow gradient that bridges blush to ink without muddy backdrop blur (desktop only) */}
        <div
          aria-hidden
          className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[8%] max-w-[120px] z-[2] bg-gradient-to-r from-transparent via-wine-deep/20 to-transparent"
        >
          <div className="absolute inset-y-[10%] left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-ember/40 to-transparent" />
        </div>
      </div>

      {/* Marquee divider — brand tokens, intentionally untranslated */}
      <div className="bg-wine text-bone overflow-hidden border-y border-bone/20">
        <div className="ticker-track flex whitespace-nowrap py-5 font-display tracking-[0.4em] text-sm uppercase">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {[
                "Her Energy",
                "Box",
                "Kamasutra Yoga",
                "Komunita",
                "Her Energy",
                "Flow",
                "Phoenix",
                "Praha",
              ].map((w, i) => (
                <span key={i} className="px-8 inline-flex items-center gap-8">
                  {w}
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-ember" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
