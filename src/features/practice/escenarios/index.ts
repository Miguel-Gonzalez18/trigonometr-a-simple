import type { ComponentType } from "react";
import { EscenarioEscaleraPared, EscenarioPantallaDiagonal } from "./pitagoras";
import { EscenarioRampaPendiente, EscenarioRazonesDesdeAngulo } from "./razones";
import { EscenarioArbolElevacion, EscenarioRampaAngulo, EscenarioXArribaAbajo } from "./lados";
import { EscenarioCirculoUnitario, EscenarioComprobarIdentidad } from "./identidades";
import { EscenarioElegirLey, EscenarioEstanqueAncho, EscenarioRioTriangulacion } from "./leyes";

/**
 * Registro de escenarios. Los temas se refieren a ellos por id, así que
 * agregar uno nuevo es escribir el componente y registrarlo aquí.
 */
export const ESCENARIOS: Record<string, ComponentType> = {
  "escalera-pared": EscenarioEscaleraPared,
  "pantalla-diagonal": EscenarioPantallaDiagonal,
  "razones-desde-angulo": EscenarioRazonesDesdeAngulo,
  "rampa-pendiente": EscenarioRampaPendiente,
  "arbol-elevacion": EscenarioArbolElevacion,
  "rampa-angulo": EscenarioRampaAngulo,
  "x-arriba-abajo": EscenarioXArribaAbajo,
  "circulo-unitario": EscenarioCirculoUnitario,
  "comprobar-identidad": EscenarioComprobarIdentidad,
  "rio-triangulacion": EscenarioRioTriangulacion,
  "estanque-ancho": EscenarioEstanqueAncho,
  "elige-ley": EscenarioElegirLey,
};
