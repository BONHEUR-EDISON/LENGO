"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { BlogPost } from "@/data/blog";

interface LeftBarProps {
  posts: BlogPost[];
  featuredSlug?: string;
}

export default function LeftBar({ posts, featuredSlug }: LeftBarProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { root: containerRef.current, threshold: 0.1 }
    );

    const items = containerRef.current.querySelectorAll("li");
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [posts]);

  if (!posts.length) return null;

  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-blue-50";
  const hoverBgClass = theme === "dark" ? "hover:bg-gray-800" : "hover:bg-blue-100";
  const titleTextClass = theme === "dark" ? "text-white" : "text-gray-900";
  const dateTextClass = theme === "dark" ? "text-gray-400" : "text-gray-700";
  const summaryTextClass = theme === "dark" ? "text-gray-300" : "text-gray-800";

  return (
    <aside className="hidden lg:block w-80 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-4 space-y-6 border-l border-gray-200 dark:border-gray-700">
      <h2 className={theme === "dark" ? "font-bold text-lg text-gray-200 mb-4" : "font-bold text-lg text-gray-800 mb-4"}>
        Autres articles
      </h2>

      <ul ref={containerRef} className="space-y-4">
        {posts.map((post, index) => {
          const isFeatured = post.slug === featuredSlug;

          return (
            <li
              key={post.slug}
              data-index={index}
              className={`group rounded-xl overflow-hidden shadow-md transition-all duration-500
                ${bgClass}
                ${visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
                ${isFeatured ? "ring-2 ring-blue-500" : ""}`}
            >
              <Link
                href={`/blog/${post.slug}`}
                className={`flex gap-3 p-3 rounded-xl ${hoverBgClass}`}
              >
                <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className={`text-sm font-semibold ${titleTextClass}`}>
                    {post.title}
                  </h3>

                  <p className={`text-xs ${dateTextClass}`}>
                    {post.date}
                  </p>

                  <p className={`text-xs ${summaryTextClass} line-clamp-2`}>
                    {post.summary}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}