"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export default function BrandStory() {
  return (
    <AnimatedSection className="py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-card">
            <Image
              src="/images/brand-story/coffee-hero.webp"
              alt="Кофейная плантация"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div>
            <span className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block">
              Наша история
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-primary mb-4 md:mb-6">
              История бренда
            </h2>
            <p className="text-primary/60 leading-relaxed mb-6">
              SELA родился из любви к настоящему кофе. В 2018 году мы
              отправились в путешествие по кофейным плантациям Эфиопии, Колумбии
              и Бразилии, чтобы найти лучшие зёрна для наших клиентов.
            </p>
            <p className="text-primary/60 leading-relaxed mb-8">
              Сегодня мы — команда профессионалов, которые лично отбирают каждую
              партию зёрен, контролируют процесс обжарки и доставляют свежий кофе
              прямо к вашему столу. Наша миссия — делать каждую чашку особенной.
            </p>
            <Link
              href="/about"
              className="inline-block text-accent font-medium hover:text-primary transition-colors duration-300 border-b border-accent/30 hover:border-primary pb-1"
            >
              Узнать больше о нас →
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
