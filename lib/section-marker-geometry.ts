import type { SectionShapeId } from "@/config/section-shapes";

export type LineSegment = [number, number, number, number];

type Point3 = [number, number, number];

function project3D(
  [x, y, z]: Point3,
  scale: number,
  cx: number,
  cy: number
): [number, number] {
  return [cx + (x - z * 0.58) * scale, cy + (y + z * 0.38) * scale];
}

function project4D(
  x: number,
  y: number,
  z: number,
  w: number,
  scale: number,
  cx: number,
  cy: number
): [number, number] {
  const depth = 1.65 - w * 0.38;
  return project3D([x / depth, y / depth, z / depth], scale, cx, cy);
}

function uniqueEdges(pairs: [number, number][]): [number, number][] {
  const seen = new Set<string>();
  return pairs.filter(([a, b]) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function linesFromEdges(
  vertices: [number, number][],
  edges: [number, number][]
): LineSegment[] {
  return edges.map(([a, b]) => {
    const [x1, y1] = vertices[a];
    const [x2, y2] = vertices[b];
    return [x1, y1, x2, y2];
  });
}

/** Икосаэдр — 12 вершин, 30 рёбер */
export function icosahedronWireframe(cx = 100, cy = 100, scale = 34): LineSegment[] {
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw: Point3[] = [
    [-1, phi, 0],
    [1, phi, 0],
    [-1, -phi, 0],
    [1, -phi, 0],
    [0, -1, phi],
    [0, 1, phi],
    [0, -1, -phi],
    [0, 1, -phi],
    [phi, 0, -1],
    [phi, 0, 1],
    [-phi, 0, -1],
    [-phi, 0, 1],
  ];
  const vertices = raw.map((p) => project3D(p, scale, cx, cy));
  const edges = uniqueEdges([
    [0, 1],
    [0, 5],
    [0, 7],
    [0, 10],
    [0, 11],
    [1, 5],
    [1, 7],
    [1, 8],
    [1, 9],
    [2, 3],
    [2, 4],
    [2, 6],
    [2, 10],
    [2, 11],
    [3, 4],
    [3, 6],
    [3, 8],
    [3, 9],
    [4, 5],
    [4, 9],
    [4, 10],
    [5, 9],
    [5, 11],
    [6, 7],
    [6, 8],
    [6, 10],
    [7, 8],
    [7, 11],
    [8, 9],
  ]);
  return linesFromEdges(vertices, edges);
}

/** Октаэдр — 6 вершин, 12 рёбер */
export function octahedronWireframe(cx = 100, cy = 100, scale = 40): LineSegment[] {
  const raw: Point3[] = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  const vertices = raw.map((p) => project3D(p, scale, cx, cy));
  const edges: [number, number][] = [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [2, 5],
    [3, 4],
    [3, 5],
  ];
  return linesFromEdges(vertices, edges);
}

/** Тетраэдр — 4 вершины, 6 рёбер */
export function tetrahedronWireframe(cx = 100, cy = 100, scale = 44): LineSegment[] {
  const raw: Point3[] = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ];
  const vertices = raw.map((p) => project3D(p, scale, cx, cy));
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  return linesFromEdges(vertices, edges);
}

/** Тессеракт — проекция 4D-гиперкуба */
export function tesseractWireframe(cx = 100, cy = 100, scale = 30): LineSegment[] {
  const vertices: [number, number][] = [];
  for (let i = 0; i < 16; i += 1) {
    const x = i & 1 ? 1 : -1;
    const y = i & 2 ? 1 : -1;
    const z = i & 4 ? 1 : -1;
    const w = i & 8 ? 1 : -1;
    vertices.push(project4D(x, y, z, w, scale, cx, cy));
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < 16; i += 1) {
    for (let j = i + 1; j < 16; j += 1) {
      const hamming =
        ((i ^ j) & 1) + ((i ^ j) & 2) + ((i ^ j) & 4) + ((i ^ j) & 8);
      if (hamming === 1) edges.push([i, j]);
    }
  }
  return linesFromEdges(vertices, edges);
}

/** Тор — параметрическая сетка */
export function torusWireframe(
  cx = 100,
  cy = 100,
  major = 0.62,
  minor = 0.24,
  uSteps = 14,
  vSteps = 8
): LineSegment[] {
  const lines: LineSegment[] = [];
  const scale = 52;

  const pointAt = (u: number, v: number): Point3 => {
    const cu = Math.cos(u);
    const su = Math.sin(u);
    const cv = Math.cos(v);
    const sv = Math.sin(v);
    const R = major + minor * cv;
    return [R * cu, R * su, minor * sv];
  };

  for (let ui = 0; ui < uSteps; ui += 1) {
    const u0 = (ui / uSteps) * Math.PI * 2;
    const u1 = ((ui + 1) / uSteps) * Math.PI * 2;
    for (let vi = 0; vi < vSteps; vi += 1) {
      const v0 = (vi / vSteps) * Math.PI * 2;
      const v1 = ((vi + 1) / vSteps) * Math.PI * 2;
      const a = project3D(pointAt(u0, v0), scale, cx, cy);
      const b = project3D(pointAt(u1, v0), scale, cx, cy);
      const c = project3D(pointAt(u0, v1), scale, cx, cy);
      lines.push([a[0], a[1], b[0], b[1]]);
      lines.push([a[0], a[1], c[0], c[1]]);
    }
  }
  return lines;
}

/** Двойная спираль */
export function helixWireframe(cx = 100, cy = 100): LineSegment[] {
  const lines: LineSegment[] = [];
  const scale = 42;
  const turns = 2.4;
  const steps = 48;

  const pointAt = (t: number, phase: number): Point3 => {
    const angle = t * Math.PI * 2 * turns + phase;
    const radius = 0.35 + t * 0.18;
    const y = (t - 0.5) * 1.35;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
  };

  for (let strand = 0; strand < 2; strand += 1) {
    const phase = strand * Math.PI;
    for (let i = 0; i < steps; i += 1) {
      const t0 = i / steps;
      const t1 = (i + 1) / steps;
      const a = project3D(pointAt(t0, phase), scale, cx, cy);
      const b = project3D(pointAt(t1, phase), scale, cx, cy);
      lines.push([a[0], a[1], b[0], b[1]]);
    }
  }

  for (let i = 0; i < 10; i += 1) {
    const t = i / 9;
    const a = project3D(pointAt(t, 0), scale, cx, cy);
    const b = project3D(pointAt(t, Math.PI), scale, cx, cy);
    lines.push([a[0], a[1], b[0], b[1]]);
  }
  return lines;
}

/** Звёздчатый октаэдр (stellated) */
export function stellatedWireframe(cx = 100, cy = 100, scale = 38): LineSegment[] {
  const tetraA: Point3[] = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ];
  const tetraB: Point3[] = tetraA.map(([x, y, z]) => [-x, -y, -z] as Point3);
  const verts = [...tetraA, ...tetraB].map((p) => project3D(p, scale * 0.55, cx, cy));

  const tetraEdges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  const lines: LineSegment[] = [];
  for (const offset of [0, 4]) {
    lines.push(...linesFromEdges(verts, tetraEdges.map(([a, b]) => [a + offset, b + offset])));
  }
  for (let i = 0; i < 4; i += 1) {
    lines.push([verts[i][0], verts[i][1], verts[i + 4][0], verts[i + 4][1]]);
  }

  const spikes: Point3[] = [
    [0, 1.55, 0],
    [1.55, 0, 0],
    [0, 0, 1.55],
    [-1.55, 0, 0],
    [0, 0, -1.55],
    [0, -1.55, 0],
  ];
  const spikeVerts = spikes.map((p) => project3D(p, scale * 0.55, cx, cy));
  spikeVerts.forEach((spike, i) => {
    const base = verts[i % 4];
    lines.push([spike[0], spike[1], base[0], base[1]]);
  });
  return lines;
}

/** Вложенные 4D-кольца (аналог Hopf fibration) */
export function hopfRingsWireframe(cx = 100, cy = 100): LineSegment[] {
  const lines: LineSegment[] = [];
  const scale = 44;
  const rings = 7;
  const segments = 40;

  for (let r = 0; r < rings; r += 1) {
    const tilt = (r / rings) * Math.PI;
    const ringRadius = 0.42 + (r % 3) * 0.07;
    const phase = r * 0.9;
    for (let i = 0; i < segments; i += 1) {
      const a0 = (i / segments) * Math.PI * 2;
      const a1 = ((i + 1) / segments) * Math.PI * 2;
      const p0: Point3 = [
        Math.cos(a0 + phase) * ringRadius,
        Math.sin(tilt) * Math.sin(a0) * 0.55,
        Math.sin(a0 + phase) * ringRadius,
      ];
      const p1: Point3 = [
        Math.cos(a1 + phase) * ringRadius,
        Math.sin(tilt) * Math.sin(a1) * 0.55,
        Math.sin(a1 + phase) * ringRadius,
      ];
      const A = project3D(p0, scale, cx, cy);
      const B = project3D(p1, scale, cx, cy);
      lines.push([A[0], A[1], B[0], B[1]]);
    }
  }
  return lines;
}

/** 24-ячейка — упрощённая проекция сложного 4D-многогранника */
export function cell24Wireframe(cx = 100, cy = 100, scale = 28): LineSegment[] {
  const inner = tesseractWireframe(cx, cy, scale * 0.72);
  const outer = tesseractWireframe(cx, cy, scale * 1.08);
  const cross: LineSegment[] = [];
  const offsets = [
    [-12, -8],
    [12, -6],
    [-10, 10],
    [11, 9],
    [-6, 0],
    [8, 2],
    [0, -11],
    [2, 12],
  ];
  offsets.forEach(([ox, oy], i) => {
    const innerLine = inner[i * 2] ?? inner[0];
    const outerLine = outer[i * 3] ?? outer[1];
    cross.push([
      innerLine[0] + ox * 0.15,
      innerLine[1] + oy * 0.15,
      outerLine[0],
      outerLine[1],
    ]);
  });
  return [...inner, ...outer, ...cross];
}

export type WireframeType =
  | "icosahedron"
  | "octahedron"
  | "tetrahedron"
  | "torus"
  | "tesseract"
  | "helix"
  | "stellated"
  | "cell24"
  | "hopf";

export type MarkerWireframe = {
  lines: LineSegment[];
  accentLines?: LineSegment[];
};

export function getMarkerWireframeByType(type: WireframeType): MarkerWireframe {
  switch (type) {
    case "icosahedron":
      return { lines: icosahedronWireframe() };
    case "octahedron":
      return { lines: octahedronWireframe() };
    case "tetrahedron":
      return { lines: tetrahedronWireframe() };
    case "torus":
      return { lines: torusWireframe() };
    case "tesseract":
      return { lines: tesseractWireframe() };
    case "helix":
      return { lines: helixWireframe() };
    case "stellated":
      return { lines: stellatedWireframe() };
    case "cell24":
      return { lines: cell24Wireframe() };
    case "hopf":
      return { lines: hopfRingsWireframe() };
    default:
      return { lines: tesseractWireframe() };
  }
}

export function getMarkerWireframe(id: SectionShapeId): MarkerWireframe {
  switch (id) {
    case "benefits":
      return getMarkerWireframeByType("icosahedron");
    case "styles":
      return getMarkerWireframeByType("torus");
    case "technologies":
      return getMarkerWireframeByType("tesseract");
    case "process":
      return getMarkerWireframeByType("helix");
    case "portfolio":
      return getMarkerWireframeByType("stellated");
    case "testimonials":
      return getMarkerWireframeByType("cell24");
    case "contacts":
      return getMarkerWireframeByType("hopf");
    default:
      return getMarkerWireframeByType("tesseract");
  }
}
