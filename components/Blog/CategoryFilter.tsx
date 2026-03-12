// "use client";

import { useState } from "react";
import { blogPosts } from "@/data/blog";
import BlogCard from "./BlogCard";

const categories = ["All", "Design", "Innovation", "Technologie"];

export default function CategoryFilter() {
  const [selected, setSelected] = useState("All");

  const filtered = selected === "All" ? blogPosts : blogPosts.filter(p => p.category === selected);

  return (
    <section className="mt-12">
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selected === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}