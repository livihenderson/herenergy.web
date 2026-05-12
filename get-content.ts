import "server-only";
import { i18n, type Locale } from "./i18n-config";

export type ScheduleItem = { time: string; title: string; host: string };
export type HostCard = { name: string; role: string; bio: string; link?: string };

export type ClassPage = {
  eyebrow: string;
  intro: string;
  lecturer: {
    name: string;
    role: string;
    headline: string;
    body: string[];
  };
  schedule: {
    when: string;
    time: string;
    where: string;
  };
};

export type EventInfo = {
  shortDate: string;
  fullDate: string;
  price: string;
  whatToBring: string;
};

export type LocaleContent = {
  event: EventInfo;
  schedule: ScheduleItem[];
  hosts: HostCard[];
  box: ClassPage;
  yoga: ClassPage;
};

const contentLoaders: Record<Locale, () => Promise<LocaleContent>> = {
  cs: () => import("./content/cs").then((m) => m.content),
  en: () => import("./content/en").then((m) => m.content),
  ru: () => import("./content/ru").then((m) => m.content),
};

export const getContent = async (locale: Locale): Promise<LocaleContent> =>
  (contentLoaders[locale] ?? contentLoaders[i18n.defaultLocale])();
