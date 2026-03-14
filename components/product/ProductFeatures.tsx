'use client';

interface ProductFeaturesProps {
  features?: string[];
  theme?: 'light' | 'dark'; // thème optionnel
}

export default function ProductFeatures({
  features,
  theme = 'light',
}: ProductFeaturesProps) {
  const safeFeatures = features || [];
  if (safeFeatures.length === 0) return null;

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  return (
    <section className="space-y-4">
      <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>
        Caractéristiques techniques
      </h2>
      <ul className={`list-disc ml-5 space-y-2 ${textColor}`}>
        {safeFeatures.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>
    </section>
  );
}