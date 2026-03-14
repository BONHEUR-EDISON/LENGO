"use client";

interface ProductDescriptionProps {
  description?: string;
  theme?: "light" | "dark"; // ajout du thème
}

export default function ProductDescription({
  description,
  theme = "light", // valeur par défaut
}: ProductDescriptionProps) {
  const safeDescription = description || "Pas de description disponible.";

  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <section className="space-y-4">
      <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>Description</h2>
      <p className={textColor}>{safeDescription}</p>
    </section>
  );
}