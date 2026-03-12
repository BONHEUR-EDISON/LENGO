// components/product/StickyCart.tsx
import { CartItem } from "@/context/CartContext";

interface StickyCartProps {
  product: { id: number; name: string; price: number };
  addToCart: () => void;
}

export default function StickyCart({ product, addToCart }: StickyCartProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t p-4 md:hidden flex justify-between items-center z-50">
      <div>
        <p className="font-semibold">{product.name}</p>
        <p className="font-bold">${product.price}</p>
      </div>

      <button
        onClick={addToCart}
        className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-xl"
      >
        Ajouter
      </button>
    </div>
  );
}