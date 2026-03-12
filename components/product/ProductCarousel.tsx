"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCarousel({ images }: { images: string[] }) {

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">

      <Image
        src={images[index]}
        alt="product"
        width={600}
        height={600}
        className="rounded-xl"
        sizes="(max-width:768px) 100vw, 50vw"
      />

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 bg-white p-2 rounded shadow"
      >
        ←
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 bg-white p-2 rounded shadow"
      >
        →
      </button>

    </div>
  );
}