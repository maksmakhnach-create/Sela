"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import CatalogMegaMenu from "@/components/CatalogMegaMenu";
import { catalogMenuColumns } from "@/data/catalog-menu";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
  { href: "/help", label: "Помощь" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaButtonRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !menuOpen && !megaOpen;

  useEffect(() => {
    document.body.style.overflow = menuOpen || megaOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, megaOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
        setMobileCatalogOpen(false);
      } else {
        setMegaOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setMobileCatalogOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!megaOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMegaOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (megaPanelRef.current?.contains(target)) return;
      if (megaButtonRef.current?.contains(target)) return;
      setMegaOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [megaOpen]);

  const closeMega = () => {
    window.setTimeout(() => setMegaOpen(false), 0);
  };

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return `text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive
        ? "text-caramel-orange"
        : "text-primary/75 hover:text-caramel-orange"
    }`;
  };

  const headerBg =
    isTransparent
      ? "bg-transparent border-b border-transparent"
      : "bg-background/90 backdrop-blur-xl border-b border-beige/60 shadow-soft";

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 overflow-visible"
    >
      <div className={`safe-px pt-[env(safe-area-inset-top)] transition-all duration-500 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo variant="dark" />

          <div className="hidden lg:flex items-center gap-4 xl:gap-7 glass rounded-premium px-5 xl:px-6 py-2.5">
            <nav className="flex items-center gap-4 xl:gap-7">
              {navLinks.map((link) =>
                link.href === "/catalog" ? (
                  <button
                    key={link.href}
                    ref={megaButtonRef}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((open) => !open)}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-300 ${
                      megaOpen || pathname === "/catalog"
                        ? "text-caramel-orange"
                        : "text-primary/75 hover:text-caramel-orange"
                    }`}
                  >
                    Каталог
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={linkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <Link
              href="/order"
              className="px-5 py-2.5 text-sm font-semibold rounded-premium bg-orange-gradient text-white hover:shadow-glow-orange hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
            >
              Заказать
            </Link>
          </div>

          <button
            className="lg:hidden flex flex-col justify-center gap-1.5 p-3 -mr-2 touch-target"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            ref={megaPanelRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:block relative z-10"
          >
            <CatalogMegaMenu onNavigate={closeMega} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden max-h-[calc(100dvh-4rem-env(safe-area-inset-top))] overflow-y-auto border-b bg-background/95 backdrop-blur-xl border-beige/60"
          >
            <nav className="flex flex-col px-4 sm:px-6 py-4 gap-1">
              {navLinks.map((link) =>
                link.href === "/catalog" ? (
                  <div key={link.href}>
                    <button
                      type="button"
                      onClick={() => setMobileCatalogOpen((open) => !open)}
                      aria-expanded={mobileCatalogOpen}
                      className={`w-full flex items-center justify-between text-base font-medium py-3.5 px-2 transition-colors touch-target ${
                        mobileCatalogOpen || pathname === "/catalog"
                          ? "text-caramel-orange"
                          : "text-primary/75 hover:text-caramel-orange"
                      }`}
                    >
                      Каталог
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${mobileCatalogOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileCatalogOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 pb-3 space-y-3">
                            <Link
                              href="/catalog"
                              onClick={() => setMenuOpen(false)}
                              className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-caramel-orange px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(196,122,58,0.35)]"
                            >
                              Смотреть весь каталог
                              <span aria-hidden>→</span>
                            </Link>
                            {catalogMenuColumns.map((column) => (
                              <div key={column.type}>
                                <Link
                                  href={column.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block text-sm font-semibold text-primary py-1.5"
                                >
                                  {column.label}
                                </Link>
                                <div className="pl-3 flex flex-col">
                                  {column.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setMenuOpen(false)}
                                      className="text-sm text-primary/70 py-1.5"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-base font-medium py-3.5 px-2 transition-colors touch-target flex items-center ${
                      pathname === link.href
                        ? "text-caramel-orange"
                        : "text-primary/75 hover:text-caramel-orange"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}

              <Link
                href="/order"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center px-8 py-3.5 font-semibold rounded-premium bg-orange-gradient text-white touch-target"
              >
                Заказать
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    <AnimatePresence>
      {megaOpen && (
        <motion.button
          type="button"
          aria-label="Закрыть меню каталога"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="hidden lg:block fixed inset-0 z-40 bg-primary/30 cursor-default"
          onClick={closeMega}
        />
      )}
    </AnimatePresence>
    </>
  );
}
