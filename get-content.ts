import "server-only";
import { i18n, type Locale } from "./i18n-config";

export type ScheduleItem = { time: string; title: string; host: string };
export type HostCard = { name: string; role: string; bio: string };

export type LocaleContent = {
  schedule: ScheduleItem[];
  hosts: HostCard[];
};

const contentLoaders: Record<Locale, () => Promise<LocaleContent>> = {
  cs: () => import("./content/cs").then((m) => m.content),
  en: () => import("./content/en").then((m) => m.content),
  ru: () => import("./content/ru").then((m) => m.content),
};

export const getContent = async (locale: Locale): Promise<LocaleContent> =>
  (contentLoaders[locale] ?? contentLoaders[i18n.defaultLocale])();
