"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";

const paragraphs = [
  "SELA — надежный поставщик товаров для бизнеса и частных покупателей. С 2023 года мы занимаемся оптовой и розничной продажей кофе, кофейных напитков, растворимого чая и средств по уходу за полостью рта.",
  "Мы сотрудничаем с магазинами, маркетплейсами, кафе, дистрибьюторами и корпоративными клиентами, предлагая широкий ассортимент продукции, стабильные поставки и выгодные условия сотрудничества.",
  "Наша цель — сделать качественные товары доступными для каждого клиента. Мы тщательно подбираем ассортимент, контролируем качество продукции и стремимся выстраивать долгосрочные партнерские отношения, основанные на доверии, ответственности и высоком уровне сервиса.",
  "Сегодня SELA — это современная компания, которая развивается вместе со своими клиентами, расширяет ассортимент и постоянно совершенствует уровень обслуживания, предлагая надежные решения как для бизнеса, так и для розничных покупателей.",
];

const benefits = [
  {
    title: "Надежные поставки",
    description: "Стабильная логистика и своевременное выполнение заказов.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <path
          d="M3 7h11v8H3V7zm11 2h4l2 3v3h-6V9zM6 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Контроль качества",
    description: "Тщательно отбираем продукцию перед поставкой.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <path
          d="M12 3l7 3v6c0 4.5-3.2 7.8-7 9-3.8-1.2-7-4.5-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Оптовые цены",
    description: "Гибкие условия сотрудничества для бизнеса.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <path
          d="M4 7h16M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2M6 7l1 12h10l1-12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 11v4M14 11v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Широкий ассортимент",
    description:
      "Кофе, кофейные напитки, растворимый чай и другие востребованные товары.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Индивидуальный подход",
    description: "Подбираем решения под задачи каждого клиента.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M17 10l2 2-2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Долгосрочное партнерство",
    description: "Строим сотрудничество, основанное на доверии и надежности.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
        <path
          d="M7 11V8a5 5 0 0110 0v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6 11h12v9H6V11z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M12 15v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const stats = [
  { value: 2023, suffix: "", label: "год основания", compact: true },
  { value: 95, suffix: "+", label: "товарных позиций", compact: false },
  { value: 100, suffix: "%", label: "ориентация на качество", compact: false },
];

const showcaseImages = {
  partner: "/images/about/coffee-cafe-office.webp",
  mission: "/images/about/coffee-cup-hero.webp",
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function AnimatedCounter({
  value,
  suffix,
  inView,
  compact = false,
}: {
  value: number;
  suffix: string;
  inView: boolean;
  compact?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1800;
    const steps = 50;
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
    <span className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-beige tabular-nums">
      {compact ? count : count.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

function CoffeeShowcase({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.01 }}
      className={`relative aspect-[4/3] sm:aspect-[5/4] rounded-[24px] overflow-hidden shadow-card ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 560px"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-white/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-caramel/10 via-transparent to-gold/10 pointer-events-none" />
    </motion.div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <AnimatedSection className="mb-20 md:mb-28">
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 rounded-[24px] border border-beige/15 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-card"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center px-2 py-4"
          >
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              inView={inView}
              compact={stat.compact}
            />
            <p className="mt-3 text-sm sm:text-base text-white/55">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

export default function AboutPageContent() {
  return (
    <div className="relative bg-primary min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <CatalogBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        {/* Hero */}
        <AnimatedSection className="text-center mb-16 md:mb-24">
          <span className="text-caramel-orange text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase mb-5 block">
            О компании
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-beige mb-6 sm:mb-8 tracking-tight">
            SELA
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/65 leading-relaxed max-w-[700px] mx-auto text-balance">
            {paragraphs[0]}
          </p>
        </AnimatedSection>

        {/* Big card */}
        <AnimatedSection className="mb-20 md:mb-28" delay={0.05}>
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.5 }}
            className="rounded-[24px] border border-beige/20 bg-white/[0.06] backdrop-blur-md shadow-card overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 xl:p-14 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-gold text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                  Надежный партнер с 2023 года
                </span>
                <div className="space-y-5 text-base sm:text-lg text-white/70 leading-relaxed">
                  <p>{paragraphs[1]}</p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <CoffeeShowcase
                  src={showcaseImages.partner}
                  alt="Премиальный кофе — атмосфера кофейни"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Benefits */}
        <AnimatedSection className="mb-20 md:mb-28" delay={0.05}>
          <div className="text-center mb-10 md:mb-14">
            <span className="text-caramel-orange text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase mb-4 block">
              Преимущества
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-beige">
              Почему выбирают SELA
            </h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.45 }}
                className="group rounded-[22px] border border-beige/20 bg-white/[0.07] backdrop-blur-sm p-6 sm:p-7 shadow-soft hover:shadow-glow-orange transition-shadow duration-500"
              >
                <div className="w-12 h-12 rounded-[16px] bg-orange-gradient text-white flex items-center justify-center mb-5 shadow-glow group-hover:scale-105 transition-transform duration-400">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-beige mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* Stats */}
        <StatsSection />

        {/* Mission */}
        <AnimatedSection className="mb-20 md:mb-28" delay={0.05} direction="left">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-caramel-orange text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase mb-4 block">
                Наша миссия
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[2.75rem] text-beige mb-6 leading-tight text-balance">
                Мы создаем надежные поставки для вашего бизнеса
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-white/65 leading-relaxed">
                <p>{paragraphs[2]}</p>
                <p>{paragraphs[3]}</p>
              </div>
            </div>
            <AnimatedSection direction="right" delay={0.1} as="div">
              <CoffeeShowcase
                src={showcaseImages.mission}
                alt="Премиальная чашка кофе"
                className="lg:scale-[1.02]"
              />
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
