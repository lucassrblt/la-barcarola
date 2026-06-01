import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maison-lavigne.demo"),
  title: "Maison Lavigne — Bistrot · Bordeaux",
  description:
    "Bistrot de marché, cuisine du jour et belle cave. Découvrez la carte et réservez votre table en ligne. (Site de démonstration — projet concept.)",
  openGraph: {
    title: "Maison Lavigne — Bistrot",
    description: "Cuisine du marché & belle cave. Réservez votre table.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${bricolage.variable} ${newsreader.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
