"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductZoom({ src, alt }: { src: string; alt: string }) {

  const [zoom, setZoom] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-xl border group"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        priority
        sizes="(max-width:768px) 100vw, 50vw"
        className={`transition-transform duration-500 ${
          zoom ? "scale-125" : "scale-100"
        }`}
      />
    </div>
  );
}