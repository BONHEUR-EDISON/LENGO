"use client";

import { blogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import LeftBar from "@/components/Blog/LeftBar";
import Newsletter from "@/components/Blog/Newsletter";

export default function BlogPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const featured = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const cardBg = isDark
    ? "bg-gray-800 text-white"
    : "bg-blue-50 text-gray-900";

  const sidebarBg = isDark
    ? "bg-gray-900"
    : "bg-blue-100";

  const featuredBg = isDark
    ? "bg-gray-900"
    : "bg-blue-100";

  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-14 flex flex-col lg:flex-row gap-12">

      {/* SIDEBAR */}
      <aside className="w-full lg:w-[350px] flex-shrink-0">
        <div className={`sticky top-24 rounded-2xl p-5 shadow-lg ${sidebarBg}`}>
          <LeftBar posts={blogPosts} featuredSlug={featured.slug} />
        </div>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col pt-12 gap-14">

        {/* FEATURED */}
        <section className="rounded-3xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">

            <div className="relative h-[300px] md:h-[420px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
            </div>

            <div className={`p-8 lg:p-10 flex flex-col justify-center ${featuredBg}`}>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-2">
                {featured.category}
              </p>

              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {featured.title}
              </h2>

              <p className="mb-6 opacity-80">
                {featured.summary}
              </p>

              <Link
                href={`/blog/${featured.slug}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition"
              >
                Lire l'article
              </Link>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {otherPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition ${cardBg}`}
            >

              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
                  {post.category}
                </p>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h3>

                <p className="text-sm opacity-80 line-clamp-3">
                  {post.summary}
                </p>

              </div>

            </Link>
          ))}

        </section>

        {/* NEWSLETTER */}
        <Newsletter />

      </div>
    </main>
  );
}