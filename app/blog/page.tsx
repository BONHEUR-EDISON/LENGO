"use client";

import { blogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import LeftBar from "@/components/Blog/LeftBar";
import Newsletter from "@/components/Blog/Newsletter";

export default function BlogPage() {
  const featured = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <main className="max-w-7xl mx-auto px-6 py-30 flex gap-8">
      {/* Leftbar scrollable, sticky */}
      <LeftBar posts={blogPosts} featuredSlug={featured.slug} />

      {/* Main Content */}
      <div className="flex-1 space-y-16">
        {/* Featured Post */}
        <section className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-80 md:h-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{featured.category}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {featured.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{featured.summary}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-block text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-6 py-3 rounded-full transition-colors duration-300"
              >
                Lire l'article
              </Link>
            </div>
          </div>
        </section>

        {/* Other Posts Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">{post.category}</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.summary}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* Newsletter */}
        <section>
          <Newsletter />
        </section>
      </div>
    </main>
  );
}