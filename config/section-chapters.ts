import type { SectionId } from "@/config/sections";
import type { SectionShapeId } from "@/config/section-shapes";

/** Маркеры чередуются: нечётные контент-слайды (1, 3, 5, 7) — с фигурами, чётные — только подпись */
export const SECTION_CHAPTERS: Partial<
  Record<SectionId, { label: string; shape?: SectionShapeId }>
> = {
  benefits: { label: "Преимущества", shape: "benefits" },
  styles: { label: "Стили" },
  technologies: { label: "Технологии", shape: "technologies" },
  process: { label: "Процесс" },
  portfolio: { label: "Проекты", shape: "portfolio" },
  testimonials: { label: "Отзывы" },
  contacts: { label: "Контакты", shape: "contacts" },
};

export function sectionHasMarker(sectionId: SectionId): boolean {
  return Boolean(SECTION_CHAPTERS[sectionId]?.shape);
}
