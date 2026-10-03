import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Link, useParams } from "react-router-dom";
import {
  Aviso,
  BarraProgreso,
  Colapsable,
  Ecuacion,
  Eyebrow,
  Icono,
  Tarjeta,
} from "../../components/ui";
import { TEMAS, getTema } from "../../content/temas";
import { ejerciciosDeTema } from "../../content/ejercicios";
import { dominioDeTema, resueltosDeTema } from "../../lib/progress";
import { useProgreso } from "../../lib/useProgreso";
import { EjercicioCard } from "./EjercicioCard";
import { ESCENARIOS } from "./escenarios";

const ACENTO: Record<string, string> = {
  pitagoras: "var(--hyp)",
  razones: "var(--opp)",
  "lados-angulos": "var(--adj)",
  identidades: "var(--leg)",
  leyes: "var(--pb)",
};

export function TemaPage() {
  const { temaId = "" } = useParams();
  const tema = getTema(temaId);
  const progreso = useProgreso();

  if (!tema) {
    return (
      <div className="grid gap-4">
        <h1 className="font-display text-[1.6rem] font-bold">Ese tema no existe</h1>
        <Link to="/" className="font-bold">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const ejercicios = ejerciciosDeTema(tema.id);
  const { hechos, total } = resueltosDeTema(progreso, tema.id);
  const dominio = dominioDeTema(progreso, tema.id, tema.escenarios);
  const acento = ACENTO[tema.id] ?? "var(--ink)";

  const indice = TEMAS.findIndex((t) => t.id === tema.id);
  const anterior = indice > 0 ? TEMAS[indice - 1] : null;
  const siguiente = indice < TEMAS.length - 1 ? TEMAS[indice + 1] : null;

  return (
    <div className="grid gap-6">
      {/* Cabecera del tema */}
      <header className="grid gap-3 pt-1">
        <Link
          to="/"
          className="flex w-fit items-center gap-1.5 text-[0.9rem] font-bold text-ink-soft no-underline hover:text-ink"
        >
          <Icono icon={ArrowLeft01Icon} size={17} />
          Todos los temas
        </Link>

        <Eyebrow>Tema {tema.numero} de 5</Eyebrow>
        <h1
          className="font-display text-[clamp(1.6rem,5.5vw,2.4rem)] leading-[1.08] font-extrabold tracking-[-0.02em]"
          style={{ color: acento }}
        >
          {tema.tituloEn}
        </h1>
        <p className="text-[1.08rem] text-ink-soft">{tema.tituloEs}</p>

        <div className="grid max-w-[28rem] gap-1.5">
          <BarraProgreso valor={dominio} color={acento} etiqueta={`Dominio de ${tema.tituloEs}`} />
          <p className="tnum text-[0.85rem] text-ink-soft">
            {hechos} de {total} ejercicios · {Math.round(dominio * 100)}% de dominio
          </p>
        </div>
      </header>

      {/* Recordatorio corto: la clase completa está en la guía */}
      <Colapsable titulo="Lo que necesitas recordar" pista="fórmulas" abiertoInicial>
        <div className="grid gap-3">
          <div className="grid gap-2">
            {tema.formulas.map((f) => (
              <div key={f.eq} className="grid gap-1">
                <Ecuacion>{f.eq}</Ecuacion>
                <p className="px-1 text-[0.9rem] text-ink-soft">{f.nota}</p>
              </div>
            ))}
          </div>
          <Aviso>{tema.cuidado}</Aviso>
        </div>
      </Colapsable>

      {/* Escenarios interactivos */}
      <section className="grid gap-3">
        <div className="grid gap-1">
          <h2 className="font-display text-[1.4rem] font-extrabold tracking-[-0.015em]">
            Juega con el dibujo
          </h2>
          <p className="text-[0.97rem] text-ink-soft">
            Mueve los controles y mira cómo cambia el resultado. No hay nada que responder aquí.
          </p>
        </div>
        {tema.escenarios.map((id) => {
          const Escenario = ESCENARIOS[id];
          return Escenario ? <Escenario key={id} /> : null;
        })}
      </section>

      {/* Ejercicios */}
      <section className="grid gap-3">
        <div className="grid gap-1">
          <h2 className="font-display text-[1.4rem] font-extrabold tracking-[-0.015em]">
            Ahora inténtalo tú
          </h2>
          <p className="text-[0.97rem] text-ink-soft">
            Usa las pistas cuando las necesites: pedirlas no es trampa, y el ejercicio sigue
            contando.
          </p>
        </div>
        {ejercicios.map((e, i) => (
          <EjercicioCard key={e.id} ejercicio={e} indice={i + 1} />
        ))}
      </section>

      {/* Navegación entre temas */}
      <nav className="grid gap-2 sm:grid-cols-2">
        {anterior ? (
          <Tarjeta as="article" className="p-4">
            <Link to={`/tema/${anterior.id}`} className="grid gap-0.5 no-underline">
              <span className="flex items-center gap-1.5 text-[0.82rem] font-bold text-ink-soft">
                <Icono icon={ArrowLeft01Icon} size={15} />
                Tema {anterior.numero}
              </span>
              <span className="font-display text-[1.02rem] font-bold">{anterior.tituloEn}</span>
            </Link>
          </Tarjeta>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Tarjeta as="article" className="p-4 sm:text-right">
            <Link to={`/tema/${siguiente.id}`} className="grid gap-0.5 no-underline">
              <span className="flex items-center gap-1.5 text-[0.82rem] font-bold text-ink-soft sm:justify-end">
                Tema {siguiente.numero}
                <Icono icon={ArrowRight01Icon} size={15} />
              </span>
              <span className="font-display text-[1.02rem] font-bold">{siguiente.tituloEn}</span>
            </Link>
          </Tarjeta>
        ) : (
          <Tarjeta as="article" className="p-4 sm:text-right">
            <Link to="/prueba" className="grid gap-0.5 no-underline">
              <span className="flex items-center gap-1.5 text-[0.82rem] font-bold text-ink-soft sm:justify-end">
                Ya viste los cinco
                <Icono icon={ArrowRight01Icon} size={15} />
              </span>
              <span className="font-display text-[1.02rem] font-bold">
                Hacer la prueba cronometrada
              </span>
            </Link>
          </Tarjeta>
        )}
      </nav>
    </div>
  );
}
