'use client';
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { BlogPost } from "@/data/blog";
import { useInView } from "react-intersection-observer";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>(posts.slice(0, 2));
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && visiblePosts.length < posts.length) {
      const timeout = setTimeout(() => {
        setVisiblePosts(posts.slice(0, visiblePosts.length + 2));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [inView, visiblePosts.length, posts]);

  useEffect(() => {
    // Reset visible posts si le tableau change (filtrage par catégorie)
    setVisiblePosts(posts.slice(0, 2));
  }, [posts]);

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {visiblePosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
      <div ref={ref} className="h-1"></div>
    </section>
  );
}