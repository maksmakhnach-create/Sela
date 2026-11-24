import fs from "fs";
import path from "path";

export type HelpDocumentId = "price" | "catalog" | "terms";

export interface HelpDocument {
  id: HelpDocumentId;
  title: string;
  description: string;
  requestTopic: string;
  href: string | null;
}

const CANDIDATES: Record<HelpDocumentId, string[]> = {
  price: [
    "price.pdf",
    "pricelist.pdf",
    "price-list.pdf",
    "prajs.pdf",
    "optovyy-prajs.pdf",
  ],
  catalog: ["catalog.pdf", "katalog.pdf", "product-catalog.pdf"],
  terms: [
    "terms.pdf",
    "sotrudnichestvo.pdf",
    "usloviya-sotrudnichestva.pdf",
  ],
};

function findPublicDoc(fileNames: string[]): string | null {
  const dir = path.join(process.cwd(), "public", "docs");
  if (!fs.existsSync(dir)) return null;

  const existing = new Set(
    fs.readdirSync(dir).map((name) => name.toLowerCase())
  );

  for (const name of fileNames) {
    if (existing.has(name.toLowerCase())) {
      return `/docs/${name}`;
    }
  }

  return null;
}

export function getHelpDocuments(): HelpDocument[] {
  return [
    {
      id: "price",
      title: "Оптовый прайс-лист",
      description:
        "Актуальные оптовые цены на кофе, напитки и сопутствующие товары.",
      requestTopic: "Запрос оптового прайс-листа",
      href: findPublicDoc(CANDIDATES.price),
    },
    {
      id: "catalog",
      title: "Каталог продукции",
      description:
        "Полный ассортимент брендов и позиций, доступных для оптового заказа.",
      requestTopic: "Запрос каталога продукции",
      href: findPublicDoc(CANDIDATES.catalog),
    },
    {
      id: "terms",
      title: "Условия сотрудничества",
      description:
        "Порядок работы, поставки, оплаты и оформления оптовых заказов.",
      requestTopic: "Запрос условий сотрудничества",
      href: findPublicDoc(CANDIDATES.terms),
    },
  ];
}
