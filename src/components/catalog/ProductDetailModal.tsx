"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
} from "framer-motion";
import { X } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";
import CountryFlag from "@/components/flags/CountryFlag";
import type { Product } from "@/data/products";
import {
  getProductDisplayName,
  getProductInquiryMessage,
  getProductSpecs,
  getProductWeight,
  getSimilarProducts,
} from "@/lib/product-details";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const sheetSpring = {
  type: "spring" as const,
  damping: 34,
  stiffness: 380,
  mass: 0.82,
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function SpecRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="grid grid-cols-1 min-[380px]:grid-cols-[minmax(7rem,36%)_1fr] gap-0.5 min-[380px]:gap-3 py-2.5 border-b border-primary/10 last:border-b-0">
      <dt className="text-[13px] sm:text-sm font-semibold text-primary/70">
        {label}
      </dt>
      <dd className="text-[13px] sm:text-[0.95rem] text-primary leading-snug break-words">
        {value}
      </dd>
    </div>
  );
}

function useMobileSheet() {
  const [isSheet, setIsSheet] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsSheet(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return isSheet;
}

export default function ProductDetailModal({
  product,
  onClose,
  onSelectProduct,
}: ProductDetailModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const reduceMotion = useReducedMotion();
  const isSheet = useMobileSheet();
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowForm(false);
    dialogRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [product?.id]);

  const isOpen = Boolean(product);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const previous = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      htmlOverflow: document.documentElement.style.overflow,
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previous.overflow;
      document.body.style.paddingRight = previous.paddingRight;
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.left = previous.left;
      document.body.style.right = previous.right;
      document.body.style.width = previous.width;
      document.documentElement.style.overflow = previous.htmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!showForm || !formSectionRef.current || !dialogRef.current) return;
    const top = Math.max(0, formSectionRef.current.offsetTop - 12);
    dialogRef.current.scrollTo({
      top,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [showForm, reduceMotion]);

  const specs = useMemo(
    () => (product ? getProductSpecs(product) : null),
    [product],
  );
  const similar = useMemo(
    () => (product ? getSimilarProducts(product) : []),
    [product],
  );

  if (!mounted) return null;

  const displayName = product ? getProductDisplayName(product) : "";
  const weight = product ? getProductWeight(product) : undefined;
  const flagCountry = product
    ? (product.flagCountry ?? product.country)
    : "";
  const hasSpecs = Boolean(
    specs?.composition ||
      specs?.roast ||
      specs?.flavorProfile ||
      specs?.strength ||
      specs?.acidity ||
      specs?.body ||
      specs?.brewing,
  );

  const sheetTransition = reduceMotion
    ? { duration: 0.01 }
    : isSheet
      ? sheetSpring
      : { duration: 0.26, ease: easeOut };

  return createPortal(
    <AnimatePresence>
      {product && specs && (
        <motion.div
          key="product-detail-modal"
          className="fixed inset-0 z-[70] flex items-stretch sm:items-center justify-center p-0 sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={
            reduceMotion ? { duration: 0.01 } : { duration: 0.2, ease: easeOut }
          }
        >
          <button
            type="button"
            aria-label="Закрыть карточку товара"
            className="absolute inset-0 bg-[#1a120c]/65 sm:bg-[#1a120c]/70 sm:backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={
              reduceMotion
                ? { opacity: 1 }
                : isSheet
                  ? { y: "100%" }
                  : { opacity: 0, y: 18 }
            }
            animate={isSheet ? { y: 0 } : { opacity: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : isSheet
                  ? { y: "100%" }
                  : { opacity: 0, y: 12 }
            }
            transition={sheetTransition}
            drag={isSheet && !reduceMotion ? "y" : false}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.52 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 700) {
                onClose();
              }
            }}
            className="relative z-10 flex flex-col w-full sm:max-w-[720px] lg:max-w-[920px] h-dvh sm:h-auto sm:max-h-[min(92dvh,100%)] overflow-hidden rounded-t-[22px] sm:rounded-[28px] bg-[#E8D5C4] shadow-[0_24px_80px_rgba(0,0,0,0.35)] will-change-transform"
          >
            {isSheet && (
              <div
                className="sm:hidden flex justify-center pt-[max(0.45rem,env(safe-area-inset-top))] pb-1 shrink-0 touch-none"
                onPointerDown={(event) => dragControls.start(event)}
              >
                <div className="h-1.5 w-12 rounded-full bg-primary/30" />
              </div>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute z-20 h-11 w-11 rounded-2xl bg-primary/15 text-primary hover:bg-primary/25 active:bg-primary/30 active:scale-95 transition-[transform,background-color] duration-150 flex items-center justify-center touch-manipulation"
              style={{
                top: isSheet
                  ? "max(1.35rem, calc(env(safe-area-inset-top) + 0.35rem))"
                  : "max(0.75rem, env(safe-area-inset-top))",
                right: "max(0.75rem, env(safe-area-inset-right))",
              }}
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              ref={dialogRef}
              className="product-modal-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
            >
              <motion.div
                key={product.id}
                initial={reduceMotion ? false : { opacity: 0.55 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18, ease: easeOut }}
              >
                <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div
                    className="flex items-center justify-center bg-[#E3D2B1] lg:rounded-l-[28px] px-5 pb-3 sm:px-8 sm:pb-6 min-h-[180px] sm:min-h-[240px] lg:min-h-[380px]"
                    style={{
                      paddingTop: isSheet
                        ? "1.25rem"
                        : "max(3.25rem, calc(env(safe-area-inset-top) + 2.5rem))",
                    }}
                  >
                    <div className="relative w-full h-[160px] xs:h-[190px] sm:h-[240px] lg:h-[320px]">
                      <Image
                        src={product.image}
                        alt={displayName}
                        title={displayName}
                        fill
                        className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 420px"
                        priority
                      />
                    </div>
                  </div>

                  <div className="px-4 xs:px-5 pb-4 pt-1 sm:px-7 sm:pt-8 sm:pb-6">
                    <h2
                      id={titleId}
                      className="font-catalog font-extrabold text-[1.2rem] xs:text-[1.35rem] sm:text-2xl text-primary leading-tight pr-12 text-balance"
                    >
                      {product.name}
                      {product.titleSubline && (
                        <span className="block mt-1">{product.titleSubline}</span>
                      )}
                    </h2>

                    <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                      <p className="text-sm sm:text-base text-primary">
                        <span className="text-primary/60">Бренд: </span>
                        <span className="font-semibold">{product.brand}</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-sm sm:text-base text-primary">
                        <span className="text-primary/60">Страна:</span>
                        <span className="font-semibold">{product.country}</span>
                        <CountryFlag
                          country={flagCountry}
                          className="w-8 h-[21px]"
                        />
                      </div>
                      {weight && (
                        <p className="text-sm sm:text-base text-primary">
                          <span className="text-primary/60">Вес: </span>
                          <span className="font-semibold">{weight}</span>
                        </p>
                      )}
                    </div>

                    <p className="mt-4 sm:mt-5 text-sm sm:text-[0.95rem] leading-relaxed text-primary/80">
                      {product.description}
                    </p>

                    {hasSpecs && (
                      <dl className="mt-4 sm:mt-5 rounded-2xl bg-white/45 px-3.5 sm:px-4 py-1">
                        <SpecRow label="Состав" value={specs.composition} />
                        <SpecRow label="Обжарка" value={specs.roast} />
                        <SpecRow
                          label="Вкусовой профиль"
                          value={specs.flavorProfile}
                        />
                        <SpecRow label="Крепость" value={specs.strength} />
                        <SpecRow label="Кислотность" value={specs.acidity} />
                        <SpecRow label="Насыщенность" value={specs.body} />
                        <SpecRow label="Приготовление" value={specs.brewing} />
                      </dl>
                    )}
                  </div>
                </div>

                <div className="px-4 xs:px-5 sm:px-7 pb-5 sm:pb-6">
                  <AnimatePresence initial={false}>
                    {showForm && (
                      <motion.div
                        ref={formSectionRef}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.22, ease: easeOut }}
                        className="rounded-[20px] sm:rounded-[24px] bg-white p-3.5 xs:p-4 sm:p-6 shadow-soft mb-6 sm:mb-8"
                      >
                        <h3 className="font-display text-lg sm:text-xl text-primary mb-1">
                          Запрос оптового прайса
                        </h3>
                        <p className="text-sm text-primary/60 mb-4 sm:mb-5">
                          {displayName}
                        </p>
                        <FeedbackForm
                          key={product.id}
                          initialMessage={getProductInquiryMessage(product)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {similar.length > 0 && (
                    <div className={showForm ? "" : "mt-2 sm:mt-4"}>
                      <h3 className="font-display text-base sm:text-lg text-primary mb-3 sm:mb-4">
                        Вам также может понравиться
                      </h3>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                        {similar.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setShowForm(false);
                              onSelectProduct(item);
                            }}
                            className="group min-h-[44px] rounded-xl sm:rounded-2xl bg-[#E3D2B1] hover:bg-[#EDE4CE] active:bg-[#EDE4CE] active:scale-[0.97] p-1.5 sm:p-3 text-center transition-transform duration-150 ease-out touch-manipulation"
                          >
                            <div className="relative h-[64px] xs:h-[72px] sm:h-[96px] mb-1.5 sm:mb-2">
                              <Image
                                src={item.image}
                                alt={getProductDisplayName(item)}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 30vw, 140px"
                              />
                            </div>
                            <span className="block text-[11px] xs:text-xs sm:text-sm font-semibold text-primary leading-tight line-clamp-2 overflow-hidden">
                              {getProductDisplayName(item)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {!showForm && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: easeOut }}
                  className="shrink-0 border-t border-primary/10 bg-[#E8D5C4] px-4 xs:px-5 sm:px-7 pt-3"
                  style={{
                    paddingBottom: "max(0.85rem, env(safe-area-inset-bottom))",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="w-full py-3.5 sm:py-4 bg-primary text-white text-[0.95rem] sm:text-base font-semibold rounded-2xl hover:bg-accent active:bg-accent active:scale-[0.99] transition-transform duration-150 ease-out touch-manipulation touch-target"
                  >
                    Запросить оптовый прайс
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
