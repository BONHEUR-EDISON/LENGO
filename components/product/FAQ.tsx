"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  theme?: 'light' | 'dark';
}

export default function FAQ({ faqs }: FAQProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Assure que le thème est chargé côté client
  useEffect(() => setMounted(true), []);

  if (!faqs || faqs.length === 0 || !mounted) return null;

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const textColor = theme === "dark" ? "text-gray-200" : "text-gray-800";

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className={`${bgColor} ${borderColor} border rounded p-3`}
          >
            <summary className={`font-medium cursor-pointer ${textColor}`}>
              {faq.question}
            </summary>
            <p className={`mt-2 ${textColor}`}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
