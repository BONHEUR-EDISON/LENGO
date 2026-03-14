// components/navigation/BreadcrumbServer.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbServerProps {
  pathSegments: string[]; // ex: ["produits", "ascenseur-moderne"]
}

export async function BreadcrumbServer({ pathSegments }: BreadcrumbServerProps) {
  const crumbs: BreadcrumbItem[] = [{ name: "Accueil", href: "/" }];

  for (let i = 0; i < pathSegments.length; i++) {
    const path = "/" + pathSegments.slice(0, i + 1).join("/");
    let name = pathSegments[i].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    // Exemple : fetch titre réel depuis API
    const type = pathSegments[0];
    if (type === "produits" && i === 1) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/produits/${pathSegments[i]}`);
        if (res.ok) {
          const data = await res.json();
          name = data.name; // Titre réel
        }
      } catch {}
    }

    crumbs.push({ name, href: path });
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex items-center gap-2 text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;
          const position = index + 1;
          return (
            <li key={item.href} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {!isLast ? (
                <>
                  <Link href={item.href} itemProp="item">
                    <span itemProp="name">{item.name}</span>
                  </Link>
                  <meta itemProp="position" content={position.toString()} />
                  <ChevronRight size={14} />
                </>
              ) : (
                <span className="text-gray-900 font-medium" itemProp="name">{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}