import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import HelpPageContent from "@/components/help/HelpPageContent";
import { getHelpDocuments } from "@/lib/help-documents";

const siteUrl = getSiteUrl();
const title = "Помощь — центр поддержки оптовых клиентов SELA";
const description =
  "Прайс-лист, статус заказа, FAQ, документы и связь с менеджером SELA: оптовые поставки кофе по Беларуси.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/help",
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/help`,
    locale: "ru_BY",
    type: "website",
    siteName: "SELA",
  },
};

export default function HelpPage() {
  const documents = getHelpDocuments();
  return <HelpPageContent documents={documents} />;
}
