"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import PersonalDataConsentFields from "@/components/legal/PersonalDataConsentFields";
import { PERSONAL_DATA_CONSENT } from "@/data/legal";

export interface HelpInquiryPrefill {
  topic: string;
  message?: string;
}

interface HelpInquiryFormProps {
  prefill?: HelpInquiryPrefill;
  onSubmitted?: () => void;
}

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

const CONTACT_API = process.env.NEXT_PUBLIC_CONTACT_API ?? "/api/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_MIN = 9;

function countDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

export default function HelpInquiryForm({
  prefill,
  onSubmitted,
}: HelpInquiryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: prefill?.message ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [consentError, setConsentError] = useState("");

  const inputClass = (hasError = false) =>
    `w-full px-4 py-3.5 bg-beige/50 border rounded-xl text-base text-primary focus:outline-none transition-colors disabled:opacity-60 ${
      hasError ? "border-red-400 focus:border-red-500" : "border-beige focus:border-accent"
    }`;

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) next.name = "Укажите имя";
    if (!formData.company.trim()) next.company = "Укажите название компании";
    if (countDigits(formData.phone) < PHONE_DIGITS_MIN) {
      next.phone = "Укажите корректный телефон";
    }
    if (!EMAIL_PATTERN.test(formData.email.trim())) {
      next.email = "Укажите корректный email";
    }
    if (formData.message.trim().length < 8) {
      next.message = "Опишите обращение подробнее";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (error) setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setConsentError("");
    if (!validate()) return;
    if (!consentAccepted) {
      setConsentError(
        "Чтобы отправить заявку, установите отметку о согласии на обработку персональных данных."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "help",
          topic: prefill?.topic ?? "Заявка со страницы «Помощь»",
          name: formData.name.trim(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          personalDataConsent: true,
          consentVersion: PERSONAL_DATA_CONSENT.version,
          consentDocumentId: PERSONAL_DATA_CONSENT.documentId,
          consentAcceptedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Не удалось отправить заявку");
      }

      setSubmitted(true);
      onSubmitted?.();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось отправить заявку. Попробуйте позже."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-16 h-16 bg-beige rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-accent" strokeWidth={2} />
        </div>
        <h3 className="font-display text-xl text-primary mb-2">
          Заявка отправлена
        </h3>
        <p className="text-primary/60">
          Мы свяжемся с вами в ближайшее рабочее время.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {prefill?.topic && (
        <p className="text-sm text-primary/55 bg-cream/40 border border-beige/70 rounded-xl px-4 py-3">
          Тема: {prefill.topic}
        </p>
      )}

      <div>
        <label className="text-sm font-medium text-primary/70 mb-2 block" htmlFor="help-name">
          Имя
        </label>
        <input
          id="help-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          disabled={loading}
          value={formData.name}
          onChange={handleChange}
          className={`${inputClass(Boolean(errors.name))} min-h-[48px]`}
          placeholder="Ваше имя"
        />
        {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-primary/70 mb-2 block" htmlFor="help-company">
          Название компании
        </label>
        <input
          id="help-company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          disabled={loading}
          value={formData.company}
          onChange={handleChange}
          className={`${inputClass(Boolean(errors.company))} min-h-[48px]`}
          placeholder="ООО «Компания»"
        />
        {errors.company && (
          <p className="mt-1.5 text-sm text-red-600">{errors.company}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-primary/70 mb-2 block" htmlFor="help-phone">
          Телефон
        </label>
        <input
          id="help-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          disabled={loading}
          value={formData.phone}
          onChange={handleChange}
          inputMode="tel"
          autoCorrect="off"
          className={`${inputClass(Boolean(errors.phone))} min-h-[48px]`}
          placeholder="+375 (__) ___-__-__"
        />
        {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-primary/70 mb-2 block" htmlFor="help-email">
          Электронная почта
        </label>
        <input
          id="help-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={loading}
          value={formData.email}
          onChange={handleChange}
          inputMode="email"
          autoCapitalize="none"
          className={`${inputClass(Boolean(errors.email))} min-h-[48px]`}
          placeholder="email@company.by"
        />
        {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-primary/70 mb-2 block" htmlFor="help-message">
          Текст обращения
        </label>
        <textarea
          id="help-message"
          name="message"
          required
          disabled={loading}
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass(Boolean(errors.message))} resize-none`}
          placeholder="Чем мы можем помочь?"
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <PersonalDataConsentFields
        id="help-personal-data-consent"
        checked={consentAccepted}
        disabled={loading}
        error={consentError}
        onChange={(checked) => {
          setConsentAccepted(checked);
          if (checked) setConsentError("");
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 sm:py-4 bg-primary text-white font-medium rounded-2xl hover:bg-accent active:bg-accent transition-colors duration-300 touch-target disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}
