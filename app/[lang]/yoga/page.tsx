import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n-config";
import { getContent } from "@/get-content";
import { YogaPage } from "../../components/YogaPage";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

const TITLES: Record<Locale, string> = {
  cs: "Kamasutra Yoga — HER ENERGY",
  en: "Kamasutra Yoga — HER ENERGY",
  ru: "Камасутра-йога — HER ENERGY",
};

const DESCRIPTIONS: Record<Locale, string> = {
  cs: "Kámasútra Yoga s Yuliyí Arkhiyereyevou. Pomalý, hluboký flow pro ženské tělo. Titan Gym, Praha.",
  en: "Kamasutra Yoga with Yuliya Arkhiyereyeva. Slow, deep flow for the female body. Titan Gym, Prague.",
  ru: "Камасутра-йога с Юлией Архиереевой. Медленный, глубокий флоу для женского тела. Titan Gym, Прага.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const path = "/yoga";
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

export default async function Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await props.params) as { lang: Locale };
  const { yoga } = await getContent(lang);
  return <YogaPage data={yoga} />;
}
