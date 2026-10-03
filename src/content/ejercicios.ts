import type { Ejercicio } from "./types";

/**
 * Ejercicios de práctica. Todos los enunciados son situaciones reales, con el
 * mismo tono de la guía: escaleras, rampas, sombras, canchas, terrenos, ríos.
 * Para ampliar la práctica basta con agregar objetos a esta lista: ninguna
 * pantalla necesita cambiar.
 */
export const EJERCICIOS: Ejercicio[] = [
  // ─────────────────────────── Tema 1 · Pitágoras ───────────────────────────
  {
    id: "pit-1",
    temaId: "pitagoras",
    enunciado:
      "La pantalla de un celular mide 6 cm de ancho y 8 cm de alto. ¿Cuánto mide su diagonal?",
    figura: {
      tipo: "rect",
      adyacente: 6,
      opuesto: 8,
      etiquetas: { adj: "6 cm", opp: "8 cm", hyp: "¿?" },
      desconocido: "hyp",
      mostrarAngulo: false,
      modoCatetos: true,
    },
    pistas: [
      "La diagonal va de una esquina a la esquina opuesta, así que queda frente al ángulo recto de la pantalla. Eso la convierte en la hipotenusa.",
      "Buscas la hipotenusa, entonces sumas: c = √(a² + b²).",
      "Primer paso: 6² + 8² = 36 + 64 = 100. Ahora solo te falta la raíz.",
    ],
    respuesta: { tipo: "numero", valor: 10, tolerancia: 0.05, unidad: "cm" },
    pasos: [
      { texto: "La diagonal es la hipotenusa, porque está frente al ángulo recto." },
      { texto: "Busco la hipotenusa, así que sumo los cuadrados.", calculo: "c = √(6² + 8²)" },
      { texto: "Hago los cuadrados y los sumo.", calculo: "c = √(36 + 64) = √100" },
      { texto: "Saco la raíz.", calculo: "c = 10 cm", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "pit-2",
    temaId: "pitagoras",
    enunciado:
      "Una escalera de 2.5 m se apoya en una pared y su base está a 1.5 m de la pared. ¿A qué altura llega?",
    figura: {
      tipo: "rect",
      adyacente: 1.5,
      opuesto: 2,
      etiquetas: { adj: "1.5 m", opp: "¿?", hyp: "2.5 m" },
      desconocido: "opp",
      mostrarAngulo: false,
      modoCatetos: true,
    },
    pistas: [
      "La escalera es el lado más largo del triángulo, así que es la hipotenusa. La altura que buscas es un cateto.",
      "Buscas un cateto, entonces restas: a = √(c² − b²).",
      "Primer paso: 2.5² − 1.5² = 6.25 − 2.25 = 4.",
    ],
    respuesta: { tipo: "numero", valor: 2, tolerancia: 0.05, unidad: "m" },
    pasos: [
      { texto: "La escalera es la hipotenusa: c = 2.5. La altura es un cateto." },
      { texto: "Busco un cateto, así que resto.", calculo: "h = √(2.5² − 1.5²)" },
      { texto: "Hago los cuadrados y resto.", calculo: "h = √(6.25 − 2.25) = √4" },
      { texto: "Saco la raíz.", calculo: "h = 2 m", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "pit-3",
    temaId: "pitagoras",
    enunciado:
      "Una rampa de skate sube 5 m de alto y su base mide 12 m sobre el suelo. ¿Cuánto mide la tabla inclinada de la rampa?",
    figura: {
      tipo: "rect",
      adyacente: 12,
      opuesto: 5,
      etiquetas: { adj: "12 m", opp: "5 m", hyp: "¿?" },
      desconocido: "hyp",
      mostrarAngulo: false,
      modoCatetos: true,
    },
    pistas: [
      "La tabla inclinada está frente al ángulo recto que forman el suelo y la altura, y es el lado más largo.",
      "Es la hipotenusa, entonces sumas: c = √(a² + b²).",
      "Primer paso: 12² + 5² = 144 + 25 = 169.",
    ],
    respuesta: { tipo: "numero", valor: 13, tolerancia: 0.05, unidad: "m" },
    pasos: [
      { texto: "La tabla es la hipotenusa. El suelo y la altura son los catetos." },
      { texto: "Sumo los cuadrados de los catetos.", calculo: "c = √(12² + 5²)" },
      { texto: "Sumo.", calculo: "c = √(144 + 25) = √169" },
      { texto: "Saco la raíz.", calculo: "c = 13 m", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "pit-4",
    temaId: "pitagoras",
    enunciado:
      "Una cancha de básquet mide 28 m de largo y 15 m de ancho. Si corres de una esquina a la esquina opuesta, ¿cuántos metros recorres? Redondea a un decimal.",
    figura: {
      tipo: "rect",
      adyacente: 28,
      opuesto: 15,
      etiquetas: { adj: "28 m", opp: "15 m", hyp: "¿?" },
      desconocido: "hyp",
      mostrarAngulo: false,
      modoCatetos: true,
    },
    pistas: [
      "La diagonal parte la cancha en dos triángulos rectángulos iguales. Trabaja con uno solo.",
      "La diagonal es la hipotenusa: c = √(a² + b²).",
      "Primer paso: 28² + 15² = 784 + 225 = 1009.",
    ],
    respuesta: { tipo: "numero", valor: 31.8, tolerancia: 0.1, unidad: "m" },
    pasos: [
      { texto: "La diagonal de la cancha es la hipotenusa de un triángulo rectángulo." },
      { texto: "Sumo los cuadrados.", calculo: "c = √(28² + 15²)" },
      { texto: "Sumo.", calculo: "c = √(784 + 225) = √1009" },
      { texto: "Saco la raíz y redondeo al final, no antes.", calculo: "c ≈ 31.8 m", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "pit-5",
    temaId: "pitagoras",
    enunciado:
      "Un poste se sujeta con un cable tensor de 10 m que se ancla al suelo a 6 m del pie del poste. ¿A qué altura del poste está amarrado el cable?",
    figura: {
      tipo: "rect",
      adyacente: 6,
      opuesto: 8,
      etiquetas: { adj: "6 m", opp: "¿?", hyp: "10 m" },
      desconocido: "opp",
      mostrarAngulo: false,
      modoCatetos: true,
    },
    pistas: [
      "El cable va del suelo a un punto alto del poste: es el lado más largo, la hipotenusa.",
      "Buscas un cateto (la altura), entonces restas: a = √(c² − b²).",
      "Primer paso: 10² − 6² = 100 − 36 = 64.",
    ],
    respuesta: { tipo: "numero", valor: 8, tolerancia: 0.05, unidad: "m" },
    pasos: [
      { texto: "El cable es la hipotenusa: c = 10. La distancia en el suelo es un cateto: 6." },
      { texto: "Busco el otro cateto, así que resto.", calculo: "h = √(10² − 6²)" },
      { texto: "Resto.", calculo: "h = √(100 − 36) = √64" },
      { texto: "Saco la raíz.", calculo: "h = 8 m", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "pit-6",
    temaId: "pitagoras",
    enunciado:
      "Una tirolesa sale de una plataforma de 9 m de altura y termina en el suelo, a 40 m de distancia horizontal. ¿Cuántos metros de cable se necesitan?",
    figura: {
      tipo: "rect",
      adyacente: 40,
      opuesto: 9,
      etiquetas: { adj: "40 m", opp: "9 m", hyp: "¿?" },
      desconocido: "hyp",
      mostrarAngulo: false,
      modoCatetos: true,
    },
    pistas: [
      "La altura de la plataforma y la distancia en el suelo son los dos catetos; el cable va de punta a punta.",
      "El cable es la hipotenusa: c = √(a² + b²).",
      "Primer paso: 40² + 9² = 1600 + 81 = 1681.",
    ],
    respuesta: { tipo: "numero", valor: 41, tolerancia: 0.1, unidad: "m" },
    pasos: [
      { texto: "El cable es la hipotenusa del triángulo que forman la plataforma y el suelo." },
      { texto: "Sumo los cuadrados.", calculo: "c = √(40² + 9²)" },
      { texto: "Sumo.", calculo: "c = √(1600 + 81) = √1681" },
      { texto: "Saco la raíz: sale exacto.", calculo: "c = 41 m", final: true },
    ],
    nivel: 3,
    puntos: 20,
  },

  // ──────────────────────────── Tema 2 · Razones ────────────────────────────
  {
    id: "raz-1",
    temaId: "razones",
    enunciado:
      "Un triángulo rectángulo tiene lados 5, 12 y 13. Mirando el ángulo θ que está frente al lado de 5, ¿cuánto vale sin θ?",
    figura: {
      tipo: "rect",
      adyacente: 12,
      opuesto: 5,
      etiquetas: { adj: "12", opp: "5", hyp: "13" },
      anguloTexto: "θ",
    },
    pistas: [
      "Marca el ángulo θ con un arquito. El lado que está enfrente es el opposite, y la hipotenusa es siempre el lado más largo.",
      "SOH: sin θ = opposite ÷ hypotenuse.",
      "Primer paso: opposite = 5 y hypotenuse = 13. Solo falta armar la fracción.",
    ],
    respuesta: { tipo: "opcion", opciones: ["5/13", "12/13", "5/12", "13/5"], correcta: 0 },
    pasos: [
      { texto: "Nombro los lados desde θ: opposite = 5, adjacent = 12, hypotenuse = 13." },
      { texto: "sin usa opposite y hypotenuse (SOH).", calculo: "sin θ = opposite ÷ hypotenuse" },
      { texto: "Sustituyo.", calculo: "sin θ = 5 ÷ 13 ≈ 0.3846", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "raz-2",
    temaId: "razones",
    enunciado:
      "En el mismo triángulo de lados 5, 12 y 13, con θ frente al lado de 5, ¿cuánto vale cos θ?",
    figura: {
      tipo: "rect",
      adyacente: 12,
      opuesto: 5,
      etiquetas: { adj: "12", opp: "5", hyp: "13" },
      anguloTexto: "θ",
    },
    pistas: [
      "El adjacent es el lado que toca el ángulo θ y no es la hipotenusa.",
      "CAH: cos θ = adjacent ÷ hypotenuse.",
      "Primer paso: adjacent = 12 y hypotenuse = 13.",
    ],
    respuesta: { tipo: "opcion", opciones: ["12/13", "5/13", "12/5", "13/12"], correcta: 0 },
    pasos: [
      { texto: "Desde θ: adjacent = 12, hypotenuse = 13." },
      { texto: "cos usa adjacent y hypotenuse (CAH).", calculo: "cos θ = adjacent ÷ hypotenuse" },
      { texto: "Sustituyo.", calculo: "cos θ = 12 ÷ 13 ≈ 0.9231", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "raz-3",
    temaId: "razones",
    enunciado:
      "Subes por una rampa: avanzas 4 m hacia adelante y subes 3 m. ¿Cuánto vale tan θ, el ángulo que la rampa forma con el suelo? Escríbelo como decimal.",
    figura: {
      tipo: "rect",
      adyacente: 4,
      opuesto: 3,
      etiquetas: { adj: "4 m", opp: "3 m", hyp: "5 m" },
      anguloTexto: "θ",
    },
    pistas: [
      "La tangente es la pendiente: cuánto subes por cada metro que avanzas.",
      "TOA: tan θ = opposite ÷ adjacent.",
      "Primer paso: opposite = 3 (lo que subes) y adjacent = 4 (lo que avanzas).",
    ],
    respuesta: { tipo: "numero", valor: 0.75, tolerancia: 0.01 },
    pasos: [
      { texto: "Lo que subes es el opposite; lo que avanzas es el adjacent." },
      { texto: "tan usa esos dos lados (TOA).", calculo: "tan θ = opposite ÷ adjacent" },
      { texto: "Sustituyo.", calculo: "tan θ = 3 ÷ 4 = 0.75", final: true },
      { texto: "Significa 3 m de subida por cada 4 m hacia adelante." },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "raz-4",
    temaId: "razones",
    enunciado:
      "En el triángulo 3-4-5, mirando el ángulo θ que está frente al lado de 3, ¿cuánto vale csc θ? Da el resultado como decimal con tres cifras.",
    figura: {
      tipo: "rect",
      adyacente: 4,
      opuesto: 3,
      etiquetas: { adj: "4", opp: "3", hyp: "5" },
      anguloTexto: "θ",
    },
    pistas: [
      "csc es la recíproca de sin: la misma fracción, dada vuelta.",
      "csc θ = 1 ÷ sin θ = hypotenuse ÷ opposite.",
      "Primer paso: sin θ = 3/5, así que csc θ = 5/3.",
    ],
    respuesta: { tipo: "numero", valor: 1.667, tolerancia: 0.01 },
    pasos: [
      { texto: "Desde θ: opposite = 3, hypotenuse = 5." },
      { texto: "Primero sin θ.", calculo: "sin θ = 3 ÷ 5 = 0.6" },
      { texto: "csc es esa fracción dada vuelta.", calculo: "csc θ = 5 ÷ 3 ≈ 1.667", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "raz-5",
    temaId: "razones",
    enunciado:
      "El techo de una casa forma un triángulo rectángulo de lados 8, 15 y 17. Mirando el ángulo θ frente al lado de 8, ¿cuánto vale sec θ? Da tres decimales.",
    figura: {
      tipo: "rect",
      adyacente: 15,
      opuesto: 8,
      etiquetas: { adj: "15", opp: "8", hyp: "17" },
      anguloTexto: "θ",
    },
    pistas: [
      "sec es la recíproca de cos, así que primero tienes que saber cuál lado es el adjacent.",
      "sec θ = 1 ÷ cos θ = hypotenuse ÷ adjacent.",
      "Primer paso: adjacent = 15 y hypotenuse = 17, así que cos θ = 15/17.",
    ],
    respuesta: { tipo: "numero", valor: 1.133, tolerancia: 0.01 },
    pasos: [
      { texto: "Desde θ: opposite = 8, adjacent = 15, hypotenuse = 17." },
      { texto: "Primero cos θ.", calculo: "cos θ = 15 ÷ 17 ≈ 0.8824" },
      { texto: "sec es esa fracción dada vuelta.", calculo: "sec θ = 17 ÷ 15 ≈ 1.133", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "raz-6",
    temaId: "razones",
    enunciado:
      "Un cable tenso de 25 m va de la punta de un poste al suelo. El poste mide 7 m. ¿Cuánto vale tan θ, donde θ es el ángulo que el cable forma con el suelo? Da cuatro decimales.",
    figura: {
      tipo: "rect",
      adyacente: 24,
      opuesto: 7,
      etiquetas: { adj: "¿?", opp: "7 m", hyp: "25 m" },
      anguloTexto: "θ",
    },
    pistas: [
      "Para la tangente necesitas opposite y adjacent, pero el adjacent no te lo dan. Hay un tema anterior que sirve justo para eso.",
      "Primero Pitágoras: adjacent = √(25² − 7²). Después TOA: tan θ = opposite ÷ adjacent.",
      "Primer paso: √(625 − 49) = √576 = 24.",
    ],
    respuesta: { tipo: "numero", valor: 0.2917, tolerancia: 0.002 },
    pasos: [
      { texto: "El poste es el opposite (7) y el cable la hypotenuse (25). Falta el adjacent." },
      { texto: "Lo saco con Pitágoras.", calculo: "adjacent = √(25² − 7²) = √576 = 24" },
      { texto: "Ahora sí uso TOA.", calculo: "tan θ = 7 ÷ 24 ≈ 0.2917", final: true },
    ],
    nivel: 3,
    puntos: 20,
  },

  // ───────────────────────── Tema 3 · Lados y ángulos ───────────────────────
  {
    id: "lad-1",
    temaId: "lados-angulos",
    enunciado:
      "Un poste proyecta una sombra de 6 m cuando el sol está a 50° sobre el horizonte. ¿Qué altura tiene el poste? Redondea a un decimal.",
    figura: {
      tipo: "rect",
      adyacente: 6,
      opuesto: 7.151,
      etiquetas: { adj: "6 m", opp: "¿?" },
      desconocido: "opp",
      anguloTexto: "50°",
    },
    pistas: [
      "La sombra está en el suelo tocando el ángulo del sol: es el adjacent. La altura del poste está enfrente: es el opposite.",
      "Tienes opposite y adjacent, entonces usas tan (TOA): tan 50° = h ÷ 6.",
      "Primer paso: la h está arriba en la división, así que multiplicas: h = 6 × tan 50°.",
    ],
    respuesta: { tipo: "numero", valor: 7.2, tolerancia: 0.15, unidad: "m" },
    pasos: [
      { texto: "Dibujo y marco el ángulo de 50° en el suelo." },
      { texto: "Desde ese ángulo: la sombra es adjacent (6 m) y la altura es opposite." },
      { texto: "opposite y adjacent → uso tan.", calculo: "tan 50° = h ÷ 6" },
      { texto: "La h está arriba, así que multiplico.", calculo: "h = 6 × 1.1918" },
      { texto: "Redondeo.", calculo: "h ≈ 7.2 m", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "lad-2",
    temaId: "lados-angulos",
    enunciado:
      "Una escalera de 4 m forma un ángulo de 70° con el suelo. ¿A qué altura toca la pared? Redondea a un decimal.",
    figura: {
      tipo: "rect",
      adyacente: 1.368,
      opuesto: 3.759,
      etiquetas: { hyp: "4 m", opp: "¿?" },
      desconocido: "opp",
      anguloTexto: "70°",
    },
    pistas: [
      "La escalera es la hipotenusa. La altura en la pared está frente al ángulo de 70°, así que es el opposite.",
      "Tienes opposite y hypotenuse, entonces usas sin (SOH): sin 70° = h ÷ 4.",
      "Primer paso: la h está arriba, así que multiplicas: h = 4 × sin 70°.",
    ],
    respuesta: { tipo: "numero", valor: 3.8, tolerancia: 0.15, unidad: "m" },
    pasos: [
      { texto: "La escalera es la hipotenusa (4 m); la altura es el opposite al ángulo de 70°." },
      { texto: "opposite y hypotenuse → uso sin.", calculo: "sin 70° = h ÷ 4" },
      { texto: "Multiplico.", calculo: "h = 4 × 0.9397" },
      { texto: "Redondeo.", calculo: "h ≈ 3.8 m", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "lad-3",
    temaId: "lados-angulos",
    enunciado:
      "Una rampa para sillas de ruedas tiene que subir 0.75 m con una inclinación de 5°. ¿Cuántos metros de largo debe medir la rampa? Redondea a un decimal.",
    figura: {
      tipo: "rect",
      adyacente: 8.572,
      opuesto: 0.75,
      etiquetas: { opp: "0.75 m", hyp: "¿?" },
      desconocido: "hyp",
      anguloTexto: "5°",
    },
    pistas: [
      "La rampa es la hipotenusa y la altura que sube es el opposite al ángulo de 5°.",
      "opposite y hypotenuse → sin: sin 5° = 0.75 ÷ L.",
      "Aquí la incógnita quedó abajo en la división, así que cambian de lugar: L = 0.75 ÷ sin 5°.",
    ],
    respuesta: { tipo: "numero", valor: 8.6, tolerancia: 0.2, unidad: "m" },
    pasos: [
      { texto: "La rampa es la hipotenusa; la subida de 0.75 m es el opposite." },
      { texto: "opposite y hypotenuse → uso sin.", calculo: "sin 5° = 0.75 ÷ L" },
      { texto: "La L está abajo, así que cambian de lugar.", calculo: "L = 0.75 ÷ 0.0872" },
      { texto: "Redondeo.", calculo: "L ≈ 8.6 m", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "lad-4",
    temaId: "lados-angulos",
    enunciado:
      "Una rampa mide 10 m de largo y sube 1.2 m. ¿Qué ángulo forma con el suelo? Redondea a un decimal.",
    figura: {
      tipo: "rect",
      adyacente: 9.928,
      opuesto: 1.2,
      etiquetas: { opp: "1.2 m", hyp: "10 m" },
      anguloTexto: "θ",
    },
    pistas: [
      "Tienes dos lados y buscas el ángulo: eso se resuelve con una función inversa.",
      "1.2 es opposite y 10 es hypotenuse, entonces sin θ = 1.2 ÷ 10. Para el ángulo usas sin⁻¹.",
      "Primer paso: sin θ = 0.12. Ahora haz la pregunta al revés: θ = sin⁻¹(0.12).",
    ],
    respuesta: { tipo: "numero", valor: 6.9, tolerancia: 0.2, unidad: "°" },
    pasos: [
      { texto: "La subida es el opposite (1.2) y la rampa es la hypotenuse (10)." },
      { texto: "opposite y hypotenuse → uso sin.", calculo: "sin θ = 1.2 ÷ 10 = 0.12" },
      { texto: "Busco el ángulo, así que uso la inversa.", calculo: "θ = sin⁻¹(0.12)" },
      { texto: "Con la calculadora en DEG.", calculo: "θ ≈ 6.9°", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "lad-5",
    temaId: "lados-angulos",
    enunciado:
      "Una escalera de 6 m tiene su base a 2 m de la pared. ¿Qué ángulo forma la escalera con el suelo? Redondea a un decimal.",
    figura: {
      tipo: "rect",
      adyacente: 2,
      opuesto: 5.657,
      etiquetas: { adj: "2 m", hyp: "6 m" },
      anguloTexto: "θ",
    },
    pistas: [
      "Los datos son la distancia en el suelo y el largo de la escalera. Fíjate qué nombre tiene cada uno visto desde el ángulo del suelo.",
      "2 es adjacent y 6 es hypotenuse, entonces cos θ = 2 ÷ 6. Para el ángulo, cos⁻¹.",
      "Primer paso: cos θ = 0.3333. Ahora θ = cos⁻¹(0.3333).",
    ],
    respuesta: { tipo: "numero", valor: 70.5, tolerancia: 0.3, unidad: "°" },
    pasos: [
      { texto: "Desde el ángulo del suelo: 2 m es adjacent, 6 m es hypotenuse." },
      { texto: "adjacent y hypotenuse → uso cos.", calculo: "cos θ = 2 ÷ 6 ≈ 0.3333" },
      { texto: "Uso la inversa.", calculo: "θ = cos⁻¹(0.3333)" },
      { texto: "Con la calculadora en DEG.", calculo: "θ ≈ 70.5°", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "lad-6",
    temaId: "lados-angulos",
    enunciado:
      "Sostienes una cometa con 60 m de hilo tenso, que forma 40° con el suelo. Tus manos están a 1.2 m del piso. ¿A qué altura sobre el piso está la cometa? Redondea a un decimal.",
    figura: {
      tipo: "rect",
      adyacente: 45.963,
      opuesto: 38.567,
      etiquetas: { hyp: "60 m", opp: "¿?" },
      desconocido: "opp",
      anguloTexto: "40°",
    },
    pistas: [
      "El triángulo empieza en tus manos, no en el piso. Calcula primero cuánto sube el hilo y deja la altura de las manos para el final.",
      "El hilo es la hypotenuse y la subida es el opposite → sin: sin 40° = h ÷ 60.",
      "Primer paso: h = 60 × sin 40° ≈ 38.6 m. Todavía te falta sumar 1.2.",
    ],
    respuesta: { tipo: "numero", valor: 39.8, tolerancia: 0.3, unidad: "m" },
    pasos: [
      { texto: "El hilo es la hipotenusa (60 m); la subida desde las manos es el opposite." },
      { texto: "opposite y hypotenuse → uso sin.", calculo: "sin 40° = h ÷ 60" },
      { texto: "Multiplico.", calculo: "h = 60 × 0.6428 ≈ 38.6 m" },
      { texto: "Sumo la altura de las manos.", calculo: "38.6 + 1.2 ≈ 39.8 m", final: true },
    ],
    nivel: 3,
    puntos: 20,
  },

  // ─────────────────────────── Tema 4 · Identidades ─────────────────────────
  {
    id: "ide-1",
    temaId: "identidades",
    enunciado: "Simplifica la expresión: sin θ ÷ tan θ",
    pistas: [
      "Cuando aparece tan, lo primero es cambiarlo por sin ÷ cos. Así todo queda escrito en sin y cos.",
      "tan θ = sin θ ÷ cos θ. Y dividir por una fracción es multiplicar por esa fracción dada vuelta.",
      "Primer paso: sin θ ÷ (sin θ ÷ cos θ) = sin θ × (cos θ ÷ sin θ).",
    ],
    respuesta: { tipo: "opcion", opciones: ["cos θ", "sin θ", "tan θ", "1"], correcta: 0 },
    pasos: [
      { texto: "Cambio tan por sin ÷ cos.", calculo: "sin θ ÷ (sin θ ÷ cos θ)" },
      {
        texto: "Dividir por una fracción es multiplicar por la fracción dada vuelta.",
        calculo: "sin θ × (cos θ ÷ sin θ)",
      },
      { texto: "Cancelo sin θ arriba y abajo.", calculo: "cos θ", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "ide-2",
    temaId: "identidades",
    enunciado: "Simplifica la expresión: (1 − cos²θ) ÷ sin θ",
    pistas: [
      "Mira el paréntesis: hay una identidad que te deja cambiar 1 − cos²θ por algo más corto.",
      "De sin²θ + cos²θ = 1 sale que 1 − cos²θ = sin²θ.",
      "Primer paso: la expresión se vuelve sin²θ ÷ sin θ.",
    ],
    respuesta: { tipo: "opcion", opciones: ["sin θ", "cos θ", "tan θ", "1"], correcta: 0 },
    pasos: [
      { texto: "Uso la identidad de Pitágoras.", calculo: "1 − cos²θ = sin²θ" },
      { texto: "Sustituyo.", calculo: "sin²θ ÷ sin θ" },
      { texto: "Cancelo un sin θ.", calculo: "sin θ", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "ide-3",
    temaId: "identidades",
    enunciado: "Demuestra a qué es igual: tan θ · cos θ",
    pistas: [
      "Trabaja solo en este lado de la igualdad y pasa todo a sin y cos.",
      "tan θ = sin θ ÷ cos θ.",
      "Primer paso: (sin θ ÷ cos θ) · cos θ. ¿Qué se cancela?",
    ],
    respuesta: { tipo: "opcion", opciones: ["sin θ", "cos θ", "cot θ", "sec θ"], correcta: 0 },
    pasos: [
      { texto: "Cambio tan por sin ÷ cos.", calculo: "(sin θ ÷ cos θ) · cos θ" },
      { texto: "Cancelo cos θ.", calculo: "sin θ", final: true },
      {
        texto: "Compruébalo con θ = 30°: tan 30° × cos 30° = 0.5774 × 0.8660 = 0.5000, que es sin 30°.",
      },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "ide-4",
    temaId: "identidades",
    enunciado: "Sin usar la calculadora: ¿cuánto vale sin²25° + cos²25°?",
    pistas: [
      "Esta es la identidad más importante del tema, y no depende del ángulo.",
      "sin²θ + cos²θ = 1, para cualquier θ.",
      "Da lo mismo que el ángulo sea 25°, 40° u 89°: el resultado es siempre el mismo número.",
    ],
    respuesta: { tipo: "numero", valor: 1, tolerancia: 0.001 },
    pasos: [
      { texto: "La identidad vale para cualquier ángulo.", calculo: "sin²θ + cos²θ = 1" },
      { texto: "Entonces con θ = 25°.", calculo: "sin²25° + cos²25° = 1", final: true },
      { texto: "Es Pitágoras en un triángulo de hipotenusa 1: opposite² + adjacent² = 1²." },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "ide-5",
    temaId: "identidades",
    enunciado: "Simplifica la expresión: cos θ · csc θ",
    pistas: [
      "csc es una recíproca: cámbiala por 1 ÷ algo para quedarte solo con sin y cos.",
      "csc θ = 1 ÷ sin θ. Y recuerda que cot θ = cos θ ÷ sin θ.",
      "Primer paso: cos θ · (1 ÷ sin θ) = cos θ ÷ sin θ.",
    ],
    respuesta: { tipo: "opcion", opciones: ["cot θ", "tan θ", "sec θ", "sin θ"], correcta: 0 },
    pasos: [
      { texto: "Cambio csc por su recíproca.", calculo: "cos θ · (1 ÷ sin θ)" },
      { texto: "Queda una sola fracción.", calculo: "cos θ ÷ sin θ" },
      { texto: "Eso es la cotangente.", calculo: "cot θ", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "ide-6",
    temaId: "identidades",
    enunciado: "Simplifica la expresión: sec²θ − tan²θ",
    pistas: [
      "Hay una identidad de Pitágoras que relaciona justo estas dos. Está en el bloque de identidades extra.",
      "1 + tan²θ = sec²θ. Despeja de ahí sec²θ − tan²θ.",
      "Primer paso: cambia sec²θ por 1 + tan²θ.",
    ],
    respuesta: { tipo: "numero", valor: 1, tolerancia: 0.001 },
    pasos: [
      { texto: "Uso la identidad extra.", calculo: "1 + tan²θ = sec²θ" },
      { texto: "Sustituyo sec²θ.", calculo: "(1 + tan²θ) − tan²θ" },
      { texto: "Se cancela tan²θ.", calculo: "1", final: true },
    ],
    nivel: 3,
    puntos: 20,
  },

  // ──────────────────── Tema 5 · Leyes de senos y cosenos ───────────────────
  {
    id: "ley-1",
    temaId: "leyes",
    enunciado: "En un triángulo, A = 50°, B = 70° y a = 10. Halla b. Redondea a un decimal.",
    figura: {
      tipo: "escaleno",
      def: { tipo: "asa", A: 50, B: 70, c: 11.3 },
      etiquetas: { a: "a = 10", b: "b = ¿?" },
      angulos: { A: "A 50°", B: "B 70°", C: "C" },
      desconocido: "b",
    },
    pistas: [
      "Pregúntate primero: ¿tengo una pareja, o sea un ángulo con su lado opuesto?",
      "Sí la tienes, así que Law of Sines: a ÷ sin A = b ÷ sin B.",
      "Primer paso: b ÷ sin 70° = 10 ÷ sin 50°, así que b = 10 × sin 70° ÷ sin 50°.",
    ],
    respuesta: { tipo: "numero", valor: 12.3, tolerancia: 0.2 },
    pasos: [
      { texto: "Tengo la pareja a = 10 con A = 50°, así que uso Law of Sines." },
      { texto: "Armo la proporción con el lado que busco.", calculo: "b ÷ sin 70° = 10 ÷ sin 50°" },
      { texto: "Despejo b.", calculo: "b = 10 × 0.9397 ÷ 0.7660" },
      { texto: "Redondeo.", calculo: "b ≈ 12.3", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "ley-2",
    temaId: "leyes",
    enunciado:
      "Dos lados de un terreno miden 8 m y 10 m, y el ángulo entre ellos es de 60°. ¿Cuánto mide el tercer lado? Redondea a un decimal.",
    figura: {
      tipo: "escaleno",
      def: { tipo: "sas", a: 8, b: 10, C: 60 },
      etiquetas: { a: "8 m", b: "10 m", c: "c = ¿?" },
      angulos: { C: "C 60°", A: "A", B: "B" },
      desconocido: "c",
    },
    pistas: [
      "El ángulo que te dan está entre los dos lados conocidos, así que no tienes ninguna pareja.",
      "Sin pareja, Law of Cosines: c² = a² + b² − 2ab·cos C.",
      "Primer paso: c² = 64 + 100 − 2 × 8 × 10 × 0.5 = 84.",
    ],
    respuesta: { tipo: "numero", valor: 9.2, tolerancia: 0.15, unidad: "m" },
    pasos: [
      { texto: "El ángulo está entre los dos lados, así que no hay pareja: Law of Cosines." },
      { texto: "Escribo la fórmula.", calculo: "c² = 8² + 10² − 2 × 8 × 10 × cos 60°" },
      { texto: "cos 60° = 0.5.", calculo: "c² = 64 + 100 − 80 = 84" },
      { texto: "Saco la raíz.", calculo: "c = √84 ≈ 9.2 m", final: true },
    ],
    nivel: 1,
    puntos: 10,
  },
  {
    id: "ley-3",
    temaId: "leyes",
    enunciado:
      "Un triángulo tiene lados 5, 6 y 7. ¿Cuánto mide el ángulo opuesto al lado de 7? Redondea a un decimal.",
    figura: {
      tipo: "escaleno",
      def: { tipo: "sss", a: 5, b: 6, c: 7 },
      etiquetas: { a: "5", b: "6", c: "7" },
      angulos: { C: "C ¿?", A: "A", B: "B" },
    },
    pistas: [
      "Tienes los tres lados y ningún ángulo, así que no hay ninguna pareja posible.",
      "Law of Cosines en su forma de ángulo: cos C = (a² + b² − c²) ÷ (2ab).",
      "Primer paso: cos C = (25 + 36 − 49) ÷ 60 = 12 ÷ 60 = 0.2.",
    ],
    respuesta: { tipo: "numero", valor: 78.5, tolerancia: 0.3, unidad: "°" },
    pasos: [
      { texto: "El lado de 7 es c, y busco su ángulo opuesto C." },
      { texto: "Uso la forma de ángulo.", calculo: "cos C = (5² + 6² − 7²) ÷ (2 × 5 × 6)" },
      { texto: "Hago las cuentas.", calculo: "cos C = 12 ÷ 60 = 0.2" },
      { texto: "Uso la inversa.", calculo: "C = cos⁻¹(0.2) ≈ 78.5°", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "ley-4",
    temaId: "leyes",
    enunciado:
      "Un terreno triangular tiene dos lados de 9 m y 12 m con un ángulo de 80° entre ellos. ¿Cuánta cerca necesitas para el tercer lado? Redondea a un decimal.",
    figura: {
      tipo: "escaleno",
      def: { tipo: "sas", a: 9, b: 12, C: 80 },
      etiquetas: { a: "9 m", b: "12 m", c: "c = ¿?" },
      angulos: { C: "C 80°", A: "A", B: "B" },
      desconocido: "c",
    },
    pistas: [
      "Dos lados y el ángulo que está justo entre ellos: no hay pareja.",
      "Law of Cosines: c² = a² + b² − 2ab·cos C.",
      "Primer paso: c² = 81 + 144 − 2 × 9 × 12 × cos 80°.",
    ],
    respuesta: { tipo: "numero", valor: 13.7, tolerancia: 0.2, unidad: "m" },
    pasos: [
      { texto: "Dos lados con el ángulo entre ellos: Law of Cosines." },
      { texto: "Escribo la fórmula.", calculo: "c² = 9² + 12² − 2 × 9 × 12 × cos 80°" },
      { texto: "cos 80° ≈ 0.1736.", calculo: "c² = 225 − 216 × 0.1736 ≈ 187.5" },
      { texto: "Saco la raíz.", calculo: "c = √187.5 ≈ 13.7 m", final: true },
    ],
    nivel: 2,
    puntos: 15,
  },
  {
    id: "ley-5",
    temaId: "leyes",
    enunciado: "En un triángulo, A = 35°, a = 14 y b = 20. Halla el ángulo B. Redondea a un decimal.",
    figura: {
      tipo: "escaleno",
      def: { tipo: "sss", a: 14, b: 20, c: 24.4 },
      etiquetas: { a: "a = 14", b: "b = 20" },
      angulos: { A: "A 35°", B: "B ¿?", C: "C" },
    },
    pistas: [
      "Tienes dos lados y un ángulo que no está entre ellos. Revisa si alguno de esos lados es el opuesto al ángulo.",
      "La pareja es a = 14 con A = 35°, así que Law of Sines: sin B ÷ b = sin A ÷ a.",
      "Primer paso: sin B = 20 × sin 35° ÷ 14 ≈ 0.8194. Ahora usa sin⁻¹.",
    ],
    respuesta: { tipo: "numero", valor: 55.1, tolerancia: 0.4, unidad: "°" },
    pasos: [
      { texto: "Hay pareja (a con A), así que Law of Sines." },
      {
        texto: "Armo la proporción con los senos arriba, porque busco un ángulo.",
        calculo: "sin B ÷ 20 = sin 35° ÷ 14",
      },
      { texto: "Despejo sin B.", calculo: "sin B = 20 × 0.5736 ÷ 14 ≈ 0.8194" },
      { texto: "Uso la inversa.", calculo: "B = sin⁻¹(0.8194) ≈ 55.1°", final: true },
      { texto: "Este es el caso en que a veces hay dos triángulos posibles: el caso ambiguo." },
    ],
    nivel: 3,
    puntos: 20,
  },
  {
    id: "ley-6",
    temaId: "leyes",
    enunciado:
      "Para medir el ancho de un río marcas dos puntos A y B en tu orilla, a 30 m uno del otro. Desde A el ángulo al árbol de la otra orilla es 70° y desde B es 45°. ¿Qué distancia hay de B al árbol? Redondea a un decimal.",
    figura: {
      tipo: "escaleno",
      def: { tipo: "asa", A: 70, B: 45, c: 30 },
      etiquetas: { c: "30 m", a: "a = ¿?" },
      angulos: { A: "A 70°", B: "B 45°", C: "C" },
      desconocido: "a",
    },
    pistas: [
      "Te dan dos ángulos y el lado que está entre ellos. Para tener una pareja completa, saca primero el tercer ángulo.",
      "C = 180° − A − B. Después Law of Sines con la pareja c y C.",
      "Primer paso: C = 180° − 70° − 45° = 65°. La distancia de B al árbol es el lado a, el opuesto a A.",
    ],
    respuesta: { tipo: "numero", valor: 31.1, tolerancia: 0.3, unidad: "m" },
    pasos: [
      { texto: "Saco el tercer ángulo para tener una pareja.", calculo: "C = 180° − 70° − 45° = 65°" },
      { texto: "La pareja es c = 30 con C = 65°. Busco a, el opuesto a A = 70°." },
      { texto: "Law of Sines.", calculo: "a ÷ sin 70° = 30 ÷ sin 65°" },
      { texto: "Despejo a.", calculo: "a = 30 × 0.9397 ÷ 0.9063" },
      { texto: "Redondeo.", calculo: "a ≈ 31.1 m", final: true },
    ],
    nivel: 3,
    puntos: 20,
  },
];

export const ejerciciosDeTema = (temaId: string) => EJERCICIOS.filter((e) => e.temaId === temaId);

export const getEjercicio = (id: string) => EJERCICIOS.find((e) => e.id === id);
