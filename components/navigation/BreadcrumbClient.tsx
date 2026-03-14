'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  pathSegments: string[];
  basePath?: string; // chemin de base, ex: "/produits"
}

export default function BreadcrumbClient({ pathSegments, basePath = "" }: BreadcrumbProps) {
  // Filtrer les segments vides ou undefined
  const segments = pathSegments.filter(Boolean);

  // Construire les crumbs
  const crumbs = [{ name: "Accueil", href: "/" }].concat(
    segments.map((seg, i) => ({
      name: seg.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      href: basePath + "/" + segments.slice(0, i + 1).join("/"),
    }))
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm mb-6"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center gap-2 text-gray-500">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li
              key={item.href}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {!isLast ? (
                <>
                  <Link href={item.href} itemProp="item">
                    <span itemProp="name">{item.name}</span>
                  </Link>
                  <meta itemProp="position" content={`${index + 1}`} />
                  <ChevronRight size={14} />
                </>
              ) : (
                <span className="text-gray-900 font-medium" itemProp="name">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}