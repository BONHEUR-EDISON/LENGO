'use client';
import { useState } from "react";
import BlogHero from "./BlogHero";
import CategoryFilter from "./CategoryFilter";
import BlogList from "./BlogList";
import SEO from "./SEO";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Design", "Innovation", "Technologie"];

  const filteredPosts =
    category === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === category);

  return (
    <>
      <SEO
        title="Blog Geordie Cool – Actualités et guides"
        description="Découvrez les dernières actualités, guides et événements de Geordie Cool à Goma."
        url="https://lengo-engineeringg.vercel.app/blog"
        image="/images/blog1.jpg"
      />

      <main className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
        <BlogHero />
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />
        <BlogList posts={filteredPosts} />
      </main>
    </>
  );
}