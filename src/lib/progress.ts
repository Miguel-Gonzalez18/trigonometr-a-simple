import { EJERCICIOS, ejerciciosDeTema } from "../content/ejercicios";
import type { TemaId } from "../content/types";

/**
 * Capa de persistencia. Todo vive en localStorage: no hay backend ni login.
 * Si el navegador bloquea el almacenamiento, la app sigue funcionando en
 * memoria durante la sesión y no se cae.
 */

const CLAVE = "trigo.progreso.v1";

export type EstadoTema = "no-iniciado" | "en-progreso" | "dominado";

export interface RegistroEjercicio {
  /** Lo resolvió bien al menos una vez. */
  resuelto: boolean;
  /** Intentos fallidos acumulados. */
  fallos: number;
  /** Cuántas pistas abrió la última vez que lo resolvió. */
  pistasUsadas: number;
  /** Fecha ISO del primer acierto. */
  fecha?: string;
}

export interface ResultadoPrueba {
  fecha: string;
  /** Segundos que tardó. */
  duracion: number;
  correctas: number;
  total: number;
  /** Aciertos y total por tema, para saber qué repasar. */
  porTema: Record<string, { correctas: number; total: number }>;
}

export interface Progreso {
  ejercicios: Record<string, RegistroEjercicio>;
  puntos: number;
  /** Días seguidos practicando. */
  racha: number;
  /** Último día (YYYY-MM-DD) con actividad. */
  ultimoDia: string | null;
  /** Historial de pruebas cronometradas, de la más nueva a la más vieja. */
  pruebas: ResultadoPrueba[];
  /** Escenarios que ya abrió, para marcar el tema como empezado. */
  escenariosVistos: string[];
}

const VACIO: Progreso = {
  ejercicios: {},
  puntos: 0,
  racha: 0,
  ultimoDia: null,
  pruebas: [],
  escenariosVistos: [],
};

const hoy = () => new Date().toISOString().slice(0, 10);

const diasEntre = (a: string, b: string) => {
  const ms = new Date(`${b}T00:00:00`).getTime() - new Date(`${a}T00:00:00`).getTime();
  return Math.round(ms / 86400000);
};

function leer(): Progreso {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return { ...VACIO };
    const datos = JSON.parse(crudo) as Partial<Progreso>;
    return { ...VACIO, ...datos };
  } catch {
    return { ...VACIO };
  }
}

function escribir(p: Progreso) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(p));
  } catch {
    // Modo privado o almacenamiento bloqueado: seguimos solo en memoria.
  }
}

/** Caché en memoria para que los componentes lean sin tocar disco cada vez. */
let actual: Progreso = leer();

type Oyente = (p: Progreso) => void;
const oyentes = new Set<Oyente>();

export const getProgreso = () => actual;

export function suscribir(fn: Oyente) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}

function actualizar(cambio: (p: Progreso) => Progreso) {
  actual = cambio(actual);
  escribir(actual);
  oyentes.forEach((fn) => fn(actual));
}

/** Marca el día de hoy como activo y recalcula la racha. */
function marcarDia(p: Progreso): Progreso {
  const d = hoy();
  if (p.ultimoDia === d) return p;
  const seguida = p.ultimoDia !== null && diasEntre(p.ultimoDia, d) === 1;
  return { ...p, ultimoDia: d, racha: seguida ? p.racha + 1 : 1 };
}

/**
 * Registra un acierto. Cada pista usada descuenta una parte de los puntos,
 * pero resolverlo con las tres pistas todavía vale algo: la idea es que use
 * las pistas sin sentir que "pierde".
 */
export function registrarAcierto(ejercicioId: string, puntosBase: number, pistasUsadas: number) {
  actualizar((p) => {
    const previo = p.ejercicios[ejercicioId];
    const yaEstaba = previo?.resuelto === true;
    const ganados = yaEstaba ? 0 : Math.max(Math.round(puntosBase * (1 - 0.2 * pistasUsadas)), 3);
    return marcarDia({
      ...p,
      puntos: p.puntos + ganados,
      ejercicios: {
        ...p.ejercicios,
        [ejercicioId]: {
          resuelto: true,
          fallos: previo?.fallos ?? 0,
          pistasUsadas,
          fecha: previo?.fecha ?? new Date().toISOString(),
        },
      },
    });
  });
}

export function registrarFallo(ejercicioId: string) {
  actualizar((p) => {
    const previo = p.ejercicios[ejercicioId];
    return marcarDia({
      ...p,
      ejercicios: {
        ...p.ejercicios,
        [ejercicioId]: {
          resuelto: previo?.resuelto ?? false,
          fallos: (previo?.fallos ?? 0) + 1,
          pistasUsadas: previo?.pistasUsadas ?? 0,
          fecha: previo?.fecha,
        },
      },
    });
  });
}

export function registrarEscenarioVisto(id: string) {
  actualizar((p) =>
    p.escenariosVistos.includes(id)
      ? p
      : marcarDia({ ...p, escenariosVistos: [...p.escenariosVistos, id] }),
  );
}

export function registrarPrueba(r: ResultadoPrueba) {
  actualizar((p) =>
    marcarDia({
      ...p,
      puntos: p.puntos + r.correctas * 5,
      pruebas: [r, ...p.pruebas].slice(0, 10),
    }),
  );
}

export function reiniciarProgreso() {
  actualizar(() => ({ ...VACIO }));
}

/** Cuántos ejercicios del tema están resueltos. */
export function resueltosDeTema(p: Progreso, temaId: TemaId) {
  const lista = ejerciciosDeTema(temaId);
  const hechos = lista.filter((e) => p.ejercicios[e.id]?.resuelto).length;
  return { hechos, total: lista.length };
}

/**
 * Dominio del tema, de 0 a 1. Pesa los ejercicios (80%) y los escenarios
 * explorados (20%): tocar los escenarios también es practicar.
 */
export function dominioDeTema(p: Progreso, temaId: TemaId, escenarios: string[]) {
  const { hechos, total } = resueltosDeTema(p, temaId);
  const vistos = escenarios.filter((s) => p.escenariosVistos.includes(s)).length;
  const porEjercicios = total === 0 ? 0 : hechos / total;
  const porEscenarios = escenarios.length === 0 ? 0 : vistos / escenarios.length;
  return Math.min(porEjercicios * 0.8 + porEscenarios * 0.2, 1);
}

export function estadoDeTema(p: Progreso, temaId: TemaId, escenarios: string[]): EstadoTema {
  const d = dominioDeTema(p, temaId, escenarios);
  if (d >= 0.85) return "dominado";
  if (d > 0) return "en-progreso";
  return "no-iniciado";
}

export const ETIQUETA_ESTADO: Record<EstadoTema, string> = {
  "no-iniciado": "Sin empezar",
  "en-progreso": "En progreso",
  dominado: "Dominado",
};

/** Totales para la cabecera del inicio. */
export function resumenGeneral(p: Progreso) {
  const resueltos = EJERCICIOS.filter((e) => p.ejercicios[e.id]?.resuelto).length;
  return { resueltos, total: EJERCICIOS.length, puntos: p.puntos, racha: p.racha };
}
