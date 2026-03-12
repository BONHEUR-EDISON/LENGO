interface ProductDescriptionProps {
  description?: string;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  const safeDescription = description || "Pas de description disponible.";

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Description</h2>
      <p className="text-gray-700">{safeDescription}</p>
    </section>
  );
}