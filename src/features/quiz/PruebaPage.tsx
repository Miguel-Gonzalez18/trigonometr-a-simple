import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  PlayIcon,
  RefreshIcon,
  StopWatchIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiguraEjercicio } from "../../components/triangles/FiguraEjercicio";
import { BarraProgreso, Boton, Eyebrow, Icono, Tarjeta } from "../../components/ui";
import { EJERCICIOS } from "../../content/ejercicios";
import { TEMAS, TEMAS_POR_ID } from "../../content/temas";
import type { Ejercicio, TemaId } from "../../content/types";
import { registrarPrueba, type ResultadoPrueba } from "../../lib/progress";
import { esCorrecta, parseRespuesta } from "../../lib/trig";
import { useProgreso } from "../../lib/useProgreso";

const POR_TEMA = 2; // 2 preguntas × 5 temas = 10

const mezclar = <T,>(xs: T[]) => {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Dos ejercicios al azar de cada tema, y luego todo mezclado. */
function armarPrueba(): Ejercicio[] {
  const elegidos = TEMAS.flatMap((t) =>
    mezclar(EJERCICIOS.filter((e) => e.temaId === t.id)).slice(0, POR_TEMA),
  );
  return mezclar(elegidos);
}

const reloj = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

type Fase = "inicio" | "andando" | "fin";

export function PruebaPage() {
  const progreso = useProgreso();
  const [fase, setFase] = useState<Fase>("inicio");
  const [preguntas, setPreguntas] = useState<Ejercicio[]>([]);
  const [actual, setActual] = useState(0);
  const [texto, setTexto] = useState("");
  const [opcion, setOpcion] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState<boolean[]>([]);
  const [segundos, setSegundos] = useState(0);
  const inicio = useRef(0);
  /**
   * Cuántas preguntas se han respondido ya. Mientras la tarjeta hace su
   * animación de salida sigue en el DOM y se puede volver a pulsar; este
   * contador descarta ese segundo clic, que llegaría con datos viejos.
   */
  const respondidas = useRef(0);

  // Reloj: cuenta hacia arriba, sin límite. La idea es medirse, no asustarse.
  useEffect(() => {
    if (fase !== "andando") return;
    const t = setInterval(() => setSegundos(Math.round((Date.now() - inicio.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, [fase]);

  function empezar() {
    setPreguntas(armarPrueba());
    setActual(0);
    setAciertos([]);
    setTexto("");
    setOpcion(null);
    setSegundos(0);
    respondidas.current = 0;
    inicio.current = Date.now();
    setFase("andando");
  }

  const pregunta = preguntas[actual];

  function responder() {
    // Si este clic llega de una tarjeta que ya está saliendo, sus datos son
    // viejos y la pregunta ya quedó respondida: lo ignoramos.
    if (!pregunta || respondidas.current !== aciertos.length) return;
    let bien: boolean;
    if (pregunta.respuesta.tipo === "opcion") {
      if (opcion === null) return;
      bien = opcion === pregunta.respuesta.correcta;
    } else {
      const v = parseRespuesta(texto);
      if (v === null) return;
      bien = esCorrecta(v, pregunta.respuesta.valor, pregunta.respuesta.tolerancia);
    }

    const nuevos = [...aciertos, bien];
    respondidas.current = nuevos.length;
    setAciertos(nuevos);
    setTexto("");
    setOpcion(null);

    // El índice sale de cuántas respuestas llevamos, no de sumar uno al
    // anterior: así nunca se pasa del final aunque llegue un clic repetido.
    if (nuevos.length >= preguntas.length) {
      const duracion = Math.round((Date.now() - inicio.current) / 1000);
      const porTema: Record<string, { correctas: number; total: number }> = {};
      preguntas.forEach((p, i) => {
        const r = (porTema[p.temaId] ??= { correctas: 0, total: 0 });
        r.total += 1;
        if (nuevos[i]) r.correctas += 1;
      });
      const resultado: ResultadoPrueba = {
        fecha: new Date().toISOString(),
        duracion,
        correctas: nuevos.filter(Boolean).length,
        total: preguntas.length,
        porTema,
      };
      registrarPrueba(resultado);
      setSegundos(duracion);
      setFase("fin");
    } else {
      setActual(nuevos.length);
    }
  }

  /* ── Pantalla de inicio ─────────────────────────────────────────────── */
  if (fase === "inicio") {
    return (
      <div className="grid gap-5 pt-2">
        <header className="grid gap-3">
          <Eyebrow>Prueba cronometrada</Eyebrow>
          <h1 className="font-display text-[clamp(1.8rem,6vw,2.6rem)] leading-[1.05] font-extrabold tracking-[-0.025em]">
            Diez preguntas, los cinco temas
          </h1>
          <p className="max-w-[36rem] text-[1.05rem] text-ink-soft">
            Dos preguntas de cada tema, en orden mezclado. El reloj cuenta hacia arriba y no te corta:
            está para que sepas cuánto tardas, no para apurarte. Al final verás qué tema conviene
            repasar.
          </p>
        </header>

        <Tarjeta className="grid gap-3">
          <ul className="grid list-none gap-1.5 p-0 text-[0.97rem]">
            <li>· Aquí no hay pistas ni solución a medio camino.</li>
            <li>· Ten la calculadora en DEG a mano.</li>
            <li>· Redondea solo al final, como en el examen.</li>
          </ul>
          <Boton icon={PlayIcon} onClick={empezar} className="self-start">
            Empezar
          </Boton>
        </Tarjeta>

        {progreso.pruebas.length > 0 ? (
          <section className="grid gap-2">
            <h2 className="font-display text-[1.2rem] font-bold">Tus pruebas anteriores</h2>
            {progreso.pruebas.map((p) => (
              <div
                key={p.fecha}
                className="tnum flex flex-wrap items-center gap-x-4 gap-y-1 rounded-piece border-[1.5px] border-line bg-card px-4 py-2.5 text-[0.92rem]"
              >
                <span className="font-display text-[1.1rem] font-bold">
                  {p.correctas}/{p.total}
                </span>
                <span className="text-ink-soft">{reloj(p.duracion)}</span>
                <span className="text-ink-soft">
                  {new Date(p.fecha).toLocaleDateString("es", { day: "numeric", month: "long" })}
                </span>
              </div>
            ))}
          </section>
        ) : null}
      </div>
    );
  }

  /* ── Pantalla de resultados ─────────────────────────────────────────── */
  if (fase === "fin") {
    const correctas = aciertos.filter(Boolean).length;
    const porTema = TEMAS.map((t) => {
      const idxs = preguntas.map((p, i) => ({ p, i })).filter(({ p }) => p.temaId === t.id);
      const bien = idxs.filter(({ i }) => aciertos[i]).length;
      return { tema: t, bien, total: idxs.length };
    });
    const flojos = porTema.filter((x) => x.total > 0 && x.bien < x.total);

    return (
      <div className="grid gap-5 pt-2">
        <header className="grid gap-2">
          <Eyebrow>Resultado</Eyebrow>
          <h1 className="font-display text-[clamp(1.8rem,6vw,2.6rem)] leading-[1.05] font-extrabold tracking-[-0.025em]">
            {correctas} de {preguntas.length}
          </h1>
          <p className="tnum text-[1.02rem] text-ink-soft">
            Tardaste {reloj(segundos)} · {Math.round(segundos / preguntas.length)} s por pregunta.
          </p>
        </header>

        <Tarjeta className="grid gap-3">
          <h2 className="font-display text-[1.15rem] font-bold">Cómo te fue por tema</h2>
          <div className="grid gap-3">
            {porTema.map(({ tema, bien, total }) => (
              <div key={tema.id} className="grid gap-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold">
                    {tema.numero} · {tema.corto}
                  </span>
                  <span className="tnum text-[0.9rem] text-ink-soft">
                    {bien}/{total}
                  </span>
                </div>
                <BarraProgreso
                  valor={total === 0 ? 0 : bien / total}
                  color={bien === total ? "var(--good)" : "var(--hyp)"}
                  etiqueta={`${tema.corto}: ${bien} de ${total}`}
                />
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta className="grid gap-2">
          <h2 className="font-display text-[1.15rem] font-bold">Qué repasar ahora</h2>
          {flojos.length === 0 ? (
            <p className="flex items-center gap-2 text-[1rem]">
              <Icono icon={CheckmarkCircle02Icon} size={20} className="text-good" />
              Los cinco temas salieron completos. Repite la prueba en unos días para ver si se
              sostiene.
            </p>
          ) : (
            <ul className="grid list-none gap-2 p-0">
              {flojos.map(({ tema, bien, total }) => (
                <li key={tema.id}>
                  <Link
                    to={`/tema/${tema.id}`}
                    className="flex items-center gap-2 rounded-piece border-[1.5px] border-line bg-paper px-3 py-2 no-underline transition-colors hover:border-ink"
                  >
                    <span className="font-bold">{tema.tituloEn}</span>
                    <span className="tnum ml-auto text-[0.88rem] text-ink-soft">
                      {bien}/{total}
                    </span>
                    <Icono icon={ArrowRight01Icon} size={17} className="text-ink-soft" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Tarjeta>

        <div className="flex flex-wrap gap-2">
          <Boton icon={RefreshIcon} onClick={empezar}>
            Otra prueba
          </Boton>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-card px-4 py-2 text-[0.95rem] font-bold no-underline hover:border-ink"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  /* ── Pantalla en curso ──────────────────────────────────────────────── */
  if (!pregunta) return null;
  const tema = TEMAS_POR_ID[pregunta.temaId as TemaId];
  const unidad = pregunta.respuesta.tipo === "numero" ? pregunta.respuesta.unidad : undefined;

  return (
    <div className="grid gap-4 pt-2">
      <header className="grid gap-2">
        <div className="tnum flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-display text-[1.15rem] font-bold">
            <Icono icon={StopWatchIcon} size={19} className="text-ink-soft" />
            {reloj(segundos)}
          </span>
          <span className="ml-auto text-[0.9rem] font-bold text-ink-soft">
            {actual + 1} de {preguntas.length}
          </span>
        </div>
        <BarraProgreso valor={actual / preguntas.length} etiqueta="Avance de la prueba" />
      </header>

      {/* Sin animación de salida a propósito: con "mode=wait" la tarjeta
          siguiente solo se monta cuando la anterior termina de salir, y si el
          navegador pausa las animaciones (pestaña en segundo plano) la prueba
          se queda trabada. Así solo entra la nueva pregunta. */}
      <motion.div
        key={pregunta.id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <Tarjeta className="grid gap-4">
          <div className="grid gap-2">
            <Eyebrow>{tema?.corto}</Eyebrow>
            <p className="text-[1.05rem]">{pregunta.enunciado}</p>
          </div>

          {pregunta.figura ? <FiguraEjercicio figura={pregunta.figura} /> : null}

          {pregunta.respuesta.tipo === "opcion" ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {pregunta.respuesta.opciones.map((o, i) => (
                <button
                  key={o}
                  onClick={() => setOpcion(i)}
                  aria-pressed={opcion === i}
                  className={`tnum rounded-piece border-[1.5px] px-3 py-2.5 text-left font-display text-[1.1rem] font-semibold transition-colors ${
                    opcion === i ? "border-ink bg-paper" : "border-line bg-card hover:border-ink"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          ) : (
            <label className="flex flex-wrap items-center gap-2">
              <span className="font-bold">Tu respuesta:</span>
              <span className="inline-flex items-center gap-1.5 rounded-piece border-[1.5px] border-line bg-paper px-3 py-1.5 focus-within:border-ink">
                <input
                  autoFocus
                  type="text"
                  inputMode="decimal"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && responder()}
                  placeholder="0.0"
                  className="tnum w-24 border-0 bg-transparent font-display text-[1.15rem] font-semibold outline-none"
                />
                {unidad ? <span className="font-bold text-ink-soft">{unidad}</span> : null}
              </span>
            </label>
          )}

          <Boton
            icon={ArrowRight01Icon}
            onClick={responder}
            className="self-start"
            disabled={pregunta.respuesta.tipo === "opcion" ? opcion === null : texto.trim() === ""}
          >
            {actual + 1 >= preguntas.length ? "Terminar" : "Siguiente"}
          </Boton>
      </Tarjeta>
      </motion.div>

      <p className="text-[0.88rem] text-ink-soft">
        En la prueba no se muestra si acertaste: el repaso completo viene al final.
      </p>
    </div>
  );
}
