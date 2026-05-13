"use client";

import type { ReactNode } from "react";
import { useDictionary } from "./DictionaryProvider";
import { LocaleLink } from "./LocaleLink";

type Pillar = {
  title: string;
  body: string;
  icon: ReactNode;
};

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const pillars: Pillar[] = [
  {
    title: "Feminine energy",
    body: "A space where strength, femininity and confidence come together.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    title: "Movement",
    body: "Boxing, yoga and functional training that strengthen you.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M8 4h7a3 3 0 0 1 3 3v3a4 4 0 0 1-4 4h-2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M10 14v-3" />
      </svg>
    ),
  },
  {
    title: "Wellness",
    body: "Care for body and mind that recharges you from within.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M12 21c-3-3-6-6-6-10a4 4 0 0 1 6-3 4 4 0 0 1 6 3c0 4-3 7-6 10Z" />
        <path d="M12 8v13" />
        <path d="M6 13c2 1 4 1 6 0" />
        <path d="M12 13c2 1 4 1 6 0" />
      </svg>
    ),
  },
  {
    title: "Community",
    body: "A sisterhood, support and new friendships.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
        <path d="M14 19c.3-2 1.7-3.5 4-3.5S22 17 22 19" />
      </svg>
    ),
  },
  {
    title: "Safe space",
    body: "A place where you can be yourself and grow at your own pace.",
    icon: (
      <svg {...ICON_PROPS} aria-hidden>
        <path d="M12 21s-7-4-7-10V6l7-3 7 3v5c0 6-7 10-7 10Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const cardSpan = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-6",
  "md:col-span-6",
];

export function WhatIsHerEnergy() {
  const { t } = useDictionary();
  return (
    <section className="relative bg-bone-warm py-24 md:py-32 overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* faint outline background word */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-6 md:top-4 flex justify-center pointer-events-none select-none"
      >
        <span
          className="font-serif italic font-light text-[22vw] leading-none text-transparent whitespace-nowrap"
          style={{ WebkitTextStroke: "1px rgba(91,31,46,0.08)" }}
        >
          her energy
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div>
            <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
              {t("What is")}
            </div>
            <h2 className="mt-3 font-serif text-5xl md:text-7xl leading-[0.9] text-ink">
              HER ENERGY
            </h2>
          </div>
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
            {t("Five pillars")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {pillars.map((p, i) => {
            const isHero = i === 0;
            return (
              <article
                key={p.title}
                className={`group relative overflow-hidden ${cardSpan[i]} ${
                  isHero
                    ? "bg-wine text-bone p-8 md:p-12 min-h-[320px] md:min-h-[420px]"
                    : "bg-bone text-ink p-7 md:p-9 border border-ink/5"
                } transition-transform duration-300 hover:-translate-y-1`}
              >
                {/* huge number */}
                <span
                  aria-hidden
                  className={`absolute -top-2 -right-2 md:top-2 md:right-4 font-serif italic font-light leading-none select-none ${
                    isHero
                      ? "text-[10rem] md:text-[14rem] text-bone/10"
                      : "text-[7rem] md:text-[9rem] text-wine/10"
                  }`}
                >
                  0{i + 1}
                </span>

                <div className="relative flex flex-col h-full">
                  <div
                    className={`inline-flex items-center justify-center rounded-full mb-6 ${
                      isHero
                        ? "w-16 h-16 md:w-20 md:h-20 border border-bone/40 text-bone"
                        : "w-12 h-12 border border-wine/40 text-wine"
                    }`}
                  >
                    <div
                      className={isHero ? "w-9 h-9 md:w-11 md:h-11" : "w-6 h-6"}
                    >
                      {p.icon}
                    </div>
                  </div>

                  <div
                    className={`font-display tracking-[0.32em] uppercase ${
                      isHero ? "text-bone/70 text-[12px]" : "text-wine text-[11px]"
                    }`}
                  >
                    0{i + 1} — {t(p.title)}
                  </div>

                  <h3
                    className={`mt-3 font-serif leading-[1.05] ${
                      isHero
                        ? "text-4xl md:text-6xl text-bone"
                        : "text-2xl md:text-3xl text-ink"
                    }`}
                  >
                    {t(p.title)}
                  </h3>

                  <p
                    className={`mt-5 leading-relaxed ${
                      isHero
                        ? "text-bone/85 text-lg md:text-xl max-w-md"
                        : "text-ink/75 text-base max-w-sm"
                    } ${isHero ? "" : "mt-auto pt-2"}`}
                  >
                    {t(p.body)}
                  </p>

                  {isHero && (
                    <blockquote className="mt-auto pt-8 border-t border-bone/20 font-serif italic text-bone/90 text-lg md:text-2xl leading-snug max-w-md">
                      “{t("HER ENERGY connects women through movement, emotion and energy.")}”
                    </blockquote>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 md:mt-20 flex flex-col items-center gap-4">
          <LocaleLink
            href="/#rezervace"
            className="group inline-flex items-center gap-3 bg-ink text-bone px-8 py-4 font-display tracking-[0.3em] text-xs uppercase hover:bg-wine transition-colors shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
          >
            <span className="inline-block w-1.5 h-1.5 bg-ember rounded-full heartbeat" />
            {t("Reserve your spot")}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
