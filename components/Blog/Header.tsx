// Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <nav className="text-sm mb-6">
      <Link href="/" className="text-gray-500 hover:text-gray-700">Accueil</Link> &gt; 
      <Link href="/blog" className="text-gray-500 hover:text-gray-700">Produits</Link> &gt; 
     
    </nav>
  
  );
}