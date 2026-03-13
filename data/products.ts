// data/products.ts

export interface Review {
  author: string;
  rating: number;
  comment: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  isNew: boolean;      // obligatoire
  id: number;
  name: string;
  slug: string;        // pour navigation et URL
  description: string;
  price: number;
  stock: number;
  category?: string;
  image: string;       // image principale
  images?: string[];   // galerie d’images
  features?: string[]; // caractéristiques techniques
  reviews?: Review[];
  faqs?: FAQItem[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Casque Audio Pro",
    slug: "casque-audio-pro",
    description: "Casque audio avec isolation du bruit et son haute fidélité pour professionnels.",
    price: 199.99,
    stock: 15,
    category: "Audio",
    image: "/images/produits/domotique.jpg",
    images: [
      "/images/produits/domotique.jpg",
      "/images/produits/domotique2.png",
      "/images/produits/domotique3.jpg"
    ],
    features: [
      "Isolation du bruit active",
      "Connectivité Bluetooth et filaire",
      "Autonomie 20 heures",
      "Microphone intégré"
    ],
    reviews: [
      { author: "Alice", rating: 5, comment: "Super casque, son clair et confortable." },
      { author: "Bob", rating: 4, comment: "Très bon produit, un peu cher mais qualité pro." }
    ],
    faqs: [
      { question: "Le casque est-il compatible PC et Mac ?", answer: "Oui, compatible Windows et macOS." },
      { question: "Peut-on l’utiliser sans fil ?", answer: "Oui, grâce au Bluetooth intégré." }
    ],
    isNew: true
  },
  {
    id: 2,
    name: "Clavier mécanique gamer",
    slug: "clavier-mecanique-gamer",
    description: "Clavier mécanique RGB avec switchs haute performance pour une frappe ultra réactive.",
    price: 129.99,
    stock: 30,
    category: "Périphériques",
    image: "/images/produits/domotique2.png",
    images: [
      "/images/produits/domotique2.png",
      "/images/produits/domotique2b.jpg"
    ],
    features: [
      "Switchs mécaniques rouges",
      "Éclairage RGB personnalisable",
      "Macros programmables",
      "Repose-poignet ergonomique"
    ],
    reviews: [
      { author: "Charles", rating: 5, comment: "Excellent clavier, frappe fluide et silencieuse." },
      { author: "Diane", rating: 4, comment: "Beau design, un peu bruyant sur certaines touches." }
    ],
    faqs: [
      { question: "Le clavier est-il rétroéclairé ?", answer: "Oui, entièrement RGB avec effets programmables." },
      { question: "Compatible Mac ?", answer: "Oui, mais certaines touches spéciales sont Windows-only." }
    ],
    isNew: false
  },
  {
    id: 3,
    name: "Souris ergonomique",
    slug: "souris-ergonomique",
    description: "Souris ergonomique avec capteur haute précision pour usage bureautique et gaming.",
    price: 59.99,
    stock: 20,
    category: "Périphériques",
    image: "/images/produits/p1.jpg",
    images: [
      "/images/produits/p1.jpg",
      "/images/produits/p1b.jpg"
    ],
    features: [
      "Capteur 16000 DPI",
      "Design ergonomique pour droitier",
      "6 boutons programmables",
      "Connexion filaire USB"
    ],
    reviews: [
      { author: "Eve", rating: 5, comment: "Très confortable, parfait pour les longues sessions." },
      { author: "Frank", rating: 4, comment: "Bonne précision mais un peu lourde pour moi." }
    ],
    faqs: [
      { question: "Fonctionne sur Mac ?", answer: "Oui, compatible avec macOS et Windows." },
      { question: "Peut-on régler la sensibilité ?", answer: "Oui, via le bouton DPI ou le logiciel fourni." }
    ],
    isNew: true
  },
  {
    id: 4,
    name: "Webcam HD 1080p",
    slug: "webcam-hd-1080p",
    description: "Webcam Full HD 1080p avec micro intégré et correction automatique de la lumière.",
    price: 79.99,
    stock: 25,
    category: "Audio / Vidéo",
    image: "/images/produits/webcam1.jpg",
    images: ["/images/produits/webcam1.jpg","/images/produits/webcam2.jpg"],
    features: ["Résolution 1080p","Micro intégré","Correction automatique de la lumière","Compatible Windows et Mac"],
    reviews: [{ author: "George", rating: 5, comment: "Image nette, très pratique pour les visioconférences." }],
    faqs: [{ question: "Fonctionne sous Linux ?", answer: "Oui, avec drivers standards UVC." }],
    isNew: false
  },
  {
    id: 5,
    name: "Enceinte Bluetooth portable",
    slug: "enceinte-bluetooth-portable",
    description: "Enceinte Bluetooth compacte avec son stéréo et autonomie jusqu’à 12 heures.",
    price: 49.99,
    stock: 40,
    category: "Audio",
    image: "/images/produits/enceinte1.jpg",
    images: ["/images/produits/enceinte1.jpg","/images/produits/enceinte2.jpg"],
    features: ["Bluetooth 5.0","Autonomie 12h","Son stéréo","Étanche IPX5"],
    reviews: [{ author: "Hanna", rating: 5, comment: "Pratique et puissant pour sa taille." }],
    faqs: [{ question: "Peut-on l’utiliser en extérieur ?", answer: "Oui, elle est étanche IPX5." }],
    isNew: true
  },
  {
    id: 6,
    name: "Disque dur externe 1TB",
    slug: "disque-dur-externe-1tb",
    description: "Disque dur externe rapide et portable avec connectivité USB-C et USB 3.0.",
    price: 89.99,
    stock: 18,
    category: "Stockage",
    image: "/images/produits/hdd1.jpg",
    images: ["/images/produits/hdd1.jpg","/images/produits/hdd2.jpg"],
    features: ["Capacité 1TB","USB-C et USB 3.0","Portable et léger","Compatible Windows/Mac"],
    reviews: [{ author: "Ian", rating: 4, comment: "Rapide et fiable, parfait pour sauvegardes." }],
    faqs: [{ question: "Formaté en NTFS ?", answer: "Oui, prêt à l’emploi, peut être reformaté." }],
    isNew: false
  }
];