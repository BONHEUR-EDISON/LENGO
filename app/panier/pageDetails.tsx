'use client'

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"

type Step = "cart" | "checkout" | "success"

export default function PanierDetailPage() {

  const { cart, removeFromCart, clearCart, updateQuantity } = useCart()
  const { theme } = useTheme() // hook pour détecter light/dark

  const [step,setStep] = useState<Step>("cart")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [paymentMethod,setPaymentMethod] = useState<"stripe" | "mobilemoney">("mobilemoney")

  const total = cart.reduce(
    (acc,item)=> acc + item.price * item.quantity,
    0
  )

  async function handleCheckout(){
    try{
      const res = await fetch("/api/checkout",{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({
          cart,
          email,
          phone,
          method:paymentMethod
        })
      })

      const data = await res.json()

      if(data.url){
        window.location.href = data.url
      }else{
        setStep("success")
        clearCart()
      }

    }catch(err){
      console.error(err)
      alert("Erreur paiement")
    }
  }

  // --- SUCCESS SCREEN ---
  if(step==="success"){
    return(
      <div className={`min-h-screen flex items-center justify-center ${
        theme==="dark"?"bg-gray-900 text-white":"bg-gray-50 text-gray-900"
      }`}>
        <motion.div
          initial={{scale:0.9,opacity:0}}
          animate={{scale:1,opacity:1}}
          className={`p-14 rounded-3xl border ${
            theme==="dark"?"border-white/10 bg-white/5":"border-gray-200 bg-white"
          } text-center max-w-md`}
        >
          <h1 className="text-4xl font-semibold mb-4 text-green-500">Paiement réussi 🎉</h1>
          <p className={`text-lg mb-8 ${theme==="dark"?"text-gray-300":"text-gray-700"}`}>Merci pour votre commande</p>
          <Link href="/produits" className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            Continuer les achats
          </Link>
        </motion.div>
      </div>
    )
  }

  // --- CHECKOUT SCREEN ---
  if(step==="checkout"){
    return(
      <div className={`${theme==="dark"?"bg-gray-900 text-white":"bg-gray-50 text-gray-900"} min-h-screen`}>
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20">

          {/* LEFT */}
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold">Paiement</h1>

            <div className="space-y-6">
              <input
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl border ${
                  theme==="dark"?"border-white/10 bg-white/5":"border-gray-200 bg-white"
                }`}
              />
              <input
                placeholder="Téléphone"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl border ${
                  theme==="dark"?"border-white/10 bg-white/5":"border-gray-200 bg-white"
                }`}
              />
            </div>

            <div className="space-y-4">
              <button
                onClick={()=>setPaymentMethod("mobilemoney")}
                className={`w-full p-6 rounded-2xl border ${
                  paymentMethod==="mobilemoney"?"border-green-400 bg-green-500/10":theme==="dark"?"border-white/10 bg-white/5":"border-gray-200 bg-white"
                }`}
              >
                📱 Mobile Money
              </button>

              <button
                onClick={()=>setPaymentMethod("stripe")}
                className={`w-full p-6 rounded-2xl border ${
                  paymentMethod==="stripe"?"border-blue-400 bg-blue-500/10":theme==="dark"?"border-white/10 bg-white/5":"border-gray-200 bg-white"
                }`}
              >
                💳 Carte bancaire
              </button>
            </div>

            <motion.button
              whileTap={{scale:0.97}}
              whileHover={{scale:1.02}}
              onClick={handleCheckout}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex justify-center gap-2 items-center font-semibold text-white"
            >
              <Lock size={18}/> Payer ${total.toFixed(2)}
            </motion.button>

            <button onClick={()=>setStep("cart")} className={`text-sm underline ${theme==="dark"?"text-gray-400":"text-gray-700"}`}>Retour panier</button>
          </div>

          {/* RIGHT */}
          <div className={`p-10 rounded-3xl border ${theme==="dark"?"border-white/10 bg-white/5":"border-gray-200 bg-white"}`}>
            <h2 className="text-xl font-semibold mb-6">Résumé commande</h2>
            <div className="space-y-6">
              {cart.map(item=>(
                <div key={item.id} className="flex justify-between">
                  <div className="flex gap-4">
                    <Image src={item.image || "/images/produits/fallback.png"} alt={item.name} width={60} height={60} className="rounded-lg"/>
                    <div>
                      <p>{item.name}</p>
                      <p className={`text-sm ${theme==="dark"?"text-gray-400":"text-gray-500"}`}>x{item.quantity}</p>
                    </div>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr className={`my-6 border ${theme==="dark"?"border-white/10":"border-gray-200"}`}/>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // --- EMPTY CART ---
  if(cart.length===0){
    return(
      <div className={`min-h-screen flex items-center justify-center ${
        theme==="dark"?"bg-gray-900 text-white":"bg-gray-50 text-gray-900"
      }`}>
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-6">Votre panier est vide</h1>
          <Link href="/produits" className={`px-6 py-3 rounded-xl ${theme==="dark"?"bg-white text-black":"bg-black text-white"}`}>Voir les produits</Link>
        </div>
      </div>
    )
  }

  // --- CART SCREEN ---
  return(
    <div className={`min-h-screen ${theme==="dark"?"bg-gray-900 text-white":"bg-gray-50 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto px-6 py-24 space-y-10">
        <h1 className="text-4xl font-semibold">Votre panier</h1>
        <AnimatePresence>
          {cart.map(item=>(
            <motion.div
              key={item.id}
              layout
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-20}}
              className={`flex justify-between items-center rounded-2xl p-6 border ${
                theme==="dark"?"bg-white/5 border-white/10":"bg-white border-gray-200"
              }`}
            >
              <div className="flex gap-6 items-center">
                <Image src={item.image || "/images/produits/fallback.png"} alt={item.name} width={90} height={90} className="rounded-xl"/>
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <div className="flex gap-2 mt-2">
                    <button onClick={()=>updateQuantity(item.id,item.quantity-1)} className="px-3 py-1 rounded bg-white/10">-</button>
                    <span className="px-3">{item.quantity}</span>
                    <button onClick={()=>updateQuantity(item.id,item.quantity+1)} className="px-3 py-1 rounded bg-white/10">+</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={()=>removeFromCart(item.id)} className="flex items-center gap-1 text-red-400 text-sm"><Trash2 size={16}/> Supprimer</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex justify-between items-center mt-12">
          <p className="text-2xl font-semibold">Total: ${total.toFixed(2)}</p>
          <div className="flex gap-4">
            <button onClick={()=>setStep("checkout")} className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white">Passer à la caisse</button>
            <button onClick={clearCart} className="px-6 py-4 rounded-xl bg-red-500 text-white">Vider</button>
          </div>
        </div>

      </div>
    </div>
  )
}