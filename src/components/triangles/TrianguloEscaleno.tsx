import { useMemo } from "react";
import {
  arcoAngulo,
  centroide,
  etiquetaLado,
  etiquetaVertice,
  proyector,
  triPorAngulos,
  triPorLados,
  triPorSAS,
  type Pt,
} from "./geometry";
import { anguloPorCosenos } from "../../lib/trig";

export type ParteTri = "a" | "b" | "c";

const TRAZO: Record<ParteTri, string> = { a: "s-pa", b: "s-pb", c: "s-pc" };
const TEXTO: Record<ParteTri, string> = { a: "f-pa", b: "f-pb", c: "f-pc" };

/** Las tres formas de dar un triángulo cualquiera, como en el tema 5. */
export type DefTriangulo =
  | { tipo: "sss"; a: number; b: number; c: number }
  | { tipo: "asa"; A: number; B: number; c: number }
  | { tipo: "sas"; a: number; b: number; C: number };

export interface TrianguloEscalenoProps {
  def: DefTriangulo;
  /** Texto junto a cada lado. Clave = nombre del lado. */
  etiquetas?: Partial<Record<ParteTri, string>>;
  /** Texto junto a cada ángulo. */
  angulos?: Partial<Record<"A" | "B" | "C", string>>;
  /** Lado que es la incógnita: punteado. */
  desconocido?: ParteTri | null;
  destacado?: ParteTri | null;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Triángulo cualquiera a escala. Cada ángulo (mayúscula) y su lado opuesto
 * (minúscula) comparten color: A y a azul, B y b morado, C y c verde.
 */
export function TrianguloEscaleno({
  def,
  etiquetas = {},
  angulos = {},
  desconocido = null,
  destacado = null,
  width = 440,
  height = 290,
  className,
}: TrianguloEscalenoProps) {
  const vista = useMemo(() => {
    let tri: { A: Pt; B: Pt; C: Pt };
    if (def.tipo === "sss") tri = triPorLados(def.a, def.b, def.c);
    else if (def.tipo === "asa") tri = triPorAngulos(def.A, def.B, def.c);
    else tri = triPorSAS(def.a, def.b, def.C);

    const { p } = proyector([tri.A, tri.B, tri.C], width, height, 48);
    const A = p(tri.A);
    const B = p(tri.B);
    const C = p(tri.C);
    const dentro = centroide([A, B, C]);

    // Longitudes reales, para poder mostrar los grados exactos si se piden.
    const la = Math.hypot(tri.B.x - tri.C.x, tri.B.y - tri.C.y);
    const lb = Math.hypot(tri.A.x - tri.C.x, tri.A.y - tri.C.y);
    const lc = Math.hypot(tri.A.x - tri.B.x, tri.A.y - tri.B.y);
    const gA = anguloPorCosenos(lb, lc, la);
    const gB = anguloPorCosenos(la, lc, lb);
    const gC = 180 - gA - gB;
    return { A, B, C, dentro, gA, gB, gC };
  }, [def, width, height]);

  const { A, B, C, dentro, gA, gB, gC } = vista;

  const trazo = (l: ParteTri) => {
    const atenuado = destacado !== null && destacado !== l;
    return {
      className: desconocido === l ? "unk" : `side ${TRAZO[l]}`,
      style: {
        opacity: atenuado ? 0.3 : 1,
        strokeWidth: destacado === l ? 8 : undefined,
        transition: "opacity .18s ease, stroke-width .18s ease",
      },
    };
  };
  const texto = (l: ParteTri) => ({
    className: `t ${TEXTO[l]} tnum`,
    style: { opacity: destacado !== null && destacado !== l ? 0.35 : 1 },
  });

  const pa = etiquetaLado(B, C, dentro, 22);
  const pb = etiquetaLado(A, C, dentro, 22);
  const pc = etiquetaLado(A, B, dentro, 22);
  const vA = etiquetaVertice(A, dentro, 20);
  const vB = etiquetaVertice(B, dentro, 20);
  const vC = etiquetaVertice(C, dentro, 20);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className ?? "block h-auto w-full"}
      role="img"
      aria-label="Triángulo con sus tres lados y sus tres ángulos"
    >
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} className="tri-fill" />

      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} {...trazo("a")} />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} {...trazo("b")} />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} {...trazo("c")} />

      <path d={arcoAngulo(A, B, C, 30)} className="arc" />
      <path d={arcoAngulo(B, C, A, 30)} className="arc" />
      <path d={arcoAngulo(C, A, B, 30)} className="arc" />

      <text x={vA.x} y={vA.y} textAnchor="middle" dominantBaseline="middle" className="t-lg f-pa tnum">
        {angulos.A ?? `A ${gA.toFixed(0)}°`}
      </text>
      <text x={vB.x} y={vB.y} textAnchor="middle" dominantBaseline="middle" className="t-lg f-pb tnum">
        {angulos.B ?? `B ${gB.toFixed(0)}°`}
      </text>
      <text x={vC.x} y={vC.y} textAnchor="middle" dominantBaseline="middle" className="t-lg f-pc tnum">
        {angulos.C ?? `C ${gC.toFixed(0)}°`}
      </text>

      {etiquetas.a ? (
        <text x={pa.x} y={pa.y} textAnchor="middle" dominantBaseline="middle" {...texto("a")}>
          {etiquetas.a}
        </text>
      ) : null}
      {etiquetas.b ? (
        <text x={pb.x} y={pb.y} textAnchor="middle" dominantBaseline="middle" {...texto("b")}>
          {etiquetas.b}
        </text>
      ) : null}
      {etiquetas.c ? (
        <text x={pc.x} y={pc.y} textAnchor="middle" dominantBaseline="middle" {...texto("c")}>
          {etiquetas.c}
        </text>
      ) : null}
    </svg>
  );
}
