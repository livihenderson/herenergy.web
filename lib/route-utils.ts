import { i18n, type Locale } from "../i18n-config";

export function getLocalizedRoute(
  href: string,
  lang: Locale = i18n.defaultLocale,
): string {
  if (!href.startsWith("/")) return href;
  if (lang === i18n.defaultLocale) return href;
  if (href === `/${lang}` || href.startsWith(`/${lang}/`)) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

export function stripLocaleFromPath(pathname: string): string {
  for (const l of i18n.locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}
