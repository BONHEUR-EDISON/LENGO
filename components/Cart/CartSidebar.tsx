'use client';

import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, clearCart } = useCart();
  const { theme } = useTheme();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const bgColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const hoverBgColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className={`fixed right-0 top-0 h-full w-full max-w-sm shadow-xl p-6 flex flex-col ${bgColor} ${textColor}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Panier</h2>
              <button onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            {/* Contenu panier */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Votre panier est vide</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className={`flex gap-4 items-center border rounded p-2 ${borderColor}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p>
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold text-lg mb-4">
                  Total: ${total.toFixed(2)}
                </p>
                <button
                  onClick={clearCart}
                  className={`w-full py-2 mb-2 rounded ${hoverBgColor} transition`}
                >
                  Vider le panier
                </button>
                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Passer à la caisse
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}