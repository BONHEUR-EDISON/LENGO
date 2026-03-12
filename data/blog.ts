// data/blog.ts
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image: string;
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "L'avenir de la mobilité électrique",
    slug: "avenir-mobilite-electrique",
    summary: "Découvrez comment les nouvelles technologies transforment le transport urbain et durable.",
    image: "/images/blog/tesla-ev.webp",
    date: "2026-03-10",
    category: "Innovation",
  },
  {
    id: 2,
    title: "Design minimaliste pour l'expérience utilisateur",
    slug: "design-minimaliste-ux",
    summary: "Pourquoi moins c’est plus : comment le design épuré améliore l’interaction utilisateur.",
    image: "/images/blog/apple-design.png",
    date: "2026-03-08",
    category: "Design",
  },
  {
    id: 3,
    title: "Intelligence artificielle et productivité",
    slug: "ia-productivite",
    summary: "Comment l'IA transforme la productivité dans les entreprises modernes.",
    image: "/images/blog/ai-productivity.jpg",
    date: "2026-03-06",
    category: "Technologie",
  },
  {
    id: 4,
    title: "UX et micro-interactions : détails qui font la différence",
    slug: "ux-micro-interactions",
    summary: "Les micro-interactions, petites animations qui rendent vos interfaces magiques.",
    image: "/images/blog/micro-ux.jpg",
    date: "2026-03-05",
    category: "Design",
  },
];