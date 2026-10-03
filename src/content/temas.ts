import type { Tema, TemaId } from "./types";

/** Los cinco temas, en el orden de la guía. */
export const TEMAS: Tema[] = [
  {
    id: "pitagoras",
    numero: 1,
    tituloEn: "Pythagorean Theorem",
    tituloEs: "El teorema de Pitágoras",
    corto: "Pitágoras",
    resumen: "Dos lados conocidos de un triángulo rectángulo te dan el tercero.",
    formulas: [
      { eq: "a² + b² = c²", nota: "a y b son los catetos. c es siempre la hipotenusa." },
      { eq: "c = √(a² + b²)", nota: "Busco la hipotenusa: sumo y saco la raíz." },
      { eq: "a = √(c² − b²)", nota: "Busco un cateto: resto y saco la raíz." },
    ],
    cuidado:
      "Olvidar la raíz cuadrada al final. Si te quedó 25 en vez de 5, te falta sacar la raíz. Revisa también que la hipotenusa sea el lado más largo.",
    escenarios: ["escalera-pared", "pantalla-diagonal"],
  },
  {
    id: "razones",
    numero: 2,
    tituloEn: "Basic and Reciprocal Trigonometric Ratios",
    tituloEs: "Las razones trigonométricas básicas y sus recíprocas",
    corto: "Razones",
    resumen: "SOH CAH TOA: cada razón es una división entre dos lados.",
    formulas: [
      { eq: "sin θ = opposite ÷ hypotenuse", nota: "SOH" },
      { eq: "cos θ = adjacent ÷ hypotenuse", nota: "CAH" },
      { eq: "tan θ = opposite ÷ adjacent", nota: "TOA" },
      { eq: "csc θ = 1 ÷ sin θ · sec θ = 1 ÷ cos θ · cot θ = 1 ÷ tan θ", nota: "Las recíprocas son la misma fracción dada vuelta." },
    ],
    cuidado:
      "Escribir la razón sin marcar el ángulo. Dibuja primero el arquito y pregunta: ¿cuál lado está enfrente? Ese es el opposite.",
    escenarios: ["razones-desde-angulo", "rampa-pendiente"],
  },
  {
    id: "lados-angulos",
    numero: 3,
    tituloEn: "Finding Missing Sides and Angles",
    tituloEs: "Cómo hallar lados y ángulos que faltan",
    corto: "Lados y ángulos",
    resumen: "La receta de 4 pasos: dibuja, nombra, elige la razón y despeja.",
    formulas: [
      { eq: "Dibuja · Nombra · Elige · Despeja", nota: "La receta de 4 pasos." },
      { eq: "opposite y hypotenuse → sin", nota: "SOH" },
      { eq: "adjacent y hypotenuse → cos", nota: "CAH" },
      { eq: "opposite y adjacent → tan", nota: "TOA" },
      { eq: "θ = sin⁻¹(x), cos⁻¹(x), tan⁻¹(x)", nota: "Para un ángulo, usa la función inversa." },
    ],
    cuidado:
      "La calculadora tiene que decir DEG, no RAD. Prueba con sin 30°: debe dar 0.5. Y fíjate si la x está arriba (multiplicas) o abajo (divides).",
    escenarios: ["arbol-elevacion", "rampa-angulo", "x-arriba-abajo"],
  },
  {
    id: "identidades",
    numero: 4,
    tituloEn: "Trigonometric Identities",
    tituloEs: "Las identidades trigonométricas",
    corto: "Identidades",
    resumen: "Igualdades que valen para cualquier ángulo: sirven para simplificar.",
    formulas: [
      { eq: "sin²θ + cos²θ = 1", nota: "Es Pitágoras en un triángulo de hipotenusa 1." },
      { eq: "tan θ = sin θ ÷ cos θ", nota: "Las hypotenuse se cancelan y queda O ÷ A." },
      { eq: "1 + tan²θ = sec²θ", nota: "Sale de dividir la primera entre cos²θ." },
      { eq: "1 + cot²θ = csc²θ", nota: "Sale de dividir la primera entre sin²θ." },
    ],
    cuidado:
      "Trabaja solo en un lado de la igualdad. Pasa todo a sin y cos, y recuerda que 1 − cos²θ es sin²θ.",
    escenarios: ["circulo-unitario", "comprobar-identidad"],
  },
  {
    id: "leyes",
    numero: 5,
    tituloEn: "Laws of Sine and Cosine",
    tituloEs: "La ley de los senos y la ley de los cosenos",
    corto: "Senos y cosenos",
    resumen: "Para triángulos sin ángulo de 90°. La pregunta clave: ¿tengo una pareja?",
    formulas: [
      { eq: "a ÷ sin A = b ÷ sin B = c ÷ sin C", nota: "Law of Sines. Necesitas una pareja: un ángulo y su lado opuesto." },
      { eq: "c² = a² + b² − 2ab·cos C", nota: "Law of Cosines. Es Pitágoras con una corrección al final." },
      { eq: "cos C = (a² + b² − c²) ÷ (2ab)", nota: "Law of Cosines en su forma de ángulo." },
      { eq: "A + B + C = 180°", nota: "Los tres ángulos siempre suman 180°." },
    ],
    cuidado:
      "Elegir mal la ley. Pregunta primero: ¿tengo un ángulo con su lado opuesto? Sí, Law of Sines. No, Law of Cosines.",
    escenarios: ["rio-triangulacion", "estanque-ancho", "elige-ley"],
  },
];

export const TEMAS_POR_ID: Record<TemaId, Tema> = Object.fromEntries(
  TEMAS.map((t) => [t.id, t]),
) as Record<TemaId, Tema>;

export const getTema = (id: string) => TEMAS.find((t) => t.id === id);
