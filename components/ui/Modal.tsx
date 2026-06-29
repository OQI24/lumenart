"use client";

import { useEffect, useCallback } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-background-card border border-gold/30 p-8 shadow-2xl shadow-gold/10 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-white transition-colors"
          aria-label="Закрыть"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M15 5L5 15M5 5l10 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 id="modal-title" className="mb-4 pr-6 text-xl font-bold text-foreground">
          {title}
        </h2>
        <div className="text-muted leading-relaxed">{children}</div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-gradient-gold py-3 font-semibold text-background hover:opacity-90 transition-opacity"
        >
          Отлично
        </button>
      </div>
    </div>
  );
}
