import { products, type Product } from "@/data/products";

export const catalogTypeLabels: Record<Product["type"], string> = {
  beans: "Зерновой кофе",
  ground: "Молотый кофе",
  instant: "Растворимый кофе",
  drink: "Кофейный напиток",
  cappuccino: "Капучино",
  "instant-tea": "Чай растворимый",
  "pastry-filling": "Массовая начинка",
  toothpaste: "Зубная паста",
};

const typeOrder: Product["type"][] = [
  "beans",
  "ground",
  "instant",
  "drink",
  "cappuccino",
  "instant-tea",
  "pastry-filling",
  "toothpaste",
];

export interface CatalogMenuItem {
  label: string;
  href: string;
}

export interface CatalogMenuColumn {
  type: Product["type"];
  label: string;
  href: string;
  items: CatalogMenuItem[];
}

function uniqueBrands(type: Product["type"]) {
  return [...new Set(products.filter((product) => product.type === type).map((product) => product.brand))].sort(
    (a, b) => a.localeCompare(b, "ru"),
  );
}

export const catalogMenuColumns: CatalogMenuColumn[] = typeOrder.map((type) => ({
  type,
  label: catalogTypeLabels[type],
  href: `/catalog?type=${type}`,
  items: uniqueBrands(type).map((brand) => ({
    label: brand,
    href: `/catalog?type=${type}&brand=${encodeURIComponent(brand)}`,
  })),
}));
