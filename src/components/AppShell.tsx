import {
  BookOpen01Icon,
  FireIcon,
  Home01Icon,
  Moon02Icon,
  RulerIcon,
  StopWatchIcon,
  Sun03Icon,
} from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useProgreso } from "../lib/useProgreso";
import { useTema } from "../lib/theme";
import { Icono } from "./ui";

const ENLACES = [
  { to: "/", icon: Home01Icon, texto: "Inicio" },
  { to: "/prueba", icon: StopWatchIcon, texto: "Prueba" },
  { to: "/glosario", icon: BookOpen01Icon, texto: "Glosario" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { alternar, esOscuro } = useTema();
  const progreso = useProgreso();

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b-[1.5px] border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[64rem] items-center gap-3 px-4 py-2.5">
          <NavLink to="/" className="mr-auto flex items-center gap-2.5 no-underline">
            <Icono icon={RulerIcon} size={24} className="text-opp" />
            <span className="font-display text-[1.05rem] leading-tight font-bold tracking-tight text-ink">
              Trigonometría
              <span className="ml-1.5 font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-ink-soft">
                práctica
              </span>
            </span>
          </NavLink>

          {progreso.racha > 0 ? (
            <span
              className="tnum hidden items-center gap-1.5 text-[0.9rem] font-bold text-ink-soft sm:flex"
              title={`${progreso.racha} ${progreso.racha === 1 ? "día" : "días"} seguidos`}
            >
              <Icono icon={FireIcon} size={17} className="text-hyp" />
              {progreso.racha}
            </span>
          ) : null}

          <span className="tnum hidden rounded-full border-[1.5px] border-line bg-card px-3 py-1 text-[0.85rem] font-bold sm:inline-block">
            {progreso.puntos} pts
          </span>

          <nav className="flex items-center gap-1">
            {ENLACES.map((e) => (
              <NavLink
                key={e.to}
                to={e.to}
                end={e.to === "/"}
                title={e.texto}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-full border-[1.5px] px-2.5 py-1.5 text-[0.9rem] font-bold no-underline transition-colors ${
                    isActive
                      ? "border-ink bg-ink text-card"
                      : "border-line bg-card text-ink hover:border-ink"
                  }`
                }
              >
                <Icono icon={e.icon} size={17} />
                <span className="hidden md:inline">{e.texto}</span>
              </NavLink>
            ))}
            <button
              onClick={alternar}
              title={esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              aria-label={esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="ml-1 rounded-full border-[1.5px] border-line bg-card p-1.5 text-ink transition-colors hover:border-ink"
            >
              <Icono icon={esOscuro ? Sun03Icon : Moon02Icon} size={17} />
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[64rem] px-4 pt-6 pb-20">{children}</main>

      <footer className="mx-auto max-w-[64rem] px-4 pb-10">
        <p className="border-t-[1.5px] border-line pt-4 text-[0.88rem] text-ink-soft">
          La teoría completa, con las ilustraciones y los ejemplos resueltos, está en la guía
          «Trigonometría paso a paso». Esta app es solo para practicar.
        </p>
      </footer>
    </div>
  );
}
