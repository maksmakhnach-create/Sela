import Link from "next/link";
import Logo from "@/components/Logo";

const companyLinks = [
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
  { href: "/", label: "Главная" },
];

const productLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog?type=ground", label: "Молотый кофе" },
  { href: "/catalog?type=beans", label: "Зерновой кофе" },
];

const presenceLinks = [
  { href: "https://www.instagram.com/sela_coffe/", label: "Instagram" },
  { href: "https://www.wildberries.ru/seller/3924979", label: "Wildberries" },
];

export default function Footer() {
  return (
    <footer className="bg-section-dark border-t border-beige/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 safe-px">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12">
          <div className="lg:col-span-1">
            <Logo variant="dark" />
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary mb-6">Компания</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-caramel-orange transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary mb-6">Продукция</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-caramel-orange transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary mb-6">Контакты</h4>
            <ul className="space-y-3 text-sm text-text-muted">
              <li>
                <a
                  href="tel:+375295889815"
                  className="hover:text-caramel-orange transition-colors duration-300"
                >
                  +375 (29) 588-98-15
                </a>
              </li>
              <li>
                <a
                  href="mailto:lcc.sela8@gmail.com"
                  className="hover:text-caramel-orange transition-colors duration-300"
                >
                  lcc.sela8@gmail.com
                </a>
              </li>
              <li>Гродно, ул. Ивана Лебедева, 6</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary mb-6">
              Мы есть тут
            </h4>
            <ul className="space-y-3">
              {presenceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted hover:text-caramel-orange transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-beige/80 text-center text-sm text-text-muted/70">
          © 2026 SELA. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
