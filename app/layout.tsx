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
import InstallApp from "@/components/install-app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   manifest: "/manifest.json",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <LanguageProvider>
            <CartProvider>
              <CartToastProvider>

                <ReadingProgress />

                {/* Layout flex vertical */}
                <div className="flex min-h-screen flex-col">
<InstallApp />
                  <Header />

                  <main className="flex-1 w-full overflow-x-hidden">
                    {children}
                  </main>

                  <Footer />

                </div>

              </CartToastProvider>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
