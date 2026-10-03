import { Search01Icon } from "@hugeicons/core-free-icons";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MiniTriangulo } from "../../components/triangles/TrianguloRectangulo";
import { Eyebrow, Icono } from "../../components/ui";
import { GLOSARIO } from "../../content/glosario";
import { TEMAS, TEMAS_POR_ID } from "../../content/temas";
import type { TemaId } from "../../content/types";

/** Quita acentos para que "razon" encuentre "razón". */
const plano = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function GlosarioPage() {
  const [consulta, setConsulta] = useState("");
  const [filtroTema, setFiltroTema] = useState<TemaId | "todos">("todos");

  const resultados = useMemo(() => {
    const q = plano(consulta.trim());
    return GLOSARIO.filter((t) => {
      if (filtroTema !== "todos" && t.temaId !== filtroTema) return false;
      if (q === "") return true;
      const campos = [t.termino, t.en ?? "", t.definicion, t.formula ?? "", ...(t.alias ?? [])];
      return campos.some((c) => plano(c).includes(q));
    });
  }, [consulta, filtroTema]);

  return (
    <div className="grid gap-5 pt-2">
      <header className="grid gap-3">
        <Eyebrow>Glosario</Eyebrow>
        <h1 className="font-display text-[clamp(1.8rem,6vw,2.6rem)] leading-[1.05] font-extrabold tracking-[-0.025em]">
          Cada palabra, en los dos idiomas
        </h1>
        <p className="max-w-[36rem] text-[1.05rem] text-ink-soft">
          Las mismas palabras que usas en clase, con su traducción y la fórmula cuando hay una.
          Busca en español o en inglés.
        </p>
      </header>

      <div className="grid gap-3">
        <label className="flex items-center gap-2 rounded-piece border-[1.5px] border-line bg-card px-3 py-2 focus-within:border-ink">
          <Icono icon={Search01Icon} size={19} className="text-ink-soft" />
          <input
            type="search"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="hipotenusa, opposite, SOH, ley de los senos…"
            className="w-full border-0 bg-transparent text-[1rem] outline-none"
            aria-label="Buscar en el glosario"
          />
        </label>

        <div className="flex flex-wrap gap-1.5">
          <BotonFiltro activo={filtroTema === "todos"} onClick={() => setFiltroTema("todos")}>
            Todos
          </BotonFiltro>
          {TEMAS.map((t) => (
            <BotonFiltro
              key={t.id}
              activo={filtroTema === t.id}
              onClick={() => setFiltroTema(t.id)}
            >
              {t.numero} · {t.corto}
            </BotonFiltro>
          ))}
        </div>
      </div>

      <p className="tnum text-[0.88rem] text-ink-soft">
        {resultados.length} {resultados.length === 1 ? "término" : "términos"}
      </p>

      {resultados.length === 0 ? (
        <p className="rounded-piece border-[1.5px] border-line bg-card px-4 py-6 text-center text-ink-soft">
          Nada con esa palabra. Prueba con el término en inglés, o quita el filtro de tema.
        </p>
      ) : (
        <dl className="grid gap-3 sm:grid-cols-2">
          {resultados.map((t) => {
            const tema = TEMAS_POR_ID[t.temaId];
            return (
              <div
                key={t.termino}
                className="grid gap-2 rounded-card border-[1.5px] border-line bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="grid gap-0.5">
                    <dt className="font-display text-[1.1rem] leading-tight font-bold">
                      {t.termino}
                    </dt>
                    {t.en ? (
                      <p className="text-[0.88rem] font-bold tracking-[0.02em] text-ink-soft">
                        {t.en}
                      </p>
                    ) : null}
                  </div>
                  {t.destaca ? (
                    <span className="w-[5.5rem] shrink-0">
                      <MiniTriangulo destacado={t.destaca} />
                    </span>
                  ) : null}
                </div>

                <dd className="m-0 grid gap-2">
                  <p className="text-[0.97rem]">{t.definicion}</p>
                  {t.formula ? (
                    <p className="tnum overflow-x-auto rounded-piece border-[1.5px] border-line bg-paper px-2.5 py-1.5 font-display text-[1rem] font-semibold">
                      {t.formula}
                    </p>
                  ) : null}
                  <Link
                    to={`/tema/${t.temaId}`}
                    className="w-fit text-[0.85rem] font-bold text-ink-soft no-underline hover:text-ink"
                  >
                    Practicar tema {tema.numero} · {tema.corto} →
                  </Link>
                </dd>
              </div>
            );
          })}
        </dl>
      )}
    </div>
  );
}

function BotonFiltro({
  children,
  activo,
  onClick,
}: {
  children: React.ReactNode;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={activo}
      className={`rounded-full border-[1.5px] px-3 py-1 text-[0.88rem] font-bold whitespace-nowrap transition-colors ${
        activo ? "border-ink bg-ink text-card" : "border-line bg-card text-ink hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
