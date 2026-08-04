"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const topStats = [
  { value: 370000, suffix: "+", label: "клиентов" },
  { value: 95, suffix: "+", label: "товаров" },
];

const qualityStat = {
  value: 100,
  suffix: "%",
  label: "контроль качества",
};

const YANDEX_MAP_URL =
  "https://yandex.by/maps/10274/grodno/?ll=23.817020%2C53.639920&mode=routes&rtext=53.639923%2C23.816774&rtt=auto&ruri=&z=19.65";

const YANDEX_MAP_EMBED =
  "https://yandex.ru/map-widget/v1/?ll=23.817020%2C53.639920&z=19&pt=23.816774%2C53.639923%2Cpm2rdm";

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
    <span className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl bg-orange-gradient bg-clip-text text-transparent tabular-nums">
      {count.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

function BeanIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.45}
      viewBox="0 0 24 36"
      fill="none"
      aria-hidden
      className={className}
    >
      <ellipse
        cx="12"
        cy="18"
        rx="9.5"
        ry="14.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 4.5 C10.2 18 13.8 31.5 12 31.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FloatingBeans({ mirror = false }: { mirror?: boolean }) {
  const reduceMotion = useReducedMotion();
  const beans = [
    { size: 30, rotate: -22, delay: 0 },
    { size: 22, rotate: 18, delay: 0.4 },
  ];

  return (
    <div
      className={`flex items-end gap-1 sm:gap-2 text-accent/85 ${
        mirror ? "flex-row-reverse" : ""
      }`}
      aria-hidden
    >
      {beans.map((bean, index) => (
        <motion.div
          key={index}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  rotate: [bean.rotate, bean.rotate + 6, bean.rotate],
                }
          }
          transition={{
            duration: 2.8 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bean.delay,
          }}
        >
          <BeanIcon size={bean.size} className={`${mirror ? "-scale-x-100" : ""}`} />
        </motion.div>
      ))}
    </div>
  );
}

function StatCard({
  value,
  suffix,
  label,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  return (
    <div className="glass-card rounded-card p-5 sm:p-6 hover:shadow-glow transition-shadow duration-400 h-full">
      <AnimatedCounter value={value} suffix={suffix} inView={inView} />
      <p className="mt-2 text-sm text-text-muted">{label}</p>
    </div>
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
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary mb-6 text-balance">
              Кофе оптом в Беларуси от SELA
            </h2>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-6">
              SELA — надёжный поставщик кофе оптом в Беларуси для магазинов,
              маркетплейсов, кофеен и ресторанов. Поставляем зерновой, молотый и
              растворимый кофе, кофейные напитки и капучино с доставкой по всей
              Республике Беларусь.
            </p>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-10">
              Надёжные поставки, широкий ассортимент европейских брендов, выгодные
              оптовые условия и высокий уровень сервиса — всё для успешного
              развития вашего бизнеса.
            </p>

            <div ref={statsRef} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {topStats.map((stat) => (
                  <StatCard key={stat.label} {...stat} inView={inView} />
                ))}
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-center">
                <div className="flex justify-end pr-1 sm:pr-2">
                  <FloatingBeans />
                </div>

                <div className="w-[min(100%,220px)] sm:w-[min(100%,260px)]">
                  <StatCard {...qualityStat} inView={inView} />
                </div>

                <div className="flex justify-start pl-1 sm:pl-2">
                  <FloatingBeans mirror />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
