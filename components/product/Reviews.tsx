interface Review {
  author: string;
  rating: number;
  comment: string;
}

interface ReviewsProps {
  reviews?: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  const safeReviews = reviews || [];
  if (safeReviews.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Avis clients</h2>
      <div className="space-y-4">
        {safeReviews.map((r, idx) => (
          <div key={idx} className="border rounded p-4">
            <p className="font-semibold">{r.author}</p>
            <p>Note: {r.rating} / 5</p>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}