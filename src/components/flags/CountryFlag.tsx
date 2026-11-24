import AustriaFlag from "@/components/flags/AustriaFlag";
import GermanyFlag from "@/components/flags/GermanyFlag";
import ItalyFlag from "@/components/flags/ItalyFlag";
import NetherlandsFlag from "@/components/flags/NetherlandsFlag";
import PolandFlag from "@/components/flags/PolandFlag";
import SwitzerlandFlag from "@/components/flags/SwitzerlandFlag";

const FLAG_COUNTRIES = [
  "Германия",
  "Италия",
  "Нидерланды",
  "Польша",
  "Швейцария",
  "Австрия",
] as const;

export type FlagCountry = (typeof FLAG_COUNTRIES)[number];

export function isFlagCountry(value: string): value is FlagCountry {
  return (FLAG_COUNTRIES as readonly string[]).includes(value);
}

export default function CountryFlag({
  country,
  className = "w-9 h-6",
}: {
  country: string;
  className?: string;
}) {
  if (country === "Германия") return <GermanyFlag className={className} />;
  if (country === "Италия") return <ItalyFlag className={className} />;
  if (country === "Нидерланды") return <NetherlandsFlag className={className} />;
  if (country === "Швейцария") return <SwitzerlandFlag className={className} />;
  if (country === "Австрия") return <AustriaFlag className={className} />;
  if (country === "Польша") return <PolandFlag className={className} />;
  return null;
}
