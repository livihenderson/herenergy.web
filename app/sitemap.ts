import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://herenergy.cz";

const routes = ["/", "/akce"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => {
    const localized = (l: string) =>
      l === i18n.defaultLocale
        ? `${SITE_URL}${path === "/" ? "" : path}`
        : `${SITE_URL}/${l}${path === "/" ? "" : path}`;

    const languages: Record<string, string> = Object.fromEntries(
      i18n.locales.map((l) => [l, localized(l)]),
    );
    languages["x-default"] = localized(i18n.defaultLocale);

    return {
      url: localized(i18n.defaultLocale),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.8,
      alternates: { languages },
    };
  });
}
