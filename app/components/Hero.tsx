"use client";

import Link from "next/link";
import { useLocale } from "../lib/LocaleProvider";
import { copy } from "../lib/copy";

export function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative h-[100dvh] md:h-[100svh] min-h-[100dvh] md:min-h-[760px] overflow-hidden isolate bg-bone">
      {/* DESKTOP — wide profile photo */}
      <img
        src="/profile_herenergy.png"
        alt="HER ENERGY — Kamasutra Yoga & Phoenix Boxing"
        className="reveal-up hidden md:block absolute inset-0 w-full h-full object-cover object-bottom select-none"
      />

      {/* MOBILE — split bg + two transparent figures at bottom */}
      <div className="md:hidden absolute inset-0 grid grid-cols-2">
        <div className="bg-gradient-to-br from-bone via-bone-warm to-blush" />
        <div className="bg-gradient-to-bl from-ink via-ink-soft to-wine-deep" />
      </div>
      <img
        src="/kamasutra_phone-31.png"
        alt=""
        aria-hidden
        className="md:hidden reveal-up pointer-events-none select-none absolute bottom-[14%] left-[-32%] h-[58%] max-h-[600px] w-auto object-contain object-bottom z-[2]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 95%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 95%)",
        }}
      />
      <img
        src="/box_phone-32.png"
        alt=""
        aria-hidden
        className="md:hidden reveal-up pointer-events-none select-none absolute bottom-[14%] right-[-32%] h-[58%] max-h-[600px] w-auto object-contain object-bottom z-[2]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 95%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 95%)",
        }}
      />

      {/* DESKTOP washes (mobile already has a clean split bg) */}
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-bone/55 via-bone/15 to-transparent mix-blend-screen" />
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ink/75 via-ink/35 to-transparent mix-blend-multiply" />
      <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-wine-deep/40 via-transparent to-transparent" />
      {/* top → bottom contrast for legible headline area */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] md:h-1/3 bg-gradient-to-b from-bone/75 md:from-bone/60 to-transparent" />

      {/* Vertical halo strip across the seam — desktop only */}
      <div className="hidden md:block pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[34vw] max-w-[420px] z-[3]">
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(198,58,58,0.45),rgba(198,58,58,0.18)_45%,transparent_70%)] blur-2xl flicker" />
      </div>

      {/* Lightning / crack down the middle — desktop only */}
      <div className="hidden md:flex pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[18vw] max-w-[280px] items-center justify-center z-[4]">
        <svg
          viewBox="0 0 200 900"
          preserveAspectRatio="none"
          className="relative h-full w-auto bolt"
          aria-hidden
        >
          <defs>
            <linearGradient id="bolt-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="15%" stopColor="#ffe9d6" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ff5b4a" stopOpacity="1" />
              <stop offset="85%" stopColor="#c63a3a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id="bolt-glow" x="-100%" y="-20%" width="300%" height="140%">
              <feGaussianBlur stdDeviation="6" result="b1" />
              <feGaussianBlur stdDeviation="14" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M100,0 L92,90 L112,108 L86,210 L116,232 L88,330 L118,352 L82,452 L114,478 L90,580 L120,604 L84,706 L110,732 L94,830 L102,900"
            fill="none"
            stroke="url(#bolt-fill)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#bolt-glow)"
          />
          <path
            d="M100,0 L96,90 L108,108 L90,210 L112,232 L92,330 L114,352 L86,452 L110,478 L94,580 L116,604 L88,706 L106,732 L98,830 L102,900"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Mobile-only subtitle, sitting in the lower fade zone above the CTAs */}
      <p className="md:hidden rise delay-5 absolute bottom-[18%] inset-x-0 px-6 text-center font-serif italic text-base text-ink z-30">
        <span className="bg-bone/75 backdrop-blur-sm px-3 py-1 inline-block">
          {t(copy.duality.title)}
        </span>
      </p>

      {/* Headline + CTA layered on top */}
      <div className="absolute inset-x-0 top-0 pt-20 md:pt-28 pb-8 px-5 md:px-6 flex flex-col items-center text-center z-20">
        <div className="rise delay-2 mb-3 md:mb-4 flex items-center gap-2 md:gap-3 text-[10px] md:text-[11px] font-display tracking-[0.32em] md:tracking-[0.4em] uppercase">
          <span className="inline-block w-5 md:w-8 h-px bg-wine/40" />
          <span className="text-wine">{t(copy.hero.eyebrow)}</span>
          <span className="inline-block w-5 md:w-8 h-px bg-wine/40" />
        </div>

        <h1 className="leading-[0.85] flex flex-col items-center overflow-visible">
          <span className="rise delay-3 inline-flex items-baseline gap-2">
            <span className="bg-wine text-bone px-3 md:px-6 py-1 font-display tracking-[0.04em] text-[20vw] md:text-[8.5vw] leading-[0.95] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              HER
            </span>
          </span>
          <span className="rise px-2 delay-4 block font-serif italic font-light text-[22vw] md:text-[11vw] tracking-[-0.02em] -mt-[0.02em] leading-[1.3] pb-[0.4em] overflow-visible bg-clip-text text-transparent bg-[linear-gradient(90deg,#3a1320_0%,#3a1320_44%,#c63a3a_50%,#fbe4d6_56%,#fbe4d6_100%)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
            energy
          </span>
        </h1>

        <p className="rise delay-5 mt-4 md:mt-5 max-w-xl font-serif italic text-sm md:text-xl text-ink hidden md:block">
          <span className="bg-bone/70 backdrop-blur-sm px-3 py-1">{t(copy.duality.title)}</span>
        </p>

        {/* Desktop CTAs sit right under the subtitle */}
        <div className="rise delay-5 hidden md:flex items-center gap-3 mt-6">
          <Link
            href="#rezervace"
            className="group inline-flex items-center justify-center gap-3 bg-ink text-bone px-6 py-3.5 font-display tracking-[0.25em] text-xs uppercase hover:bg-wine transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            <span className="inline-block w-1.5 h-1.5 bg-ember rounded-full heartbeat" />
            {t(copy.hero.primaryCta)}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="#manifest"
            className="inline-flex items-center gap-2 px-3 py-3.5 font-display tracking-[0.25em] text-xs uppercase text-bone bg-ember/90 hover:bg-ember"
          >
            {t(copy.hero.secondaryCta)} ↓
          </Link>
        </div>
      </div>

      {/* Side labels (desktop only) */}
      <span className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 font-display tracking-[0.4em] text-[11px] uppercase text-wine/80 z-10">
        {t(copy.hero.leftLabel)} · {t(copy.hero.leftSub)}
      </span>
      <span className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-display tracking-[0.4em] text-[11px] uppercase text-ember z-10">
        {t(copy.hero.rightLabel)} · {t(copy.hero.rightSub)}
      </span>

      {/* CTA strip at the bottom */}
      <div className="absolute bottom-14 md:bottom-10 inset-x-0 px-5 md:px-10 z-30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <span className="hidden sm:inline-flex font-display tracking-[0.4em] text-[10px] uppercase text-wine">
            {t(copy.hero.leftSub)}
          </span>
          <div className="md:hidden flex items-center gap-2 w-full justify-center">
            <Link
              href="#rezervace"
              className="group inline-flex flex-1 items-center justify-center gap-2 bg-ink text-bone px-4 py-3 font-display tracking-[0.2em] text-[11px] uppercase hover:bg-wine transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            >
              <span className="inline-block w-1.5 h-1.5 bg-ember rounded-full heartbeat" />
              {t(copy.hero.primaryCta)}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="#manifest"
              className="inline-flex items-center gap-2 px-3 py-3 font-display tracking-[0.2em] text-[11px] uppercase text-bone bg-ember/90 hover:bg-ember"
            >
              {t(copy.hero.secondaryCta)} ↓
            </Link>
          </div>
          <span className="hidden sm:inline-flex font-display tracking-[0.4em] text-[10px] uppercase text-bone/95">
            {t(copy.hero.rightSub)}
          </span>
        </div>
      </div>
    </section>
  );
}
