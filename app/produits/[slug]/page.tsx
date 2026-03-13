'use client';

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast, Toaster } from "react-hot-toast";

import Breadcrumb from "@/components/product/Breadcrumb";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDescription from "@/components/product/ProductDescription";
import ProductFeatures from "@/components/product/ProductFeatures";
import FAQ from "@/components/product/FAQ";
import Reviews from "@/components/product/Reviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import CartSidebar from "@/components/Cart/CartSidebar";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Recherche du produit en toute sécurité
  const product: Product | undefined = useMemo(() => {
    if (!slug) return undefined;
    return products.find((p) => p.slug === slug);
  }, [slug]);

  if (!product) {
    return (
      <div className="p-10 text-center text-xl text-gray-700 dark:text-gray-300">
        Produit introuvable
      </div>
    );
  }

  // Fallback pour les images
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ["/images/produits/fallback.png"];

  // Fallback pour la description
  const description = product.description ?? "";

  // Fallback pour le category
  const category = product.category ?? "";

  // Gestion ajout au panier
  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image ?? "/images/produits/fallback.png",
      },
      1
    );

    toast.success(`${product.name} ajouté au panier !`, {
      position: "top-right",
      style: {
        borderRadius: "10px",
        background: "#1a1a1a",
        color: "#fff",
      },
    });

    setIsCartOpen(true);
  };

  return (
    <>
      <Toaster />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-12">

        {/* Breadcrumb */}
        <Breadcrumb productName={product.name} />

        {/* Section principale */}
        <section className="grid md:grid-cols-2 gap-12">
          <ProductGallery images={images} />

          <ProductInfo
            name={product.name}
            price={product.price}
            stock={product.stock ?? 0}
            category={category}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Description */}
        <ProductDescription description={description} />

        {/* Caractéristiques */}
        {(Array.isArray(product.features) && product.features.length > 0) && (
          <ProductFeatures features={product.features} />
        )}

        {/* FAQ */}
        {(Array.isArray(product.faqs) && product.faqs.length > 0) && (
          <FAQ faqs={product.faqs} />
        )}

        {/* Avis */}
        {(Array.isArray(product.reviews) && product.reviews.length > 0) && (
          <Reviews reviews={product.reviews} />
        )}

        {/* Produits similaires */}
        <RelatedProducts currentId={product.id} />

      </main>
    </>
  );
}