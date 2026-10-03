import type { DefTriangulo, ParteTri } from "../components/triangles/TrianguloEscaleno";
import type { LadoRect } from "../components/triangles/TrianguloRectangulo";

/** Los cinco temas de la unidad, en el orden de la guía. */
export type TemaId = "pitagoras" | "razones" | "lados-angulos" | "identidades" | "leyes";

export interface Tema {
  id: TemaId;
  numero: number;
  /** Nombre en inglés, como lo da el colegio. */
  tituloEn: string;
  /** Nombre en español, como en la guía. */
  tituloEs: string;
  /** Nombre corto para la navegación. */
  corto: string;
  /** Una línea: qué se practica aquí. */
  resumen: string;
  /** Fórmulas clave, para el bloque colapsable. */
  formulas: { eq: string; nota: string }[];
  /** El error típico que la guía marca en este tema. */
  cuidado: string;
  escenarios: string[];
}

/** Figura que acompaña a un ejercicio o a un paso de la solución. */
export type Figura =
  | {
      tipo: "rect";
      adyacente: number;
      opuesto: number;
      etiquetas?: Partial<Record<LadoRect, string>>;
      desconocido?: LadoRect | null;
      anguloTexto?: string;
      mostrarAngulo?: boolean;
      modoCatetos?: boolean;
    }
  | {
      tipo: "escaleno";
      def: DefTriangulo;
      etiquetas?: Partial<Record<ParteTri, string>>;
      angulos?: Partial<Record<"A" | "B" | "C", string>>;
      desconocido?: ParteTri | null;
    };

export type Respuesta =
  | { tipo: "numero"; valor: number; tolerancia: number; unidad?: string }
  | { tipo: "opcion"; opciones: string[]; correcta: number };

export interface Paso {
  /** Qué estamos haciendo, en palabras. */
  texto: string;
  /** La cuenta, alineada en columna. */
  calculo?: string;
  /** Marca el paso como el resultado final. */
  final?: boolean;
}

export interface Ejercicio {
  id: string;
  temaId: TemaId;
  /** Situación real + pregunta. */
  enunciado: string;
  figura?: Figura;
  /**
   * Tres pistas, siempre en este orden:
   * 1) conceptual, 2) la fórmula, 3) el primer paso ya resuelto.
   */
  pistas: [string, string, string];
  respuesta: Respuesta;
  pasos: Paso[];
  /** 1 fácil · 2 normal · 3 exige un paso extra. */
  nivel: 1 | 2 | 3;
  /** Puntos base; cada pista usada descuenta. */
  puntos: number;
}

export interface TerminoGlosario {
  termino: string;
  en?: string;
  definicion: string;
  formula?: string;
  temaId: TemaId;
  /** Lado que se resalta en el mini-diagrama. */
  destaca?: LadoRect;
  /** Palabras extra por las que se puede buscar. */
  alias?: string[];
}
