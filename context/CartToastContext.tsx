'use client';

import { createContext, useContext, useState, ReactNode } from "react";

interface ToastItem {
  id: number;
  name: string;
}

interface CartToastContextType {
  showToast: (item: ToastItem) => void;
}

const CartToastContext = createContext<CartToastContextType | undefined>(undefined);

export const CartToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (item: ToastItem) => {
    setToasts((prev) => [...prev, item]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== item.id));
    }, 1500); // duree toast 1.5s
  };

  return (
    <CartToastContext.Provider value={{ showToast }}>
      {children}

      {/* Container toast */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-green-500 text-white px-4 py-2 rounded shadow-lg"
          >
            ✅ {t.name} ajouté au panier
          </div>
        ))}
      </div>
    </CartToastContext.Provider>
  );
};

export const useCartToast = () => {
  const context = useContext(CartToastContext);
  if (!context) throw new Error("useCartToast must be used within CartToastProvider");
  return context;
};