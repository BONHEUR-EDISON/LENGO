"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const partners = [
  { name: "BCC", logo: "/images/partners/bcc.png" },
  { name: "OCHA", logo: "/images/partners/ocha.png" },
  { name: "MONUSCO", logo: "/images/partners/monusco.png" },
  { name: "FAO", logo: "/images/partners/fao.png" },
  { name: "UNHCR", logo: "/images/partners/unhcr.png" },
  { name: "AIRTEL", logo: "/images/partners/airtel.png" },
   { name: "BOA", logo: "/images/partners/boa.png" },
  { name: "PANZI", logo: "/images/partners/panzi.png" },
  { name: "RAWBANK", logo: "/images/partners/rawbank.png" },
  { name: "ORANGE", logo: "/images/partners/orange.png" },
  { name: "EQUITY", logo: "/images/partners/equity.png" },
  { name: "HANDICAP INTERNATIONAL", logo: "/images/partners/handicap_international.png" },
   { name: "ISP BUKAVU", logo: "/images/partners/isp_bukavu.png" },
  { name: "PULSE GROUP", logo: "/images/partners/pulse.png" },
  { name: "ACF", logo: "/images/partners/action_contre_la_faim.png" },
  { name: "ECOBANK", logo: "/images/partners/ecobank.png" },
  { name: "MERCY COPRS", logo: "/images/partners/mercy_corps.png" },
  { name: "MSF", logo: "/images/partners/medecin_sans_frontieres.png" },
];

export default function PartnersSlider() {
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section className="relative py-28 bg-gradient-to-b from-[#020617] via-[#030a1c] to-[#020617] overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-indigo-600/10 blur-[200px] rounded-full" />

      <motion.div style={{ y: parallax }} className="relative max-w-7xl mx-auto px-6 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 tracking-tight text-white"
        >
          Nos partenaires stratégiques
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-gray-400 max-w-3xl mx-auto text-center mb-20"
        >
          Ils nous font confiance pour la réalisation de projets techniques,
          énergétiques et industriels de haute qualité.
        </motion.p>

        {/* Carousel wrapper */}
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

          {/* Animated track */}
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          >
            {[...partners, ...partners].map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.15, y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="group relative flex-shrink-0 w-36 h-36 md:w-40 md:h-40 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_120px_rgba(56,189,248,0.15)] flex items-center justify-center overflow-hidden"
              >
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-700" />

                {/* Sweep light */}
                <div className="absolute -inset-[70%] bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-12 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-[1400ms]" />

                {/* Logo */}
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}