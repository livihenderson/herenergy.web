"use client";

import { useDictionary } from "./DictionaryProvider";
import { LocaleLink } from "./LocaleLink";
import type { ClassPage } from "@/get-content";

export function YogaPage({ data }: { data: ClassPage }) {
  const { t } = useDictionary();
  return (
    <>
      {/* Header */}
      <section className="relative bg-bone overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="grain absolute inset-0 pointer-events-none" />
        <div
          aria-hidden
          className="absolute inset-x-0 -top-6 text-center font-serif italic font-light text-[24vw] leading-none text-wine/[0.08] select-none pointer-events-none"
        >
          kamasutra
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
            {data.eyebrow}
          </div>
          <h1 className="mt-5 font-serif italic text-6xl md:text-8xl leading-[0.9]">
            {t("Kamasutra Yoga")}
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-ink/80 leading-relaxed">
            {data.intro}
          </p>
        </div>
      </section>

      {/* Lecturer + schedule */}
      <section className="relative bg-blush/40 py-20 md:py-28 overflow-hidden">
        <div className="grain absolute inset-0 pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/mama_stretch.jpg"
                  alt="Kamasutra Yoga"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-bone">
                  <div className="font-serif italic text-2xl">
                    {data.lecturer.name}
                  </div>
                  <div className="font-display tracking-[0.2em] text-[10px] uppercase text-bone/90 mt-1">
                    {data.lecturer.role}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <h2 className="font-serif italic text-4xl md:text-5xl leading-[1.05] text-ink">
                {data.lecturer.headline}
              </h2>
              <div className="mt-6 space-y-4 max-w-xl text-ink/80 text-lg leading-relaxed">
                {data.lecturer.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 max-w-xl">
                <div>
                  <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-ink/50">
                    {t("Day")}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl">
                    {data.schedule.when}
                  </dd>
                </div>
                <div>
                  <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-ink/50">
                    {t("Time")}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-wine">
                    {data.schedule.time}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-ink/50">
                    {t("Place")}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl">
                    {data.schedule.where}
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.reservio.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-3 bg-wine text-bone px-6 py-4 font-display tracking-[0.25em] text-xs uppercase hover:bg-ink transition-colors"
                >
                  <span className="inline-block w-1.5 h-1.5 bg-ember rounded-full heartbeat" />
                  {t("Reserve")}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <LocaleLink
                  href="/"
                  className="inline-flex items-center gap-2 font-display tracking-[0.3em] text-xs uppercase text-ink/60 hover:text-ink border-b border-ink/30 hover:border-ink pb-1"
                >
                  ← {t("Home")}
                </LocaleLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
