import { useEffect, useState } from "react";

export type Tema = "claro" | "oscuro" | "sistema";

const CLAVE = "trigo.tema";

const leer = (): Tema => {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === "claro" || v === "oscuro" ? v : "sistema";
  } catch {
    return "sistema";
  }
};

function aplicar(t: Tema) {
  const raiz = document.documentElement;
  if (t === "sistema") raiz.removeAttribute("data-theme");
  else raiz.setAttribute("data-theme", t === "claro" ? "light" : "dark");
}

/** Modo claro / oscuro, con "sistema" como punto de partida. */
export function useTema() {
  const [tema, setTema] = useState<Tema>(leer);

  useEffect(() => {
    aplicar(tema);
    try {
      if (tema === "sistema") localStorage.removeItem(CLAVE);
      else localStorage.setItem(CLAVE, tema);
    } catch {
      // Sin almacenamiento: el tema vale solo para esta sesión.
    }
  }, [tema]);

  const alternar = () => {
    const oscuroAhora =
      tema === "oscuro" ||
      (tema === "sistema" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTema(oscuroAhora ? "claro" : "oscuro");
  };

  const esOscuro =
    tema === "oscuro" ||
    (tema === "sistema" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return { tema, setTema, alternar, esOscuro };
}
