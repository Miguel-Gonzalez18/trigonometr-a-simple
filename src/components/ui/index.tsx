import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";

/* ── Iconografía ──────────────────────────────────────────────────────────
   Un solo punto de entrada a Hugeicons: trazo de 1.8 y tamaño en píxeles.
   Nunca dentro de círculos pastel: el icono va directo sobre el papel. */
export function Icono({
  icon,
  size = 20,
  className,
}: {
  icon: IconSvgElement;
  size?: number;
  className?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={1.8}
      className={className}
      aria-hidden
    />
  );
}

/* ── Tarjeta ─────────────────────────────────────────────────────────────── */
export function Tarjeta({
  children,
  className = "",
  as: Etiqueta = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return (
    <Etiqueta
      className={`rounded-card border-[1.5px] border-line bg-card p-5 sm:p-6 ${className}`}
    >
      {children}
    </Etiqueta>
  );
}

/* ── Etiqueta de sección (eyebrow) ───────────────────────────────────────── */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft ${className}`}>
      {children}
    </p>
  );
}

/* ── Nota a mano ─────────────────────────────────────────────────────────── */
export function NotaMano({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`font-hand text-[1.55rem] leading-none text-opp-ink ${className}`}
      style={{ transform: "rotate(-1.2deg)", transformOrigin: "left" }}
    >
      {children}
    </p>
  );
}

/* ── Botón ───────────────────────────────────────────────────────────────── */
type VarianteBoton = "solido" | "contorno" | "fantasma";

export function Boton({
  children,
  onClick,
  variante = "solido",
  icon,
  type = "button",
  disabled,
  className = "",
  title,
}: {
  children?: ReactNode;
  onClick?: () => void;
  variante?: VarianteBoton;
  icon?: IconSvgElement;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  title?: string;
}) {
  const estilos: Record<VarianteBoton, string> = {
    solido: "bg-ink text-card border-ink hover:opacity-90",
    contorno: "bg-card text-ink border-line hover:border-ink",
    fantasma: "bg-transparent text-ink-soft border-transparent hover:text-ink",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-[0.95rem] font-bold transition-[opacity,border-color,color] duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${estilos[variante]} ${className}`}
    >
      {icon ? <Icono icon={icon} size={18} /> : null}
      {children}
    </button>
  );
}

/* ── Fórmula destacada ───────────────────────────────────────────────────── */
export function Ecuacion({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`tnum overflow-x-auto rounded-piece border-[1.5px] border-line bg-paper px-3 py-2.5 text-center font-display text-[1.2rem] font-semibold ${className}`}
    >
      {children}
    </p>
  );
}

/* ── Bloque "cuidado con esto" ───────────────────────────────────────────── */
export function Aviso({ titulo = "Error típico", children }: { titulo?: string; children: ReactNode }) {
  return (
    <div className="rounded-piece bg-warn-tint px-4 py-3 text-[0.97rem]">
      <b className="text-warn">{titulo}. </b>
      {children}
    </div>
  );
}

/* ── Colapsable ──────────────────────────────────────────────────────────── */
export function Colapsable({
  titulo,
  children,
  abiertoInicial = false,
  pista,
}: {
  titulo: ReactNode;
  children: ReactNode;
  abiertoInicial?: boolean;
  pista?: string;
}) {
  const [abierto, setAbierto] = useState(abiertoInicial);
  const id = useId();
  return (
    <div className="rounded-piece border-[1.5px] border-line bg-card">
      <button
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="font-display text-[1.05rem] font-bold">{titulo}</span>
        <span className="flex items-center gap-2 text-ink-soft">
          {pista ? <span className="text-[0.85rem] font-bold">{pista}</span> : null}
          <motion.span animate={{ rotate: abierto ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <Icono icon={ArrowDown01Icon} size={18} />
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {abierto ? (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t-[1.5px] border-line px-4 py-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ── Barra de progreso ───────────────────────────────────────────────────── */
export function BarraProgreso({
  valor,
  color = "var(--ink)",
  alto = 8,
  etiqueta,
}: {
  /** De 0 a 1. */
  valor: number;
  color?: string;
  alto?: number;
  etiqueta?: string;
}) {
  const pct = Math.round(Math.min(Math.max(valor, 0), 1) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={etiqueta}
      className="w-full overflow-hidden rounded-full bg-paper ring-[1.5px] ring-line ring-inset"
      style={{ height: alto }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      />
    </div>
  );
}

/* ── Lectura de un valor calculado ───────────────────────────────────────── */
export function Lectura({
  etiqueta,
  valor,
  destacado = false,
  color,
}: {
  etiqueta: ReactNode;
  valor: ReactNode;
  destacado?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`tnum rounded-piece border-[1.5px] px-3 py-2 ${
        destacado ? "border-good bg-good-tint" : "border-line bg-paper"
      }`}
    >
      <span className="block text-[0.78rem] font-bold text-ink-soft">{etiqueta}</span>
      <strong className="font-display text-[1.2rem]" style={color ? { color } : undefined}>
        {valor}
      </strong>
    </div>
  );
}

/* ── Control deslizante ──────────────────────────────────────────────────── */
export function Deslizador({
  etiqueta,
  valor,
  min,
  max,
  paso = 1,
  unidad = "",
  onChange,
  color = "var(--opp)",
}: {
  etiqueta: string;
  valor: number;
  min: number;
  max: number;
  paso?: number;
  unidad?: string;
  onChange: (v: number) => void;
  color?: string;
}) {
  const id = useId();
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 font-bold">
        <span>{etiqueta}</span>
        <span className="tnum font-display text-[1.05rem]" style={{ color }}>
          {valor}
          {unidad}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
    </div>
  );
}

/* ── Píldora de estado ───────────────────────────────────────────────────── */
export function Pildora({
  children,
  color,
  fondo,
}: {
  children: ReactNode;
  color?: string;
  fondo?: string;
}) {
  return (
    <span
      className="inline-block rounded px-1.5 py-[0.05em] text-[0.85rem] font-bold whitespace-nowrap"
      style={{ color, background: fondo }}
    >
      {children}
    </span>
  );
}

export { Fig } from "./Fig";
