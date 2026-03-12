// components/Blog/TableOfContents.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

interface TOCProps {
  mdxContent: string;
  scrollSpy?: boolean;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ mdxContent, scrollSpy = false }: TOCProps) {
  const headings: Heading[] = useMemo(() => {
    const regex = /^(##|###)\s+(.+)$/gm;
    const matches = [...mdxContent.matchAll(regex)];
    return matches.map((m) => ({
      id: m[2].toLowerCase().replace(/\s+/g, "-"),
      text: m[2],
      level: m[1] === "##" ? 2 : 3,
    }));
  }, [mdxContent]);

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!scrollSpy) return;

    const handleScroll = () => {
      let current = null;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= 100) {
          current = h.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, scrollSpy]);

  if (!headings.length) return null;

  return (
    <aside className="mb-8 md:mb-0 md:w-64 sticky top-20 h-fit p-4 border-l border-gray-200 dark:border-gray-700">
      <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Sommaire</h2>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className={`text-sm hover:underline ${
                activeId === h.id
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}