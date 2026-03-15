"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "@/components/ui/Loader";

import Hero from "@/components/sections/Hero";
import HeroAndServices from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Testimonials from "@/components/sections/Testimonials";
import TeamSection from "@/components/sections/TeamSection";
import BlogSection from "@/components/sections/BlogSection";
import FAQSection from "@/components/sections/FAQ";
import CTAContact from "@/components/sections/CTA";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Reveal from "@/components/ui/Reveal";

export default function AcceuilClient() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loader */}
      <AnimatePresence mode="wait">
        {loading && <Loader loading={true} />}
      </AnimatePresence>

      {/* Page */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full overflow-x-hidden"
      >
        {/* HERO */}
        <Hero />

        {/* SERVICES */}
        <HeroAndServices />

        {/* PROJECTS */}
        {/* {/* <Reveal> */}
          <ProjectsSection />
         {/*</Reveal>*/}

        {/* WHY CHOOSE US */}
        {/* <Reveal> */}
          <WhyChooseUs />
         {/*</Reveal>*/}

        {/* TESTIMONIALS */}
        {/* <Reveal> */}
          <Testimonials />
         {/*</Reveal>*/}

        {/* TEAM */}
        {/* <Reveal> */}
          <TeamSection />
         {/*</Reveal>*/}

        {/* BLOG */}
        {/* <Reveal> */}
          <BlogSection />
         {/*</Reveal>*/}

        {/* FAQ */}
        {/* <Reveal> */}
          <FAQSection />
         {/*</Reveal>*/}

        {/* CTA */}
        {/* <Reveal> */}
          <CTAContact />
         {/*</Reveal>*/}
      </motion.main>
    </>
  );
}