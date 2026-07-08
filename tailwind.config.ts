import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3D2B1F",
        accent: "#B87333",
        beige: "#E8D5C4",
        "filter-beige": "#E1D0B0",
        gold: "#D4A574",
        background: "#FFF8F0",
        hero: "#FAF0E6",
        mint: "#8FD4C4",
        "card-latte": "#FAF3EB",
        "card-latte-hover": "#F5EBE0",
        "home-brown": "#6B4C3B",
        "home-beige": "#E8D5C4",
        espresso: "#4A3428",
        chocolate: "#5C4033",
        "coffee-brown": "#8B6347",
        latte: "#D4B896",
        caramel: "#C9844A",
        mocha: "#A67C52",
        cream: "#FFE8D0",
        milk: "#FFF8F0",
        "deep-black": "#FFF8F0",
        "section-dark": "#F5EBE0",
        coffee: "#B87333",
        "caramel-orange": "#C9844A",
        "warm-gold": "#D4A574",
        "light-cream": "#FAF0E6",
        "btn-primary": "#B56A2E",
        "text-description": "#5E5147",
        "text-secondary": "#6B5344",
        "text-muted": "#8B7355",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        catalog: ["var(--font-jakarta)", "sans-serif"],
        hero: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
        premium: "32px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(61, 43, 31, 0.08)",
        card: "0 8px 32px rgba(61, 43, 31, 0.1)",
        hover: "0 16px 48px rgba(184, 115, 51, 0.18)",
        glow: "0 0 40px rgba(201, 132, 74, 0.2)",
        "glow-lg": "0 0 60px rgba(201, 132, 74, 0.28)",
        "glow-orange": "0 8px 32px rgba(184, 115, 51, 0.25)",
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(135deg, #B87333, #C9844A)",
        "warm-gradient": "linear-gradient(135deg, #C9844A, #D4A574)",
        "warm-gradient-hero": "linear-gradient(180deg, #F5DFC8 0%, #F2D8BD 25%, #F6E4D3 50%, #F0D4B5 75%, #F5DFC8 100%)",
        "warm-glow": "radial-gradient(circle at 50% 50%, rgba(212,165,116,0.45) 0%, rgba(245,223,200,0.2) 40%, transparent 70%)",
        "hero-glow":
          "radial-gradient(circle at 70% 40%, rgba(212,165,116,0.35) 0%, transparent 55%)",
      },
    },
  },
  plugins: [],
};

export default config;
