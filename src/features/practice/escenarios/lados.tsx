import { useState } from "react";
import { Deslizador, Ecuacion, Fig, Lectura } from "../../../components/ui";
import { arcoAngulo, marcaRecta, proyector } from "../../../components/triangles/geometry";
import { asin, cos, fmt, sin, tan } from "../../../lib/trig";
import { EscenarioFrame } from "../EscenarioFrame";

/* ── 1 · La altura de un árbol ────────────────────────────────────────────
   El ejemplo de la guía: desde 20 m y con 35° de elevación, el árbol mide
   unos 14 m. Aquí se puede mover tanto la distancia como el ángulo. */
export function EscenarioArbolElevacion() {
  const [distancia, setDistancia] = useState(20);
  const [angulo, setAngulo] = useState(35);
  const altura = distancia * tan(angulo);

  const W = 440;
  const H = 300;
  const { p } = proyector(
    [
      { x: 0, y: 0 },
      { x: 42, y: 0 },
      { x: 0, y: 42 },
    ],
    W,
    H,
    46,
  );
  const ojo = p({ x: 0, y: 0 });
  const pie = p({ x: distancia, y: 0 });
  const punta = p({ x: distancia, y: Math.min(altura, 42) });

  return (
    <EscenarioFrame
      id="arbol-elevacion"
      titulo="¿Qué altura tiene ese árbol?"
      contexto="No puedes medir un árbol con una cinta, pero sí la distancia hasta él y el ángulo con que miras la punta. Con eso basta."
      dibujo={
        <Fig pie="Para simplificar medimos desde el suelo. En la práctica le sumas la altura de tus ojos.">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Árbol visto desde ${distancia} metros con un ángulo de ${angulo} grados`}>
            <line x1={ojo.x - 20} y1={ojo.y} x2={W - 12} y2={ojo.y} className="ground" />

            {/* Quien mira */}
            <circle cx={ojo.x - 6} cy={ojo.y - 30} r={7} className="person-head" />
            <path
              d={`M ${ojo.x - 6} ${ojo.y - 23} L ${ojo.x - 6} ${ojo.y - 8} M ${ojo.x - 14} ${ojo.y - 16} L ${ojo.x + 4} ${ojo.y - 18} M ${ojo.x - 6} ${ojo.y - 8} L ${ojo.x - 12} ${ojo.y} M ${ojo.x - 6} ${ojo.y - 8} L ${ojo.x} ${ojo.y}`}
              className="person"
            />

            {/* Árbol */}
            <rect x={pie.x - 6} y={punta.y + 4} width={12} height={pie.y - punta.y - 4} className="trunk" />
            <ellipse cx={pie.x} cy={punta.y + 10} rx={30} ry={24} className="treetop" />

            <polygon
              points={`${ojo.x},${ojo.y} ${pie.x},${pie.y} ${punta.x},${punta.y}`}
              fill="none"
            />
            <line x1={ojo.x} y1={ojo.y} x2={pie.x} y2={pie.y} className="side s-adj" />
            <line x1={pie.x} y1={pie.y} x2={punta.x} y2={punta.y} className="side s-opp" />
            <line x1={ojo.x} y1={ojo.y} x2={punta.x} y2={punta.y} className="leader" strokeWidth={2} />

            <path d={marcaRecta(pie, ojo, punta, 13)} className="mark" />
            <path d={arcoAngulo(ojo, pie, punta, 38)} className="arc" />
            <text x={ojo.x + 48} y={ojo.y - 12} className="t f-soft tnum">
              {angulo}°
            </text>
            <text x={(ojo.x + pie.x) / 2} y={ojo.y + 24} textAnchor="middle" className="t f-adj tnum">
              {distancia} m
            </text>
            <text x={pie.x + 36} y={(pie.y + punta.y) / 2} dominantBaseline="middle" className="t f-opp tnum">
              h = {fmt(altura, 1)} m
            </text>
          </svg>
        </Fig>
      }
      controles={
        <>
          <Deslizador
            etiqueta="Distancia hasta el árbol"
            valor={distancia}
            min={5}
            max={40}
            paso={1}
            unidad=" m"
            color="var(--adj)"
            onChange={setDistancia}
          />
          <Deslizador
            etiqueta="Ángulo de elevación"
            valor={angulo}
            min={10}
            max={65}
            paso={1}
            unidad="°"
            onChange={setAngulo}
          />
        </>
      }
      lecturas={
        <>
          <Lectura etiqueta="adjacent (en el suelo)" valor={`${distancia} m`} color="var(--adj-ink)" />
          <Lectura etiqueta={`tan ${angulo}°`} valor={fmt(tan(angulo), 4)} />
          <Lectura etiqueta="La razón que uso" valor="tan (TOA)" />
          <Lectura etiqueta="Altura del árbol" valor={`${fmt(altura, 1)} m`} destacado />
        </>
      }
      cierre={
        <Ecuacion>
          tan {angulo}° = h ÷ {distancia} → h = {distancia} × {fmt(tan(angulo), 4)} = {fmt(altura, 1)} m
        </Ecuacion>
      }
    />
  );
}

/* ── 2 · El ángulo de una rampa ───────────────────────────────────────────
   El camino inverso: con dos lados sale el ángulo, usando sin⁻¹. */
export function EscenarioRampaAngulo() {
  const [largo, setLargo] = useState(10);
  const [subida, setSubida] = useState(1.2);

  const subidaReal = Math.min(subida, largo);
  const angulo = asin(subidaReal / largo);
  const avance = largo * cos(angulo);

  const W = 440;
  const H = 230;
  const { p } = proyector(
    [
      { x: 0, y: 0 },
      { x: 12, y: 0 },
      { x: 0, y: 4 },
    ],
    W,
    H,
    42,
  );
  const base = p({ x: 0, y: 0 });
  const fin = p({ x: avance, y: 0 });
  const alto = p({ x: avance, y: subidaReal });

  const accesible = angulo <= 5;

  return (
    <EscenarioFrame
      id="rampa-angulo"
      titulo="¿Qué ángulo tiene esta rampa?"
      contexto="Aquí conoces dos lados y buscas el ángulo. Ese es el camino de vuelta: se hace con sin⁻¹, la tecla que se activa con SHIFT."
      dibujo={
        <Fig pie="Una rampa accesible no debería pasar de 5°. Mueve los controles y mira cuándo deja de cumplir.">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Rampa de ${largo} metros que sube ${subidaReal} metros`}>
            <line x1={base.x - 14} y1={base.y} x2={W - 12} y2={base.y} className="ground" />
            <polygon points={`${base.x},${base.y} ${fin.x},${fin.y} ${alto.x},${alto.y}`} className="tri-fill" />
            <line x1={base.x} y1={base.y} x2={fin.x} y2={fin.y} className="side s-adj" />
            <line x1={fin.x} y1={fin.y} x2={alto.x} y2={alto.y} className="side s-opp" />
            <line x1={base.x} y1={base.y} x2={alto.x} y2={alto.y} className="side s-hyp" />
            <path d={marcaRecta(fin, base, alto, 12)} className="mark" />
            <path d={arcoAngulo(base, fin, alto, 40)} className="arc" />
            <text x={base.x + 52} y={base.y - 10} className="t f-soft tnum">
              θ = {fmt(angulo, 1)}°
            </text>
            <text x={fin.x + 10} y={(fin.y + alto.y) / 2} dominantBaseline="middle" className="t f-opp tnum">
              {fmt(subidaReal, 2)} m
            </text>
            <text
              x={(base.x + alto.x) / 2}
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
            etiqueta="Largo de la rampa"
            valor={largo}
            min={3}
            max={12}
            paso={0.5}
            unidad=" m"
            color="var(--hyp)"
            onChange={(v) => {
              setLargo(v);
              if (subida > v) setSubida(v);
            }}
          />
          <Deslizador
            etiqueta="Cuánto sube"
            valor={subida}
            min={0.2}
            max={4}
            paso={0.1}
            unidad=" m"
            color="var(--opp)"
            onChange={setSubida}
          />
        </>
      }
      lecturas={
        <>
          <Lectura etiqueta="opposite ÷ hypotenuse" valor={fmt(subidaReal / largo, 4)} />
          <Lectura etiqueta="La razón que uso" valor="sin (SOH)" />
          <Lectura etiqueta="Ángulo θ" valor={`${fmt(angulo, 1)}°`} destacado />
          <Lectura
            etiqueta="¿Cumple accesibilidad?"
            valor={accesible ? "Sí, ≤ 5°" : "No, pasa de 5°"}
            color={accesible ? "var(--good)" : "var(--warn)"}
          />
        </>
      }
      cierre={
        <Ecuacion>
          sin θ = {fmt(subidaReal, 2)} ÷ {largo} = {fmt(subidaReal / largo, 4)} → θ = sin⁻¹(
          {fmt(subidaReal / largo, 4)}) = {fmt(angulo, 1)}°
        </Ecuacion>
      }
    />
  );
}

/* ── 3 · ¿Multiplico o divido? ────────────────────────────────────────────
   El punto donde más se traba la gente: según dónde quedó la x en la
   división, se multiplica o se divide. */
export function EscenarioXArribaAbajo() {
  const [angulo, setAngulo] = useState(35);
  const [dato, setDato] = useState(10);
  const [caso, setCaso] = useState<"arriba" | "abajo">("arriba");

  const arriba = caso === "arriba";
  // Caso "arriba": sin θ = x ÷ dato, entonces x = dato × sin θ.
  // Caso "abajo":  sin θ = dato ÷ x, entonces x = dato ÷ sin θ.
  const x = arriba ? dato * sin(angulo) : dato / sin(angulo);
  const hip = arriba ? dato : x;
  const opuesto = arriba ? x : dato;
  const adyacente = Math.sqrt(Math.max(hip * hip - opuesto * opuesto, 0.01));

  return (
    <EscenarioFrame
      id="x-arriba-abajo"
      titulo="¿Multiplico o divido?"
      contexto="Las dos situaciones usan sin, pero se despejan distinto. Cambia el caso y mira qué pasa con la x."
      dibujo={
        <Fig pie="En los dos dibujos el ángulo y la razón son los mismos. Lo único que cambia es cuál lado es el dato y cuál la incógnita.">
          <svg viewBox="0 0 440 60" className="mb-1 block h-auto w-full">
            <text x={10} y={26} className="t-lg f-soft">
              {arriba ? `sin ${angulo}° = x ÷ ${dato}` : `sin ${angulo}° = ${dato} ÷ x`}
            </text>
            <text x={10} y={50} className="t f-good">
              {arriba
                ? `Multiplica:  x = ${dato} × sin ${angulo}°`
                : `Cambian de lugar:  x = ${dato} ÷ sin ${angulo}°`}
            </text>
          </svg>
          <TrianguloEnMarco
            adyacente={adyacente}
            opuesto={opuesto}
            hip={hip}
            angulo={angulo}
            incognita={arriba ? "opp" : "hyp"}
            dato={dato}
            x={x}
          />
        </Fig>
      }
      controles={
        <>
          <div className="grid gap-2">
            <span className="font-bold">¿Dónde está la x?</span>
            <div className="inline-flex self-start overflow-hidden rounded-full border-[1.5px] border-ink">
              {(
                [
                  ["arriba", "La x está arriba"],
                  ["abajo", "La x está abajo"],
                ] as const
              ).map(([v, t]) => (
                <button
                  key={v}
                  onClick={() => setCaso(v)}
                  aria-pressed={caso === v}
                  className={`px-3.5 py-1.5 text-[0.9rem] font-bold transition-colors ${
                    caso === v ? "bg-ink text-card" : "bg-card text-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Deslizador etiqueta="Ángulo" valor={angulo} min={10} max={75} paso={1} unidad="°" onChange={setAngulo} />
          <Deslizador
            etiqueta="El lado que te dan"
            valor={dato}
            min={2}
            max={20}
            paso={1}
            unidad=" m"
            color="var(--adj)"
            onChange={setDato}
          />
        </>
      }
      lecturas={
        <>
          <Lectura etiqueta={`sin ${angulo}°`} valor={fmt(sin(angulo), 4)} />
          <Lectura etiqueta="Qué hago con el dato" valor={arriba ? "Multiplico" : "Divido"} />
          <Lectura etiqueta="x" valor={`${fmt(x, 2)} m`} destacado />
          <Lectura
            etiqueta="Revisión rápida"
            valor={arriba ? "x < dato ✓" : "x > dato ✓"}
            color="var(--ink-soft)"
          />
        </>
      }
      cierre={
        <Ecuacion>
          {arriba
            ? `x = ${dato} × ${fmt(sin(angulo), 4)} = ${fmt(x, 2)} m`
            : `x = ${dato} ÷ ${fmt(sin(angulo), 4)} = ${fmt(x, 2)} m`}
        </Ecuacion>
      }
    />
  );
}

/** Dibujo auxiliar del escenario anterior. */
function TrianguloEnMarco({
  adyacente,
  opuesto,
  hip,
  angulo,
  incognita,
  dato,
  x,
}: {
  adyacente: number;
  opuesto: number;
  hip: number;
  angulo: number;
  incognita: "opp" | "hyp";
  dato: number;
  x: number;
}) {
  const W = 420;
  const H = 250;
  const { p } = proyector(
    [
      { x: 0, y: 0 },
      { x: adyacente, y: 0 },
      { x: 0, y: opuesto },
    ],
    W,
    H,
    46,
  );
  const C = p({ x: 0, y: 0 });
  const A = p({ x: adyacente, y: 0 });
  const B = p({ x: 0, y: opuesto });

  const texto = (quien: "opp" | "hyp") =>
    quien === incognita ? `x = ${fmt(x, 2)}` : `${fmt(quien === "hyp" ? hip : opuesto, 2)}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Triángulo rectángulo con una incógnita">
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} className="tri-fill" />
      <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} className="side s-adj" opacity={0.45} />
      <line
        x1={B.x}
        y1={B.y}
        x2={C.x}
        y2={C.y}
        className={incognita === "opp" ? "unk" : "side s-opp"}
      />
      <line
        x1={A.x}
        y1={A.y}
        x2={B.x}
        y2={B.y}
        className={incognita === "hyp" ? "unk" : "side s-hyp"}
      />
      <path d={marcaRecta(C, A, B, 14)} className="mark" />
      <path d={arcoAngulo(A, C, B, 34)} className="arc" />
      <text x={A.x - 54} y={A.y - 12} className="t f-soft tnum">
        {angulo}°
      </text>
      <text x={C.x - 12} y={(C.y + B.y) / 2} textAnchor="end" dominantBaseline="middle" className="t f-opp tnum">
        {texto("opp")}
      </text>
      <text x={(A.x + B.x) / 2 + 16} y={(A.y + B.y) / 2 - 8} className="t f-hyp tnum">
        {texto("hyp")}
      </text>
      <text x={(C.x + A.x) / 2} y={C.y + 24} textAnchor="middle" className="t-sm f-soft">
        dato: {dato} m
      </text>
    </svg>
  );
}
