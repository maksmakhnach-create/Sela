import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Plus_Jakarta_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteUrl } from "@/lib/site-url";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FFF8F0",
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "SELA — кофе и напитки для бизнеса",
    template: "%s | SELA",
  },
  description:
    "Оптовые поставки кофе и кофейных напитков в Беларуси для бизнеса.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      translate="no"
      className={`notranslate ${inter.variable} ${manrope.variable} ${jakarta.variable} ${bebas.variable}`}
    >
      <body className="font-sans antialiased notranslate">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
