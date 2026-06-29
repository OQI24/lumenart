export const sections = [
  { id: "hero", label: "Главная" },
  { id: "about", label: "О нас" },
  { id: "benefits", label: "Преимущества" },
  { id: "styles", label: "Стили" },
  { id: "technologies", label: "Технологии" },
  { id: "process", label: "Процесс" },
  { id: "portfolio", label: "Проекты" },
  { id: "testimonials", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
