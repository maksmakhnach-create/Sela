"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Handshake,
  Mail,
  PackageSearch,
  Search,
  Send,
  UserRound,
  X,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CatalogBackground from "@/components/catalog/CatalogBackground";
import HelpDocumentCard from "@/components/help/HelpDocumentCard";
import HelpInquiryForm, {
  type HelpInquiryPrefill,
} from "@/components/help/HelpInquiryForm";
import HelpQuickActionCard from "@/components/help/HelpQuickActionCard";
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  type FaqCategory,
} from "@/data/help-faq";
import type { HelpDocument } from "@/lib/help-documents";

interface HelpPageContentProps {
  documents: HelpDocument[];
}

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase().replace(/ё/g, "е");
}

function matchesSearch(text: string, needle: string): boolean {
  const haystack = normalizeSearch(text);
  if (haystack.includes(needle)) return true;
  if (needle.length >= 5 && haystack.includes(needle.slice(0, -1))) return true;
  if (needle.length >= 6 && haystack.includes(needle.slice(0, -2))) return true;
  return false;
}

const MANAGER_MAIL =
  "mailto:lcc.sela8@gmail.com?subject=%D0%97%D0%B0%D0%BF%D1%80%D0%BE%D1%81%20%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80%D1%83%20SELA";

const documentIcons = {
  price: FileSpreadsheet,
  catalog: FileText,
  terms: Handshake,
};

export default function HelpPageContent({ documents }: HelpPageContentProps) {
  const [category, setCategory] = useState<FaqCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [prefill, setPrefill] = useState<HelpInquiryPrefill | undefined>();

  const openForm = useCallback((next: HelpInquiryPrefill) => {
    setPrefill(next);
    setFormOpen(true);
  }, []);

  useEffect(() => {
    if (!formOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [formOpen]);

  useEffect(() => {
    if (!formOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFormOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [formOpen]);

  const filteredFaq = useMemo(() => {
    const needle = normalizeSearch(query);
    return FAQ_ITEMS.filter((item) => {
      const inCategory = category === "all" || item.category === category;
      if (!inCategory) return false;
      if (!needle) return true;
      return (
        matchesSearch(item.question, needle) || matchesSearch(item.answer, needle)
      );
    });
  }, [category, query]);

  return (
    <div className="relative bg-primary min-h-screen pt-[calc(5.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 overflow-x-clip">
      <CatalogBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-px">
        <AnimatedSection className="text-center mb-8 sm:mb-10 md:mb-16">
          <span className="text-gold text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4 block">
            Поддержка
          </span>
          <h1 className="font-display text-[1.65rem] leading-tight xs:text-3xl sm:text-5xl text-beige mb-3 sm:mb-4 md:mb-6 text-balance">
            Центр помощи
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto text-balance px-1">
            Прайс, заказы, документы и ответы на вопросы оптовых клиентов SELA.
            Если не нашли нужное — напишите менеджеру.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-16">
          <HelpQuickActionCard
            icon={FileSpreadsheet}
            title="Прайс-лист"
            description="Запросите актуальные оптовые цены. Менеджер отправит прайс на почту компании."
            onClick={() =>
              openForm({
                topic: "Запрос оптового прайс-листа",
                message: "Прошу прислать актуальный оптовый прайс-лист SELA.",
              })
            }
          />
          <HelpQuickActionCard
            icon={PackageSearch}
            title="Мои заказы"
            description="Уточните этап сборки, оплаты или доставки — ответим по номеру заявки."
            onClick={() =>
              openForm({
                topic: "Статус заказа",
                message: "Прошу уточнить статус заказа. Номер заявки / счёта: ",
              })
            }
          />
          <HelpQuickActionCard
            icon={ClipboardList}
            title="Каталог"
            description="Зерновой, молотый и растворимый кофе, напитки и другие товары."
            href="/catalog"
          />
          <HelpQuickActionCard
            icon={UserRound}
            title="Менеджер"
            description="Свяжитесь с представителем SELA: подберём ассортимент и рассчитаем заказ."
            href="#manager"
          />
        </div>

        <AnimatedSection delay={0.05} className="mb-8 sm:mb-10 md:mb-16">
          <div
            id="faq"
            className="bg-white rounded-[20px] sm:rounded-card p-4 sm:p-8 lg:p-10 shadow-soft border border-beige/40 scroll-mt-28"
          >
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-primary mb-5 sm:mb-6 md:mb-8">
              Частые вопросы
            </h2>

            <label className="relative block mb-4 sm:mb-5">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск по вопросам"
                enterKeyHint="search"
                autoComplete="off"
                className="w-full pl-11 pr-4 py-3.5 sm:py-3.5 rounded-2xl bg-cream/40 border border-beige text-base text-primary placeholder:text-primary/40 focus:outline-none focus:border-accent touch-target"
              />
            </label>

            <div
              className="flex flex-wrap gap-2 mb-4 sm:mb-5 md:flex-nowrap md:overflow-x-auto md:pb-1 md:snap-x md:snap-mandatory"
              role="tablist"
              aria-label="Категории FAQ"
            >
              {FAQ_CATEGORIES.map((item) => {
                const active = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setCategory(item.id);
                      setOpenFaqId(null);
                    }}
                    className={`shrink-0 px-3.5 sm:px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 touch-target ${
                      active
                        ? "bg-primary text-white"
                        : "bg-cream/50 text-primary/70 hover:bg-cream"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              {filteredFaq.length === 0 && (
                <p className="text-primary/60 py-6 text-center">
                  Ничего не найдено. Попробуйте другой запрос или напишите
                  менеджеру.
                </p>
              )}

              {filteredFaq.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border border-beige/80 bg-cream/30 transition-colors duration-300 ${
                      isOpen ? "bg-cream/55" : "hover:bg-cream/45"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenFaqId((current) =>
                          current === item.id ? null : item.id
                        )
                      }
                      className="flex w-full cursor-pointer items-start justify-between gap-3 sm:gap-4 px-4 py-4 sm:px-6 sm:py-5 font-display font-semibold text-primary text-left text-base sm:text-lg touch-target"
                    >
                      <span className="text-pretty pr-1">{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-caramel-orange transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-primary/75 text-sm sm:text-base leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08} className="mb-8 sm:mb-10 md:mb-16">
          <div id="documents" className="mb-5 sm:mb-6 md:mb-8 scroll-mt-28">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-beige mb-2 sm:mb-3">
              Полезные материалы
            </h2>
            <p className="text-sm sm:text-base text-white/55 max-w-2xl">
              Документы для скачивания появляются здесь, когда файлы загружены.
              Если файла нет — запросите его у менеджера.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 md:items-stretch">
            {documents.map((doc) => (
              <HelpDocumentCard
                key={doc.id}
                doc={doc}
                icon={documentIcons[doc.id]}
                onRequest={openForm}
              />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div
            id="manager"
            className="rounded-[20px] sm:rounded-premium border border-gold/25 bg-gradient-to-br from-white/[0.12] to-white/[0.05] backdrop-blur-sm p-5 sm:p-10 lg:p-12 shadow-glow scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
          >
            <div className="max-w-3xl">
              <h2 className="font-display text-xl sm:text-3xl md:text-4xl text-beige mb-3 sm:mb-4">
                Остались вопросы?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/65 leading-relaxed mb-6 sm:mb-8">
                Наши специалисты помогут подобрать продукцию, рассчитать
                стоимость заказа и ответят на ваши вопросы.
              </p>
              <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3">
                <a
                  href={MANAGER_MAIL}
                  className="inline-flex w-full xs:flex-1 items-center justify-center gap-2 px-6 py-3.5 rounded-premium bg-orange-gradient text-white font-semibold touch-target hover:opacity-95 active:opacity-90 transition-opacity duration-300"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  Написать менеджеру
                </a>
                <button
                  type="button"
                  onClick={() =>
                    openForm({
                      topic: "Заявка менеджеру",
                      message:
                        "Прошу связаться со мной: подобрать продукцию и рассчитать стоимость заказа.",
                    })
                  }
                  className="inline-flex w-full xs:flex-1 items-center justify-center gap-2 px-6 py-3.5 rounded-premium border border-beige/30 bg-white/[0.08] text-beige font-semibold touch-target hover:bg-white/[0.14] active:bg-white/[0.18] transition-colors duration-300"
                >
                  <Send className="h-4 w-4" />
                  Оставить заявку
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Закрыть форму"
              className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
              onClick={() => setFormOpen(false)}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10 w-full sm:max-w-lg max-h-[min(92vh,100dvh)] overflow-y-auto bg-white rounded-t-[20px] sm:rounded-card p-5 sm:p-8 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-8 shadow-card"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-display text-2xl text-primary">
                    Оставить заявку
                  </h2>
                  <p className="text-sm text-primary/55 mt-1">
                    Ответ придёт на почту или по телефону.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="h-10 w-10 rounded-xl bg-beige/40 text-primary flex items-center justify-center hover:bg-beige/70 transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <HelpInquiryForm
                key={prefill?.topic ?? "default"}
                prefill={prefill}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
