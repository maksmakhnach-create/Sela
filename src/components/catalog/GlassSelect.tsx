"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface GlassSelectOption {
  value: string;
  label: string;
}

interface GlassSelectProps {
  label: string;
  value: string;
  options: GlassSelectOption[];
  onChange: (value: string) => void;
}

export default function GlassSelect({
  label,
  value,
  options,
  onChange,
}: GlassSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  const updateMenuPosition = () => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const gap = 8;
    const estimatedHeight = Math.min(options.length * 44 + 16, 256);
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const shouldDropUp = spaceBelow < estimatedHeight;

    setDropUp(shouldDropUp);
    setMenuStyle({
      left: rect.left,
      width: rect.width,
      top: shouldDropUp
        ? rect.top - gap
        : rect.bottom + gap,
    });
  };

  useLayoutEffect(() => {
    if (!open) {
      setMenuStyle(null);
      return;
    }

    updateMenuPosition();

    const handleReposition = () => updateMenuPosition();
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (!open || !listRef.current || !buttonRef.current) return;

    const listRect = listRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const gap = 8;

    setMenuStyle({
      left: buttonRect.left,
      width: buttonRect.width,
      top: dropUp
        ? buttonRect.top - gap - listRect.height
        : buttonRect.bottom + gap,
    });
  }, [open, dropUp, options.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        rootRef.current?.contains(target) ||
        listRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const dropdown =
    open && menuStyle
      ? createPortal(
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label}
            style={{
              position: "fixed",
              top: menuStyle.top,
              left: menuStyle.left,
              width: menuStyle.width,
              zIndex: 9999,
            }}
            className="py-2 rounded-2xl bg-white border border-beige shadow-card overflow-hidden max-h-64 overflow-y-auto"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-150 touch-target ${
                      isSelected
                        ? "bg-cream text-primary"
                        : "text-primary/80 hover:bg-cream/80 hover:text-primary"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body
        )
      : null;

  return (
    <div ref={rootRef} className={`relative ${open ? "z-50" : ""}`}>
      <label className="text-sm font-semibold text-primary mb-2 block">
        {label}
      </label>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white border border-beige text-primary text-base sm:text-sm text-left hover:border-accent hover:shadow-soft transition-all duration-200 touch-target"
      >
        <span className="truncate">{selected.label}</span>
        <svg
          className={`w-4 h-4 shrink-0 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdown}
    </div>
  );
}
