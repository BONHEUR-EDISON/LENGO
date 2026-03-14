'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface BreadcrumbProps {
  productName?: string;
}

export default function Breadcrumb({ productName }: BreadcrumbProps) {
  const safeName = productName || 'Produit';
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Next-themes: attendre que le thème soit monté pour éviter le "flash"
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Classes Tailwind selon le thème
  const linkClass =
    resolvedTheme === 'dark'
      ? 'text-gray-400 hover:text-gray-300'
      : 'text-gray-500 hover:text-gray-700';

  const textClass =
    resolvedTheme === 'dark' ? 'text-gray-100' : 'text-gray-900';

  return (
    <nav className="text-sm mb-6 flex flex-wrap gap-1">
      <Link href="/" className={linkClass}>
        Accueil
      </Link>
      <span>&gt;</span>
      <Link href="/produits" className={linkClass}>
        Produits
      </Link>
      <span>&gt;</span>
      <span className={textClass}>{safeName}</span>
    </nav>
  );
}