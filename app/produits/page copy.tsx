// app/produits/page.tsx
import { products } from "@/data/products";
import ProductCard from "./ProductCardClient";

export default function ProduitsPage() {
  return (
    <div className="max-w-7xl mx-auto p-8  sm:p-12 ">
      <h1 className="text-5xl font-extrabold mb-12 py-14  pt-20 text-center text-white dark:text-blue-500">
        Nos Produits
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}