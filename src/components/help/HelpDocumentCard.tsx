"use client";

import { Download, Eye, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HelpDocument } from "@/lib/help-documents";
import type { HelpInquiryPrefill } from "@/components/help/HelpInquiryForm";

interface HelpDocumentCardProps {
  doc: HelpDocument;
  icon: LucideIcon;
  onRequest: (prefill: HelpInquiryPrefill) => void;
}

export default function HelpDocumentCard({
  doc,
  icon: Icon,
  onRequest,
}: HelpDocumentCardProps) {
  return (
    <div className="flex h-full flex-col rounded-[20px] sm:rounded-[24px] border border-beige/20 bg-white/[0.07] backdrop-blur-sm p-4 sm:p-6">
      <span className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-beige/15 text-gold">
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
      </span>
      <h3 className="font-display font-semibold text-lg sm:text-xl text-beige mb-1.5 sm:mb-2">
        {doc.title}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed mb-4 sm:mb-5 flex-1">
        {doc.description}
      </p>
      <div className="flex flex-col xs:flex-row gap-2 sm:flex-wrap">
        {doc.href ? (
          <>
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-white/10 text-beige text-sm font-medium hover:bg-white/16 transition-colors duration-300 touch-target"
            >
              <Eye className="h-4 w-4 shrink-0" aria-hidden />
              Просмотр
            </a>
            <a
              href={doc.href}
              download
              className="inline-flex flex-1 items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-orange-gradient text-white text-sm font-semibold hover:opacity-95 transition-opacity duration-300 touch-target"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              Скачать
            </a>
          </>
        ) : (
          <button
            type="button"
            onClick={() =>
              onRequest({
                topic: doc.requestTopic,
                message: `Прошу прислать документ: ${doc.title}.`,
              })
            }
            className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-orange-gradient text-white text-sm font-semibold hover:opacity-95 transition-opacity duration-300 touch-target"
          >
            <Send className="h-4 w-4 shrink-0" aria-hidden />
            Запросить
          </button>
        )}
      </div>
    </div>
  );
}