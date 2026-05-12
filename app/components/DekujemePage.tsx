"use client";

import { useDictionary } from "./DictionaryProvider";
import { LocaleLink } from "./LocaleLink";
import type { EventInfo, ScheduleItem } from "@/get-content";

export function DekujemePage({
  event,
  schedule,
}: {
  event: EventInfo;
  schedule: ScheduleItem[];
}) {
  const { t } = useDictionary();

  return (
    <section className="relative bg-ink text-bone overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="grain absolute inset-0 pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-6 -right-6 font-display tracking-[0.04em] text-[26vw] leading-[0.85] text-bone/[0.04] select-none pointer-events-none uppercase"
      >
        thanks
      </div>

      <div className="relative mx-auto max-w-3xl px-6 md:px-10">
        <div className="font-display tracking-[0.4em] text-[11px] uppercase text-ember">
          {t("Thanks for your reservation")}
        </div>
        <h1 className="mt-5 font-serif italic text-5xl md:text-7xl leading-[0.95]">
          {t("See you at HER energy DAY")}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-bone/80 leading-relaxed">
          {t("Your spot is confirmed. We've sent the receipt to your email.")}
        </p>

        <div className="mt-12 border border-bone/15 bg-ink-soft/60 backdrop-blur p-6 md:p-8">
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-bone/60 mb-5">
            {t("What you need to know")}
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                {t("Date")}
              </dt>
              <dd className="mt-1 font-serif text-2xl text-ember">
                {event.fullDate}
              </dd>
            </div>
            <div>
              <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                {t("Location")}
              </dt>
              <dd className="mt-1 font-serif text-xl">
                {t("Titan Gym · Ďáblická 2 · Prague")}
              </dd>
              <dd className="mt-1 text-bone/70 text-sm">
                {t("Tram stop: Sídliště Ďáblice")}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-display tracking-[0.3em] text-[10px] uppercase text-bone/50">
                {t("What to bring")}
              </dt>
              <dd className="mt-1 font-serif text-xl text-bone/90">
                {event.whatToBring}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10">
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-bone/60 mb-4">
            {t("Schedule for the day")}
          </div>
          <ul className="divide-y divide-bone/10">
            {schedule.map((it, i) => (
              <li key={i} className="py-4 flex items-baseline gap-5">
                <span
                  className={`font-display tracking-[0.06em] text-2xl md:text-3xl ${
                    i === 1 ? "text-bone/50" : "text-ember"
                  }`}
                >
                  {it.time}
                </span>
                <div className="flex-1">
                  <div className="font-serif text-xl md:text-2xl text-bone leading-tight">
                    {it.title}
                  </div>
                  <div className="font-display tracking-[0.2em] text-[10px] uppercase text-bone/60 mt-1">
                    {it.host}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <LocaleLink
            href="/"
            className="group inline-flex items-center gap-3 bg-ember text-ink px-6 py-4 font-display tracking-[0.25em] text-xs uppercase hover:bg-bone transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            {t("Back to home")}
          </LocaleLink>
          <span className="text-bone/60 text-sm">
            {t("No receipt? Email us at")}{" "}
            <a
              href="mailto:hello@herenergy.cz"
              className="underline hover:text-bone"
            >
              hello@herenergy.cz
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
