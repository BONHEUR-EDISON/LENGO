// ./app/produits/[slug]/page.tsx
import type { Metadata } from "next";
import { BreadcrumbServer } from "@/components/navigation/BreadcrumbServer";
import ProduitsPage from "../../components/ProduitsPage";

export const metadata: Metadata = {
  title: "Produits | Lengo Engineering",
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
  metadataBase: new URL("https://lengo-engineering.vercel.app"),
  openGraph: {
    title: "Produits | Lengo Engineering",
    description:
      "Découvrez nos solutions d’ingénierie pour les infrastructures modernes et industrielles.",
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://lengo-engineering.vercel.app/produits",
  },
};

export default async function ProduitsPageWrapper() {
  // Exemple : pathSegments potentiellement undefined
  const rawSegments = ["produits"]; // ici tu peux ajouter product?.category ou autre
  // ⚡ Filtrer les undefined pour obtenir string[]
  const pathSegments: string[] = rawSegments.filter((seg): seg is string => !!seg);

  return (
    <main>
      {/* Breadcrumb côté serveur */}
      <BreadcrumbServer pathSegments={pathSegments} />

      {/* Page Produits */}
      <ProduitsPage />
    </main>
  );
}