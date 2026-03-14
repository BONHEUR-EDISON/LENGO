'use client';

interface Review {
  author: string;
  rating: number;
  comment: string;
}

interface ReviewsProps {
  reviews?: Review[];
  theme?: 'light' | 'dark'; // thème optionnel
}

export default function Reviews({ reviews, theme = 'light' }: ReviewsProps) {
  const safeReviews = reviews || [];
  if (safeReviews.length === 0) return null;

  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const authorColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';

  return (
    <section className="space-y-4">
      <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>Avis clients</h2>
      <div className="space-y-4">
        {safeReviews.map((r, idx) => (
          <div
            key={idx}
            className={`border ${borderColor} rounded p-4`}
          >
            <p className={`font-semibold ${authorColor}`}>{r.author}</p>
            <p className={textColor}>Note: {r.rating} / 5</p>
            <p className={textColor}>{r.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}