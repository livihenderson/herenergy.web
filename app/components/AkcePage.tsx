"use client";

import { useDictionary } from "./DictionaryProvider";
import { LocaleLink } from "./LocaleLink";

export function AkcePage() {
  const { t } = useDictionary();
  return (
    <>
      {/* Header */}
      <section className="relative bg-bone overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="grain absolute inset-0 pointer-events-none" />
        <div
          aria-hidden
          className="absolute inset-x-0 -top-6 text-center font-serif italic font-light text-[26vw] leading-none text-wine/[0.08] select-none pointer-events-none"
        >
          akce
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
            {t("Regular activities")}
          </div>
          <h1 className="mt-5 font-serif text-6xl md:text-8xl leading-[0.9]">
            {t("Other events")}
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-ink/80 leading-relaxed">
            {t("Every week there’s space for body and mind. See what’s on right now — and tap to reserve.")}
          </p>
        </div>
      </section>

      {/* BOX feature */}
      <section className="relative bg-ink text-bone py-20 md:py-28 overflow-hidden">
        <div className="grain absolute inset-0 pointer-events-none" />
        <div
          aria-hidden
          className="absolute -top-6 -right-6 font-display tracking-[0.04em] text-[26vw] leading-[0.85] text-bone/[0.04] select-none pointer-events-none uppercase"
        >
          box
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/punch.jpg"
                  alt="Box · Phoenix"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <div className="font-display tracking-[0.4em] text-[11px] uppercase text-ember">
                {t("With a pro fighter")}
              </div>
              <h2 className="mt-4 font-display tracking-[0.04em] uppercase text-6xl md:text-7xl leading-[0.9]">
                {t("Fitbox for women")}
              </h2>
              <p className="mt-5 max-w-xl text-bone/80 text-lg leading-relaxed">
                {t("Train with Kateřina Čavajdová — 9 yrs of pro experience. Technique, conditioning, mindset.")}
              </p>

              <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 max-w-xl">
                <div>
                  <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                    {t("Day")}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl">{t("Tuesday & Thursday")}</dd>
                </div>
                <div>
                  <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                    {t("Time")}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-ember">{t("19:00 – 20:00")}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                    {t("Place")}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl">{t("Titan Gym · Ďáblická 2")}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.reservio.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-3 bg-ember text-ink px-6 py-4 font-display tracking-[0.25em] text-xs uppercase hover:bg-bone transition-colors"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-ink rounded-full heartbeat" />
                  {t("Reserve")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Coming soon */}
      <section className="relative bg-bone-warm py-20 md:py-28 overflow-hidden">
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="flex items-end flex-wrap justify-between gap-6 mb-10">
            <h2 className="font-serif italic text-4xl md:text-6xl leading-[0.9]">
              {t("Coming soon")}
            </h2>
            <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
              + {t("Coming soon")}
            </div>
          </div>
          <p className="font-serif italic text-2xl md:text-3xl text-ink/70">
            {t("No news yet.")}
          </p>

          <div className="mt-16">
            <LocaleLink
              href="/"
              className="inline-flex items-center gap-2 font-display tracking-[0.3em] text-xs uppercase border-b border-ink pb-1 hover:border-wine hover:text-wine"
            >
              ← {t("Back to home")}
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
