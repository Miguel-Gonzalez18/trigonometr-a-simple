/**
 * Utilidades para dibujar triángulos a escala real.
 * Trabajamos en coordenadas matemáticas (y hacia arriba) y al final las
 * proyectamos al viewBox del SVG (y hacia abajo). Así los ángulos y las
 * proporciones del dibujo son los de verdad: nada es decorativo.
 */
import { cos, rad, sin } from "../../lib/trig";

export type Pt = { x: number; y: number };

export const sub = (a: Pt, b: Pt): Pt => ({ x: a.x - b.x, y: a.y - b.y });
export const add = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y });
export const mul = (a: Pt, k: number): Pt => ({ x: a.x * k, y: a.y * k });
export const len = (a: Pt) => Math.hypot(a.x, a.y);
export const norm = (a: Pt): Pt => {
  const l = len(a) || 1;
  return { x: a.x / l, y: a.y / l };
};
export const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
export const centroide = (pts: Pt[]): Pt => ({
  x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
  y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
});

/**
 * Proyector: escala uniforme para que todos los puntos entren en el viewBox
 * con un margen. Uniforme = el triángulo no se deforma.
 */
export function proyector(pts: Pt[], w: number, h: number, pad = 44) {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const anchoReal = Math.max(maxX - minX, 1e-6);
  const altoReal = Math.max(maxY - minY, 1e-6);
  const k = Math.min((w - 2 * pad) / anchoReal, (h - 2 * pad) / altoReal);
  const offX = (w - anchoReal * k) / 2;
  const offY = (h - altoReal * k) / 2;
  return {
    k,
    /** Coordenada matemática → coordenada del SVG. */
    p: (pt: Pt): Pt => ({
      x: offX + (pt.x - minX) * k,
      y: h - offY - (pt.y - minY) * k,
    }),
  };
}

/** Triángulo rectángulo con el ángulo recto en el origen. */
export function triRectangulo(adyacente: number, opuesto: number) {
  const C: Pt = { x: 0, y: 0 }; // ángulo recto
  const A: Pt = { x: adyacente, y: 0 }; // vértice del ángulo que miramos
  const B: Pt = { x: 0, y: opuesto };
  return { A, B, C };
}

/**
 * Triángulo cualquiera a partir de sus tres lados (SSS).
 * a = lado opuesto a A, b = opuesto a B, c = opuesto a C.
 * Colocamos A en el origen y B sobre el eje x, a distancia c.
 */
export function triPorLados(a: number, b: number, c: number) {
  const A: Pt = { x: 0, y: 0 };
  const B: Pt = { x: c, y: 0 };
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const ang = Math.acos(Math.min(1, Math.max(-1, cosA)));
  const C: Pt = { x: b * Math.cos(ang), y: b * Math.sin(ang) };
  return { A, B, C };
}

/**
 * Triángulo cualquiera a partir de dos ángulos y el lado entre ellos (ASA).
 * A y B en grados, c = lado AB.
 */
export function triPorAngulos(A: number, B: number, c: number) {
  const pA: Pt = { x: 0, y: 0 };
  const pB: Pt = { x: c, y: 0 };
  const C = 180 - A - B;
  const b = (c * sin(B)) / sin(C); // lado AC
  const pC: Pt = { x: b * cos(A), y: b * sin(A) };
  return { A: pA, B: pB, C: pC };
}

/** Triángulo con dos lados y el ángulo entre ellos (SAS): a, b y C. */
export function triPorSAS(a: number, b: number, C: number) {
  const pC: Pt = { x: 0, y: 0 };
  const pB: Pt = { x: a, y: 0 }; // CB = a
  const pA: Pt = { x: b * cos(C), y: b * sin(C) }; // CA = b
  return { A: pA, B: pB, C: pC };
}

/** Arco del ángulo en el vértice v, entre las direcciones a v→p1 y v→p2. */
export function arcoAngulo(v: Pt, p1: Pt, p2: Pt, r: number) {
  const u1 = norm(sub(p1, v));
  const u2 = norm(sub(p2, v));
  const q1 = add(v, mul(u1, r));
  const q2 = add(v, mul(u2, r));
  const cruz = u1.x * u2.y - u1.y * u2.x;
  // En el SVG la y va al revés, así que el barrido se invierte.
  const sweep = cruz > 0 ? 0 : 1;
  return `M ${q1.x.toFixed(2)} ${q1.y.toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${q2.x.toFixed(2)} ${q2.y.toFixed(2)}`;
}

/** Cuadradito del ángulo recto en el vértice v. */
export function marcaRecta(v: Pt, p1: Pt, p2: Pt, s = 14) {
  const u1 = mul(norm(sub(p1, v)), s);
  const u2 = mul(norm(sub(p2, v)), s);
  const a = add(v, u1);
  const b = add(add(v, u1), u2);
  const c = add(v, u2);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L ${b.x.toFixed(2)} ${b.y.toFixed(2)} L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`;
}

/**
 * Punto para la etiqueta de un lado: el punto medio desplazado hacia fuera
 * del triángulo, para que el texto no se monte sobre el trazo.
 */
export function etiquetaLado(p1: Pt, p2: Pt, interior: Pt, d = 20): Pt {
  const m = mid(p1, p2);
  const fuera = norm(sub(m, interior));
  return add(m, mul(fuera, d));
}

/** Punto para la etiqueta de un vértice, desplazado hacia fuera. */
export function etiquetaVertice(v: Pt, interior: Pt, d = 22): Pt {
  return add(v, mul(norm(sub(v, interior)), d));
}

/** Dirección de v a p, en grados del SVG (para rotar textos si hace falta). */
export function anguloGrados(v: Pt, p: Pt) {
  return (Math.atan2(p.y - v.y, p.x - v.x) * 180) / Math.PI;
}

/** Punto sobre una circunferencia, en coordenadas matemáticas. */
export function enCirculo(centro: Pt, r: number, gradosDesdeX: number): Pt {
  return { x: centro.x + r * Math.cos(rad(gradosDesdeX)), y: centro.y + r * Math.sin(rad(gradosDesdeX)) };
}
