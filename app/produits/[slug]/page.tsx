'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast, Toaster } from 'react-hot-toast';

import BreadcrumbClient from '@/components/navigation/BreadcrumbClient';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductDescription from '@/components/product/ProductDescription';
import ProductFeatures from '@/components/product/ProductFeatures';
import FAQ from '@/components/product/FAQ';
import Reviews from '@/components/product/Reviews';
import RelatedProducts from '@/components/product/RelatedProducts';
import CartSidebar from '@/components/Cart/CartSidebar';

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme } = useTheme();

  // ⚡ Fix TS: cast theme string en 'light' | 'dark'
  const currentTheme: 'light' | 'dark' = theme === 'dark' ? 'dark' : 'light';

  const product: Product | undefined = useMemo(() => {
    if (!slug) return undefined;
    return products.find((p) => p.slug === slug);
  }, [slug]);

  if (!product) {
    return (
      <div
        className={`p-10 text-center text-xl ${
          currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        Produit introuvable
      </div>
    );
  }

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ['/images/produits/fallback.png'];
  const description = product.description ?? '';
  const category = product.category ?? '';

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image ?? '/images/produits/fallback.png',
      },
      1
    );

    toast.success(`${product.name} ajouté au panier !`, {
      position: 'top-right',
      style: {
        borderRadius: '10px',
        background: currentTheme === 'dark' ? '#1F2937' : '#2563EB',
        color: currentTheme === 'dark' ? '#F9FAFB' : '#FFFFFF',
      },
    });

    setIsCartOpen(true);
  };

  const pathSegments = ['produits', slug];

  return (
    <>
      <Toaster />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main
        className={`max-w-7xl mx-auto px-6 py-24 space-y-16 ${
          currentTheme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'
        }`}
      >
        {/* Breadcrumb */}
        <BreadcrumbClient pathSegments={pathSegments} />

        {/* Section principale: Gallery + Info */}
        <section className="grid md:grid-cols-2 gap-12">
          <ProductGallery images={images} />
          <ProductInfo
            name={product.name}
            price={product.price}
            stock={product.stock ?? 0}
            category={category}
            onAddToCart={handleAddToCart}
            isNew={product.isNew}
            theme={currentTheme}
          />
        </section>

        {/* Description */}
        {description && <ProductDescription description={description} theme={currentTheme} />}

        {/* Caractéristiques techniques */}
        {Array.isArray(product.features) && product.features.length > 0 && (
          <ProductFeatures features={product.features} theme={currentTheme} />
        )}

        {/* FAQ */}
        {Array.isArray(product.faqs) && product.faqs.length > 0 && (
          <FAQ faqs={product.faqs} theme={currentTheme} />
        )}

        {/* Avis clients */}
        {Array.isArray(product.reviews) && product.reviews.length > 0 && (
          <Reviews reviews={product.reviews} theme={currentTheme} />
        )}

        {/* Produits similaires */}
        <RelatedProducts currentId={product.id} theme={currentTheme} />
      </main>
    </>
  );
}