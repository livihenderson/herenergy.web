import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n-config";
import { Gallery } from "../../components/Gallery";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

const TITLES: Record<Locale, string> = {
  cs: "Fotogalerie — HER ENERGY",
  en: "Photo Gallery — HER ENERGY",
  ru: "Фотогалерея — HER ENERGY",
};

const DESCRIPTIONS: Record<Locale, string> = {
  cs: "Momentky z akcí HER ENERGY. Box, Kámasútra yoga a komunita žen.",
  en: "Moments from HER ENERGY events. Boxing, Kamasutra yoga and a community of women.",
  ru: "Моменты с мероприятий HER ENERGY. Бокс, камасутра-йога и сообщество женщин.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const path = "/fotogalerie";
  const canonical = lang === i18n.defaultLocale ? path : `/${lang}${path}`;
  const languages: Record<string, string> = Object.fromEntries(
    i18n.locales.map((l) => [
      l,
      l === i18n.defaultLocale ? path : `/${l}${path}`,
    ]),
  );
  languages["x-default"] = path;

  return {
    title: TITLES[lang],
    description: DESCRIPTIONS[lang],
    alternates: { canonical, languages },
  };
}

export default function Page() {
  return <Gallery />;
}
