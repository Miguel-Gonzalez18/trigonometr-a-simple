import { useSyncExternalStore } from "react";
import { getProgreso, suscribir } from "./progress";

/** Lee el progreso guardado y se re-renderiza cuando cambia. */
export function useProgreso() {
  return useSyncExternalStore(
    (fn) => suscribir(() => fn()),
    getProgreso,
    getProgreso,
  );
}
