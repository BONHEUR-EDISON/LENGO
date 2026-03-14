import type { Metadata } from "next";
import { BreadcrumbServer } from "@/components/navigation/Breadcrumb";
import BloPage from "@/components/BlogPage";

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
  openGraph: {
    title: "Blog | Lengo Engineering",
    description:
      "Découvrez nos solutions d’ingénierie pour les infrastructures modernes et industrielles.",
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://lengo-engineering.vercel.app/blog",
  },
};

export default async function BlogPageWrapper() {
  // Comme c’est la page /Blog, les segments sont juste ["Blog"]
  //const pathSegments = ["blog", slug];

  return (
    <main>
      {/* Breadcrumb côté serveur 
      <BreadcrumbServer pathSegments={pathSegments} />*/}

      {/* Page blog */}
      <BloPage />
    </main>
  );
}