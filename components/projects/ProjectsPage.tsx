"use client";
import React, { useState } from "react";
import ProjectHero from "./ProjectHero";
import ProjectFilters from "./ProjectFilters";
import ProjectList from "./ProjectList";
import CTAProject from "./CTAProject";
import { projectsData } from "@/data/projects"



const categories = [
  "Tous",
  "Mobile / Réseau social",
  "Réseau / Infrastructure",
  "Engineering",
  "Domotique",
  "Irrigation",
  "Ingénierie",
  "Construction métallique",
  "Ascenseurs",
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProjects =
    selectedCategory === "Tous"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 md:px-10 py-12">
      <ProjectHero />
      <ProjectFilters
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ProjectList projects={filteredProjects} />
      <CTAProject />
    </div>
  );
}
