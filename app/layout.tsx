import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import { CartToastProvider } from "@/context/CartToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lengo Engineering",
  description:
    "Solutions d’ingénierie avancée : construction métallique, automatisation industrielle, ascenseurs intelligents, domotique et technologies pour infrastructures modernes.",
  keywords: [
    "engineering",
    "construction métallique",
    "automatisation industrielle",
    "smart elevators",
    "domotique",
    "industrial engineering",
    "smart infrastructure",
  ],
  openGraph: {
    title: "Lengo Engineering",
    description:
      "Découvrez nos solutions d’ingénierie pour les infrastructures modernes et industrielles.",
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://lengo-engineering.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black transition-colors duration-500`}
      >
        {/* ThemeProvider doit être à l’intérieur du body */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <Header />

            <main>
              <LanguageProvider>
                <CartToastProvider>{children}</CartToastProvider>
              </LanguageProvider>
            </main>

            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
