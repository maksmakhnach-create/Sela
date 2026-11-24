"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const cardClassName =
  "group flex h-full w-full flex-col text-left rounded-[20px] sm:rounded-[24px] border border-beige/20 bg-white/[0.07] backdrop-blur-sm p-4 sm:p-6 hover:border-caramel-orange/50 hover:bg-white/[0.12] hover:shadow-glow transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

const iconWrapClassName =
  "mb-3 sm:mb-4 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-beige/15 text-gold group-hover:bg-caramel-orange/20 transition-colors duration-300";

interface HelpQuickActionCardBaseProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

type HelpQuickActionCardProps = HelpQuickActionCardBaseProps &
  (
    | { href: string; external?: boolean; onClick?: never }
    | { onClick: () => void; href?: never; external?: never }
  );

export default function HelpQuickActionCard(props: HelpQuickActionCardProps) {
  const { icon: Icon, title, description } = props;

  const body = (
    <>
      <span className={iconWrapClassName}>
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
      </span>
      <h2 className="font-display font-semibold text-lg sm:text-xl text-beige mb-1.5 sm:mb-2">
        {title}
      </h2>
      <p className="text-sm text-white/60 leading-relaxed flex-1">{description}</p>
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  if ("href" in props && props.href) {
    const isHash = props.href.startsWith("#");
    const linkClass = `${cardClassName} touch-target`;

    if (isHash) {
      return (
        <motion.a href={props.href} className={linkClass} {...motionProps}>
          {body}
        </motion.a>
      );
    }

    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="h-full">
        <Link
          href={props.href}
          className={`${cardClassName} touch-target block h-full`}
          target={props.external ? "_blank" : undefined}
          rel={props.external ? "noopener noreferrer" : undefined}
        >
          {body}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={props.onClick}
      className={`${cardClassName} touch-target cursor-pointer`}
      {...motionProps}
    >
      {body}
    </motion.button>
  );
}