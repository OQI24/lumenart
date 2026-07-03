import type { SectionId } from "@/config/sections";

export type SectionShapeId =
  | "benefits"
  | "styles"
  | "technologies"
  | "process"
  | "portfolio"
  | "testimonials"
  | "contacts";

export const SECTION_SHAPE_BY_ID: Partial<Record<SectionId, SectionShapeId>> = {
  benefits: "benefits",
  styles: "styles",
  technologies: "technologies",
  process: "process",
  portfolio: "portfolio",
  testimonials: "testimonials",
  contacts: "contacts",
};
