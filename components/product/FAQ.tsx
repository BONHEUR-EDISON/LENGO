interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const safeFaqs = faqs || [];
  if (safeFaqs.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
      <div className="space-y-2">
        {safeFaqs.map((faq, idx) => (
          <details key={idx} className="border rounded p-2">
            <summary className="font-medium cursor-pointer">{faq.question}</summary>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}