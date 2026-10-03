import { useState } from "react";
import { Deslizador, Ecuacion, Fig, Lectura } from "../../../components/ui";
import { arcoAngulo, marcaRecta, proyector } from "../../../components/triangles/geometry";
import { cos, fmt, sin, tan } from "../../../lib/trig";
import { EscenarioFrame } from "../EscenarioFrame";

/* ── 1 · El triángulo de hipotenusa 1 ─────────────────────────────────────
   El interactivo de la guía: con hipotenusa 1, los catetos valen justo
   sin θ y cos θ, así que sin²θ + cos²θ = 1 es Pitágoras otra vez. */
export function EscenarioCirculoUnitario() {
  const [angulo, setAngulo] = useState(40);
  const s = sin(angulo);
  const c = cos(angulo);

  const W = 400;
  const H = 300;
  // Escala fija: el radio siempre mide lo mismo en pantalla, porque la
  // hipotenusa es 1 para cualquier ángulo.
  const { p } = proyector(
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ],
    W,
    H,
    46,
  );
  const O = p({ x: 0, y: 0 });
  const P = p({ x: c, y: s });
  const Q = p({ x: c, y: 0 });
  const radio = Math.abs(p({ x: 1, y: 0 }).x - O.x);

  return (
    <EscenarioFrame
      id="circulo-unitario"
      titulo="Por qué sin²θ + cos²θ siempre da 1"
      contexto="Si la hipotenusa mide 1, entonces sin θ y cos θ son directamente los dos catetos. Mueve el ángulo: la suma de abajo no se mueve."
      dibujo={
        <Fig pie="La hipotenusa es el radio y mide 1. Los catetos son cos θ (horizontal) y sin θ (vertical).">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Triángulo de hipotenusa 1 con ángulo de ${angulo} grados`}>
            <path
              d={`M ${O.x + radio} ${O.y} A ${radio} ${radio} 0 0 0 ${O.x} ${O.y - radio}`}
              fill="none"
              stroke="var(--line)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <polygon points={`${O.x},${O.y} ${Q.x},${Q.y} ${P.x},${P.y}`} className="tri-fill" />
            <line x1={O.x} y1={O.y} x2={Q.x} y2={Q.y} className="side s-adj" />
            <line x1={Q.x} y1={Q.y} x2={P.x} y2={P.y} className="side s-opp" />
            <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} className="side s-hyp" />
            <path d={marcaRecta(Q, O, P, 13)} className="mark" />
            <path d={arcoAngulo(O, Q, P, 34)} className="arc" />
            <text x={O.x + 42} y={O.y - 14} className="t f-soft tnum">
              θ = {angulo}°
            </text>
            <text x={(O.x + Q.x) / 2} y={O.y + 24} textAnchor="middle" className="t f-adj tnum">
              cos θ = {fmt(c, 3)}
            </text>
            <text x={Q.x + 10} y={(Q.y + P.y) / 2} dominantBaseline="middle" className="t f-opp tnum">
              sin θ = {fmt(s, 3)}
            </text>
            <text x={(O.x + P.x) / 2 - 24} y={(O.y + P.y) / 2 - 10} textAnchor="end" className="t f-hyp">
              1
            </text>
          </svg>
        </Fig>
      }
      controles={
        <Deslizador etiqueta="Ángulo θ" valor={angulo} min={5} max={85} paso={1} unidad="°" onChange={setAngulo} />
      }
      lecturas={
        <>
          <Lectura etiqueta="sin θ" valor={fmt(s, 3)} color="var(--opp-ink)" />
          <Lectura etiqueta="cos θ" valor={fmt(c, 3)} color="var(--adj-ink)" />
          <Lectura etiqueta="sin²θ" valor={fmt(s * s, 3)} color="var(--opp-ink)" />
          <Lectura etiqueta="cos²θ" valor={fmt(c * c, 3)} color="var(--adj-ink)" />
          <div className="sm:col-span-2">
            <Lectura etiqueta="sin²θ + cos²θ" valor={fmt(s * s + c * c, 3)} destacado />
          </div>
        </>
      }
      cierre={
        <Ecuacion>
          {fmt(s, 3)}² + {fmt(c, 3)}² = {fmt(s * s, 3)} + {fmt(c * c, 3)} = {fmt(s * s + c * c, 3)}
        </Ecuacion>
      }
    />
  );
}

/* ── 2 · Comprobar una identidad con números ──────────────────────────────
   Una identidad vale para cualquier ángulo. Esto no sustituye la
   demostración, pero sirve para revisar si te equivocaste. */
type Identidad = {
  id: string;
  izq: string;
  der: string;
  f: (t: number) => number;
  g: (t: number) => number;
};

const IDENTIDADES: Identidad[] = [
  {
    id: "pitagorica",
    izq: "sin²θ + cos²θ",
    der: "1",
    f: (t) => sin(t) ** 2 + cos(t) ** 2,
    g: () => 1,
  },
  {
    id: "cociente",
    izq: "sin θ ÷ cos θ",
    der: "tan θ",
    f: (t) => sin(t) / cos(t),
    g: (t) => tan(t),
  },
  {
    id: "producto",
    izq: "tan θ · cos θ",
    der: "sin θ",
    f: (t) => tan(t) * cos(t),
    g: (t) => sin(t),
  },
  {
    id: "secante",
    izq: "1 + tan²θ",
    der: "sec²θ",
    f: (t) => 1 + tan(t) ** 2,
    g: (t) => 1 / cos(t) ** 2,
  },
  {
    id: "cociente-inverso",
    izq: "sin θ ÷ tan θ",
    der: "cos θ",
    f: (t) => sin(t) / tan(t),
    g: (t) => cos(t),
  },
];

export function EscenarioComprobarIdentidad() {
  const [angulo, setAngulo] = useState(30);
  const [elegida, setElegida] = useState(IDENTIDADES[0].id);

  const ident = IDENTIDADES.find((i) => i.id === elegida) ?? IDENTIDADES[0];
  const izq = ident.f(angulo);
  const der = ident.g(angulo);
  const iguales = Math.abs(izq - der) < 1e-6;

  return (
    <EscenarioFrame
      id="comprobar-identidad"
      titulo="Compruébalo con cualquier ángulo"
      contexto="Elige una identidad y mueve el ángulo. Los dos lados dan el mismo número siempre: por eso se llama identidad y no ecuación."
      dibujo={
        <div className="grid gap-3">
          <div className="rounded-piece border-[1.5px] border-line paper-grid p-4">
            <div className="grid gap-2">
              {IDENTIDADES.map((i) => (
                <button
                  key={i.id}
                  onClick={() => setElegida(i.id)}
                  aria-pressed={elegida === i.id}
                  className={`tnum rounded-piece border-[1.5px] px-3 py-2 text-left font-display text-[1.05rem] font-semibold transition-colors ${
                    elegida === i.id
                      ? "border-ink bg-card"
                      : "border-line bg-card/60 text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {i.izq} <span className="text-ink-soft">=</span> {i.der}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      controles={
        <Deslizador
          etiqueta="Ángulo θ de prueba"
          valor={angulo}
          min={5}
          max={85}
          paso={1}
          unidad="°"
          onChange={setAngulo}
        />
      }
      lecturas={
        <>
          <Lectura etiqueta={`Lado izquierdo: ${ident.izq}`} valor={fmt(izq, 4)} />
          <Lectura etiqueta={`Lado derecho: ${ident.der}`} valor={fmt(der, 4)} />
          <div className="sm:col-span-2">
            <Lectura
              etiqueta="¿Dan lo mismo?"
              valor={iguales ? "Sí, con este ángulo también" : "No coinciden"}
              destacado={iguales}
            />
          </div>
        </>
      }
      cierre={
        <>
          <Ecuacion>
            θ = {angulo}° → {ident.izq} = {fmt(izq, 4)} = {ident.der}
          </Ecuacion>
          <p className="mt-2 text-[0.92rem] text-ink-soft">
            Comprobar con números te dice si te equivocaste, pero no es una demostración. Para
            demostrarla, pasa todo a sin y cos y simplifica hasta que un lado quede igual al otro.
          </p>
        </>
      }
    />
  );
}
