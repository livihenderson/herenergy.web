"use client";

import { useDictionary } from "./DictionaryProvider";
import type { EventInfo, ScheduleItem } from "@/get-content";

const PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";

export function EventCard({
  event,
  schedule,
}: {
  event: EventInfo;
  schedule: ScheduleItem[];
}) {
  const { t, lang } = useDictionary();
  const reserveHref = PAYMENT_LINK
    ? `${PAYMENT_LINK}?locale=${lang}`
    : "#rezervace";
  return (
    <section
      id="rezervace"
      className="relative bg-ink text-bone py-28 md:py-40 overflow-hidden"
    >
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 font-display tracking-[0.4em] text-[11px] uppercase text-ember">
              <span className="inline-block w-1.5 h-1.5 bg-ember rounded-full heartbeat" />
              {t("Main event")}
            </div>
            <div className="mt-4 font-display tracking-tight text-7xl md:text-[9rem] text-ember leading-[0.85]">
              {event.shortDate}
            </div>
            <h2 className="mt-8 font-serif text-6xl md:text-8xl leading-[0.88] tracking-tight">
              <span className="bg-wine text-bone px-3 font-display tracking-[0.04em]">HER</span>{" "}
              <span className="italic font-light">energy</span>
              <span className="block font-display tracking-[0.04em] text-bone text-5xl md:text-7xl mt-3">
                DAY
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-bone/80 text-lg leading-relaxed">
              {t("One day. Two opposites. A community that lifts you up.")}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={reserveHref}
                className="group inline-flex items-center gap-3 bg-ember text-ink px-6 py-4 font-display tracking-[0.25em] text-xs uppercase hover:bg-bone transition-colors"
              >
                {t("Reserve your spot")}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <span className="inline-flex items-center px-4 py-4 font-display tracking-[0.25em] text-xs uppercase text-bone/60 border border-bone/20">
                {event.price}
              </span>
            </div>

          </div>

          <div className="lg:col-span-5">
            <div className="border border-bone/15 bg-ink-soft/60 backdrop-blur p-6 md:p-8">
              <div className="font-display tracking-[0.4em] text-[11px] uppercase text-bone/60 mb-5">
                {t("Schedule")}
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

              <div className="mt-6 pt-6 border-t border-bone/15 grid grid-cols-1 gap-2 text-bone/80">
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block w-1 h-1 bg-ember rounded-full" />
                  {t("Titan Gym · Ďáblická 2 · Prague")}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block w-1 h-1 bg-ember rounded-full" />
                  {t("Tram stop: Sídliště Ďáblice")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
