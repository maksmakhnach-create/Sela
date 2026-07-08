import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <Image
        src="/logo.png"
        alt="SELA"
        width={44}
        height={44}
        className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
        priority
      />
      <span
        className={`font-display text-xl sm:text-2xl font-semibold tracking-[0.15em] uppercase ${
          variant === "light" ? "text-white" : "text-primary"
        }`}
      >
        SELA
      </span>
    </Link>
  );
}
