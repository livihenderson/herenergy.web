import type { Metadata } from "next";
import { Bebas_Neue, Bodoni_Moda, Manrope } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { DictionaryProvider } from "../components/DictionaryProvider";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://herenergy.cz";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const dynamicParams = false;

const TITLES: Record<Locale, string> = {
  cs: "HER ENERGY — síla ve smyslnosti",
  en: "HER ENERGY — strength in sensuality",
  ru: "HER ENERGY — сила в чувственности",
};

const DESCRIPTIONS: Record<Locale, string> = {
  cs: "HER ENERGY spojuje ženy skrze pohyb, emoce a energii. Box, kamasutra yoga, tanec a komunita žen, které chtějí víc.",
  en: "HER ENERGY connects women through movement, emotion and energy. Boxing, kamasutra yoga, dance and a community of women who want more.",
  ru: "HER ENERGY объединяет женщин через движение, эмоции и энергию. Бокс, камасутра-йога, танец и сообщество женщин, которые хотят большего.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };

  const canonical = lang === i18n.defaultLocale ? "/" : `/${lang}`;
  const languages: Record<string, string> = Object.fromEntries(
    i18n.locales.map((l) => [l, l === i18n.defaultLocale ? "/" : `/${l}`]),
  );
  languages["x-default"] = "/";

  return {
    metadataBase: new URL(SITE_URL),
    title: TITLES[lang],
    description: DESCRIPTIONS[lang],
    alternates: { canonical, languages },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${bodoni.variable} ${bebas.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink selection:bg-wine selection:text-bone">
        <DictionaryProvider dict={dict} lang={lang}>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  );
}
