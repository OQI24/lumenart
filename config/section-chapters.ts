import type { SectionId } from "@/config/sections";

export const SECTION_CHAPTERS: Partial<
  Record<SectionId, { number: number; label: string }>
> = {
  benefits: { number: 1, label: "Преимущества" },
  styles: { number: 2, label: "Стили" },
  technologies: { number: 3, label: "Технологии" },
  process: { number: 4, label: "Процесс" },
  portfolio: { number: 5, label: "Проекты" },
  testimonials: { number: 6, label: "Отзывы" },
  contacts: { number: 7, label: "Контакты" },
};
