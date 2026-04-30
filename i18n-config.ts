export const i18n = {
  defaultLocale: "cs",
  locales: ["cs", "en", "ru"],
} as const;

export type Locale = (typeof i18n.locales)[number];
