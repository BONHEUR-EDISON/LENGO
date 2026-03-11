import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";

import ProjectsPage from "@/components/projects/ProjectsPage";


export const metadata: Metadata = {
  title: "projects | Lengo Engineering",
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
    title: "projects | Lengo Engineering",
    description:
      "Découvrez nos solutions d’ingénierie pour les infrastructures modernes et industrielles.",
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://lengo-engineering.vercel.app/projects",
  },
};

export default function ServicesPage() {
  return (
      <main className="relative flex flex-col w-full overflow-x-hidden">
      {/* HERO */}

      <ProjectsPage />

      {/* SERVICES */}

    </main>
  );
}
