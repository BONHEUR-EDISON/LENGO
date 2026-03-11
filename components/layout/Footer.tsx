'use client';

import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`relative transition-colors duration-500 ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>

      {/* GRADIENT SUBTIL */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-600/20 to-transparent dark:from-blue-500/20 dark:to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-12">
        
        {/* LOGO / DESCRIPTION */}
        <div className="space-y-2 md:col-span-2">
          <h2 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>LENGO</h2>
          <p className="text-xs tracking-widest uppercase text-gray-400 dark:text-gray-500">
            Engineering & Innovation
          </p>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-4 text-sm`}>
            Solutions industrielles et technologiques pour les entreprises modernes, adaptées aux startups et projets innovants.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Navigation</h3>
          <ul className="space-y-2 text-sm">
            {["Accueil", "Services", "Projets", "Contact"].map((item, i) => (
              <li key={i} className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Services</h3>
          <ul className="space-y-2 text-sm">
            {["Automatisation", "Construction métallique", "Domotique", "Systèmes TIC"].map((service, i) => (
              <li key={i} className="hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">{service}</li>
            ))}
          </ul>
        </div>

        {/* CTA CONTACT */}
        <div className="md:col-span-1">
          <h3 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Contactez-nous</h3>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm mb-4`}>
            Inscrivez votre email pour recevoir nos dernières nouveautés ou nous contacter directement.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Votre email"
              className={`w-full px-3 py-2 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
              Envoyer
            </button>
          </div>
          <div className="flex gap-3 mt-6 text-xl">
            {[FaFacebookF, FaLinkedinIn, FaTwitter].map((Icon, i) => (
              <a key={i} href="#" className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition-all shadow-md hover:shadow-blue-500/50">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className={`text-center py-6 border-t transition-colors duration-500 ${isDark ? "border-gray-800 text-gray-500" : "border-gray-200 text-gray-600"} text-sm`}>
        © 2026 LENGO - Tous droits réservés
      </div>
    </footer>
  );
}