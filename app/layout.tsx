import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import { CartToastProvider } from "@/context/CartToastContext";
import ReadingProgress from "@/components/Blog/ReadingProgress";

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

  verification: {
    google: "googlec57ebe5de93e0666.html",
  },

  robots: "index, follow",

  alternates: {
    canonical: "https://lengo-engineeringg.vercel.app",
  },

  openGraph: {
    title: "Lengo Engineering",
    description:
      "Découvrez nos solutions d’ingénierie pour les infrastructures modernes et industrielles.",
    url: "https://lengo-engineeringg.vercel.app",
    siteName: "Lengo Engineering",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lengo Engineering",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Lengo Engineering",
    description: "Solutions d’ingénierie pour infrastructures modernes.",
    images: ["/og-image.png"],
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // forcer mode sombre
          enableSystem={false} // ignorer préférence système
        >
          <LanguageProvider>
            <CartProvider>
              <CartToastProvider>
                {/* Barre de progression lecture */}
                <ReadingProgress />

                {/* Header principal */}
                <Header />

                {/* Contenu principal */}
                <main className="min-h-[80vh]">{children}</main>

                {/* Footer */}
                <Footer />
              </CartToastProvider>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
