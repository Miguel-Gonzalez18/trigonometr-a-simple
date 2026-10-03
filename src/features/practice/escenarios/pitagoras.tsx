import { useState } from "react";
import { Deslizador, Ecuacion, Fig, Lectura } from "../../../components/ui";
import { proyector, marcaRecta, type Pt } from "../../../components/triangles/geometry";
import { fmt, fmtTrim } from "../../../lib/trig";
import { EscenarioFrame } from "../EscenarioFrame";

/* ── 1 · La escalera en la pared ──────────────────────────────────────────
   El caso de la guía: la escalera es la hipotenusa y la altura es un cateto.
   Mover la base muestra que al alejarla, la altura baja. */
export function EscenarioEscaleraPared() {
  const [largo, setLargo] = useState(5);
  const [base, setBase] = useState(3);

  // La base nunca puede pasar del largo: la escalera no se estira.
  const baseReal = Math.min(base, largo - 0.1);
  const altura = Math.sqrt(Math.max(largo * largo - baseReal * baseReal, 0));

  const W = 420;
  const H = 300;
  const O: Pt = { x: 0, y: 0 };
  const P: Pt = { x: baseReal, y: 0 };
  const T: Pt = { x: 0, y: altura };
  // Escala fija al máximo posible, para que al mover los controles el dibujo
  // no "salte": lo que cambia es el triángulo, no el encuadre.
  // Dejamos sitio a la izquierda del origen para la pared y la etiqueta de
  // la altura, para que no se monten sobre el dibujo.
  const { p } = proyector(
    [
      { x: -1.8, y: 0 },
      { x: 6, y: 0 },
      { x: 0, y: 6 },
    ],
    W,
    H,
    40,
  );
  const sO = p(O);
  const sP = p(P);
  const sT = p(T);

  const peldanos = Math.max(Math.round(largo * 2), 3);

  return (
    <EscenarioFrame
      id="escalera-pared"
      titulo="La escalera apoyada en la pared"
      contexto="Mueve la base y mira cómo cambia la altura a la que llega la escalera. El largo de la escalera no cambia: es la hipotenusa."
      dibujo={
        <Fig pie="La escalera es la hipotenusa. La altura en la pared y la distancia en el suelo son los catetos.">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Escalera de ${largo} metros con la base a ${fmtTrim(baseReal)} metros de la pared`}>
            {/* Pared */}
            <rect x={sO.x - 26} y={26} width={26} height={sO.y - 26} className="wall" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line
                key={i}
                x1={sO.x - 26}
                y1={26 + (i * (sO.y - 26)) / 7}
                x2={sO.x}
                y2={26 + (i * (sO.y - 26)) / 7}
                className="brick"
              />
            ))}
            {/* Suelo */}
            <line x1={sO.x - 30} y1={sO.y} x2={W - 14} y2={sO.y} className="ground" />

            {/* Catetos */}
            <line x1={sO.x} y1={sO.y} x2={sT.x} y2={sT.y} className="side s-opp" />
            <line x1={sO.x} y1={sO.y} x2={sP.x} y2={sP.y} className="side s-adj" />
            {/* Escalera */}
            <line x1={sP.x} y1={sP.y} x2={sT.x} y2={sT.y} className="side s-hyp" />
            {Array.from({ length: peldanos }, (_, i) => {
              const t = (i + 1) / (peldanos + 1);
              const x1 = sP.x + (sT.x - sP.x) * t;
              const y1 = sP.y + (sT.y - sP.y) * t;
              const nx = (sT.y - sP.y) / Math.hypot(sT.x - sP.x, sT.y - sP.y);
              const ny = -(sT.x - sP.x) / Math.hypot(sT.x - sP.x, sT.y - sP.y);
              return (
                <line
                  key={i}
                  x1={x1 - nx * 7}
                  y1={y1 - ny * 7}
                  x2={x1 + nx * 7}
                  y2={y1 + ny * 7}
                  className="rung"
                />
              );
            })}

            <path d={marcaRecta(sO, sP, sT, 15)} className="mark" />

            <text x={sO.x - 34} y={(sO.y + sT.y) / 2} textAnchor="end" dominantBaseline="middle" className="t f-opp tnum">
              h = {fmt(altura, 2)} m
            </text>
            <text x={(sO.x + sP.x) / 2} y={sO.y + 24} textAnchor="middle" className="t f-adj tnum">
              {fmtTrim(baseReal)} m
            </text>
            <text
              x={(sP.x + sT.x) / 2 + 26}
              y={(sP.y + sT.y) / 2 - 8}
              textAnchor="middle"
              className="t f-hyp tnum"
            >
              {fmtTrim(largo)} m
            </text>
          </svg>
        </Fig>
      }
      controles={
        <>
          <Deslizador
            etiqueta="Largo de la escalera"
            valor={largo}
            min={2}
            max={6}
            paso={0.5}
            unidad=" m"
            color="var(--hyp)"
            onChange={(v) => {
              setLargo(v);
              if (base > v - 0.1) setBase(Math.max(Math.round((v - 0.5) * 2) / 2, 0.5));
            }}
          />
          <Deslizador
            etiqueta="Distancia de la base a la pared"
            valor={base}
            min={0.5}
            max={5.5}
            paso={0.5}
            unidad=" m"
            color="var(--adj)"
            onChange={setBase}
          />
        </>
      }
      lecturas={
        <>
          <Lectura etiqueta="Hipotenusa (c)" valor={`${fmtTrim(largo)} m`} color="var(--hyp-ink)" />
          <Lectura etiqueta="Cateto en el suelo" valor={`${fmtTrim(baseReal)} m`} color="var(--adj-ink)" />
          <Lectura etiqueta="c² − b²" valor={fmt(largo * largo - baseReal * baseReal, 2)} />
          <Lectura etiqueta="Altura h" valor={`${fmt(altura, 2)} m`} destacado />
        </>
      }
      cierre={
        <Ecuacion>
          h = √({fmtTrim(largo)}² − {fmtTrim(baseReal)}²) = √{fmt(largo * largo - baseReal * baseReal, 2)} ={" "}
          {fmt(altura, 2)} m
        </Ecuacion>
      }
    />
  );
}

/* ── 2 · La diagonal de una pantalla ──────────────────────────────────────
   Aquí la incógnita es la hipotenusa, así que se suma. Las pulgadas de un
   celular o un televisor son justo esta diagonal. */
export function EscenarioPantallaDiagonal() {
  const [ancho, setAncho] = useState(6);
  const [alto, setAlto] = useState(8);
  const diagonal = Math.hypot(ancho, alto);

  const W = 420;
  const H = 300;
  const { p } = proyector(
    [
      { x: 0, y: 0 },
      { x: 16, y: 0 },
      { x: 0, y: 16 },
    ],
    W,
    H,
    40,
  );
  const o = p({ x: 0, y: 0 });
  const esq = p({ x: ancho, y: alto });

  return (
    <EscenarioFrame
      id="pantalla-diagonal"
      titulo="Las pulgadas de una pantalla"
      contexto="Cuando dicen que un celular es de 6.1 pulgadas, hablan de la diagonal. Cambia el ancho y el alto para ver cómo se mueve."
      dibujo={
        <Fig pie="La diagonal parte la pantalla en dos triángulos rectángulos. Aquí la incógnita es la hipotenusa, así que se suma.">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Pantalla de ${ancho} por ${alto} centímetros`}>
            <rect
              x={Math.min(o.x, esq.x)}
              y={Math.min(o.y, esq.y)}
              width={Math.abs(esq.x - o.x)}
              height={Math.abs(esq.y - o.y)}
              className="tri-fill"
              stroke="var(--line)"
              strokeWidth={1.5}
            />
            <line x1={o.x} y1={o.y} x2={esq.x} y2={o.y} className="side s-adj" />
            <line x1={esq.x} y1={o.y} x2={esq.x} y2={esq.y} className="side s-opp" />
            <line x1={o.x} y1={o.y} x2={esq.x} y2={esq.y} className="side s-hyp" />
            <path
              d={marcaRecta({ x: esq.x, y: o.y }, { x: o.x, y: o.y }, { x: esq.x, y: esq.y }, 14)}
              className="mark"
            />
            <text x={(o.x + esq.x) / 2} y={o.y + 24} textAnchor="middle" className="t f-adj tnum">
              {ancho} cm
            </text>
            <text x={esq.x + 10} y={(o.y + esq.y) / 2} dominantBaseline="middle" className="t f-opp tnum">
              {alto} cm
            </text>
            {/* La etiqueta de la diagonal se aparta hacia fuera del ángulo
                recto, para no quedar encima del trazo naranja. */}
            {(() => {
              const mx = (o.x + esq.x) / 2;
              const my = (o.y + esq.y) / 2;
              const dx = mx - esq.x;
              const dy = my - o.y;
              const l = Math.hypot(dx, dy) || 1;
              return (
                <text
                  x={mx + (dx / l) * 26}
                  y={my + (dy / l) * 26}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="t f-hyp tnum"
                >
                  {fmt(diagonal, 2)} cm
                </text>
              );
            })()}
          </svg>
        </Fig>
      }
      controles={
        <>
          <Deslizador
            etiqueta="Ancho de la pantalla"
            valor={ancho}
            min={3}
            max={15}
            paso={1}
            unidad=" cm"
            color="var(--adj)"
            onChange={setAncho}
          />
          <Deslizador
            etiqueta="Alto de la pantalla"
            valor={alto}
            min={3}
            max={15}
            paso={1}
            unidad=" cm"
            color="var(--opp)"
            onChange={setAlto}
          />
        </>
      }
      lecturas={
        <>
          <Lectura etiqueta="Ancho²" valor={ancho * ancho} color="var(--adj-ink)" />
          <Lectura etiqueta="Alto²" valor={alto * alto} color="var(--opp-ink)" />
          <Lectura etiqueta="Suma" valor={ancho * ancho + alto * alto} />
          <Lectura etiqueta="Diagonal" valor={`${fmt(diagonal, 2)} cm`} destacado />
        </>
      }
      cierre={
        <Ecuacion>
          c = √({ancho}² + {alto}²) = √{ancho * ancho + alto * alto} = {fmt(diagonal, 2)} cm
        </Ecuacion>
      }
    />
  );
}
