'use client';

import { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { products as allProducts } from "@/data/products";
import ProductSearch from "@/components/product/ProductSearch";
import ProductFilter from "@/components/product/ProductFilter";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { useCartToast } from "@/context/CartToastContext";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export default function ProduitsPage() {
  const { addToCart } = useCart();
  const { showToast } = useCartToast();
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<[number, number] | null>(null);
  const [sort, setSort] = useState<SortOption>("default");

  const safeString = (value?: string): string => value ?? "";
  const safeNumber = (value?: number): number => value ?? 0;
  const safeArray = <T,>(arr?: T[]): T[] => (Array.isArray(arr) ? arr : []);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({
      id: product.id,
      name: safeString(product.name),
      price: safeNumber(product.price),
      image: safeString(product.image) || "/images/produits/fallback.png",
    });

    showToast({ id: product.id, name: safeString(product.name) });
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (search.trim() !== "") {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          safeString(p.name).toLowerCase().includes(query) ||
          safeString(p.description).toLowerCase().includes(query)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((p) => safeString(p.category) === categoryFilter);
    }

    if (priceFilter) {
      filtered = filtered.filter(
        (p) =>
          safeNumber(p.price) >= priceFilter[0] &&
          safeNumber(p.price) <= priceFilter[1]
      );
    }

    // Sorting
    if (sort === "price-asc") filtered.sort((a, b) => safeNumber(a.price) - safeNumber(b.price));
    else if (sort === "price-desc") filtered.sort((a, b) => safeNumber(b.price) - safeNumber(a.price));
    else if (sort === "name-asc") filtered.sort((a, b) => safeString(a.name).localeCompare(safeString(b.name)));
    else if (sort === "name-desc") filtered.sort((a, b) => safeString(b.name).localeCompare(safeString(a.name)));

    return filtered;
  }, [search, categoryFilter, priceFilter, sort]);

  const categories: string[] = Array.from(
    new Set(
      safeArray(allProducts.map((p) => p.category)).filter((c): c is string => !!c)
    )
  );

  return (
    <main className={`max-w-7xl mx-auto px-6 py-28 ${
      theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
    }`}>

      {/* Header */}
      <div className="mb-14 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" 
            style={{ color: theme === "dark" ? "#F9FAFB" : "#111827" }}>
          Nos Produits
        </h1>
        <p className="text-lg md:text-xl ui-muted" 
           style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}>
          Explorez notre catalogue et trouvez votre produit idéal.
        </p>
      </div>

      {/* Recherche + filtres */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <ProductSearch value={search} onChange={setSearch} />

        <div className="flex gap-4 items-center flex-wrap">
          <ProductFilter
            categories={categories}
            selectedCategory={categoryFilter}
            onCategoryChange={setCategoryFilter}
            onPriceChange={setPriceFilter}
            
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-3 py-2 rounded-lg border transition-colors"
            style={{
              background: theme === "dark" ? "#1F2937" : "#F3F4F6",
              borderColor: theme === "dark" ? "#374151" : "#D1D5DB",
              color: theme === "dark" ? "#F9FAFB" : "#111827",
            }}
          >
            <option value="default">Trier par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name-asc">Nom A→Z</option>
            <option value="name-desc">Nom Z→A</option>
          </select>
        </div>
      </div>

      {/* Grid produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center ui-muted" 
             style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}>
            Aucun produit trouvé.
          </p>
        ) : (
          filteredProducts.map((product) => {
            const name = safeString(product.name);
            const description = safeString(product.description);
            const image = safeString(product.image);
            const price = safeNumber(product.price);
            const stock = safeNumber(product.stock);

            return (
              <div
                key={product.id}
                className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                {/* Badge */}
                {stock === 0 && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    Rupture
                  </span>
                )}
                {product.isNew && stock > 0 && (
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    Nouveau
                  </span>
                )}

                {/* Image */}
                <Link href={`/produits/${product.slug}`} prefetch>
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL="/images/produits/fallback.png"
                      priority={product.id <= 5}
                    />
                  </div>
                </Link>

                {/* Contenu */}
                <div className="p-5 flex flex-col justify-between h-48">
                  <div>
                    <h2 className="font-semibold text-lg" 
                        style={{ color: theme === "dark" ? "#F9FAFB" : "#111827" }}>
                      {name}
                    </h2>
                    <p className="text-sm mt-1 ui-muted" 
                       style={{ color: theme === "dark" ? "#9CA3AF" : "#6B7280" }}>
                      {description.slice(0, 60)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="font-bold text-lg" 
                       style={{ color: theme === "dark" ? "#F9FAFB" : "#111827" }}>
                      ${price.toFixed(2)}
                    </p>

                    <button
                      disabled={stock === 0}
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 rounded-lg font-semibold transition-colors"
                      style={{
                        background: stock === 0 ? "gray" : "#2563EB",
                        color: "white",
                      }}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}