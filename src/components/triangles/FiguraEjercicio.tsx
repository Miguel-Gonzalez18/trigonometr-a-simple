import type { Figura } from "../../content/types";
import { Fig } from "../ui/Fig";
import { TrianguloEscaleno } from "./TrianguloEscaleno";
import { TrianguloRectangulo } from "./TrianguloRectangulo";

/**
 * Dibuja la figura que viene en los datos del ejercicio. Así el contenido
 * queda separado de la presentación: para agregar ejercicios no hay que
 * escribir componentes nuevos.
 */
export function FiguraEjercicio({ figura, pie }: { figura: Figura; pie?: string }) {
  return (
    <Fig pie={pie}>
      {figura.tipo === "rect" ? (
        <TrianguloRectangulo
          adyacente={figura.adyacente}
          opuesto={figura.opuesto}
          etiquetas={figura.etiquetas}
          desconocido={figura.desconocido ?? null}
          anguloTexto={figura.anguloTexto}
          mostrarAngulo={figura.mostrarAngulo ?? true}
          modoCatetos={figura.modoCatetos ?? false}
        />
      ) : (
        <TrianguloEscaleno
          def={figura.def}
          etiquetas={figura.etiquetas}
          angulos={figura.angulos}
          desconocido={figura.desconocido ?? null}
        />
      )}
    </Fig>
  );
}
