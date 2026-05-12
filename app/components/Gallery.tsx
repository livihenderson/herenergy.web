"use client";

import { useCallback, useEffect, useState } from "react";
import { useDictionary } from "./DictionaryProvider";

const photos = [
  "/IMG_4037.jpg",
  "/IMG_4038.jpg",
  "/IMG_4039.jpg",
  "/IMG_4040.jpg",
  "/IMG_4041.jpg",
  "/IMG_4042.jpg",
  "/IMG_4043.jpg",
  "/IMG_4044.jpg",
  "/IMG_4045.jpg",
  "/IMG_4046.jpg",
  "/IMG_4047.jpg",
  "/IMG_4048.jpg",
  "/IMG_4049.jpg",
  "/IMG_4050.jpg",
  "/IMG_4051.jpg",
  "/IMG_4052.jpg",
  "/IMG_4053.jpg",
  "/IMG_4054.jpg",
  "/IMG_4055.jpg",
  "/IMG_4056.jpg",
  "/IMG_4061.jpg",
  "/IMG_4062.jpg",
  "/IMG_4063.jpg",
  "/IMG_4064.jpg",
];

export function Gallery() {
  const { t } = useDictionary();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % photos.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length,
      ),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  return (
    <section className="relative bg-bone-warm pt-32 md:pt-40 pb-28 md:pb-36">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] text-ink">
            {t("Photo gallery")}
          </h1>
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
            {t("Gallery")}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className="group relative aspect-square overflow-hidden bg-bone focus:outline-none focus:ring-2 focus:ring-wine"
              aria-label={`${t("Open photo")} ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label={t("Close")}
            className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 inline-flex items-center justify-center rounded-full border border-bone/40 text-bone hover:bg-bone hover:text-ink transition-colors"
          >
            <span className="text-xl leading-none">×</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label={t("Previous")}
            className="hidden md:inline-flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-bone/40 text-bone hover:bg-bone hover:text-ink transition-colors"
          >
            <span className="text-2xl leading-none">‹</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={t("Next")}
            className="hidden md:inline-flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-bone/40 text-bone hover:bg-bone hover:text-ink transition-colors"
          >
            <span className="text-2xl leading-none">›</span>
          </button>

          <div
            className="relative max-w-[92vw] max-h-[80vh] md:max-h-[88vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[active]}
              alt=""
              className="max-w-[92vw] max-h-[80vh] md:max-h-[88vh] w-auto h-auto object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div
            className="md:hidden absolute bottom-6 inset-x-0 flex items-center justify-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              aria-label={t("Previous")}
              className="w-12 h-12 inline-flex items-center justify-center rounded-full border border-bone/40 text-bone hover:bg-bone hover:text-ink transition-colors"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>
            <span className="font-display tracking-[0.3em] text-[11px] uppercase text-bone/70 min-w-[3.5rem] text-center">
              {active + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label={t("Next")}
              className="w-12 h-12 inline-flex items-center justify-center rounded-full border border-bone/40 text-bone hover:bg-bone hover:text-ink transition-colors"
            >
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>

          <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 font-display tracking-[0.3em] text-[11px] uppercase text-bone/70">
            {active + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
