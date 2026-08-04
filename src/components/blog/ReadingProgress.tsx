"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById("article-content");
      if (!article) return;

      const start = article.offsetTop;
      const height = article.offsetHeight;
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const total = height - viewport;

      if (total <= 0) {
        setProgress(100);
        return;
      }

      const value = ((scrollTop - start) / total) * 100;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-1 bg-beige/40"
      aria-hidden
    >
      <div
        className="h-full bg-orange-gradient transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
