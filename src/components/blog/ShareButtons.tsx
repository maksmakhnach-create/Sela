"use client";

import { useEffect, useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const shareLinks = [
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "VK",
      href: `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-primary">Поделиться:</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-primary hover:bg-beige/80 transition-colors"
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-primary hover:bg-beige/80 transition-colors"
      >
        {copied ? "Ссылка скопирована" : "Копировать ссылку"}
      </button>
      {canNativeShare && (
        <button
          type="button"
          onClick={handleNativeShare}
          className="rounded-full bg-orange-gradient px-4 py-2 text-sm font-medium text-white hover:shadow-glow-orange transition-shadow"
        >
          Отправить
        </button>
      )}
    </div>
  );
}
