import { useMemo } from "react";
import {
  arcoAngulo,
  centroide,
  etiquetaLado,
  marcaRecta,
  proyector,
  triRectangulo,
} from "./geometry";
import { atan } from "../../lib/trig";

export type LadoRect = "hyp" | "opp" | "adj";

const CLASE_TRAZO: Record<LadoRect, string> = {
  hyp: "s-hyp",
  opp: "s-opp",
  adj: "s-adj",
};
const CLASE_TEXTO: Record<LadoRect, string> = {
  hyp: "f-hyp",
  opp: "f-opp",
  adj: "f-adj",
};

export interface TrianguloRectanguloProps {
  /** Cateto adyacente al ángulo que miramos (valor real, horizontal). */
  adyacente: number;
  /** Cateto opuesto al ángulo que miramos (valor real, vertical). */
  opuesto: number;
  /** Texto de cada lado. Si falta, no se escribe nada en ese lado. */
  etiquetas?: Partial<Record<LadoRect, string>>;
  /** Lado que es la incógnita: se dibuja punteado. */
  desconocido?: LadoRect | null;
  /** Lado resaltado (por ejemplo al pasar el cursor por la leyenda). */
  destacado?: LadoRect | null;
  /** Texto del ángulo en el vértice A (el de abajo a la derecha). */
  anguloTexto?: string;
  /** Dibuja el arco del ángulo que miramos. */
  mostrarAngulo?: boolean;
  /** Pinta los catetos como "legs" azules en vez de opposite/adjacent. */
  modoCatetos?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Triángulo rectángulo dibujado a escala: el ángulo que sale en el dibujo es
 * de verdad atan(opuesto / adyacente). El ángulo recto queda en C (abajo
 * izquierda), el ángulo que miramos en A (abajo derecha).
 */
export function TrianguloRectangulo({
  adyacente,
  opuesto,
  etiquetas = {},
  desconocido = null,
  destacado = null,
  anguloTexto,
  mostrarAngulo = true,
  modoCatetos = false,
  width = 420,
  height = 280,
  className,
}: TrianguloRectanguloProps) {
  const vista = useMemo(() => {
    const { A, B, C } = triRectangulo(Math.max(adyacente, 0.001), Math.max(opuesto, 0.001));
    const { p } = proyector([A, B, C], width, height, 46);
    const sA = p(A);
    const sB = p(B);
    const sC = p(C);
    const dentro = centroide([sA, sB, sC]);
    return { sA, sB, sC, dentro };
  }, [adyacente, opuesto, width, height]);

  const { sA, sB, sC, dentro } = vista;
  const theta = atan(opuesto / Math.max(adyacente, 1e-9));

  const trazo = (lado: LadoRect) => {
    const base = modoCatetos && lado !== "hyp" ? "s-leg" : CLASE_TRAZO[lado];
    const esIncognita = desconocido === lado;
    const atenuado = destacado !== null && destacado !== lado;
    return {
      className: `${esIncognita ? "unk" : `side ${base}`}`,
      style: {
        opacity: atenuado ? 0.3 : 1,
        strokeWidth: destacado === lado ? 8 : undefined,
        transition: "opacity .18s ease, stroke-width .18s ease",
      },
    };
  };

  const texto = (lado: LadoRect) => {
    const base = modoCatetos && lado !== "hyp" ? "f-leg" : CLASE_TEXTO[lado];
    const atenuado = destacado !== null && destacado !== lado;
    return { className: `t ${base}`, style: { opacity: atenuado ? 0.35 : 1 } };
  };

  const pHyp = etiquetaLado(sA, sB, dentro, 20);
  const pOpp = etiquetaLado(sB, sC, dentro, 22);
  const pAdj = etiquetaLado(sC, sA, dentro, 22);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className ?? "block h-auto w-full"}
      role="img"
      aria-label={`Triángulo rectángulo con catetos ${adyacente} y ${opuesto}`}
    >
      <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y}`} className="tri-fill" />

      <line x1={sC.x} y1={sC.y} x2={sA.x} y2={sA.y} {...trazo("adj")} />
      <line x1={sB.x} y1={sB.y} x2={sC.x} y2={sC.y} {...trazo("opp")} />
      <line x1={sA.x} y1={sA.y} x2={sB.x} y2={sB.y} {...trazo("hyp")} />

      {/* Ángulo recto en C */}
      <path d={marcaRecta(sC, sA, sB, 15)} className="mark" />

      {/* Ángulo que miramos, en A */}
      {mostrarAngulo ? (
        <>
          <path d={arcoAngulo(sA, sC, sB, 34)} className="arc" />
          <text
            x={sA.x - 52}
            y={sA.y - 12}
            className="t f-soft tnum"
            textAnchor="middle"
          >
            {anguloTexto ?? `${theta.toFixed(1)}°`}
          </text>
        </>
      ) : null}

      {etiquetas.hyp ? (
        <text x={pHyp.x} y={pHyp.y} textAnchor="middle" {...texto("hyp")}>
          {etiquetas.hyp}
        </text>
      ) : null}
      {etiquetas.opp ? (
        <text x={pOpp.x} y={pOpp.y} textAnchor="middle" dominantBaseline="middle" {...texto("opp")}>
          {etiquetas.opp}
        </text>
      ) : null}
      {etiquetas.adj ? (
        <text x={pAdj.x} y={pAdj.y} textAnchor="middle" {...texto("adj")}>
          {etiquetas.adj}
        </text>
      ) : null}
    </svg>
  );
}

/** Versión chica para el glosario y las tarjetas. */
export function MiniTriangulo({
  adyacente = 4,
  opuesto = 3,
  destacado = null,
}: {
  adyacente?: number;
  opuesto?: number;
  destacado?: LadoRect | null;
}) {
  const { A, B, C } = triRectangulo(adyacente, opuesto);
  const { p } = proyector([A, B, C], 150, 108, 16);
  const sA = p(A);
  const sB = p(B);
  const sC = p(C);
  const dentro = centroide([sA, sB, sC]);
  const w = (l: LadoRect) => (destacado === l ? 6 : 4);
  const o = (l: LadoRect) => (destacado && destacado !== l ? 0.3 : 1);
  return (
    <svg viewBox="0 0 150 108" className="block h-auto w-full max-w-[9rem]" aria-hidden>
      <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y}`} className="tri-fill" />
      <line x1={sC.x} y1={sC.y} x2={sA.x} y2={sA.y} className="side s-adj" strokeWidth={w("adj")} opacity={o("adj")} />
      <line x1={sB.x} y1={sB.y} x2={sC.x} y2={sC.y} className="side s-opp" strokeWidth={w("opp")} opacity={o("opp")} />
      <line x1={sA.x} y1={sA.y} x2={sB.x} y2={sB.y} className="side s-hyp" strokeWidth={w("hyp")} opacity={o("hyp")} />
      <path d={marcaRecta(sC, sA, sB, 10)} className="mark" />
      <path d={arcoAngulo(sA, sC, sB, 20)} className="arc" />
      <circle cx={dentro.x} cy={dentro.y} r={0} />
    </svg>
  );
}
