"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

interface FeedbackFormProps {
  onSubmitted?: () => void;
  size?: "default" | "large";
}

interface FormData {
  name: string;
  company: string;
  unp: string;
  email: string;
  country: string;
  phone: string;
  priceListChannel: "email" | "telegram";
  message: string;
}

const initialFormData: FormData = {
  name: "",
  company: "",
  unp: "",
  email: "",
  country: "",
  phone: "",
  priceListChannel: "email",
  message: "",
};

const UNP_ERROR = "Исправьте УНП: должно быть 9 цифр";

const CONTACT_API =
  process.env.NEXT_PUBLIC_CONTACT_API ?? "/api/contact";

function isValidUnp(value: string): boolean {
  return /^\d{9}$/.test(value);
}

export default function FeedbackForm({ onSubmitted, size = "default" }: FeedbackFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unpError, setUnpError] = useState("");
  const isLarge = size === "large";

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        priceListChannel: value as FormData["priceListChannel"],
      }));
      if (error) setError("");
      return;
    }

    if (name === "unp") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 9);
      setFormData((prev) => ({ ...prev, unp: digitsOnly }));
      if (unpError) setUnpError("");
      if (error) setError("");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setUnpError("");

    if (!isValidUnp(formData.unp)) {
      setUnpError(UNP_ERROR);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error?.includes("УНП")) {
          setUnpError(result.error);
          return;
        }
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

  const inputClass = (hasError = false) =>
    `${
      isLarge
        ? "w-full px-5 py-4 bg-beige/50 border rounded-2xl text-lg text-primary focus:outline-none transition-colors disabled:opacity-60"
        : "w-full px-4 py-3.5 bg-beige/50 border rounded-xl text-base text-primary focus:outline-none transition-colors disabled:opacity-60"
    } ${hasError ? "border-red-400 focus:border-red-500" : "border-beige focus:border-accent"}`;

  const labelClass = isLarge
    ? "text-base font-medium text-primary/70 mb-2.5 block"
    : "text-sm font-medium text-primary/70 mb-2 block";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center ${isLarge ? "py-16" : "py-12"}`}
      >
        <div
          className={`bg-beige rounded-full flex items-center justify-center mx-auto mb-4 ${isLarge ? "w-20 h-20" : "w-16 h-16"}`}
        >
          <svg
            className={`text-accent ${isLarge ? "w-10 h-10" : "w-8 h-8"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`font-display text-primary mb-2 ${isLarge ? "text-2xl" : "text-xl"}`}>
          Спасибо за обращение!
        </h3>
        <p className={`text-primary/60 ${isLarge ? "text-lg" : ""}`}>
          Мы свяжемся с вами в ближайшее время.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={isLarge ? "space-y-8" : "space-y-6"}>
      <div>
        <label className={labelClass} htmlFor="name">
          Имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={loading}
          value={formData.name}
          onChange={handleChange}
          className={inputClass()}
          placeholder="Ваше имя"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="company">
          Название вашей компании
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          disabled={loading}
          value={formData.company}
          onChange={handleChange}
          className={inputClass()}
          placeholder="Название компании"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="unp">
          УНП
        </label>
        <input
          id="unp"
          name="unp"
          type="text"
          inputMode="numeric"
          required
          disabled={loading}
          value={formData.unp}
          onChange={handleChange}
          className={inputClass(Boolean(unpError))}
          placeholder="9 цифр"
          maxLength={9}
          pattern="\d{9}"
          aria-invalid={Boolean(unpError)}
          aria-describedby={unpError ? "unp-error" : undefined}
        />
        {unpError && (
          <p id="unp-error" className="mt-2 text-sm text-red-600">
            {unpError}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={loading}
          value={formData.email}
          onChange={handleChange}
          className={inputClass()}
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="country">
          Страна
        </label>
        <input
          id="country"
          name="country"
          type="text"
          required
          disabled={loading}
          value={formData.country}
          onChange={handleChange}
          className={inputClass()}
          placeholder="Страна"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="phone">
          Телефон
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          disabled={loading}
          value={formData.phone}
          onChange={handleChange}
          className={inputClass()}
          placeholder="+375 (__) ___-__-__"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className={labelClass}>Куда вам удобно получить прайс-лист</legend>
        <div className={`grid sm:grid-cols-2 gap-3 ${isLarge ? "gap-4" : ""}`}>
          {[
            { value: "email", label: "Электронная почта" },
            { value: "telegram", label: "Telegram" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3.5 transition-colors ${
                formData.priceListChannel === option.value
                  ? "border-accent bg-beige/60"
                  : "border-beige bg-beige/30 hover:border-accent/50"
              } ${isLarge ? "py-4 px-5 rounded-2xl" : ""}`}
            >
              <input
                type="radio"
                name="priceListChannel"
                value={option.value}
                checked={formData.priceListChannel === option.value}
                onChange={handleChange}
                disabled={loading}
                className="w-4 h-4 accent-[#B87333] shrink-0"
              />
              <span className={`text-primary ${isLarge ? "text-lg" : "text-base"}`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={labelClass} htmlFor="message">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={loading}
          rows={isLarge ? 8 : 5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass()} resize-none`}
          placeholder="Ваше сообщение..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={
          isLarge
            ? "w-full py-4 sm:py-5 bg-primary text-white text-lg font-semibold rounded-2xl hover:bg-accent active:bg-accent transition-colors duration-300 touch-target disabled:opacity-60 disabled:cursor-not-allowed"
            : "w-full py-3.5 sm:py-4 bg-primary text-white font-medium rounded-2xl hover:bg-accent active:bg-accent transition-colors duration-300 touch-target disabled:opacity-60 disabled:cursor-not-allowed"
        }
      >
        {loading ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
}
