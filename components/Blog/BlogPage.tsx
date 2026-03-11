'use client';
import React, { useState } from 'react';
import BlogHero from './BlogHero';
import CategoryFilter from './CategoryFilter';
import BlogList from './BlogList';
import SEO from './SEO';

const samplePosts = [
  { id: 1, title: 'Lancement de Geordie Cool à Goma', excerpt: 'Découvrez notre plateforme...', image: '/images/blog1.jpg', date: '2026-03-11', category: 'Actualité' },
  { id: 2, title: 'Guide pratique : réserver dans les restaurants locaux', excerpt: 'Apprenez à utiliser...', image: '/images/blog2.jpg', date: '2026-03-10', category: 'Guide' },
  // Ajouter plus d’articles ici
];

export default function BlogPage() {
  const [category, setCategory] = useState('Tous');
  const categories = ['Tous', 'Actualité', 'Guide', 'Événement'];
  const filteredPosts = category === 'Tous' ? samplePosts : samplePosts.filter(p => p.category === category);

  return (
    <>
      <SEO
        title="Blog Geordie Cool – Actualités et guides"
        description="Découvrez les dernières actualités, guides et événements de Geordie Cool à Goma."
        url="https://geordiecool.com/blog"
        image="/images/blog1.jpg"
      />
      <main className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
        <BlogHero />
        <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
        <BlogList posts={filteredPosts} />
      </main>
    </>
  );
}