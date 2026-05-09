import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n-config";
import { getContent } from "@/get-content";
import { BoxPage } from "../../components/BoxPage";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

const TITLES: Record<Locale, string> = {
  cs: "Box — HER ENERGY",
  en: "Box — HER ENERGY",
  ru: "Бокс — HER ENERGY",
};

const DESCRIPTIONS: Record<Locale, string> = {
  cs: "Box pro ženy s profi boxerkou Kateřinou Čavajdovou. Technika, kondice, mindset. Titan Gym, Praha.",
  en: "Boxing for women with pro boxer Kateřina Čavajdová. Technique, conditioning, mindset. Titan Gym, Prague.",
  ru: "Бокс для женщин с профи-боксёром Катержиной Чавайдовой. Техника, кондиция, майндсет. Titan Gym, Прага.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const path = "/box";
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
  const { box } = await getContent(lang);
  return <BoxPage data={box} />;
}
