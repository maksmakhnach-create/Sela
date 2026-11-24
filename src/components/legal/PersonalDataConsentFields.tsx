"use client";

import Link from "next/link";

interface PersonalDataConsentFieldsProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
  id?: string;
}

export default function PersonalDataConsentFields({
  checked,
  onChange,
  error,
  disabled,
  id = "personal-data-consent",
}: PersonalDataConsentFieldsProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={`flex items-start gap-3 cursor-pointer rounded-xl border px-4 py-3.5 transition-colors ${
          error
            ? "border-red-400 bg-red-50/70"
            : checked
              ? "border-accent bg-beige/60"
              : "border-beige bg-beige/30 hover:border-accent/50"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 w-4 h-4 accent-[#B87333] shrink-0"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="text-sm sm:text-base text-primary leading-snug">
          Я даю согласие на обработку персональных данных в соответствии с{" "}
          <Link
            href="/personal-data-consent"
            target="_blank"
            rel="noopener noreferrer"
            className="text-caramel-orange hover:text-accent font-semibold underline-offset-2 hover:underline"
            onClick={(event) => event.stopPropagation()}
          >
            Согласием на обработку персональных данных
          </Link>
          .
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
      <p className="text-sm text-primary/55 px-1">
        Подробнее о порядке обработки персональных данных — в{" "}
        <Link
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-caramel-orange hover:text-accent underline-offset-2 hover:underline"
        >
          Политике обработки персональных данных
        </Link>
        .
      </p>
    </div>
  );
}
