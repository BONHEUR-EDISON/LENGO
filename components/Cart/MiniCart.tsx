"use client";

import { useCart } from "@/context/CartContext";

export default function MiniCart() {

  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="absolute right-0 top-12 w-64 bg-white border rounded-xl shadow-lg p-4">

      <h3 className="font-semibold mb-3">
        Panier
      </h3>

      {cart.length === 0 && (
        <p className="text-gray-500">
          Panier vide
        </p>
      )}

      {cart.map((item, i) => (
        <div key={i} className="flex justify-between mb-2">
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>
      ))}

      <div className="border-t mt-3 pt-2 font-bold">
        Total : ${total}
      </div>

    </div>
  );
}