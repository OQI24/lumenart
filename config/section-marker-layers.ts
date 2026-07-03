import type { SectionShapeId } from "@/config/section-shapes";
import type { SectionMotionStyle } from "@/lib/section-marker-motion";
import type { WireframeType } from "@/lib/section-marker-geometry";

export type MarkerLayerConfig = {
  wireframe: WireframeType;
  scale: number;
  opacity: number;
  blur: number;
  offsetX: string;
  offsetY: string;
  baseRotate: number;
};

export type SectionMarkerConfig = {
  motion: SectionMotionStyle;
  intensity: number;
  layers: MarkerLayerConfig[];
};

export const SECTION_MARKER_CONFIG: Record<SectionShapeId, SectionMarkerConfig> = {
  benefits: {
    motion: "orbital",
    intensity: 1.05,
    layers: [
      {
        wireframe: "icosahedron",
        scale: 1,
        opacity: 0.22,
        blur: 1,
        offsetX: "0%",
        offsetY: "0%",
        baseRotate: -18,
      },
      {
        wireframe: "octahedron",
        scale: 0.78,
        opacity: 0.16,
        blur: 2,
        offsetX: "32%",
        offsetY: "14%",
        baseRotate: 28,
      },
      {
        wireframe: "tesseract",
        scale: 0.62,
        opacity: 0.12,
        blur: 3,
        offsetX: "52%",
        offsetY: "38%",
        baseRotate: -12,
      },
      {
        wireframe: "torus",
        scale: 0.48,
        opacity: 0.09,
        blur: 4,
        offsetX: "-24%",
        offsetY: "28%",
        baseRotate: 14,
      },
      {
        wireframe: "tetrahedron",
        scale: 0.36,
        opacity: 0.07,
        blur: 5,
        offsetX: "8%",
        offsetY: "48%",
        baseRotate: -32,
      },
      {
        wireframe: "hopf",
        scale: 0.3,
        opacity: 0.05,
        blur: 6,
        offsetX: "-38%",
        offsetY: "8%",
        baseRotate: 6,
      },
    ],
  },
  styles: {
    motion: "drift",
    intensity: 1.05,
    layers: [
      { wireframe: "torus", scale: 1, opacity: 0.2, blur: 1.5, offsetX: "2%", offsetY: "-4%", baseRotate: 12 },
      { wireframe: "helix", scale: 0.68, opacity: 0.11, blur: 3.5, offsetX: "42%", offsetY: "18%", baseRotate: -22 },
      { wireframe: "hopf", scale: 0.48, opacity: 0.07, blur: 5, offsetX: "-22%", offsetY: "30%", baseRotate: 6 },
    ],
  },
  technologies: {
    motion: "unfold",
    intensity: 1.12,
    layers: [
      {
        wireframe: "tesseract",
        scale: 1,
        opacity: 0.22,
        blur: 1,
        offsetX: "-2%",
        offsetY: "2%",
        baseRotate: -14,
      },
      {
        wireframe: "cell24",
        scale: 0.8,
        opacity: 0.15,
        blur: 2,
        offsetX: "34%",
        offsetY: "18%",
        baseRotate: 22,
      },
      {
        wireframe: "octahedron",
        scale: 0.58,
        opacity: 0.11,
        blur: 3,
        offsetX: "56%",
        offsetY: "42%",
        baseRotate: -8,
      },
      {
        wireframe: "icosahedron",
        scale: 0.46,
        opacity: 0.09,
        blur: 4,
        offsetX: "-20%",
        offsetY: "30%",
        baseRotate: 16,
      },
      {
        wireframe: "stellated",
        scale: 0.38,
        opacity: 0.07,
        blur: 5,
        offsetX: "12%",
        offsetY: "52%",
        baseRotate: -24,
      },
      {
        wireframe: "tetrahedron",
        scale: 0.28,
        opacity: 0.05,
        blur: 6,
        offsetX: "-42%",
        offsetY: "12%",
        baseRotate: 10,
      },
    ],
  },
  process: {
    motion: "ascend",
    intensity: 1,
    layers: [
      { wireframe: "helix", scale: 1, opacity: 0.2, blur: 1.5, offsetX: "0%", offsetY: "0%", baseRotate: 16 },
      { wireframe: "torus", scale: 0.74, opacity: 0.12, blur: 3, offsetX: "40%", offsetY: "20%", baseRotate: -18 },
      { wireframe: "tesseract", scale: 0.5, opacity: 0.07, blur: 5, offsetX: "-20%", offsetY: "28%", baseRotate: 10 },
    ],
  },
  portfolio: {
    motion: "radiate",
    intensity: 1.1,
    layers: [
      {
        wireframe: "stellated",
        scale: 1,
        opacity: 0.22,
        blur: 1,
        offsetX: "0%",
        offsetY: "0%",
        baseRotate: -20,
      },
      {
        wireframe: "icosahedron",
        scale: 0.76,
        opacity: 0.15,
        blur: 2,
        offsetX: "36%",
        offsetY: "16%",
        baseRotate: 26,
      },
      {
        wireframe: "octahedron",
        scale: 0.58,
        opacity: 0.11,
        blur: 3,
        offsetX: "-18%",
        offsetY: "24%",
        baseRotate: -14,
      },
      {
        wireframe: "hopf",
        scale: 0.44,
        opacity: 0.09,
        blur: 4,
        offsetX: "48%",
        offsetY: "40%",
        baseRotate: 8,
      },
      {
        wireframe: "torus",
        scale: 0.34,
        opacity: 0.07,
        blur: 5,
        offsetX: "-36%",
        offsetY: "44%",
        baseRotate: -6,
      },
      {
        wireframe: "tetrahedron",
        scale: 0.26,
        opacity: 0.05,
        blur: 6,
        offsetX: "18%",
        offsetY: "54%",
        baseRotate: 18,
      },
    ],
  },
  testimonials: {
    motion: "contrary",
    intensity: 1,
    layers: [
      { wireframe: "cell24", scale: 1, opacity: 0.2, blur: 1.5, offsetX: "0%", offsetY: "0%", baseRotate: 14 },
      { wireframe: "tesseract", scale: 0.68, opacity: 0.11, blur: 3, offsetX: "38%", offsetY: "20%", baseRotate: -24 },
      { wireframe: "stellated", scale: 0.52, opacity: 0.07, blur: 5, offsetX: "-18%", offsetY: "32%", baseRotate: 8 },
    ],
  },
  contacts: {
    motion: "bloom",
    intensity: 1.08,
    layers: [
      {
        wireframe: "hopf",
        scale: 1,
        opacity: 0.22,
        blur: 1,
        offsetX: "0%",
        offsetY: "0%",
        baseRotate: -12,
      },
      {
        wireframe: "cell24",
        scale: 0.78,
        opacity: 0.15,
        blur: 2,
        offsetX: "38%",
        offsetY: "20%",
        baseRotate: 22,
      },
      {
        wireframe: "helix",
        scale: 0.58,
        opacity: 0.11,
        blur: 3,
        offsetX: "-22%",
        offsetY: "26%",
        baseRotate: -10,
      },
      {
        wireframe: "torus",
        scale: 0.44,
        opacity: 0.09,
        blur: 4,
        offsetX: "50%",
        offsetY: "44%",
        baseRotate: 14,
      },
      {
        wireframe: "octahedron",
        scale: 0.34,
        opacity: 0.07,
        blur: 5,
        offsetX: "-40%",
        offsetY: "10%",
        baseRotate: -18,
      },
      {
        wireframe: "tetrahedron",
        scale: 0.26,
        opacity: 0.05,
        blur: 6,
        offsetX: "6%",
        offsetY: "50%",
        baseRotate: 6,
      },
    ],
  },
};

/** @deprecated используйте SECTION_MARKER_CONFIG */
export const SECTION_MARKER_LAYERS = Object.fromEntries(
  Object.entries(SECTION_MARKER_CONFIG).map(([key, value]) => [key, value.layers])
) as Record<SectionShapeId, MarkerLayerConfig[]>;
