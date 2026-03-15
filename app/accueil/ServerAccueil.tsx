// app/accueil/ServerAccueil.tsx
import type { Metadata } from "next";
import AcceuilClient from "./page";

export const metadata: Metadata = {
  title: "Accueil Engineering",
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
    title: "Accueil | Lengo Engineering",
    description:
      "Découvrez nos solutions d’ingénierie pour les infrastructures modernes et industrielles.",
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://lengo-engineering.vercel.app/",
  },
};

// Wrapper vide côté serveur
export default function ServerAccueil({ children }: { children: React.ReactNode }) {
  return <AcceuilClient />;
}