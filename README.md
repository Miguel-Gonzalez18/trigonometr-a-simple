# Trigonometría · práctica

App de práctica para los cinco temas de la unidad de trigonometría (Unit 1 ·
Trigonometry). No repite la teoría: esa está en la guía ilustrada
`Trigonometría paso a paso.html`, que vive en este mismo repositorio y es la
fuente de verdad de los temas, la terminología y el código de colores.

Funciona 100% estática: no hay backend, ni login, ni base de datos. Todo el
progreso se guarda en `localStorage` del navegador.

## Qué incluye

- **Inicio / mapa de progreso** — los cinco temas como estaciones, con estado
  (sin empezar · en progreso · dominado), barra de dominio, puntos y racha.
- **Cada tema** — resumen colapsable de fórmulas, 2–3 escenarios interactivos
  (sliders que mueven un SVG dibujado a escala real) y 6 ejercicios con pistas
  progresivas y solución paso a paso.
- **Glosario** — 30 términos buscables en español e inglés, con mini-diagramas.
- **Prueba cronometrada** — 10 preguntas (2 por tema) mezcladas, con reloj,
  barra de avance y resumen final por tema.
- **Modo claro y oscuro**, siguiendo la preferencia del sistema o el botón de
  la cabecera.

## Correr en local

Requiere Node 22+ y pnpm.

```bash
pnpm install
```

```bash
pnpm dev
```

Queda en `http://localhost:5173`. Para la versión de producción:

```bash
pnpm build
```

```bash
pnpm preview
```

## Desplegar en Netlify

`netlify.toml` ya trae el build command (`pnpm build`), el directorio publicado
(`dist`) y la redirección de SPA — sin ella, recargar una ruta interna como
`/tema/pitagoras` daría 404.

Desde la CLI:

```bash
netlify deploy --build --prod
```

O conectando el repositorio en Netlify: toma la configuración del `netlify.toml`
sin tocar nada.

## Cómo está organizado

```
src/
  components/
    triangles/    SVG paramétricos: geometry.ts resuelve el triángulo y
                  proyecta a coordenadas del viewBox; los componentes solo
                  dibujan. Los ángulos y proporciones son los reales.
    ui/           Piezas compartidas (tarjeta, botón, ecuación, deslizador…).
  content/        Los datos: temas, ejercicios y glosario, tipados en types.ts.
                  Separado de la presentación a propósito.
  features/
    home/         Mapa de progreso.
    practice/     Página de tema, escenarios interactivos y tarjeta de
                  ejercicio. Los escenarios se registran en escenarios/index.ts.
    quiz/         Prueba cronometrada.
    glossary/     Glosario buscable.
  lib/
    trig.ts       Trigonometría en grados y lectura de respuestas.
    progress.ts   Persistencia en localStorage.
    theme.ts      Modo claro / oscuro.
```

### Agregar más ejercicios

Añade un objeto a `src/content/ejercicios.ts`. No hay que tocar ningún
componente: la figura, las pistas, la respuesta y los pasos salen de los datos.
La prueba cronometrada toma preguntas de esa misma lista automáticamente.

### Agregar un escenario

Escribe el componente en `src/features/practice/escenarios/`, regístralo en
`escenarios/index.ts` y añade su id al array `escenarios` del tema en
`src/content/temas.ts`.

## Diseño

Los tokens de color y tipografía se heredan tal cual de la guía, para que las
dos piezas se sientan el mismo material:

- **Lados del triángulo rectángulo** — hipotenusa naranja (`--hyp`), opposite
  rosa (`--opp`), adjacent verde azulado (`--adj`), catetos azul (`--leg`).
- **Tema 5** — cada ángulo y su lado opuesto comparten color: A/a azul,
  B/b morado, C/c verde.
- **Tipografía** — Bricolage Grotesque para títulos y cifras, Atkinson
  Hyperlegible para el texto, Caveat para las notas a mano.
- **Fondo** — papel cuadriculado, como un cuaderno de geometría.

Iconografía: Hugeicons. Animaciones: Motion.
