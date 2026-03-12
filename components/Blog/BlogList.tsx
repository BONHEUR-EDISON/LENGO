"use client";

import { useState } from "react";
import { blogPosts, BlogPost } from "@/data/blog";
import BlogCard from "./BlogCard";
import { useInView } from "react-intersection-observer";

export default function BlogList() {
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>(blogPosts.slice(0, 2));
  const { ref, inView } = useInView({ threshold: 0.5 });

  if (inView && visiblePosts.length < blogPosts.length) {
    setTimeout(() => {
      setVisiblePosts(blogPosts.slice(0, visiblePosts.length + 2));
    }, 500);
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {visiblePosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
      <div ref={ref} className="h-1"></div>
    </section>
  );
}