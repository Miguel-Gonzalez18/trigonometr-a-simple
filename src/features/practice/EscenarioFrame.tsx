import { useEffect, type ReactNode } from "react";
import { registrarEscenarioVisto } from "../../lib/progress";
import { Eyebrow } from "../../components/ui";

/**
 * Marco común de los escenarios interactivos: título, una línea de contexto,
 * el dibujo, los controles y las lecturas. Registra la visita para que el
 * tema cuente como empezado.
 */
export function EscenarioFrame({
  id,
  titulo,
  contexto,
  dibujo,
  controles,
  lecturas,
  cierre,
}: {
  id: string;
  titulo: string;
  contexto: string;
  dibujo: ReactNode;
  controles: ReactNode;
  lecturas: ReactNode;
  cierre?: ReactNode;
}) {
  useEffect(() => {
    registrarEscenarioVisto(id);
  }, [id]);

  return (
    <article className="rounded-card border-[1.5px] border-line bg-card p-5 sm:p-6">
      <header className="mb-4 flex flex-col gap-1">
        <Eyebrow>Escenario</Eyebrow>
        <h3 className="font-display text-[1.2rem] font-bold">{titulo}</h3>
        <p className="text-[0.97rem] text-ink-soft">{contexto}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
        <div>{dibujo}</div>
        <div className="grid gap-4">
          <div className="grid gap-3">{controles}</div>
          <div className="grid gap-2 sm:grid-cols-2">{lecturas}</div>
        </div>
      </div>

      {cierre ? <div className="mt-4">{cierre}</div> : null}
    </article>
  );
}
