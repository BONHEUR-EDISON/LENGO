"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = (scrollTop / height) * 100;

      setProgress(scrolled);
    };

    window.addEventListener("scroll", updateProgress);

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] z-50 bg-transparent">
      <div
        className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}