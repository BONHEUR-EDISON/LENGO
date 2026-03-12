import Link from 'next/link';

interface BreadcrumbProps {
  productName?: string; // optionnel
}

export default function Breadcrumb({ productName }: BreadcrumbProps) {
  const safeName = productName || "Produit";

  return (
    <nav className="text-sm mb-6">
      <Link href="/" className="text-gray-500 hover:text-gray-700">Accueil</Link> &gt; 
      <Link href="/produits" className="text-gray-500 hover:text-gray-700">Produits</Link> &gt; 
      <span className="text-gray-900">{safeName}</span>
    </nav>
  );
}