// Isometric projection helpers for the NICS "chemical safety world" SVG.
// World units: x runs to the lower right, y to the lower left, z is height.

const C = Math.cos(Math.PI / 6); // 0.866
const S = 0.5;
const r1 = (n: number) => Math.round(n * 10) / 10;

export type Pt = [number, number];

export function iso(x: number, y: number, z = 0): Pt {
  return [r1((x - y) * C), r1((x + y) * S - z)];
}

const pt = ([x, y]: Pt) => `${x} ${y}`;

export function poly(points: Pt[], close = true) {
  return `M${points.map(pt).join("L")}${close ? "Z" : ""}`;
}

/** Polyline through world points. */
export function line(points: [number, number, number?][]) {
  return poly(points.map(([x, y, z = 0]) => iso(x, y, z)), false);
}

/** Flat rectangle on the ground (or at height z). */
export function rect(x0: number, y0: number, x1: number, y1: number, z = 0) {
  return poly([iso(x0, y0, z), iso(x1, y0, z), iso(x1, y1, z), iso(x0, y1, z)]);
}

export type BoxFaces = { top: string; left: string; right: string; edge: string };

/** Box with its three visible faces: top, the y = y1 face (left) and the x = x1 face (right). */
export function box(x0: number, y0: number, x1: number, y1: number, h: number, z = 0): BoxFaces {
  const t = z + h;
  return {
    top: rect(x0, y0, x1, y1, t),
    left: poly([iso(x0, y1, z), iso(x1, y1, z), iso(x1, y1, t), iso(x0, y1, t)]),
    right: poly([iso(x1, y0, z), iso(x1, y1, z), iso(x1, y1, t), iso(x1, y0, t)]),
    edge:
      poly([iso(x0, y1, z), iso(x1, y1, z), iso(x1, y0, z), iso(x1, y0, t), iso(x0, y0, t), iso(x0, y1, t)]) +
      poly([iso(x0, y1, t), iso(x1, y1, t), iso(x1, y0, t)], false) +
      poly([iso(x1, y1, z), iso(x1, y1, t)], false),
  };
}

/** Gable roof prism on top of a box, ridge running along x. */
export function roof(x0: number, y0: number, x1: number, y1: number, z: number, rise: number) {
  const ym = (y0 + y1) / 2;
  return {
    // The far slope shows too while the pitch stays under 45°.
    back: poly([iso(x0, y0, z), iso(x1, y0, z), iso(x1, ym, z + rise), iso(x0, ym, z + rise)]),
    slope: poly([iso(x0, y1, z), iso(x1, y1, z), iso(x1, ym, z + rise), iso(x0, ym, z + rise)]),
    gable: poly([iso(x1, y0, z), iso(x1, y1, z), iso(x1, ym, z + rise)]),
    edge: poly([iso(x0, y1, z), iso(x1, y1, z), iso(x1, y0, z), iso(x1, ym, z + rise), iso(x0, ym, z + rise)]) +
      poly([iso(x1, y1, z), iso(x1, ym, z + rise)], false),
  };
}

const RX = Math.SQRT2 * C; // projected radius factors of a ground circle
const RY = Math.SQRT2 * S;

/** Ellipse of a horizontal circle (centre in world coords). */
export function disc(cx: number, cy: number, r: number, z = 0) {
  const [x, y] = iso(cx, cy, z);
  return { cx: x, cy: y, rx: r1(r * RX), ry: r1(r * RY) };
}

/** Vertical cylinder: side silhouette, top ellipse and outline. */
export function cyl(cx: number, cy: number, r: number, h: number, z = 0) {
  const b = disc(cx, cy, r, z);
  const t = disc(cx, cy, r, z + h);
  const side =
    `M${b.cx - b.rx} ${t.cy}L${b.cx - b.rx} ${b.cy}` +
    `A${b.rx} ${b.ry} 0 0 0 ${b.cx + b.rx} ${b.cy}L${b.cx + b.rx} ${t.cy}` +
    `A${t.rx} ${t.ry} 0 0 1 ${b.cx - b.rx} ${t.cy}Z`;
  return { side, top: t, base: b };
}

/**
 * Camera transform that brings world point (x, y, z) to the view point at the given zoom.
 * The .cam group pivots on (ox, oy) — the user-space origin (0, 0) with
 * `transform-origin: 0 0`, measured via getScreenCTM — so p' = o + s·(p − o) + t.
 */
export function camera(
  view: { cx: number; cy: number; ox: number; oy: number },
  x: number,
  y: number,
  z: number,
  scale: number,
): [number, number, number] {
  const [sx, sy] = iso(x, y, z);
  return [
    r1(view.cx - view.ox - scale * (sx - view.ox)),
    r1(view.cy - view.oy - scale * (sy - view.oy)),
    scale,
  ];
}
