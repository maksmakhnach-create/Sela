"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const stats = [
  { value: 10, suffix: "+", label: "лет опыта" },
  { value: 500, suffix: "+", label: "клиентов" },
  { value: 50, suffix: "+", label: "товаров" },
  { value: 100, suffix: "%", label: "контроль качества" },
];

const YANDEX_MAP_URL =
  "https://yandex.by/maps/10274/grodno/house/ZkoYfgZmTU0CQFtpfXp1cXxjYw==/?ll=23.816902%2C53.639929&z=19.83";

const YANDEX_MAP_EMBED =
  "https://yandex.ru/map-widget/v1/?ll=23.816902%2C53.639929&z=19&pt=23.816902%2C53.639929%2Cpm2rdm";

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
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCount(Math.min(Math.round(increment * step), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="font-display font-extrabold text-3xl sm:text-4xl bg-orange-gradient bg-clip-text text-transparent tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <AnimatedSection className="py-20 md:py-32 bg-section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="mt-6 sm:mt-10 lg:mt-14">
            <div className="relative aspect-[16/10] rounded-premium overflow-hidden shadow-card bg-white/40">
              <iframe
                src={YANDEX_MAP_EMBED}
                title="Карта — проспект Ивана Лебедева, 6, Гродно"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={YANDEX_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center sm:text-left text-primary font-semibold text-base sm:text-lg hover:text-accent transition-colors"
            >
              Мы находимся тут: Ивана Лебедева 6
            </a>
          </div>

          <div>
            <span className="text-caramel-orange text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              О нас
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-6">
              О компании SELA
            </h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-10">
              Мы поставляем качественный растворимый кофе и кофейные напитки для
              магазинов, маркетплейсов, кофеен и бизнеса.
            </p>

            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-card p-5 sm:p-6 hover:shadow-glow transition-shadow duration-400"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                  <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
