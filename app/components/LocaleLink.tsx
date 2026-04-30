"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { i18n, type Locale } from "@/i18n-config";
import { getLocalizedRoute } from "@/lib/route-utils";

type LinkProps = ComponentProps<typeof Link>;

export function LocaleLink({
  href,
  locale,
  ...props
}: Omit<LinkProps, "href"> & { href: string; locale?: Locale }) {
  const params = useParams<{ lang?: string }>();
  const lang =
    locale ??
    ((params?.lang as Locale | undefined) ?? i18n.defaultLocale);
  return <Link href={getLocalizedRoute(href, lang)} {...props} />;
}
