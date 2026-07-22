"use client";

import { useEffect, useState } from "react";

const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
] as const;

function formatEntryDate(date: Date): string {
  return `Запись от ${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]}`;
}

/** Client-only date label — avoids SSG/hydration mismatch on static export. */
export default function EntryDate() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatEntryDate(new Date()));
  }, []);

  return (
    <p className="s12-hand s12-hand-ink" suppressHydrationWarning>
      {label ?? "Запись от\u00a0\u00a0\u00a0\u00a0\u00a0"}
    </p>
  );
}
