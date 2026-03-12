"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  image: string;
  summary?: string;
}

interface LeftBarProps {
  posts: Post[];
}

export default function LeftBar({ posts }: LeftBarProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
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

    containerRef.current?.querySelectorAll("li").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [posts]);

  if (!posts.length) return null;

  return (
    <aside className="hidden lg:block w-80 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-4 space-y-6 border-l border-gray-200 dark:border-gray-700">
      <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-4">Autres articles</h2>
      <ul ref={containerRef} className="space-y-4">
        {posts.map((post, index) => (
          <li
            key={post.slug}
            data-index={index}
            className={`group relative cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md dark:shadow-black/20 transition-all duration-500
              ${visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
            `}
          >
            <Link href={`/blog/${post.slug}`} className="flex flex-col md:flex-row gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300">
              <div className="w-full md:w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
                </div>
                {post.summary && (
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.summary}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}