"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 safe-px pt-[env(safe-area-inset-top)] transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo variant="dark" />

          <div className="hidden md:flex items-center gap-6 lg:gap-8 glass rounded-premium px-6 py-2.5">
            <nav className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/order"
              className="px-5 py-2.5 text-sm font-semibold rounded-premium bg-orange-gradient text-white hover:shadow-glow-orange hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
            >
              Заказать
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-3 -mr-2 touch-target"
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden max-h-[calc(100dvh-4rem-env(safe-area-inset-top))] overflow-y-auto border-b bg-background/95 backdrop-blur-xl border-beige/60"
          >
            <nav className="flex flex-col px-4 sm:px-6 py-4 gap-1">
              {navLinks.map((link) => (
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
              ))}
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
  );
}
