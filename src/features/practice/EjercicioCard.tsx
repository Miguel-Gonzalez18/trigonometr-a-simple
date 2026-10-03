import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Idea01Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FiguraEjercicio } from "../../components/triangles/FiguraEjercicio";
import { Boton, Eyebrow, Icono } from "../../components/ui";
import type { Ejercicio } from "../../content/types";
import { esCorrecta, parseRespuesta } from "../../lib/trig";
import { registrarAcierto, registrarFallo } from "../../lib/progress";
import { useProgreso } from "../../lib/useProgreso";

const ETIQUETA_PISTA = ["Pista 1 · la idea", "Pista 2 · la fórmula", "Pista 3 · el primer paso"];

type Estado = "abierto" | "correcto" | "incorrecto";

export function EjercicioCard({ ejercicio, indice }: { ejercicio: Ejercicio; indice: number }) {
  const progreso = useProgreso();
  const yaResuelto = progreso.ejercicios[ejercicio.id]?.resuelto === true;

  const [pistas, setPistas] = useState(0);
  const [texto, setTexto] = useState("");
  const [opcion, setOpcion] = useState<number | null>(null);
  const [estado, setEstado] = useState<Estado>("abierto");
  const [verSolucion, setVerSolucion] = useState(false);

  // Const local: así el estrechamiento de tipo sobrevive dentro de los
  // callbacks del JSX.
  const resp = ejercicio.respuesta;

  function verificar() {
    let bien: boolean;
    if (ejercicio.respuesta.tipo === "opcion") {
      if (opcion === null) return;
      bien = opcion === ejercicio.respuesta.correcta;
    } else {
      const valor = parseRespuesta(texto);
      if (valor === null) return;
      bien = esCorrecta(valor, ejercicio.respuesta.valor, ejercicio.respuesta.tolerancia);
    }

    if (bien) {
      setEstado("correcto");
      setVerSolucion(true);
      registrarAcierto(ejercicio.id, ejercicio.puntos, pistas);
    } else {
      setEstado("incorrecto");
      registrarFallo(ejercicio.id);
    }
  }

  function reintentar() {
    setEstado("abierto");
    setTexto("");
    setOpcion(null);
    setVerSolucion(false);
  }

  const unidad = resp.tipo === "numero" ? resp.unidad : undefined;

  return (
    <article
      className={`rounded-card border-[1.5px] bg-card p-5 sm:p-6 ${
        estado === "correcto" ? "border-good" : "border-line"
      }`}
    >
      <header className="mb-3 flex flex-wrap items-center gap-2">
        <Eyebrow className="mr-auto">
          Ejercicio {indice}
          {ejercicio.nivel === 3 ? " · un paso extra" : ejercicio.nivel === 2 ? " · normal" : ""}
        </Eyebrow>
        {yaResuelto && estado !== "correcto" ? (
          <span className="flex items-center gap-1.5 text-[0.82rem] font-bold text-good">
            <Icono icon={CheckmarkCircle02Icon} size={16} />
            Ya lo resolviste
          </span>
        ) : null}
        <span className="tnum text-[0.82rem] font-bold text-ink-soft">{ejercicio.puntos} pts</span>
      </header>

      <p className="text-[1.03rem]">{ejercicio.enunciado}</p>

      {ejercicio.figura ? (
        <div className="mt-4">
          <FiguraEjercicio figura={ejercicio.figura} />
        </div>
      ) : null}

      {/* Pistas progresivas: se abren de una en una, en orden. */}
      <div className="mt-4 grid gap-2">
        <AnimatePresence initial={false}>
          {ejercicio.pistas.slice(0, pistas).map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-piece bg-mark px-4 py-3 text-mark-ink">
                <span className="mb-0.5 block font-hand text-[1.3rem] leading-none">
                  {ETIQUETA_PISTA[i]}
                </span>
                <p className="text-[0.97rem]">{p}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {pistas < 3 && estado !== "correcto" ? (
          <Boton
            variante="contorno"
            icon={Idea01Icon}
            onClick={() => setPistas((n) => n + 1)}
            className="self-start"
          >
            {pistas === 0 ? "Dame una pista" : "Otra pista"}
          </Boton>
        ) : null}
      </div>

      {/* Respuesta */}
      <div className="mt-4 border-t-[1.5px] border-line pt-4">
        {resp.tipo === "opcion" ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {resp.opciones.map((o, i) => {
              const elegida = opcion === i;
              const esLaBuena = i === resp.correcta;
              const revelar = estado === "correcto";
              return (
                <button
                  key={o}
                  onClick={() => estado !== "correcto" && setOpcion(i)}
                  aria-pressed={elegida}
                  disabled={estado === "correcto"}
                  className={`tnum rounded-piece border-[1.5px] px-3 py-2.5 text-left font-display text-[1.1rem] font-semibold transition-colors ${
                    revelar && esLaBuena
                      ? "border-good bg-good-tint"
                      : elegida
                        ? "border-ink bg-paper"
                        : "border-line bg-card hover:border-ink"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        ) : (
          <label className="flex flex-wrap items-center gap-2">
            <span className="font-bold">Tu respuesta:</span>
            <span className="inline-flex items-center gap-1.5 rounded-piece border-[1.5px] border-line bg-paper px-3 py-1.5 focus-within:border-ink">
              <input
                type="text"
                inputMode="decimal"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && verificar()}
                disabled={estado === "correcto"}
                placeholder="0.0"
                className="tnum w-24 border-0 bg-transparent font-display text-[1.15rem] font-semibold outline-none"
              />
              {unidad ? <span className="font-bold text-ink-soft">{unidad}</span> : null}
            </span>
          </label>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {estado === "correcto" ? (
            <>
              <span className="flex items-center gap-1.5 font-bold text-good">
                <Icono icon={CheckmarkCircle02Icon} size={20} />
                Correcto
              </span>
              <Boton variante="fantasma" icon={RefreshIcon} onClick={reintentar}>
                Hacerlo otra vez
              </Boton>
            </>
          ) : (
            <>
              <Boton onClick={verificar}>Verificar</Boton>
              {!verSolucion ? (
                <Boton variante="fantasma" onClick={() => setVerSolucion(true)}>
                  Ver la solución
                </Boton>
              ) : null}
            </>
          )}
        </div>

        <AnimatePresence>
          {estado === "incorrecto" ? (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-start gap-2 rounded-piece bg-warn-tint px-3 py-2 text-[0.95rem]"
            >
              <Icono icon={AlertCircleIcon} size={18} className="mt-0.5 shrink-0 text-warn" />
              <span>
                No es esa. Revisa si redondeaste antes de tiempo, y si la calculadora está en DEG.
                Abre otra pista o mira la solución paso a paso.
              </span>
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Solución paso a paso, con el mismo estilo de la guía. */}
      <AnimatePresence initial={false}>
        {verSolucion ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-piece bg-good-tint px-4 py-4">
              <Eyebrow className="mb-2">Solución paso a paso</Eyebrow>
              <ol className="grid list-none gap-2.5 p-0">
                {ejercicio.pasos.map((p, i) => (
                  <li key={i} className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-display text-[0.9rem] font-bold text-card">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[0.97rem]">{p.texto}</p>
                      {p.calculo ? (
                        <p
                          className={`tnum mt-0.5 font-display text-[1.08rem] font-semibold whitespace-nowrap ${
                            p.final ? "text-good" : ""
                          }`}
                        >
                          {p.calculo}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
