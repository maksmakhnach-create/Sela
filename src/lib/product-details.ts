import { products, type Product } from "@/data/products";

const COFFEE_TYPES = new Set<Product["type"]>(["beans", "ground", "instant"]);

const ROAST_LABELS: Record<Product["roast"], string> = {
  light: "Светлая",
  medium: "Средняя",
  dark: "Тёмная",
};

export interface ProductSpecs {
  composition?: string;
  roast?: string;
  flavorProfile?: string;
  strength?: string;
  acidity?: string;
  body?: string;
  brewing?: string;
}

export function getProductDisplayName(product: Product): string {
  return product.titleSubline
    ? `${product.name} ${product.titleSubline}`
    : product.name;
}

export function getProductWeight(product: Product): string | undefined {
  if (product.weightLabel) return product.weightLabel;
  if (COFFEE_TYPES.has(product.type)) return "1 KG";
  return undefined;
}

export function getProductInquiryMessage(product: Product): string {
  const name = getProductDisplayName(product);
  const weight = getProductWeight(product);
  const extras = [product.brand, weight].filter(Boolean).join(", ");
  return extras
    ? `Прошу прислать оптовый прайс по товару: ${name} (${extras}).`
    : `Прошу прислать оптовый прайс по товару: ${name}.`;
}

function sourceText(product: Product): string {
  return `${product.name} ${product.titleSubline ?? ""} ${product.description}`;
}

function pickMatch(text: string, pattern: RegExp): string | undefined {
  const match = text.match(pattern);
  const value = match?.[0]?.trim();
  return value || undefined;
}

function capitalizePhrase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getComposition(product: Product): string | undefined {
  const text = sourceText(product).toLowerCase();

  if (/100%\s*арабик/.test(text)) return "100% арабика";
  if (/100%\s*(отборной\s+)?робуст/.test(text)) return "100% робуста";
  if (/моносортн\w*\s+арабик/.test(text)) return "Арабика";
  if (
    (text.includes("арабик") && text.includes("робуст")) ||
    text.includes("смесь арабики") ||
    text.includes("смеси арабики")
  ) {
    return "Смесь арабики и робусты";
  }
  if (text.includes("арабик")) return "Арабика";
  if (text.includes("робуст")) return "Робуста";
  return undefined;
}

function getRoast(product: Product): string | undefined {
  if (!COFFEE_TYPES.has(product.type)) return undefined;
  return ROAST_LABELS[product.roast];
}

function getFlavorProfile(product: Product): string | undefined {
  const description = product.description;
  const fragments = [
    pickMatch(
      description,
      /нотками\s+[^.,;]+/i,
    ),
    pickMatch(
      description,
      /нотами\s+[^.,;]+/i,
    ),
    pickMatch(
      description,
      /ноты\s+[^.,;]+/i,
    ),
    pickMatch(
      description,
      /ароматом\s+(?!и\b)[^.,;]+/i,
    ),
  ].filter((value): value is string => Boolean(value));

  if (fragments.length === 0) return undefined;

  const unique = [...new Set(fragments.map((item) => item.toLowerCase()))];
  return unique.map(capitalizePhrase).join(". ");
}

function getStrength(product: Product): string | undefined {
  return pickMatch(
    product.description,
    /интенсивность\s+\d+(?:\s*из\s*\d+)?/i,
  );
}

function getAcidity(product: Product): string | undefined {
  return pickMatch(
    `${product.name} ${product.description}`,
    /кислотност[а-яё]*[^.,;]*/i,
  );
}

function getBody(product: Product): string | undefined {
  return (
    pickMatch(product.description, /полнотел(?:ый|ое)\s+вкус[^.,;]*/i) ||
    pickMatch(product.description, /округлое\s+тело[^.,;]*/i) ||
    pickMatch(product.description, /плотным?\s+телом?[^.,;]*/i) ||
    pickMatch(product.description, /плотной?\s+кремов(?:ой|ая)\s+текстур[^.,;]*/i)
  );
}

function getBrewing(product: Product): string | undefined {
  const description = product.description;
  return (
    pickMatch(description, /для кофемашин и рожковых кофеварок/i) ||
    pickMatch(description, /идеальн[аы]\s+для кофемашин/i) ||
    pickMatch(description, /для капучино и латте/i) ||
    pickMatch(description, /для эспрессо и капучино/i) ||
    pickMatch(description, /для эспрессо/i) ||
    pickMatch(description, /для кофемашин/i) ||
    pickMatch(description, /подходит для горячего и холодного напитка/i) ||
    pickMatch(description, /для выпечки и десертов/i)
  );
}

export function getProductSpecs(product: Product): ProductSpecs {
  const flavorProfile = getFlavorProfile(product);
  const strength = getStrength(product);
  const acidity = getAcidity(product);
  const body = getBody(product);
  const brewing = getBrewing(product);

  return {
    composition: getComposition(product),
    roast: getRoast(product),
    flavorProfile:
      flavorProfile &&
      flavorProfile.toLowerCase() !== product.description.toLowerCase()
        ? capitalizePhrase(flavorProfile)
        : undefined,
    strength: strength ? capitalizePhrase(strength) : undefined,
    acidity: acidity ? capitalizePhrase(acidity) : undefined,
    body: body ? capitalizePhrase(body) : undefined,
    brewing: brewing ? capitalizePhrase(brewing) : undefined,
  };
}

export function getSimilarProducts(
  product: Product,
  limit = 3,
  catalog: Product[] = products,
): Product[] {
  const others = catalog.filter((item) => item.id !== product.id);
  const ranked = [
    ...others.filter(
      (item) => item.brand === product.brand && item.type === product.type,
    ),
    ...others.filter(
      (item) => item.brand === product.brand && item.type !== product.type,
    ),
    ...others.filter(
      (item) => item.type === product.type && item.brand !== product.brand,
    ),
  ];

  const seen = new Set<number>();
  const result: Product[] = [];

  for (const item of ranked) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    result.push(item);
    if (result.length >= limit) break;
  }

  return result;
}
