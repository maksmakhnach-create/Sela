"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const stats = [
  { value: 500, suffix: "+", label: "постоянных клиентов" },
  { value: 100, suffix: "+", label: "видов продукции" },
  { value: 10, suffix: "+", label: "лет опыта" },
  { value: 100, suffix: "%", label: "контроль качества" },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-gold tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AnimatedSection className="py-20 md:py-28 bg-chocolate">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={inView}
              />
              <p
                className="mt-3 text-sm sm:text-base text-text-secondary"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
