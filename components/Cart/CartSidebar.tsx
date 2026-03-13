'use client';

import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { theme } = useTheme();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const bgGlass = theme === "dark" ? "bg-black/70" : "bg-white/70";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const hoverBg = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";

  // Fermeture automatique après 3 secondes
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay sombre + blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`fixed right-0 top-0 h-full w-full max-w-sm z-50 shadow-2xl p-6 flex flex-col backdrop-blur-md ${bgGlass} ${textColor} border-l ${borderColor}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Panier</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto space-y-4">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-500 dark:text-gray-400 text-center"
                  >
                    Votre panier est vide
                  </motion.p>
                ) : (
                  cart.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`flex gap-4 items-center border rounded p-2 ${borderColor}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm">{item.quantity} × ${item.price.toFixed(2)}</p>
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                          >-</button>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                          >+</button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 dark:text-red-400 underline hover:text-red-800 dark:hover:text-red-300"
                      >
                        Supprimer
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold text-lg mb-4">Total: ${total.toFixed(2)}</p>
                <button
                  onClick={clearCart}
                  className={`w-full py-2 mb-2 rounded ${hoverBg} transition`}
                >
                  Vider le panier
                </button>
                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Passer à la caisse
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}