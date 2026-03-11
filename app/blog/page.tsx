'use client';
import React, { useState } from 'react';
import SEO from '../../components/Blog/SEO';
import BlogPage from '@/components/Blog/BlogPage';



export default function BlogeHero() {
  
  return (
    <>
      <SEO
        title="Blog Geordie Cool – Actualités et guides"
        description="Découvrez les dernières actualités, guides et événements de Geordie Cool à Goma."
        url="https://geordiecool.com/blog"
        image="/images/blog1.jpg"
      />
      <main className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
        <BlogPage />
        
      </main>
    </>
  );
}