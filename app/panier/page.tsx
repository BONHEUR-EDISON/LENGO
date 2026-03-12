'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function PanierPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { theme } = useTheme();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Modale
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"delete" | "clear" | "checkout" | null>(null);
  const [modalItemId, setModalItemId] = useState<number | null>(null);

  const openModal = (action: "delete" | "clear" | "checkout", id?: number) => {
    setModalAction(action);
    setModalItemId(id ?? null);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (modalAction === "delete" && modalItemId !== null) {
      removeFromCart(modalItemId);
    } else if (modalAction === "clear") {
      clearCart();
    } else if (modalAction === "checkout") {
      alert("Redirection vers la caisse...");
    }
    setModalOpen(false);
    setModalAction(null);
    setModalItemId(null);
  };

  if (cart.length === 0)
    return (
      <div className="container mx-auto text-center">
        <h1 className={`py-30 pb-6 text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          Votre panier est vide
        </h1>
        <Link
          href="/produits"
          className="text-blue-600 p-0 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
        >
          Voir nos produits
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">

      <h1 className={`text-4xl py-30 font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
        Votre Panier
      </h1>

      <div className="space-y-4">
        <AnimatePresence>
          {cart.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`flex justify-between items-center border rounded p-4 transition-colors ${
                theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex gap-4 items-center">
                <Image
                  src={item.image || "/images/produits/fallback.png"}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="rounded object-cover"
                />
                <div>
                  <h2 className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{item.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      -
                    </button>
                    <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => openModal("delete", item.id)}
                  className="text-red-600 dark:text-red-400 underline mt-2 hover:text-red-800 dark:hover:text-red-300"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col md:flex-row justify-end items-center gap-4">
        <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          Total: ${total.toFixed(2)}
        </p>
        <button
          onClick={() => openModal("checkout")}
          className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Passer à la caisse
        </button>
        <button
          onClick={() => openModal("clear")}
          className="bg-red-600 dark:bg-red-500 text-white px-6 py-3 rounded hover:bg-red-700 dark:hover:bg-red-600 transition"
        >
          Vider le panier
        </button>
      </div>

      {/* MODALE */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80 text-center">
            <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {modalAction === "delete" && "Voulez-vous vraiment supprimer cet article ?"}
              {modalAction === "clear" && "Voulez-vous vraiment vider le panier ?"}
              {modalAction === "checkout" && "Voulez-vous passer au paiement ?"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmAction}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Oui
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}