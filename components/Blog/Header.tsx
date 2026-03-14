// Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-50">
      <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white">
        LENGO BLOG
      </Link>
      <nav className="space-x-4">
        <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
          Blog
        </Link>
        <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
          À propos
        </Link>
      </nav>
    </header>
  
  );
}