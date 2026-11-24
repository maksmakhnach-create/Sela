"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Coffee,
  Handshake,
  PackageCheck,
  Sparkles,
  Store,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";
import CoffeeBelarusFaq from "@/components/seo/CoffeeBelarusFaq";
import type { SeoLanding } from "@/data/seo-landings";

interface CoffeeForCafesPageProps {
  landing: SeoLanding;
}

const cardHover =
  "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow hover:border-caramel-orange/40";

const formats = [
  {
    title: "Кофейни",
    href: "/catalog?type=beans",
    image: "/images/coffee-belarus/cafe.webp",
    alt: "Профессиональная кофемашина в кофейне",
    points: [
      "Зерновой кофе и кофейные смеси",
      "Подбор вкусового профиля",
      "Стабильность качества напитков",
    ],
  },
  {
    title: "Рестораны и кафе",
    href: "/coffee-dlya-restoranov",
    image: "/images/coffee-belarus/restaurant.webp",
    alt: "Сервировка кофе в ресторане",
    points: [
      "Кофе для основного меню",
      "Кофейные напитки и растворимые продукты",
      "Решения для разных форматов обслуживания",
    ],
  },
  {
    title: "Офисы и бизнес",
    href: "/coffee-dlya-ofisa",
    image: "/images/coffee-belarus/business.webp",
    alt: "Кофе для офиса и корпоративных клиентов",
    points: [
      "Кофе для сотрудников и клиентов",
      "Удобные форматы упаковки",
      "Регулярные оптовые поставки",
    ],
  },
];

const assortment = [
  {
    title: "Зерновой кофе",
    description:
      "Для эспрессо-машин и помола на месте — стабильный вкус день за днём.",
    href: "/catalog?type=beans",
    image: "/images/coffee-belarus/beans.webp",
    alt: "Обжаренные кофейные зёрна для кофеен",
  },
  {
    title: "Молотый кофе",
    description:
      "Готовый помол для фильтра и части профессионального оборудования.",
    href: "/catalog?type=ground",
    image: "/images/coffee-belarus/ground.webp",
    alt: "Молотый кофе для кофеен и кафе",
  },
  {
    title: "Растворимые напитки",
    description:
      "Для формата «кофе с собой» и быстрого обслуживания без потери вкуса.",
    href: "/catalog?type=instant",
    image: "/images/coffee-belarus/instant.webp",
    alt: "Растворимый кофе и напитки для заведений",
  },
  {
    title: "Капучино и кофейные смеси",
    description:
      "Капучино и смеси, чтобы расширить меню без сложного оборудования.",
    href: "/catalog?type=cappuccino",
    image: "/images/coffee-belarus/cappuccino.webp",
    alt: "Капучино с латте-артом для кофейного меню",
  },
];

const reasons = [
  {
    icon: CalendarDays,
    title: "С 2023 года",
    text: "Работаем с кофейнями с 2023 года и понимаем ритм заведения.",
  },
  {
    icon: Coffee,
    title: "Под формат",
    text: "Подбираем ассортимент под концепцию, оборудование и проходимость.",
  },
  {
    icon: Store,
    title: "Известные бренды",
    text: "Lavazza, Illy, Kimbo, Dallmayr и другие марки, которые узнают гости.",
  },
  {
    icon: Handshake,
    title: "Индивидуальные условия",
    text: "Обсуждаем объёмы, частоту заказов и условия для постоянных партнёров.",
  },
  {
    icon: Sparkles,
    title: "Меню кофейни",
    text: "Помогаем с расширением кофейного меню и матрицей позиций.",
  },
];

const brands = [
  {
    name: "Lavazza",
    logo: "/brands/lavazza-logo.webp",
    href: "/catalog?brand=Lavazza",
  },
  {
    name: "illy",
    logo: "/brands/illy-coffee-logo.webp",
    href: "/catalog?brand=illy",
  },
  {
    name: "Kimbo",
    logo: "/brands/kimbo-logo.webp",
    href: "/catalog?brand=Kimbo",
  },
  {
    name: "Dallmayr",
    logo: "/brands/dallmayr-logo.webp",
    href: "/catalog?brand=Dallmayr",
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Заявка",
    text: "Вы рассказываете о своём заведении и потребностях.",
  },
  {
    icon: Coffee,
    title: "Подбор ассортимента",
    text: "Мы предлагаем подходящие продукты и рассчитываем оптовую стоимость.",
  },
  {
    icon: PackageCheck,
    title: "Сотрудничество",
    text: "Согласовываем условия и организуем поставки.",
  },
];

const seoBlocks = [
  {
    title: "Стабильные поставки для кофеен",
    image: "/images/coffee-belarus/cafe.webp",
    alt: "Кофейня — стабильные оптовые поставки кофе SELA",
    paragraph: 0,
  },
  {
    title: "Подбор под формат заведения",
    image: "/images/coffee-belarus/hero.webp",
    alt: "Приготовление эспрессо для кофейного бара",
    paragraph: 1,
  },
  {
    title: "Качество, сроки и поддержка",
    image: "/images/coffee-belarus/terms.webp",
    alt: "Кофе европейских брендов для меню кофейни",
    paragraph: 2,
  },
];

export default function CoffeeForCafesPage({ landing }: CoffeeForCafesPageProps) {
  return (
    <div className="relative bg-primary min-h-screen pt-[calc(5.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pt-24 sm:pb-16 md:pt-28 md:pb-24 overflow-x-clip">
      <CatalogBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <section className="relative overflow-hidden rounded-[24px] sm:rounded-premium border border-beige/15 mb-12 sm:mb-16 md:mb-20 min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]">
          <Image
            src="/images/coffee-belarus/hero.webp"
            alt="Приготовление эспрессо — кофе для кофеен от SELA"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/35" />
          <div className="relative z-10 max-w-2xl p-6 sm:p-10 lg:p-14">
            <span className="text-gold text-xs sm:text-sm font-medium tracking-[0.22em] uppercase mb-4 block">
              SELA — оптовые поставки
            </span>
            <h1 className="font-display text-[1.7rem] leading-tight xs:text-3xl sm:text-4xl md:text-5xl text-beige mb-4 sm:mb-5 text-balance">
              {landing.h1}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed mb-7 sm:mb-8">
              {landing.lead}
            </p>
            <div className="flex flex-col xs:flex-row gap-3">
              <Link
                href="/order"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-premium bg-orange-gradient text-white font-semibold touch-target hover:opacity-95 transition-opacity duration-300"
              >
                Получить оптовое предложение
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-premium border border-beige/30 bg-white/[0.08] text-beige font-semibold touch-target hover:bg-white/[0.14] transition-colors duration-300"
              >
                Посмотреть ассортимент
              </Link>
            </div>
          </div>
        </section>

        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-7 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3 text-balance">
              Решения для вашего формата бизнеса
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
              Кофе для кофеен, ресторанов и корпоративных точек — с учётом
              оборудования и меню.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {formats.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group overflow-hidden rounded-[20px] sm:rounded-[24px] border border-beige/20 bg-white/[0.07] backdrop-blur-sm ${cardHover}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-display font-semibold text-xl text-beige mb-3">
                    {item.title}
                  </h3>
                  <ul className="space-y-1.5 mb-4">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-white/60 leading-relaxed pl-3 relative before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-gold"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    Подробнее
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
          <div id="assortment" className="text-center mb-7 sm:mb-10 scroll-mt-28">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3 text-balance">
              Всё для идеальной чашки кофе
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
              Зерновой и молотый кофе, растворимые напитки, капучино и смеси —
              из каталога SELA.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {assortment.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group overflow-hidden rounded-[20px] sm:rounded-[24px] border border-beige/20 bg-white/[0.07] backdrop-blur-sm ${cardHover}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-display font-semibold text-xl text-beige mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    Смотреть в каталоге
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
          <div className="rounded-[24px] sm:rounded-premium border border-gold/20 bg-gradient-to-br from-white/[0.1] to-white/[0.04] p-5 sm:p-8 lg:p-10">
            <div className="text-center mb-7 sm:mb-10">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3 text-balance">
                Надёжный партнёр для вашего бизнеса
              </h2>
              <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
                Почему кофейни в Гродно и по Беларуси выбирают SELA.
              </p>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {reasons.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-beige/20 bg-primary/30 p-4 sm:p-5"
                  >
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-beige/15 text-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <h3 className="font-display font-semibold text-beige mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-7 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3">
              Бренды, которым доверяют
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
              Европейские марки из каталога, которые гости кофейни узнают и ценят.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Link
                  href={brand.href}
                  className={`group flex aspect-[4/3] items-center justify-center rounded-[20px] border border-beige/20 bg-white/[0.08] p-5 sm:p-6 ${cardHover}`}
                >
                  <div className="relative h-14 w-full">
                    <Image
                      src={brand.logo}
                      alt={`Логотип ${brand.name}`}
                      fill
                      className="object-contain"
                      sizes="180px"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-display text-2xl sm:text-3xl text-beige mb-6 sm:mb-8 text-center text-balance">
            Кофе для кофеен в Беларуси
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {seoBlocks.map((block) => (
              <article
                key={block.title}
                className="overflow-hidden rounded-[20px] sm:rounded-[24px] border border-beige/40 bg-white shadow-soft"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={block.image}
                    alt={block.alt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-xl text-primary mb-3">
                    {block.title}
                  </h3>
                  <p className="text-primary/80 text-sm sm:text-base leading-relaxed">
                    {landing.seoText[block.paragraph]}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {landing.seoText[3] && (
            <p className="mt-6 text-center text-white/60 text-sm sm:text-base max-w-3xl mx-auto">
              {landing.seoText[3]}
            </p>
          )}
        </AnimatedSection>

        <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-7 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3">
              Как начать сотрудничество
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 relative">
            <div
              className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gold/30"
              aria-hidden
            />
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center px-4"
                >
                  <span className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-primary text-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-orange-gradient text-white text-xs font-semibold">
                      {index + 1}
                    </span>
                  </span>
                  <h3 className="font-display font-semibold text-lg text-beige mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {landing.faq.length > 0 && (
          <AnimatedSection className="mb-12 sm:mb-16 md:mb-20">
            <div className="bg-white rounded-[20px] sm:rounded-card p-4 sm:p-8 lg:p-10 shadow-soft border border-beige/40">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-primary mb-5 sm:mb-8">
                Частые вопросы
              </h2>
              <CoffeeBelarusFaq items={landing.faq} />
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection className="mb-12 sm:mb-16">
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/50">
            {landing.internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-premium border border-gold/25 min-h-[260px] sm:min-h-[320px]">
            <Image
              src="/images/coffee-belarus/cta-beans.webp"
              alt="Кофейные зёрна — обсудить сотрудничество с SELA"
              fill
              loading="lazy"
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-primary/78" />
            <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-4 text-balance">
                Давайте обсудим сотрудничество
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-7">
                Расскажите о вашем бизнесе — мы поможем подобрать кофе и
                рассчитаем индивидуальное оптовое предложение.
              </p>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-premium bg-orange-gradient text-white font-semibold touch-target hover:opacity-95 transition-opacity duration-300"
              >
                Связаться с нами
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
