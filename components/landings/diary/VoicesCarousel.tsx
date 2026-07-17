"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

export type Voice = {
  quote: string;
  name: string;
  role: string;
};

const DESKTOP_PAGE_SIZE = 3;
const MOBILE_PAGE_SIZE = 2;
const MOBILE_MQ = "(max-width: 767px)";

function subscribePageSize(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getPageSizeSnapshot() {
  return window.matchMedia(MOBILE_MQ).matches ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
}

function getServerPageSizeSnapshot() {
  return DESKTOP_PAGE_SIZE;
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  return (
    <svg
      className="s12-voices-arrow"
      viewBox="0 0 72 24"
      fill="none"
      aria-hidden="true"
    >
      {isPrev ? (
        <path
          d="M68.5 12.2c-18.4-.8-36.9-.4-55.2.3M16.2 4.4c-3.8 2.2-6.9 4.6-9.4 7.6 2.2 2.6 5.5 5.2 9.6 7.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M3.5 11.8c18.4.8 36.9.4 55.2-.3M55.8 4.2c3.8 2.2 6.9 4.6 9.4 7.6-2.2 2.6-5.5 5.2-9.6 7.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function VoicesCarousel({ voices }: { voices: readonly Voice[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pageSize = useSyncExternalStore(
    subscribePageSize,
    getPageSizeSnapshot,
    getServerPageSizeSnapshot,
  );

  const pages = useMemo(() => {
    const chunks: Voice[][] = [];
    for (let i = 0; i < voices.length; i += pageSize) {
      chunks.push([...voices.slice(i, i + pageSize)]);
    }
    return chunks;
  }, [voices, pageSize]);

  const [page, setPage] = useState(0);
  const total = pages.length;

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  const goToPage = (next: number) => {
    setPage(next);
    if (!window.matchMedia(MOBILE_MQ).matches) return;
    wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nav = total > 1 && (
    <div className="s12-voices-nav">
      <button
        type="button"
        className="s12-voices-btn"
        aria-label="Предыдущие отзывы"
        disabled={page === 0}
        onClick={() => goToPage(Math.max(0, page - 1))}
      >
        <ArrowIcon direction="prev" />
      </button>
      <p className="s12-hand s12-voices-page">
        {page + 1} / {total}
      </p>
      <button
        type="button"
        className="s12-voices-btn"
        aria-label="Следующие отзывы"
        disabled={page >= total - 1}
        onClick={() => goToPage(Math.min(total - 1, page + 1))}
      >
        <ArrowIcon direction="next" />
      </button>
    </div>
  );

  return (
    <div className="s12-voices-wrap" ref={wrapRef}>
      {nav}
      <div className="s12-voices-viewport">
        <div
          className="s12-voices-track"
          style={{ transform: `translate3d(-${page * 100}%, 0, 0)` }}
        >
          {pages.map((pageVoices, pageIndex) => (
            <div
              key={`${pageSize}-${pageIndex}`}
              className="s12-voices"
              aria-hidden={pageIndex !== page}
            >
              {pageVoices.map((voice) => (
                <figure key={`${voice.name}-${voice.role}`} className="s12-voice-card">
                  <blockquote>«{voice.quote}»</blockquote>
                  <figcaption>
                    <cite>{voice.name}</cite>
                    <span>{voice.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
