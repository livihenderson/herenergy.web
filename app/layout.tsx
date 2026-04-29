import type { Metadata } from "next";
import { Bebas_Neue, Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "./lib/LocaleProvider";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

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

export const metadata: Metadata = {
  title: "HER ENERGY — síla ve smyslnosti",
  description:
    "HER ENERGY spojuje ženy skrze pohyb, emoce a energii. Box, kamasutra yoga, tanec a komunita žen, které chtějí víc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${bodoni.variable} ${bebas.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink selection:bg-wine selection:text-bone">
        <LocaleProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
