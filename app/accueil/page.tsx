import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";

import Hero from "@/components/sections/Hero";
import HeroAndServices from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Testimonials from "@/components/sections/Testimonials";
import TeamSection from "@/components/sections/TeamSection";
import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQ";
import CTAContact from "@/components/sections/CTA";

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

export default function AcceuilPage() {
  return (
    <main className="relative flex flex-col w-full overflow-x-hidden scroll-smooth">

      
        <Hero />
      
      
        <HeroAndServices />
      
      
        <ProjectsSection />
      
      
        <Testimonials />
      
      
        <TeamSection />
      
      
        <BlogSection />
      
      
        <FAQSection />
      
      
        <CTAContact />
      
    </main>
  );
}