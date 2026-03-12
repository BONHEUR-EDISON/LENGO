// app/services/page.tsx
import type { Metadata } from "next";

import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ProcessSection from "@/components/services/ProcessSection";
import ServicesCapabilities from "@/components/services/ServicesCapabilities";
import TechSection from "@/components/services/TechSection";
import AboutPreview from "@/components/services/AboutPreview";
import CTASection from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "Services | Lengo Engineering",
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
    title: "Services | Lengo Engineering",
    description:
      "Découvrez nos solutions d’ingénierie pour les infrastructures modernes et industrielles.",
    type: "website",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://lengo-engineering.vercel.app/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="relative flex flex-col w-full overflow-x-hidden">
      {/* HERO */}
      <ServicesHero />

      {/* SERVICES */}
      <ServicesList />

      {/* PROCESS ENGINEERING */}
      <ProcessSection />

      {/* CAPABILITIES */}
      <ServicesCapabilities />

      {/* TECHNOLOGIES */}
      <TechSection />

      {/* ABOUT / TIMELINE */}
      <AboutPreview />

      {/* CALL TO ACTION */}
      <CTASection />
    </main>
  );
}
