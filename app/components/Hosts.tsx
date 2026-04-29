"use client";

import { useLocale } from "../lib/LocaleProvider";
import { copy } from "../lib/copy";

const portraits = [
  "/kata_profile.jpg",
  "/kamasutra_profile.jpg",
  "/lunchbox_profile.jpg",
];

export function Hosts() {
  const { t } = useLocale();
  const list = t(copy.hosts.list);
  return (
    <section className="relative bg-bone-warm py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.9]">
            {t(copy.hosts.title)}
          </h2>
          <div className="font-display tracking-[0.4em] text-[11px] uppercase text-wine">
            03 — Faces
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {list.map((p, i) => (
            <article
              key={p.name}
              className={`group relative ${i === 1 ? "md:translate-y-12" : i === 2 ? "md:translate-y-6" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                <img
                  src={portraits[i]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 font-display tracking-[0.3em] text-[10px] uppercase text-bone bg-wine px-2 py-1">
                  0{i + 1}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-bone">
                  <div className="font-serif italic text-2xl">{p.name}</div>
                  <div className="font-display tracking-[0.2em] text-[10px] uppercase text-bone/80 mt-1">
                    {p.role}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-ink/80 leading-relaxed">{p.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
