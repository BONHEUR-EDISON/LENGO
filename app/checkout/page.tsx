'use client';

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

type Operator =
  | "MTN RW"
  | "Airtel RW"
  | "Orange RW"
  | "MTN RDC"
  | "Airtel RDC"
  | "Vodacom RDC"
  | "Orange RDC";

const operatorIcons: Record<Operator, string> = {
  "MTN RW": "/operators/mtn-rw.webp",
  "Airtel RW": "/operators/airtel.webp",
  "Orange RW": "/operators/orange-money.png",
  "MTN RDC": "/operators/mtn-rdc.png",
  "Airtel RDC": "/operators/airtel-rdc.png",
  "Vodacom RDC": "/operators/vodacom-rdc.png",
  "Orange RDC": "/operators/orange-rdc.png",
};

export default function CheckoutPage() {
  const { cart } = useCart();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"mobilemoney" | "stripe">("mobilemoney");
  const [operator, setOperator] = useState<Operator>("MTN RW");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          email,
          phone,
          method,
          operator,
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Erreur lors du paiement");
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* HALO BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-purple-500/30 blur-[200px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <h1 className="text-5xl font-semibold tracking-tight">Finaliser votre paiement</h1>
            <p className="text-gray-400 text-lg">Paiement sécurisé et instantané.</p>

            {/* INPUTS */}
            <div className="space-y-6">
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <input
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>

            {/* PAYMENT METHOD */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Méthode de paiement</h2>

              <button
                onClick={() => setMethod("mobilemoney")}
                className={`w-full flex justify-between items-center p-6 rounded-2xl border backdrop-blur transition ${
                  method === "mobilemoney"
                    ? "border-green-400 bg-green-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex gap-4 items-center">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p>Mobile Money</p>
                    <p className="text-sm text-gray-400">{operator}</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMethod("stripe")}
                className={`w-full flex justify-between items-center p-6 rounded-2xl border backdrop-blur transition ${
                  method === "stripe"
                    ? "border-blue-400 bg-blue-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex gap-4 items-center">
                  <span className="text-2xl">💳</span>
                  <div>
                    <p>Carte bancaire</p>
                    <p className="text-sm text-gray-400">Visa • Mastercard</p>
                  </div>
                </div>
              </button>

              {/* Operator selector with icons */}
              {method === "mobilemoney" && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {Object.keys(operatorIcons).map((op) => (
                    <button
                      key={op}
                      onClick={() => setOperator(op as Operator)}
                      className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur w-full transition ${
                        operator === op
                          ? "border-green-400 bg-green-500/10"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <Image
                        src={operatorIcons[op as Operator]}
                        alt={op}
                        width={32}
                        height={32}
                      />
                      <span>{op}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PAY BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCheckout}
              className="w-full py-5 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30"
            >
              <Lock size={18} />
              {loading ? "Traitement..." : `Payer $${total.toFixed(2)}`}
            </motion.button>

            <p className="text-sm text-gray-400 text-center">Paiement sécurisé SSL</p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-10 shadow-xl h-fit"
          >
            <h2 className="text-xl font-semibold mb-8">Votre commande</h2>

            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image || "/images/produits/fallback.png"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-xl"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">x{item.quantity}</p>
                    </div>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <hr className="my-8 border-white/10" />

            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}