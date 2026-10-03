/** Trigonometría en grados, como la usa la calculadora en modo DEG. */

export const rad = (deg: number) => (deg * Math.PI) / 180;
export const deg = (r: number) => (r * 180) / Math.PI;

export const sin = (d: number) => Math.sin(rad(d));
export const cos = (d: number) => Math.cos(rad(d));
export const tan = (d: number) => Math.tan(rad(d));
export const asin = (x: number) => deg(Math.asin(x));
export const acos = (x: number) => deg(Math.acos(x));
export const atan = (x: number) => deg(Math.atan(x));

/** Redondea a n decimales y devuelve número (no string). */
export const round = (x: number, n = 2) => {
  const f = 10 ** n;
  return Math.round(x * f) / f;
};

/** Formatea con decimales fijos, usando el punto decimal como la guía. */
export const fmt = (x: number, n = 1) => {
  if (!Number.isFinite(x)) return "—";
  return x.toFixed(n);
};

/** Quita ceros finales: 4.00 → "4", 3.80 → "3.8". */
export const fmtTrim = (x: number, n = 2) => {
  if (!Number.isFinite(x)) return "—";
  return String(Number(x.toFixed(n)));
};

/** Hipotenusa a partir de los dos catetos. */
export const hipotenusa = (a: number, b: number) => Math.hypot(a, b);

/** Cateto que falta, a partir de la hipotenusa y el otro cateto. */
export const cateto = (c: number, b: number) => Math.sqrt(Math.max(c * c - b * b, 0));

/** Ley de los cosenos: tercer lado conocido a, b y el ángulo C entre ellos. */
export const ladoPorCosenos = (a: number, b: number, C: number) =>
  Math.sqrt(a * a + b * b - 2 * a * b * cos(C));

/** Ley de los cosenos en forma de ángulo: C a partir de los tres lados. */
export const anguloPorCosenos = (a: number, b: number, c: number) =>
  acos((a * a + b * b - c * c) / (2 * a * b));

/** Ley de los senos: lado b conocido el par (a, A) y el ángulo B. */
export const ladoPorSenos = (a: number, A: number, B: number) => (a * sin(B)) / sin(A);

/**
 * Lee la respuesta de la estudiante. Acepta coma o punto decimal, espacios,
 * unidades escritas al final ("14 m", "7.2 metros") y el símbolo de grado.
 */
export function parseRespuesta(raw: string): number | null {
  const limpio = raw
    .trim()
    .toLowerCase()
    .replace(/[°º]/g, "")
    .replace(/\s+/g, "")
    .replace(/(metros?|m|cm|km|grados?|deg)$/u, "")
    .replace(",", ".");
  if (limpio === "" || limpio === "-") return null;
  // Fracciones tipo 5/13, que aparecen en el tema de razones.
  const frac = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(limpio);
  if (frac) {
    const d = Number(frac[2]);
    return d === 0 ? null : Number(frac[1]) / d;
  }
  const n = Number(limpio);
  return Number.isFinite(n) ? n : null;
}

/** ¿La respuesta cae dentro de la tolerancia del ejercicio? */
export function esCorrecta(valor: number, esperado: number, tolerancia = 0.05) {
  return Math.abs(valor - esperado) <= tolerancia + 1e-9;
}
