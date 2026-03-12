'use client';

import { useState, useMemo } from "react";
import { products as allProducts } from "@/data/products";
import ProductSearch from "@/components/product/ProductSearch";
import ProductFilter from "@/components/product/ProductFilter";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCartToast } from "@/context/CartToastContext";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function ProduitsPage() {
  const { addToCart } = useCart();
  const { showToast } = useCartToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<[number, number] | null>(null);
  const [sort, setSort] = useState<SortOption>("default");

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price });
    showToast({ id: product.id, name: product.name });
  };

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Recherche
    if (search.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtre catégorie
    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Filtre prix
    if (priceFilter) {
      filtered = filtered.filter(
        (p) => p.price >= priceFilter[0] && p.price <= priceFilter[1]
      );
    }

    // Tri
    if (sort === "price-asc") filtered = filtered.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") filtered = filtered.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-desc") filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));

    return filtered;
  }, [search, categoryFilter, priceFilter, sort]);

  // Catégories uniques pour filtre
  const categories = Array.from(new Set(allProducts.map((p) => p.category).filter(Boolean)));

  return (
    <main className="max-w-7xl mx-auto px-6 py-30">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Nos Produits
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
          Explorez notre catalogue et trouvez votre produit idéal.
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
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
            className="border rounded px-3 py-2 text-gray-700 dark:text-gray-300 dark:bg-gray-800 transition-colors"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            Aucun produit trouvé.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-transform hover:scale-105"
            >
              {/* Badge */}
              {product.stock === 0 && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  Rupture
                </span>
              )}
              {product.isNew && product.stock > 0 && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  Nouveau
                </span>
              )}

              {/* Image */}
              <Link href={`/produits/${product.slug}`} prefetch>
                <div className="relative h-64 md:h-60 w-full overflow-hidden">
                  <Image
                    src={product.image || "/images/produits/fallback.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width:768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) =>
                      (e.currentTarget.src = "/images/produits/fallback.png")
                    }
                  />
                </div>
              </Link>

              {/* Infos produit */}
              <div className="p-4 flex flex-col justify-between h-48">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {product.description.slice(0, 60)}...
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p className="font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </p>

                  <button
                    disabled={product.stock === 0}
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      product.stock === 0
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    }`}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}