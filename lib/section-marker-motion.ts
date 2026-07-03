import type { MarkerLayerConfig } from "@/config/section-marker-layers";

export type SectionMotionStyle =
  | "orbital"
  | "drift"
  | "unfold"
  | "ascend"
  | "radiate"
  | "contrary"
  | "bloom";

export type LayerTransform = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  skewX: number;
  skewY: number;
};

type MotionContext = {
  progress: number;
  layerIndex: number;
  layer: MarkerLayerConfig;
  intensity: number;
};

function baseScale(layer: MarkerLayerConfig): number {
  return 0.62 + layer.scale * 0.38;
}

/** Орбита — слои описывают круговые траектории вокруг центра */
function orbital({ progress: p, layerIndex: li, layer, intensity: i }: MotionContext): LayerTransform {
  const phase = li * Math.PI * 0.72;
  const angle = p * Math.PI * 0.9 + phase;
  const radius = (130 + li * 55) * i;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.68,
    rotate: layer.baseRotate + p * 24 + (angle * 180) / Math.PI * 0.12,
    scale: baseScale(layer),
    skewX: 0,
    skewY: 0,
  };
}

/** Дрейф — плавный горизонтальный поток с лёгкой синусоидой */
function drift({ progress: p, layerIndex: li, layer, intensity: i }: MotionContext): LayerTransform {
  const phase = li * 1.4;
  const eased = p * Math.abs(p);
  const dir = li === 0 ? 1 : li === 1 ? -0.85 : 0.55;

  return {
    x: eased * (300 + li * 70) * i * dir,
    y: Math.sin(p * Math.PI * 1.35 + phase) * (100 + li * 35) * i,
    rotate: layer.baseRotate + eased * 6 + Math.sin(p * Math.PI * 0.8) * 4,
    scale: baseScale(layer) + Math.sin(p * Math.PI) * 0.035,
    skewX: Math.sin(p * Math.PI * 0.5) * 2,
    skewY: 0,
  };
}

/** Распаковка — 4D-раскрытие: skew, контр-вращение, пульс масштаба */
function unfold({ progress: p, layerIndex: li, layer, intensity: i }: MotionContext): LayerTransform {
  const counter = li % 2 === 0 ? 1 : -1;
  const depth = 1 + p * 0.14 * (li + 1);

  return {
    x: p * (55 + li * 30) * i * counter * 0.6,
    y: -p * (90 + li * 45) * i,
    rotate: layer.baseRotate + p * counter * (28 + li * 8),
    scale: baseScale(layer) * depth,
    skewX: p * counter * (9 + li * 3),
    skewY: -p * (4 + li * 1.5),
  };
}

/** Восхождение — вертикальная спираль, как двойная спираль процесса */
function ascend({ progress: p, layerIndex: li, layer, intensity: i }: MotionContext): LayerTransform {
  const phase = li * Math.PI * 0.55;
  const spiral = p * Math.PI * 2.4 + phase;
  const yAmp = (240 - li * 55) * i;

  return {
    x: Math.sin(spiral) * (125 + li * 55) * i,
    y: p * yAmp,
    rotate: layer.baseRotate + (spiral * 180) / Math.PI * (li % 2 === 0 ? 0.22 : -0.18),
    scale: baseScale(layer) * (1 + Math.cos(spiral) * 0.05),
    skewX: 0,
    skewY: Math.sin(spiral) * 3,
  };
}

/** Излучение — расходящиеся лучи от центра при скролле */
function radiate({ progress: p, layerIndex: li, layer, intensity: i }: MotionContext): LayerTransform {
  const angle = li * 1.15 + 0.4;
  const spread = 0.35 + Math.abs(p) * 0.65;
  const dist = spread * (160 + li * 80) * i;
  const sign = p >= 0 ? 1 : -0.55;

  return {
    x: Math.cos(angle) * dist * sign,
    y: Math.sin(angle) * dist * 0.75 * sign,
    rotate: layer.baseRotate + p * (18 + li * 7),
    scale: baseScale(layer) * (1 + Math.abs(p) * 0.18),
    skewX: 0,
    skewY: 0,
  };
}

/** Контр-движение — слои идут в противоположных направлениях, волновая интерференция */
function contrary({ progress: p, layerIndex: li, layer, intensity: i }: MotionContext): LayerTransform {
  const dir = li % 2 === 0 ? 1 : -1;
  const phase = li * Math.PI * 0.8;
  const wave = Math.sin(p * Math.PI * 1.6 + phase);

  return {
    x: dir * p * (200 + li * 50) * i + wave * 65,
    y: -dir * p * (155 + li * 40) * i + Math.cos(p * Math.PI * 1.1 + phase) * 55,
    rotate: layer.baseRotate + dir * p * (24 + li * 8) + wave * 6,
    scale: baseScale(layer),
    skewX: wave * 4 * dir,
    skewY: 0,
  };
}

/** Расцветание — кольца раскрываются, доминирует масштаб и вращение */
function bloom({ progress: p, layerIndex: li, layer, intensity: i }: MotionContext): LayerTransform {
  const bloomAmount = Math.abs(p);
  const spin = p * (42 + li * 15);
  const phase = li * 0.9;

  return {
    x: Math.sin((spin * Math.PI) / 180 + phase) * bloomAmount * (95 + li * 30),
    y: -bloomAmount * (120 - li * 28) * i * (p >= 0 ? 1 : -0.7),
    rotate: layer.baseRotate + spin,
    scale: baseScale(layer) * (1 + bloomAmount * 0.32),
    skewX: 0,
    skewY: Math.sin(bloomAmount * Math.PI) * 2.5,
  };
}

const MOTION_FN: Record<SectionMotionStyle, (ctx: MotionContext) => LayerTransform> = {
  orbital,
  drift,
  unfold,
  ascend,
  radiate,
  contrary,
  bloom,
};

export function computeMarkerLayerTransform(
  style: SectionMotionStyle,
  ctx: MotionContext
): LayerTransform {
  return MOTION_FN[style](ctx);
}
