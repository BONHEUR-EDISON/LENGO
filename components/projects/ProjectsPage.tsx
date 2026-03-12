"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import ProjectHero from "./ProjectHero";
import ProjectFilters from "./ProjectFilters";
import ProjectCarousel from "./ProjectCarousel";
import CTAProject from "./CTAProject";
import ProjectsTimeline from "./ProjectsTimeline";
import StatsSection from "./StatsSection";

import { projectsData } from "@/data/projects";

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

  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProjects =
    selectedCategory === "Tous"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className={`${bgColor} ${textColor} transition-colors duration-500`}>

      {/* HERO */}
      <ProjectHero />

      {/* STATS  */}
      <StatsSection />

      {/* CONTENU PRINCIPAL */}
      <div className="min-h-screen px-6 md:px-10 py-12">

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 mb-8 flex flex-wrap justify-center gap-4"
        >
          <ProjectFilters
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </motion.div>

        {/* CAROUSEL */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <ProjectCarousel projects={filteredProjects} />
        </motion.section>

        {/* TIMELINE HISTORIQUE */}
        <ProjectsTimeline />

        {/* Case Study */}
        {filteredProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
          >
            {/* espace pour case studies */}
          </motion.section>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <CTAProject />
        </motion.div>

      </div>
    </div>
  );
}