// pages/panier.tsx
import { useCart } from "./CartContext";
import Link from "next/link";

export default function PanierPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
        <Link href="/produits" className="text-blue-600 underline">
          Voir nos produits
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded">
            <div className="flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded"/>
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>Quantité: {item.quantity}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 underline mt-2"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 mr-4">
          Passer à la caisse
        </button>
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          Vider le panier
        </button>
      </div>
    </div>
  );
}