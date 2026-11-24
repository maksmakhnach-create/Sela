"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Coffee,
  Handshake,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";
import CoffeeBelarusFaq from "@/components/seo/CoffeeBelarusFaq";
import type { SeoLanding } from "@/data/seo-landings";

interface CoffeeBelarusPageProps {
  landing: SeoLanding;
}

const benefits = [
  {
    icon: Package,
    title: "Оптовые поставки кофе",
    description:
      "Регулярные отгрузки зернового, молотого и растворимого кофе для бизнеса.",
  },
  {
    icon: Truck,
    title: "Доставка по Беларуси",
    description:
      "Отправляем заказы из Гродно по всей Республике Беларусь.",
  },
  {
    icon: Coffee,
    title: "Известные бренды",
    description:
      "Lavazza, Jacobs, Melitta, Dallmayr, Illy, Kimbo и другие европейские марки.",
  },
  {
    icon: Handshake,
    title: "Индивидуальные условия",
    description:
      "Подбор ассортимента, объёма и графика поставок под формат вашего бизнеса.",
  },
];

const brands = [
  {
    name: "Lavazza",
    logo: "/brands/lavazza-logo.webp",
    product: "/products/lavazza-qualita-oro.png",
    href: "/catalog?brand=Lavazza",
    alt: "Упаковка кофе Lavazza Qualità Oro",
  },
  {
    name: "Jacobs",
    logo: "/brands/jacobs-logo.webp",
    product: "/products/jacobs-kronung-500g-ground.png",
    href: "/catalog?brand=Jacobs",
    alt: "Упаковка кофе Jacobs Krönung",
  },
  {
    name: "Melitta",
    logo: "/brands/melitta-logo.webp",
    product: "/products/melitta-montana-500g.png",
    href: "/catalog?brand=Melitta",
    alt: "Упаковка кофе Melitta Montana",
  },
  {
    name: "Dallmayr",
    logo: "/brands/dallmayr-logo.webp",
    product: "/products/dallmayr-crema-prodomo.png",
    href: "/catalog?brand=Dallmayr",
    alt: "Упаковка кофе Dallmayr Crema Prodomo",
  },
  {
    name: "Illy",
    logo: "/brands/illy-coffee-logo.webp",
    product: "/products/illy-guatemala.png",
    href: "/catalog?brand=illy",
    alt: "Упаковка кофе illy Guatemala",
  },
  {
    name: "Kimbo",
    logo: "/brands/kimbo-logo.webp",
    product: "/products/kimbo-aroma-gold.png",
    href: "/catalog?brand=Kimbo",
    alt: "Упаковка кофе Kimbo Aroma Gold",
  },
];

const assortment = [
  {
    title: "Зерновой кофе",
    description:
      "Зёрна для кофемашин и профессиональной обжарки европейских брендов.",
    href: "/catalog?type=beans",
    image: "/images/coffee-belarus/beans.webp",
    alt: "Обжаренные кофейные зёрна для оптовых поставок",
  },
  {
    title: "Молотый кофе",
    description:
      "Готовый помол для фильтра, эспрессо и розничных полок магазинов.",
    href: "/catalog?type=ground",
    image: "/images/coffee-belarus/ground.webp",
    alt: "Свежемолотый кофе в чашке и холдере",
  },
  {
    title: "Растворимый кофе",
    description:
      "Растворимый кофе для офисов, ритейла и точек быстрого сервиса.",
    href: "/catalog?type=instant",
    image: "/images/coffee-belarus/instant.webp",
    alt: "Растворимый кофе в банке и чашке",
  },
  {
    title: "Капучино и кофейные напитки",
    description:
      "Капучино, готовые напитки и смеси для меню и розничной продажи.",
    href: "/catalog?type=cappuccino",
    image: "/images/coffee-belarus/cappuccino.webp",
    alt: "Чашка капучино с молочной пенкой",
  },
];

const audiences = [
  {
    title: "Кофейням",
    description:
      "Поставка зернового и молотого кофе для кофеен, помощь в подборе ассортимента.",
    href: "/coffee-dlya-kofeen",
    image: "/images/coffee-belarus/cafe.webp",
    alt: "Интерьер кофейни с профессиональной кофемашиной",
  },
  {
    title: "Ресторанам",
    description:
      "Кофе и кофейные напитки для ресторанов, заведений общественного питания и гостиниц.",
    href: "/coffee-dlya-restoranov",
    image: "/images/coffee-belarus/restaurant.webp",
    alt: "Сервировка эспрессо в ресторане",
  },
  {
    title: "Магазинам",
    description:
      "Оптовые поставки кофе и кофейных напитков для розничной торговли.",
    href: "/catalog",
    image: "/images/coffee-belarus/retail.webp",
    alt: "Полка с упаковками кофе Kimbo, Carousel, Dallmayr, Lucaffé и Vergnano",
  },
  {
    title: "Бизнесу",
    description:
      "Поставки кофе для офисов, корпоративных клиентов и других организаций.",
    href: "/coffee-dlya-ofisa",
    image: "/images/coffee-belarus/business.webp",
    alt: "Кофе Mövenpick и чашки эспрессо на офисном столе",
  },
];

const aboutSections = [
  {
    title: "Оптовые поставки кофе",
    image: "/images/coffee-belarus/hero.webp",
    alt: "Приготовление эспрессо — оптовые поставки кофе SELA",
    paragraph: 0,
  },
  {
    title: "Широкий ассортимент",
    image: "/images/coffee-belarus/beans.webp",
    alt: "Кофейные зёрна — ассортимент SELA",
    paragraph: 1,
  },
  {
    title: "Условия сотрудничества",
    image: "/images/coffee-belarus/terms.webp",
    alt: "Dallmayr Crema d'Oro и чашки кофе — условия оптового сотрудничества",
    paragraph: 2,
  },
  {
    title: "Доставка по Беларуси",
    image: "/images/coffee-belarus/warehouse.webp",
    alt: "Склад оптовых поставок кофе: стеллажи, чашка кофе и зёрна",
    paragraph: 3,
  },
];

const cardHover =
  "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow hover:border-caramel-orange/40";

export default function CoffeeBelarusPage({ landing }: CoffeeBelarusPageProps) {
  return (
    <div className="relative bg-primary min-h-screen pt-[calc(5.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pt-24 sm:pb-16 md:pt-28 md:pb-24 overflow-x-clip">
      <CatalogBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          <AnimatedSection direction="left" className="order-1">
            <span className="text-gold text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4 block">
              Купить кофе оптом в РБ
            </span>
            <h1 className="font-display text-[1.75rem] leading-tight xs:text-3xl sm:text-4xl md:text-5xl text-beige mb-4 sm:mb-5 text-balance">
              {landing.h1}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/65 leading-relaxed mb-7 sm:mb-8 max-w-xl">
              {landing.lead}
            </p>
            <div className="flex flex-col xs:flex-row gap-3">
              <Link
                href="/order"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-premium bg-orange-gradient text-white font-semibold touch-target hover:opacity-95 active:opacity-90 transition-opacity duration-300"
              >
                Получить оптовый прайс
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-premium border border-beige/30 bg-white/[0.08] text-beige font-semibold touch-target hover:bg-white/[0.14] transition-colors duration-300"
              >
                Посмотреть каталог
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.08} className="order-2">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[5/4] rounded-[24px] sm:rounded-premium overflow-hidden border border-beige/15 shadow-glow">
              <Image
                src="/images/coffee-belarus/hero.webp"
                alt="Приготовление эспрессо и кофейные зёрна — оптовые поставки кофе SELA"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>
        </section>

        <AnimatedSection delay={0.05} className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-display text-2xl sm:text-3xl text-beige mb-6 sm:mb-8 text-center text-balance">
            Почему заказывают кофе оптом у SELA
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-[20px] sm:rounded-[24px] border border-beige/20 bg-white/[0.07] backdrop-blur-sm p-5 sm:p-6 ${cardHover}`}
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-beige/15 text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-beige mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.06} className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-7 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3 text-balance">
              Бренды, с которыми мы работаем
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
              Официальные марки из каталога SELA — перейдите к товарам выбранного
              бренда.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={brand.href}
                  className={`group flex h-full flex-col rounded-[20px] sm:rounded-[24px] border border-beige/20 bg-white/[0.07] backdrop-blur-sm p-4 sm:p-5 ${cardHover}`}
                >
                  <div className="relative h-12 sm:h-14 mb-3 sm:mb-4">
                    <Image
                      src={brand.logo}
                      alt={`Логотип ${brand.name}`}
                      fill
                      className="object-contain"
                      sizes="180px"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl bg-[#E8D5C4]/90 mb-3 sm:mb-4 overflow-hidden">
                    <Image
                      src={brand.product}
                      alt={brand.alt}
                      fill
                      className="object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 45vw, 30vw"
                    />
                  </div>
                  <span className="font-display font-semibold text-beige text-base sm:text-lg">
                    {brand.name}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-gold">
                    Смотреть в каталоге
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.07} className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-7 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3">
              Наш ассортимент
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
              Зерновой, молотый и растворимый кофе, капучино и кофейные напитки —
              для магазинов и HoReCa.
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
                    Перейти в категорию
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08} className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-7 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3 text-balance">
              Для кого мы поставляем кофе
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
              Оптовый поставщик кофе для кофеен, ресторанов, магазинов и
              корпоративных клиентов.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {audiences.map((item) => (
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
                    Подробнее
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.09} className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-7 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-3">
              SELA — оптовый поставщик кофе
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
              Кофе оптом в Беларуси: ассортимент, условия сотрудничества и
              доставка из Гродно.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {aboutSections.map((section) => (
              <article
                key={section.title}
                className="overflow-hidden rounded-[20px] sm:rounded-[24px] border border-beige/40 bg-white shadow-soft"
              >
                <div className="relative aspect-[16/9] sm:aspect-[16/8]">
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <h3 className="font-display text-xl sm:text-2xl text-primary mb-3">
                    {section.title}
                  </h3>
                  <p className="text-primary/80 text-sm sm:text-base leading-relaxed">
                    {landing.seoText[section.paragraph]}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {landing.relatedArticle && (
            <p className="mt-6 text-center text-sm sm:text-base text-white/55">
              Читайте также:{" "}
              <Link
                href={landing.relatedArticle.href}
                className="text-gold hover:text-beige transition-colors"
              >
                {landing.relatedArticle.label}
              </Link>
            </p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-12 sm:mb-16 md:mb-20">
          <div className="bg-white rounded-[20px] sm:rounded-card p-4 sm:p-8 lg:p-10 shadow-soft border border-beige/40">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-primary mb-5 sm:mb-8">
              Частые вопросы
            </h2>
            <CoffeeBelarusFaq items={landing.faq} />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.11}>
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-premium border border-gold/25 min-h-[280px] sm:min-h-[320px]">
            <Image
              src="/images/coffee-belarus/cta-beans.webp"
              alt="Кофейные зёрна — сотрудничество с оптовым поставщиком SELA"
              fill
              loading="lazy"
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-primary/75" />
            <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-beige mb-4 text-balance">
                Станьте оптовым партнёром SELA
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-7">
                Оставьте заявку, и наш менеджер поможет подобрать ассортимент,
                расскажет об условиях сотрудничества и подготовит коммерческое
                предложение.
              </p>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-premium bg-orange-gradient text-white font-semibold touch-target hover:opacity-95 transition-opacity duration-300"
              >
                Обсудить сотрудничество
              </Link>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                Офис и склад: Гродно, ул. Ивана Лебедева, 6
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
