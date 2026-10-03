import { useState } from "react";
import { Deslizador, Fig, Lectura, Pildora } from "../../../components/ui";
import type { LadoRect } from "../../../components/triangles/TrianguloRectangulo";
import {
  arcoAngulo,
  centroide,
  etiquetaLado,
  marcaRecta,
  proyector,
  triRectangulo,
} from "../../../components/triangles/geometry";
import { atan, cos, fmt, sin, tan } from "../../../lib/trig";
import { EscenarioFrame } from "../EscenarioFrame";

/* ── 1 · Los nombres cambian según el ángulo ──────────────────────────────
   El interactivo de la guía: el triángulo 3-4-5 se queda quieto y lo único
   que cambia son los colores, porque opposite y adjacent se intercambian al
   mirar desde el otro ángulo. La hipotenusa no se mueve nunca. */
export function EscenarioRazonesDesdeAngulo() {
  const [vista, setVista] = useState<"A" | "B">("A");
  const [destacado, setDestacado] = useState<LadoRect | null>(null);

  const desdeA = vista === "A";
  // Geometría fija: cateto horizontal 4, cateto vertical 3, hipotenusa 5.
  // Lo que cambia es qué papel juega cada cateto.
  const opuesto = desdeA ? 3 : 4;
  const adyacente = desdeA ? 4 : 3;
  const hip = 5;

  /** El horizontal (CA) es adjacent desde A y opposite desde B. */
  const papelHorizontal: LadoRect = desdeA ? "adj" : "opp";
  const papelVertical: LadoRect = desdeA ? "opp" : "adj";

  const razones: {
    abbr: string;
    nombre: string;
    formula: string;
    frac: string;
    valor: number;
    resalta: LadoRect;
  }[] = [
    { abbr: "sin", nombre: "seno", formula: "opposite ÷ hypotenuse", frac: `${opuesto}/5`, valor: opuesto / hip, resalta: "opp" },
    { abbr: "cos", nombre: "coseno", formula: "adjacent ÷ hypotenuse", frac: `${adyacente}/5`, valor: adyacente / hip, resalta: "adj" },
    { abbr: "tan", nombre: "tangente", formula: "opposite ÷ adjacent", frac: `${opuesto}/${adyacente}`, valor: opuesto / adyacente, resalta: "opp" },
    { abbr: "csc", nombre: "cosecante", formula: "hypotenuse ÷ opposite", frac: `5/${opuesto}`, valor: hip / opuesto, resalta: "hyp" },
    { abbr: "sec", nombre: "secante", formula: "hypotenuse ÷ adjacent", frac: `5/${adyacente}`, valor: hip / adyacente, resalta: "hyp" },
    { abbr: "cot", nombre: "cotangente", formula: "adjacent ÷ opposite", frac: `${adyacente}/${opuesto}`, valor: adyacente / opuesto, resalta: "adj" },
  ];

  // Dibujo fijo: C abajo a la izquierda (ángulo recto), A abajo a la derecha,
  // B arriba. Solo cambian los colores y dónde va el arco.
  const W = 420;
  const H = 280;
  const { A, B, C } = triRectangulo(4, 3);
  const { p } = proyector([A, B, C], W, H, 50);
  const sA = p(A);
  const sB = p(B);
  const sC = p(C);
  const dentro = centroide([sA, sB, sC]);

  const CLASE: Record<LadoRect, string> = { hyp: "s-hyp", opp: "s-opp", adj: "s-adj" };
  const FILL: Record<LadoRect, string> = { hyp: "f-hyp", opp: "f-opp", adj: "f-adj" };
  const estilo = (papel: LadoRect) => ({
    className: `side ${CLASE[papel]}`,
    style: {
      opacity: destacado && destacado !== papel ? 0.28 : 1,
      strokeWidth: destacado === papel ? 8 : undefined,
      transition: "opacity .2s ease, stroke-width .2s ease, stroke .25s ease",
    },
  });

  const pHoriz = etiquetaLado(sC, sA, dentro, 24);
  const pVert = etiquetaLado(sB, sC, dentro, 26);
  const pHip = etiquetaLado(sA, sB, dentro, 22);
  const vertice = desdeA ? sA : sB;
  const otros: [typeof sA, typeof sA] = desdeA ? [sC, sB] : [sC, sA];

  return (
    <EscenarioFrame
      id="razones-desde-angulo"
      titulo="Los nombres cambian según el ángulo"
      contexto="El triángulo es el mismo 3-4-5 y no se mueve. Lo que cambia al mirar desde el otro ángulo es cuál cateto es el opposite y cuál el adjacent."
      dibujo={
        <Fig pie="Pasa el cursor por las razones de la derecha y mira qué lados usa cada una.">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full"
            role="img"
            aria-label={`Triángulo 3-4-5 visto desde el ángulo ${vista}`}
          >
            <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y}`} className="tri-fill" />

            <line x1={sC.x} y1={sC.y} x2={sA.x} y2={sA.y} {...estilo(papelHorizontal)} />
            <line x1={sB.x} y1={sB.y} x2={sC.x} y2={sC.y} {...estilo(papelVertical)} />
            <line x1={sA.x} y1={sA.y} x2={sB.x} y2={sB.y} {...estilo("hyp")} />

            <path d={marcaRecta(sC, sA, sB, 15)} className="mark" />
            <path d={arcoAngulo(vertice, otros[0], otros[1], 34)} className="arc" />

            {/* Nombres de los vértices */}
            <text x={sC.x - 16} y={sC.y + 20} className="t-sm f-soft">C</text>
            <text x={sA.x + 10} y={sA.y + 20} className={`t-lg ${desdeA ? "" : "f-soft"}`}>A</text>
            <text x={sB.x - 6} y={sB.y - 12} className={`t-lg ${desdeA ? "f-soft" : ""}`}>B</text>

            <text x={pHoriz.x} y={pHoriz.y} textAnchor="middle" className={`t ${FILL[papelHorizontal]} tnum`}>
              {papelHorizontal === "adj" ? "adj" : "opp"} 4
            </text>
            <text
              x={pVert.x}
              y={pVert.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`t ${FILL[papelVertical]} tnum`}
            >
              {papelVertical === "adj" ? "adj" : "opp"} 3
            </text>
            <text x={pHip.x} y={pHip.y} textAnchor="middle" className="t f-hyp tnum">
              hyp 5
            </text>
          </svg>
        </Fig>
      }
      controles={
        <div className="grid gap-2">
          <span className="font-bold">¿Desde cuál ángulo miras?</span>
          <div className="inline-flex self-start overflow-hidden rounded-full border-[1.5px] border-ink">
            {(["A", "B"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVista(v)}
                aria-pressed={vista === v}
                className={`px-4 py-1.5 text-[0.95rem] font-bold transition-colors ${
                  vista === v ? "bg-ink text-card" : "bg-card text-ink"
                }`}
              >
                Mirar desde {v}
              </button>
            ))}
          </div>
          <p className="text-[0.92rem] text-ink-soft">
            El ángulo recto está en C. Mirando desde {vista}, el{" "}
            <Pildora color="var(--opp-ink)" fondo="var(--opp-tint)">
              opposite
            </Pildora>{" "}
            es {opuesto} y el{" "}
            <Pildora color="var(--adj-ink)" fondo="var(--adj-tint)">
              adjacent
            </Pildora>{" "}
            es {adyacente}. La hipotenusa sigue siendo 5.
          </p>
        </div>
      }
      lecturas={
        <div className="col-span-full grid gap-2 sm:grid-cols-2">
          {razones.map((r) => (
            <div
              key={r.abbr}
              onMouseEnter={() => setDestacado(r.resalta)}
              onMouseLeave={() => setDestacado(null)}
              className="rounded-piece border-[1.5px] border-line bg-paper px-3 py-2 transition-colors hover:border-ink"
            >
              <p className="font-display text-[1.15rem] leading-none font-extrabold">
                {r.abbr}
                <span className="ml-1.5 font-body text-[0.72rem] font-bold tracking-[0.08em] text-ink-soft uppercase">
                  {r.nombre}
                </span>
              </p>
              <p className="mt-0.5 text-[0.82rem] text-ink-soft">{r.formula}</p>
              <p className="tnum mt-0.5 font-display text-[1.1rem] font-bold">
                {r.frac} = {fmt(r.valor, 3)}
              </p>
            </div>
          ))}
        </div>
      }
    />
  );
}

/* ── 2 · La pendiente de una rampa ────────────────────────────────────────
   La rampa de la guía: sin compara la subida con el largo de la rampa, y
   tan es la pendiente de verdad (subida por cada metro hacia adelante). */
export function EscenarioRampaPendiente() {
  const [angulo, setAngulo] = useState(37);
  const [largo, setLargo] = useState(5);
  const [destacado, setDestacado] = useState<LadoRect | null>(null);

  const subida = largo * sin(angulo);
  const avance = largo * cos(angulo);

  const W = 430;
  const H = 260;
  // Encuadre fijo al caso más grande, para que el dibujo no salte al mover
  // los controles: lo que cambia es el triángulo, no el zoom.
  const { p } = proyector(
    [
      { x: 0, y: 0 },
      { x: 8, y: 0 },
      { x: 0, y: 5 },
    ],
    W,
    H,
    44,
  );
  const base = p({ x: 0, y: 0 });
  const fin = p({ x: avance, y: 0 });
  const alto = p({ x: avance, y: subida });

  const anchoLinea = (l: LadoRect) => (destacado === l ? 8 : 5);
  const opac = (l: LadoRect) => (destacado && destacado !== l ? 0.3 : 1);

  return (
    <EscenarioFrame
      id="rampa-pendiente"
      titulo="La pendiente de una rampa"
      contexto="Sube la inclinación y mira las tres razones a la vez. tan es la pendiente: cuánto subes por cada metro que avanzas."
      dibujo={
        <Fig pie="Las normas de accesibilidad piden rampas de 5° o menos. Pon el control en 5° y mira qué poco sube.">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Rampa de ${largo} metros a ${angulo} grados`}>
            <line x1={base.x - 14} y1={base.y} x2={W - 14} y2={base.y} className="ground" />
            <polygon
              points={`${base.x},${base.y} ${fin.x},${fin.y} ${alto.x},${alto.y}`}
              className="tri-fill"
            />
            <line
              x1={base.x}
              y1={base.y}
              x2={fin.x}
              y2={fin.y}
              className="side s-adj"
              strokeWidth={anchoLinea("adj")}
              opacity={opac("adj")}
            />
            <line
              x1={fin.x}
              y1={fin.y}
              x2={alto.x}
              y2={alto.y}
              className="side s-opp"
              strokeWidth={anchoLinea("opp")}
              opacity={opac("opp")}
            />
            <line
              x1={base.x}
              y1={base.y}
              x2={alto.x}
              y2={alto.y}
              className="side s-hyp"
              strokeWidth={anchoLinea("hyp")}
              opacity={opac("hyp")}
            />
            <path d={marcaRecta(fin, base, alto, 13)} className="mark" />
            <path d={arcoAngulo(base, fin, alto, 36)} className="arc" />
            <text x={base.x + 46} y={base.y - 12} className="t f-soft tnum">
              {angulo}°
            </text>
            <text x={(base.x + fin.x) / 2} y={base.y + 24} textAnchor="middle" className="t f-adj tnum">
              {fmt(avance, 2)} m
            </text>
            <text x={fin.x + 10} y={(fin.y + alto.y) / 2} dominantBaseline="middle" className="t f-opp tnum">
              {fmt(subida, 2)} m
            </text>
            <text
              x={(base.x + alto.x) / 2 - 10}
              y={(base.y + alto.y) / 2 - 14}
              textAnchor="middle"
              className="t f-hyp tnum"
            >
              {largo} m
            </text>
          </svg>
        </Fig>
      }
      controles={
        <>
          <Deslizador
            etiqueta="Inclinación con el suelo"
            valor={angulo}
            min={2}
            max={45}
            paso={1}
            unidad="°"
            onChange={setAngulo}
          />
          <Deslizador
            etiqueta="Largo de la rampa"
            valor={largo}
            min={2}
            max={8}
            paso={0.5}
            unidad=" m"
            color="var(--hyp)"
            onChange={setLargo}
          />
        </>
      }
      lecturas={
        <>
          <div onMouseEnter={() => setDestacado("opp")} onMouseLeave={() => setDestacado(null)}>
            <Lectura etiqueta="Cuánto sube (opposite)" valor={`${fmt(subida, 2)} m`} color="var(--opp-ink)" />
          </div>
          <div onMouseEnter={() => setDestacado("adj")} onMouseLeave={() => setDestacado(null)}>
            <Lectura etiqueta="Cuánto avanza (adjacent)" valor={`${fmt(avance, 2)} m`} color="var(--adj-ink)" />
          </div>
          <Lectura etiqueta={`sin ${angulo}°`} valor={fmt(sin(angulo), 4)} />
          <Lectura etiqueta={`cos ${angulo}°`} valor={fmt(cos(angulo), 4)} />
          <Lectura etiqueta={`tan ${angulo}° (la pendiente)`} valor={fmt(tan(angulo), 4)} destacado />
          <Lectura
            etiqueta="Comprobación: tan⁻¹(subida ÷ avance)"
            valor={`${fmt(atan(subida / avance), 1)}°`}
          />
        </>
      }
    />
  );
}
