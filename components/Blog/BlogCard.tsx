// "use client";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-900"
    >
      <div className="relative w-full h-48">
        <Image
          src={post.image || "/images/blog/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">{post.category}</p>
        <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{post.summary}</p>
        <time className="block mt-4 text-xs text-gray-400">{post.date}</time>
      </div>
    </Link>
  );
}