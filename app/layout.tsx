import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Ranczo 44 | Wyjątkowy wypoczynek w Beskidzie Niskim",
  description: "Kameralny ośrodek wypoczynkowy w Uściu Gorlickim. Dzika natura, konie, podgrzewany basen, bania z cedru. Zarezerwuj swój pobyt na Ranczo 44.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-stone-50 text-stone-900 min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
