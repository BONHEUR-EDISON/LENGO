"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function AutoBreadcrumb() {
  const pathname = usePathname(); // ex: /blog/avenir-mobilite-electrique
  const segments = pathname.split("/").filter(Boolean); // ["blog", "avenir-mobilite-electrique"]

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex items-center gap-2 text-gray-500">
        {/* Accueil toujours présent */}
        <li>
          <Link href="/" className="hover:text-gray-900 transition">
            Accueil
          </Link>
          {segments.length > 0 && <ChevronRight size={14} />}
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          // Transforme le segment en texte lisible
          const name = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()); // "avenir-mobilite" => "Avenir Mobilite"

          // Reconstruit le href partiel
          const href = "/" + segments.slice(0, index + 1).join("/");

          return (
            <li key={href} className="flex items-center gap-2">
              {!isLast ? (
                <>
                  <Link href={href} className="hover:text-gray-900 transition">
                    {name}
                  </Link>
                  <ChevronRight size={14} />
                </>
              ) : (
                <span className="text-gray-900 font-medium">{name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}