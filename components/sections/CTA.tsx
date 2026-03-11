'use client';

import React from 'react';

export default function CTAContact() {
  return (
    <section className="bg-blue-600 dark:bg-blue-800 py-20 px-4 sm:px-8 md:px-16 text-center rounded-lg">
      <h2 className="text-4xl font-bold text-white mb-6">
        Prêt à lancer votre projet ?
      </h2>
      <p className="text-white mb-8 text-lg">
        Contactez-nous dès aujourd’hui et transformons vos idées en solutions concrètes.
      </p>
      <a
        href="#contact-form"
        className="inline-block bg-white text-blue-600 dark:text-blue-800 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
      >
        Nous contacter
      </a>
    </section>
  );
}