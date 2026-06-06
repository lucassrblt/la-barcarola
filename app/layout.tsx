import type { Metadata } from "next";
import { Fraunces, Newsreader, Dancing_Script } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://la-barcarola.demo"),
  title: "La Barcarola — Trattoria franco-italienne · Asnières-sur-Seine",
  description:
    "Cuisine franco-italienne faite maison à Asnières-sur-Seine : pâtes fraîches, pizze au four, options halal & végétariennes. Découvrez la carte et réservez votre table. (Refonte concept — site de démonstration.)",
  openGraph: {
    title: "La Barcarola — Trattoria franco-italienne",
    description: "Pâtes fraîches, pizze au four & terrasse à Asnières. Réservez votre table.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${newsreader.variable} ${dancing.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
