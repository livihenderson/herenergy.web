import { i18n, type Locale } from "@/i18n-config";
import { getContent } from "@/get-content";
import { Community } from "../components/Community";
import { Duality } from "../components/Duality";
import { EventCard } from "../components/EventCard";
import { Hero } from "../components/Hero";
import { Hosts } from "../components/Hosts";
import { Manifesto } from "../components/Manifesto";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

export default async function Page(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await props.params) as { lang: Locale };
  const { schedule, hosts } = await getContent(lang);
  return (
    <>
      <Hero />
      <Manifesto />
      <Duality />
      <Hosts hosts={hosts} />
      <EventCard schedule={schedule} />
      <Community />
    </>
  );
}
