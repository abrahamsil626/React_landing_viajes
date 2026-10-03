# Plan técnico: Landing de viajes

## Stack
- Vite + React 19 (JavaScript, sin TypeScript)
- CSS propio con variables (sin librería de componentes)
- Vitest + React Testing Library + jsdom
- Fuente: Inter (Google Fonts), sustituta de Airbnb Cereal VF

## Decisiones
| Decisión | Razón |
|----------|-------|
| Estado de búsqueda e interés en `App`, pasado por props | Pocas vistas y un solo flujo; un router o un store serían excesivos (RF-01, RF-05). |
| Una sola página con secciones ancladas y `scrollIntoView` | Es una landing; no hay rutas (RF-01). |
| Validadores como funciones puras en `validators/contactValidators.js` | Fáciles de probar y separados de la UI (RF-06). |
| Formulario con `noValidate` | Evita la validación nativa; manda el módulo de validadores. |
| Envío simulado con `setTimeout` | No hay backend; es reemplazable por una API sin tocar la UI (RF-07). |
| Contenido en `src/content/*.js` | Una sola fuente de datos de prueba, separada de los componentes (RF-08). |
| `DESIGN.md` de Airbnb como sistema visual, volcado a `styles/tokens.css` | Los componentes solo usan tokens (`--primary`, `--r-md`, `--shadow`…), así que cambiar de marca es cambiar un archivo (RF-11). |
| Una sola sombra y radios de 8/14/32 px | Es la regla de elevación de `DESIGN.md`. |
| Marco del hero con `--p` actualizado por scroll (rAF) | Anima solo con CSS variables, sin re-renderizar React (UX-02). |
| Progreso de lectura con `animation-timeline: scroll()` si el navegador lo soporta | CSS puro; sin JS en la cabecera (UX-05). |
| Animaciones desactivadas con `prefers-reduced-motion` | Accesibilidad (UX-06). |
| Imágenes y video locales (Wikimedia Commons) con créditos | Licencias libres que exigen atribución (RF-09). |

## Estructura
```
specs/landing/        spec.md, plan.md, tasks.md
docs/                 flujo-planificador.mmd, flujo-contacto.mmd
DESIGN.md             sistema de diseño de Airbnb (referencia visual)
public/media/         video del hero
src/
  assets/images/      una fotografía por destino
  content/            datos de prueba: site, destinos, opiniones, créditos
  validators/         contactValidators.js y sus pruebas
  lib/                trip.js (formato de precio y fechas, resumen del viaje)
  hooks/              useInView, useActiveSection, useScrolled, usePrefersReducedMotion
  components/         un componente y su CSS por sección, más Button, Icon y Reveal
  styles/             tokens.css y global.css
  test/setup.js
  App.jsx, main.jsx, App.test.jsx
```

## Flujo de datos
`TripPlanner` → `App.handleSearch` (resuelve "Sorpréndeme") → `search` → `Destinations` (resalta y ordena) → `Proposal` → `App.handleRequest` → `interest` → `ContactForm` (precarga destino y mensaje). Los diagramas están en `docs/`.

## Verificación
Cada criterio CA-xx se cubre con una prueba (`App.test.jsx` y `contactValidators.test.js`), y su ID aparece en el nombre de la prueba. Los criterios UX-xx son visuales y se comprueban a mano: `npm run dev` y revisión en escritorio y móvil.
