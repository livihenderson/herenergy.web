import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n-config";
import { getContent } from "@/get-content";
import { DekujemePage } from "../../components/DekujemePage";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

const TITLES: Record<Locale, string> = {
  cs: "Děkujeme — HER ENERGY",
  en: "Thank you — HER ENERGY",
  ru: "Спасибо — HER ENERGY",
};

const DESCRIPTIONS: Record<Locale, string> = {
  cs: "Děkujeme za rezervaci na HER energy DAY. 30. května 2026, Titan Gym, Praha.",
  en: "Thanks for your HER energy DAY reservation. 30 May 2026, Titan Gym, Prague.",
  ru: "Спасибо за бронирование на HER energy DAY. 30 мая 2026, Titan Gym, Прага.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  return {
    title: TITLES[lang],
    description: DESCRIPTIONS[lang],
    robots: { index: false, follow: false },
  };
}

export default async function Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await props.params) as { lang: Locale };
  const { event, schedule } = await getContent(lang);
  return <DekujemePage event={event} schedule={schedule} />;
}
