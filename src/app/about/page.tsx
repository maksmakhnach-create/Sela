"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";
import { team } from "@/data/products";

const values = [
  {
    title: "Качество",
    description:
      "Мы никогда не идём на компромиссы в вопросах качества. Каждое зерно проходит тщательный отбор.",
  },
  {
    title: "Прозрачность",
    description:
      "Мы открыто рассказываем о происхождении нашего кофе и условиях работы с фермерами.",
  },
  {
    title: "Устойчивость",
    description:
      "Поддерживаем экологичные методы выращивания и справедливую торговлю с производителями.",
  },
  {
    title: "Страсть",
    description:
      "Кофе — это наша страсть. Мы вкладываем душу в каждую партию обжарки.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative bg-primary min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <CatalogBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <AnimatedSection className="text-center mb-12 md:mb-20">
          <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
            О нас
          </span>
          <h1 className="font-display text-3xl sm:text-5xl text-beige mb-4 md:mb-6">
            О компании
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Мы создаём кофе, который вдохновляет и объединяет людей
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80"
                alt="История компании"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl text-beige mb-6">
                История компании
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Всё началось в 2018 году с небольшой кофейни в центре Москвы и
                мечты создать кофе, достойный самых взыскательных ценителей.
                Основатели SELA — Александр и Мария — отправились в
                путешествие по кофейным плантациям мира.
              </p>
              <p className="text-text-muted leading-relaxed">
                Сегодня SELA — это собственная обжарочная мануфактура,
                команда из 20 профессионалов и тысячи довольных клиентов по всей
                России. Мы продолжаем искать лучшие зёрна и совершенствовать
                мастерство обжарки.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-24" delay={0.1}>
          <div className="bg-primary rounded-[24px] p-10 lg:p-16 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
                Миссия
              </span>
              <h2 className="font-display text-3xl sm:text-4xl mb-6">
                Делать каждую чашку особенной
              </h2>
              <p className="text-white/70 leading-relaxed text-lg">
                Наша миссия — открывать людям мир настоящего кофе. Мы верим, что
                за каждой чашкой стоит история фермера, мастерство обжарщика и
                момент наслаждения. Мы стремимся сделать премиальный кофе
                доступным для каждого, кто ценит качество и вкус.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-24" delay={0.1}>
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
              Принципы
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-beige">
              Наши ценности
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-card p-8 shadow-soft hover:shadow-card transition-shadow duration-500"
              >
                <h3 className="font-display text-xl text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-primary/60 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
              Люди
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-beige">
              Наша команда
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative aspect-square rounded-[20px] overflow-hidden mb-5 shadow-soft group-hover:shadow-card transition-shadow duration-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-display text-lg text-beige">
                  {member.name}
                </h3>
                <p className="text-sm text-white/50">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
