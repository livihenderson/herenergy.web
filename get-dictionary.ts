import "server-only";
import { i18n, type Locale } from "./i18n-config";

export type Dictionary = Record<string, string>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  cs: () => import("./dictionaries/cs.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  (dictionaries[locale] ?? dictionaries[i18n.defaultLocale])();
