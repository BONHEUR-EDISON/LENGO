interface ProductFeaturesProps {
  features?: string[];
}

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  const safeFeatures = features || [];
  if (safeFeatures.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Caractéristiques techniques</h2>
      <ul className="list-disc ml-5 text-gray-700 space-y-2">
        {safeFeatures.map((f, idx) => <li key={idx}>{f}</li>)}
      </ul>
    </section>
  );
}