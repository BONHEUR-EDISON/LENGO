'use client';
import React from 'react';
import Link from 'next/link';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <span className="text-sm text-gray-500">{post.date}</span>
          <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}