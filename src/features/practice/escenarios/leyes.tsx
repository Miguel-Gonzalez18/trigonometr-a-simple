import { useState } from "react";
import { Deslizador, Ecuacion, Fig, Lectura, Pildora } from "../../../components/ui";
import { TrianguloEscaleno, type ParteTri } from "../../../components/triangles/TrianguloEscaleno";
import { anguloPorCosenos, fmt, ladoPorCosenos, ladoPorSenos, sin } from "../../../lib/trig";
import { EscenarioFrame } from "../EscenarioFrame";

/* ── 1 · Medir al otro lado de un río ─────────────────────────────────────
   El ejemplo de la guía: dos ángulos y el lado entre ellos. Primero el
   tercer ángulo, después Law of Sines. */
export function EscenarioRioTriangulacion() {
  const [A, setA] = useState(40);
  const [B, setB] = useState(60);
  const [c, setC] = useState(50);
  const [destacado, setDestacado] = useState<ParteTri | null>(null);

  // Los dos ángulos de la orilla tienen que dejar espacio para el tercero.
  const Bseguro = Math.min(B, 170 - A);
  const C = 180 - A - Bseguro;
  const b = ladoPorSenos(c, C, Bseguro); // distancia de A al árbol
  const a = ladoPorSenos(c, C, A); // distancia de B al árbol

  return (
    <EscenarioFrame
      id="rio-triangulacion"
      titulo="¿Qué tan lejos está la otra orilla?"
      contexto="No puedes cruzar el río con una cinta de medir. Marcas dos puntos en tu orilla, mides los dos ángulos hacia el árbol, y el triángulo te da la distancia."
      dibujo={
        <Fig pie="A y B están en tu orilla; C es el árbol. Cada ángulo (mayúscula) tiene su lado opuesto (minúscula) del mismo color.">
          <TrianguloEscaleno
            def={{ tipo: "asa", A, B: Bseguro, c }}
            etiquetas={{
              c: `c = ${c} m`,
              b: `b = ${fmt(b, 1)} m`,
              a: `a = ${fmt(a, 1)} m`,
            }}
            angulos={{ A: `A ${A}°`, B: `B ${Bseguro}°`, C: `C ${fmt(C, 0)}°` }}
            destacado={destacado}
          />
        </Fig>
      }
      controles={
        <>
          <Deslizador
            etiqueta="Ángulo desde A"
            valor={A}
            min={15}
            max={80}
            paso={1}
            unidad="°"
            color="var(--pa)"
            onChange={(v) => {
              setA(v);
              if (B > 170 - v) setB(170 - v);
            }}
          />
          <Deslizador
            etiqueta="Ángulo desde B"
            valor={B}
            min={15}
            max={110}
            paso={1}
            unidad="°"
            color="var(--pb)"
            onChange={setB}
          />
          <Deslizador
            etiqueta="Distancia entre A y B"
            valor={c}
            min={20}
            max={90}
            paso={5}
            unidad=" m"
            color="var(--pc)"
            onChange={setC}
          />
        </>
      }
      lecturas={
        <>
          <Lectura etiqueta="Tercer ángulo C = 180° − A − B" valor={`${fmt(C, 0)}°`} color="var(--pc)" />
          <Lectura etiqueta="La pareja que uso" valor={`c y C`} />
          <div onMouseEnter={() => setDestacado("b")} onMouseLeave={() => setDestacado(null)}>
            <Lectura etiqueta="De A al árbol (b)" valor={`${fmt(b, 1)} m`} color="var(--pb)" />
          </div>
          <div onMouseEnter={() => setDestacado("a")} onMouseLeave={() => setDestacado(null)}>
            <Lectura etiqueta="De B al árbol (a)" valor={`${fmt(a, 1)} m`} destacado />
          </div>
        </>
      }
      cierre={
        <Ecuacion>
          b = {c} × sin {Bseguro}° ÷ sin {fmt(C, 0)}° = {c} × {fmt(sin(Bseguro), 4)} ÷ {fmt(sin(C), 4)} ={" "}
          {fmt(b, 1)} m
        </Ecuacion>
      }
    />
  );
}

/* ── 2 · El ancho de un estanque ──────────────────────────────────────────
   Dos lados y el ángulo entre ellos: no hay pareja, así que Law of Cosines.
   Al poner el ángulo en 90° se ve que vuelve a ser Pitágoras. */
export function EscenarioEstanqueAncho() {
  const [a, setA] = useState(50);
  const [b, setB] = useState(70);
  const [C, setC] = useState(60);
  const [destacado, setDestacado] = useState<ParteTri | null>(null);

  const c = ladoPorCosenos(a, b, C);
  const correccion = 2 * a * b * Math.cos((C * Math.PI) / 180);
  const esNoventa = C === 90;

  return (
    <EscenarioFrame
      id="estanque-ancho"
      titulo="El ancho de un estanque"
      contexto="Mides desde un punto hasta los dos extremos del estanque y el ángulo entre esas dos direcciones. El ancho es el tercer lado."
      dibujo={
        <Fig pie="Pon el ángulo en 90° exactos: la corrección se vuelve 0 y la fórmula es Pitágoras otra vez.">
          <TrianguloEscaleno
            def={{ tipo: "sas", a, b, C }}
            etiquetas={{ a: `a = ${a} m`, b: `b = ${b} m`, c: `c = ${fmt(c, 1)} m` }}
            angulos={{ C: `C ${C}°`, A: "A", B: "B" }}
            destacado={destacado}
          />
        </Fig>
      }
      controles={
        <>
          <Deslizador
            etiqueta="Distancia a un extremo (a)"
            valor={a}
            min={20}
            max={90}
            paso={5}
            unidad=" m"
            color="var(--pa)"
            onChange={setA}
          />
          <Deslizador
            etiqueta="Distancia al otro extremo (b)"
            valor={b}
            min={20}
            max={90}
            paso={5}
            unidad=" m"
            color="var(--pb)"
            onChange={setB}
          />
          <Deslizador
            etiqueta="Ángulo entre las dos direcciones (C)"
            valor={C}
            min={20}
            max={140}
            paso={5}
            unidad="°"
            color="var(--pc)"
            onChange={setC}
          />
        </>
      }
      lecturas={
        <>
          <Lectura etiqueta="a² + b²" valor={fmt(a * a + b * b, 0)} />
          <Lectura
            etiqueta="La corrección 2ab·cos C"
            valor={fmt(correccion, 0)}
            color={esNoventa ? "var(--good)" : undefined}
          />
          <Lectura etiqueta="c² = a² + b² − 2ab·cos C" valor={fmt(a * a + b * b - correccion, 0)} />
          <div onMouseEnter={() => setDestacado("c")} onMouseLeave={() => setDestacado(null)}>
            <Lectura etiqueta="Ancho del estanque (c)" valor={`${fmt(c, 1)} m`} destacado />
          </div>
        </>
      }
      cierre={
        <>
          <Ecuacion>
            c² = {a}² + {b}² − 2 × {a} × {b} × cos {C}° = {fmt(a * a + b * b - correccion, 0)} → c ={" "}
            {fmt(c, 1)} m
          </Ecuacion>
          {esNoventa ? (
            <p className="mt-2 text-[0.92rem] text-ink-soft">
              Con C = 90°, cos C = 0 y la corrección desaparece: queda a² + b² = c², que es Pitágoras.
            </p>
          ) : null}
        </>
      }
    />
  );
}

/* ── 3 · ¿Cuál ley uso? ───────────────────────────────────────────────────
   Los cuatro casos de la guía. La pregunta clave: ¿tengo una pareja? */
type Caso = {
  id: string;
  datos: string;
  pareja: boolean;
  ley: "Law of Sines" | "Law of Cosines";
  nota: string;
  def: { tipo: "asa"; A: number; B: number; c: number } | { tipo: "sas"; a: number; b: number; C: number } | { tipo: "sss"; a: number; b: number; c: number };
  etiquetas: Partial<Record<ParteTri, string>>;
  angulos: Partial<Record<"A" | "B" | "C", string>>;
};

const CASOS: Caso[] = [
  {
    id: "aas",
    datos: "Dos ángulos y un lado",
    pareja: true,
    ley: "Law of Sines",
    nota: "Primero saca el tercer ángulo con 180° − A − B. Así consigues una pareja completa.",
    def: { tipo: "asa", A: 40, B: 60, c: 50 },
    etiquetas: { c: "50" },
    angulos: { A: "A 40°", B: "B 60°", C: "C ?" },
  },
  {
    id: "ssa",
    datos: "Dos lados y un ángulo que no está entre ellos",
    pareja: true,
    ley: "Law of Sines",
    nota: "Ya tienes la pareja: el lado a con su ángulo A. Ojo, aquí aparece el caso ambiguo.",
    def: { tipo: "sss", a: 14, b: 20, c: 24.4 },
    etiquetas: { a: "a = 14", b: "b = 20" },
    angulos: { A: "A 35°", B: "B ?", C: "C" },
  },
  {
    id: "sas",
    datos: "Dos lados y el ángulo entre ellos",
    pareja: false,
    ley: "Law of Cosines",
    nota: "No hay ninguna pareja, así que vas con Law of Cosines para sacar el tercer lado.",
    def: { tipo: "sas", a: 8, b: 10, C: 60 },
    etiquetas: { a: "8", b: "10", c: "c = ?" },
    angulos: { C: "C 60°", A: "A", B: "B" },
  },
  {
    id: "sss",
    datos: "Los tres lados",
    pareja: false,
    ley: "Law of Cosines",
    nota: "Ningún ángulo conocido, ninguna pareja. Usa la forma de ángulo: cos C = (a² + b² − c²) ÷ (2ab).",
    def: { tipo: "sss", a: 5, b: 6, c: 7 },
    etiquetas: { a: "5", b: "6", c: "7" },
    angulos: { A: "A ?", B: "B ?", C: "C ?" },
  },
];

export function EscenarioElegirLey() {
  const [elegido, setElegido] = useState(CASOS[0].id);
  const caso = CASOS.find((c) => c.id === elegido) ?? CASOS[0];

  const ejemplo =
    caso.id === "sss"
      ? `cos C = (5² + 6² − 7²) ÷ 60 = 0.2 → C = cos⁻¹(0.2) ≈ ${fmt(anguloPorCosenos(5, 6, 7), 1)}°`
      : caso.id === "sas"
        ? `c² = 8² + 10² − 2 × 8 × 10 × cos 60° = 84 → c ≈ ${fmt(ladoPorCosenos(8, 10, 60), 1)}`
        : caso.id === "aas"
          ? `C = 80°, luego b = 50 × sin 60° ÷ sin 80° ≈ ${fmt(ladoPorSenos(50, 80, 60), 1)}`
          : `sin B = 20 × sin 35° ÷ 14 ≈ 0.8194 → B ≈ 55.0°`;

  return (
    <EscenarioFrame
      id="elige-ley"
      titulo="¿Cuál ley uso?"
      contexto="Antes de calcular nada, haz una sola pregunta: ¿tengo una pareja, o sea un ángulo junto con el lado que está enfrente?"
      dibujo={
        <Fig pie={caso.nota}>
          <TrianguloEscaleno def={caso.def} etiquetas={caso.etiquetas} angulos={caso.angulos} />
        </Fig>
      }
      controles={
        <div className="grid gap-2">
          <span className="font-bold">¿Qué datos te dieron?</span>
          {CASOS.map((c) => (
            <button
              key={c.id}
              onClick={() => setElegido(c.id)}
              aria-pressed={elegido === c.id}
              className={`rounded-piece border-[1.5px] px-3 py-2 text-left text-[0.95rem] font-bold transition-colors ${
                elegido === c.id
                  ? "border-ink bg-card"
                  : "border-line bg-card/60 text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c.datos}
            </button>
          ))}
        </div>
      }
      lecturas={
        <>
          <Lectura
            etiqueta="¿Tengo una pareja?"
            valor={caso.pareja ? "Sí" : "No"}
            color={caso.pareja ? "var(--good)" : "var(--warn)"}
          />
          <Lectura etiqueta="Entonces uso" valor={caso.ley} destacado />
          <div className="sm:col-span-2">
            <p className="text-[0.95rem]">
              {caso.pareja ? (
                <>
                  Con pareja va{" "}
                  <Pildora color="var(--good)" fondo="var(--good-tint)">
                    Law of Sines
                  </Pildora>
                  : a ÷ sin A = b ÷ sin B.
                </>
              ) : (
                <>
                  Sin pareja va{" "}
                  <Pildora color="var(--hyp-ink)" fondo="var(--hyp-tint)">
                    Law of Cosines
                  </Pildora>
                  : c² = a² + b² − 2ab·cos C.
                </>
              )}
            </p>
          </div>
        </>
      }
      cierre={<Ecuacion>{ejemplo}</Ecuacion>}
    />
  );
}
