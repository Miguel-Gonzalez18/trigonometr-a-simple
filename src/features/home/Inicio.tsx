import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  FireIcon,
  PlayIcon,
  StopWatchIcon,
  Target02Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MiniTriangulo } from "../../components/triangles/TrianguloRectangulo";
import { BarraProgreso, Eyebrow, Icono, NotaMano, Tarjeta } from "../../components/ui";
import { TEMAS } from "../../content/temas";
import {
  ETIQUETA_ESTADO,
  dominioDeTema,
  estadoDeTema,
  resueltosDeTema,
  resumenGeneral,
  type EstadoTema,
} from "../../lib/progress";
import { useProgreso } from "../../lib/useProgreso";

/** Color de acento de cada estación, siguiendo el código de la guía. */
const ACENTO = ["var(--hyp)", "var(--opp)", "var(--adj)", "var(--leg)", "var(--pb)"];

const COLOR_ESTADO: Record<EstadoTema, string> = {
  "no-iniciado": "var(--ink-soft)",
  "en-progreso": "var(--hyp)",
  dominado: "var(--good)",
};

export function Inicio() {
  const progreso = useProgreso();
  const total = resumenGeneral(progreso);
  const ultima = progreso.pruebas[0];

  return (
    <div className="grid gap-6">
      {/* Portada */}
      <header className="grid gap-4 pt-2 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:items-center">
        <div className="grid gap-3">
          <Eyebrow>Unit 1 · Trigonometry · práctica</Eyebrow>
          <h1 className="font-display text-[clamp(2rem,7vw,3rem)] leading-[1.03] font-extrabold tracking-[-0.025em]">
            Cinco temas, cinco estaciones
          </h1>
          <p className="max-w-[34rem] text-[1.05rem] text-ink-soft">
            La teoría ya está en tu guía. Aquí se practica: mueves escaleras y rampas de verdad,
            resuelves ejercicios con pistas si las necesitas, y ves qué tema ya te sale solo.
          </p>
          <NotaMano>Avanza en orden: cada tema usa el anterior.</NotaMano>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
          <Resumen etiqueta="Resueltos" valor={`${total.resueltos}/${total.total}`} icon={CheckmarkCircle02Icon} />
          <Resumen etiqueta="Puntos" valor={String(total.puntos)} icon={Target02Icon} />
          <Resumen etiqueta="Racha" valor={String(total.racha)} icon={FireIcon} />
        </div>
      </header>

      {/* Las cinco estaciones */}
      <ol className="grid list-none gap-3 p-0">
        {TEMAS.map((tema, i) => {
          const estado = estadoDeTema(progreso, tema.id, tema.escenarios);
          const dominio = dominioDeTema(progreso, tema.id, tema.escenarios);
          const { hechos, total: cuantos } = resueltosDeTema(progreso, tema.id);
          const acento = ACENTO[i];

          return (
            <motion.li
              key={tema.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Link
                to={`/tema/${tema.id}`}
                className="group block rounded-card border-[1.5px] border-line bg-card p-4 no-underline transition-colors hover:border-ink sm:p-5"
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4">
                  {/* Número de estación, con una regla de medir al lado */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-piece border-[2px] font-display text-[1.3rem] font-extrabold"
                      style={{ borderColor: acento, color: acento }}
                    >
                      {tema.numero}
                    </span>
                    <span className="hidden w-11 sm:block">
                      <MiniTriangulo adyacente={4} opuesto={3} />
                    </span>
                  </div>

                  <div className="grid gap-1.5">
                    <h2 className="font-display text-[1.15rem] leading-tight font-bold">
                      {tema.tituloEn}
                    </h2>
                    <p className="text-[0.92rem] text-ink-soft">{tema.tituloEs}</p>
                    <p className="text-[0.97rem]">{tema.resumen}</p>

                    <div className="mt-1 grid gap-1.5">
                      <BarraProgreso valor={dominio} color={acento} etiqueta={`Dominio de ${tema.tituloEs}`} />
                      <div className="tnum flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-ink-soft">
                        <span className="font-bold" style={{ color: COLOR_ESTADO[estado] }}>
                          {ETIQUETA_ESTADO[estado]}
                        </span>
                        <span>
                          {hechos}/{cuantos} ejercicios
                        </span>
                        <span>
                          {tema.escenarios.filter((s) => progreso.escenariosVistos.includes(s)).length}/
                          {tema.escenarios.length} escenarios
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="self-center text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink">
                    <Icono icon={ArrowRight01Icon} size={22} />
                  </span>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </ol>

      {/* Prueba cronometrada */}
      <Tarjeta className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="grid gap-1.5">
          <Eyebrow>Prueba cronometrada</Eyebrow>
          <h2 className="font-display text-[1.2rem] font-bold">Diez preguntas de los cinco temas</h2>
          <p className="text-[0.97rem] text-ink-soft">
            Mezcladas y con reloj, como en un examen. Al final te dice qué tema repasar, sin nota ni
            castigo.
          </p>
          {ultima ? (
            <p className="tnum text-[0.88rem] text-ink-soft">
              Tu última prueba: {ultima.correctas}/{ultima.total} en {Math.round(ultima.duracion / 60)} min{" "}
              {Math.round(ultima.duracion % 60)} s.
            </p>
          ) : null}
        </div>
        <Link
          to="/prueba"
          className="inline-flex items-center gap-2 self-start rounded-full border-[1.5px] border-ink bg-ink px-4 py-2 text-[0.95rem] font-bold text-card no-underline transition-opacity hover:opacity-90 sm:self-center"
        >
          <Icono icon={ultima ? StopWatchIcon : PlayIcon} size={18} />
          {ultima ? "Hacerla otra vez" : "Empezar la prueba"}
        </Link>
      </Tarjeta>
    </div>
  );
}

function Resumen({
  etiqueta,
  valor,
  icon,
}: {
  etiqueta: string;
  valor: string;
  icon: Parameters<typeof Icono>[0]["icon"];
}) {
  return (
    <div className="rounded-piece border-[1.5px] border-line bg-card px-3 py-2.5">
      <span className="flex items-center gap-1.5 text-[0.76rem] font-bold tracking-[0.08em] text-ink-soft uppercase">
        <Icono icon={icon} size={15} />
        {etiqueta}
      </span>
      <strong className="tnum mt-0.5 block font-display text-[1.5rem] leading-none font-extrabold">
        {valor}
      </strong>
    </div>
  );
}
