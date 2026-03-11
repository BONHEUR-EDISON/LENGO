'use client';
import React from "react";

export default function ProjectHero() {
  return (
    <section className="text-center mb-16 px-4 md:px-0">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
        Nos <span className="text-blue-600 dark:text-blue-400">Projets</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Explorez nos réalisations innovantes qui transforment des idées en solutions concrètes.  
        Chaque projet reflète notre expertise et notre passion pour la technologie.
      </p>
    </section>
  );
}