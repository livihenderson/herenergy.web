import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n-config";
import { AkcePage } from "../../components/AkcePage";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

const TITLES: Record<Locale, string> = {
  cs: "Další akce — HER ENERGY",
  en: "Other events — HER ENERGY",
  ru: "Другие события — HER ENERGY",
};

const DESCRIPTIONS: Record<Locale, string> = {
  cs: "Pravidelné aktivity HER ENERGY: box pro ženy v úterý a čtvrtek, brzy i kamasutra yoga a další.",
  en: "Regular HER ENERGY activities: boxing for women on Tuesdays and Thursdays — kamasutra yoga and more coming soon.",
  ru: "Регулярные активности HER ENERGY: бокс для женщин по вторникам и четвергам — скоро камасутра-йога и другое.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const path = "/akce";
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
  return <AkcePage />;
}
