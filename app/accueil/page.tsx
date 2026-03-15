"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader loading={loading} />

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 40 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-x-hidden scroll-smooth"
      >
        <Hero />

        <HeroAndServices />

        <Reveal>
          <ProjectsSection />
        </Reveal>
        <Reveal>
          <WhyChooseUs />
        </Reveal>

        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <TeamSection />
        </Reveal>
        <Reveal>
          <BlogSection />
        </Reveal>
        <Reveal>
          <FAQSection />
        </Reveal>
        <Reveal>
          <CTAContact />
        </Reveal>
      </motion.main>
    </>
  );
}
