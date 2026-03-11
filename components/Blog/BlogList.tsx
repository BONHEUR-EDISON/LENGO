'use client';
import React, { useState } from 'react';
import BlogCard from './BlogCard';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
};

type Props = {
  posts: BlogPost[];
};

export default function BlogList({ posts }: Props) {
  const [visibleCount, setVisibleCount] = useState(6);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, visibleCount).map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      {visibleCount < posts.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Charger plus
          </button>
        </div>
      )}
    </>
  );
}