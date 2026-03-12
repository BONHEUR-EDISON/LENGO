"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/blog";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="relative w-full h-[420px] rounded-2xl overflow-hidden group cursor-pointer">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-10">
          <div className="text-white max-w-xl">
            <p className="text-sm uppercase tracking-widest text-blue-300">{post.category}</p>
            <h2 className="text-3xl font-bold mt-2">{post.title}</h2>
            <p className="mt-3 text-gray-200">{post.summary}</p>
            <p className="mt-4 text-sm text-gray-300">{post.date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}