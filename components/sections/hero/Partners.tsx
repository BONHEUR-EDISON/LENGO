"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
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

interface HeroPartnersProps {
  gridCols?: string; // optionnel pour cohérence avec Stats
}

export default function HeroPartners({ gridCols }: HeroPartnersProps) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.scrollWidth / 2; // divisé par 2 car logos dupliqués sur mobile
      setDistance(totalWidth);
    }
  }, []);

  useEffect(() => {
    if (distance === 0) return;
    const duration = hovered ? 120 : 90; // vitesse en secondes
    controls.start({
      x: [0, -distance],
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration, ease: "linear" },
      },
    });
  }, [distance, hovered, controls]);

  // dupliquer les logos si petit écran
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const logosToShow = isMobile ? [...partners, ...partners] : partners;

  return (
    <div className="relative mt-14 w-full overflow-hidden">
      {/* fade edges */}
      <div className="absolute left-0 top-0 h-full w-16 sm:w-28 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"/>
      <div className="absolute right-0 top-0 h-full w-16 sm:w-28 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"/>

      {/* marquee */}
      <motion.div
        ref={containerRef}
        className="flex items-center gap-6 sm:gap-14 whitespace-nowrap"
        animate={controls}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {logosToShow.map((p, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 group w-[70px] sm:w-[110px] h-[35px] sm:h-[50px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-40 blur-sm transition duration-500"/>
            <Image
              src={p.logo}
              alt={p.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 70px, 110px"
            />
          </div>
        ))}
      </motion.div>

      {/* label */}
      <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/50 text-center mt-6">
        partenaires & organisations
      </p>
    </div>
  );
}