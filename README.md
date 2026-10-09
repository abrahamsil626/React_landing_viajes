# Rumbo

Landing page de una **agencia de viajes a medida** (ficticia) en React 19 + Vite, orientada a la experiencia de usuario y con una estética inspirada en el sistema de diseño de Airbnb: lienzo blanco, tinta casi negra, un único acento de color, formas en píldora y fotografía como protagonista.

> **Prueba el proyecto en vivo:** [tienda2-agenciaviajes-frontend.netlify.app](https://tienda2-agenciaviajes-frontend.netlify.app)

## Cómo se hizo

1. **Sistema de diseño.** El punto de partida visual es el [`DESIGN.md`](DESIGN.md) de Airbnb, traducido a variables CSS en [`src/styles/tokens.css`](src/styles/tokens.css).
2. **Especificación.** La landing tiene requisitos y criterios de aceptación en [`specs/landing/`](specs/landing/) (Spec-Driven Development): `spec.md` es la fuente de verdad, `plan.md` recoge las decisiones técnicas y `tasks.md` las tareas.
3. **Implementación** en React siguiendo esa spec, con al menos una prueba automática por criterio (el nombre de cada prueba incluye su ID, `CA-xx`).

> Las fotografías de los destinos y el video del hero provienen de Wikimedia Commons con licencias libres; los créditos y licencias están en [`src/content/credits.js`](src/content/credits.js).

## Funcionalidad

- Interfaz íntegramente **en español**.
- **Cabecera** fija que marca la sección activa; al bajar, un buscador compacto sustituye los enlaces y lleva de vuelta al planificador. Menú móvil que se cierra con Escape.
- **Hero** con el **planificador** en píldora (destino, salida, viajeros) y un marco de video que crece de tarjeta a ancho completo con el scroll, con botón de pausa.
- **Propuesta preliminar:** buscar arma una ficha con fechas de salida y regreso, total estimado (precio × viajeros) y primeros días, resalta el destino y lo coloca primero. Sin destino, "Sorpréndeme" elige uno y explica por qué.
- **Destinos** con barra de categorías fija, tarjetas fotográficas y favoritos con contador.
- **Tu asesor**, **Cómo funciona** (una ruta que se dibuja al entrar en pantalla) y **Opiniones** con una destacada seleccionable.
- **Formulario de contacto** que recibe destino, fechas y viajeros desde la propuesta, con validación al salir de cada campo, mensaje específico por campo, foco al primer error, contador de caracteres y confirmación de envío.
- **Footer** con navegación y contacto, y botón de volver arriba con anillo de progreso de lectura.
- **Accesibilidad:** enlace "Saltar al contenido", etiquetas asociadas, foco visible, `aria-pressed`/`aria-expanded`/`aria-current` y animaciones desactivadas con `prefers-reduced-motion`.
- Diseño adaptable a móvil, tablet y escritorio, sin scroll horizontal.

> El envío del formulario es **simulado** en el cliente (un temporizador y la confirmación); no hay backend. Destinos, precios, opiniones y personas son ficticios, y favoritos y búsqueda viven solo en memoria.

## Stack

React 19 · JavaScript · Vite · CSS propio con variables (sin librería de componentes) · Vitest + Testing Library.

## Empezar

Requiere Node.js 20 o superior.

```bash
git clone https://github.com/abrahamsil626/React_landing_viajes.git
cd React_landing_viajes
npm install
npm run dev        # http://localhost:5173
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve localmente el build de producción |
| `npm test` | Pruebas (criterios de aceptación de la spec) |
| `npm run test:watch` | Pruebas en modo observación |

## Estructura

```
specs/landing/  Especificación, plan y tareas (spec-driven)
docs/           Diagramas de flujo en Mermaid (planificador y contacto)
DESIGN.md       Sistema de diseño de Airbnb
public/media/   Video del hero
src/
  assets/       Una fotografía por destino
  components/   Un componente y su CSS por sección, más Button, Icon y Reveal
  content/      Datos de prueba (sitio, destinos, opiniones, créditos)
  hooks/        useInView, useActiveSection, useScrolled, usePrefersReducedMotion
  lib/          Formato de precios y fechas
  styles/       tokens.css y global.css
  validators/   Validaciones del formulario (funciones puras) y sus pruebas
  test/         Configuración de las pruebas
```

## Sistema de diseño

Reglas en [`DESIGN.md`](DESIGN.md) y tokens en [`src/styles/tokens.css`](src/styles/tokens.css) (colores, tipografía, radios y sombras como variables CSS).

- **Color:** lienzo blanco (`#ffffff`), tinta `#222222` y un solo acento, Rausch (`#ff385c`), reservado para las acciones principales.
- **Tipografía:** *Inter* desde Google Fonts, como sustituta de Airbnb Cereal VF, con tamaños fluidos (`clamp`). Sin conexión se usan las tipografías del sistema.
- **Forma:** radios de `8px` a `32px` y píldora para el planificador y los botones.
- **Profundidad:** una sombra suave como elevación base y una variante más marcada para estados hover y elementos flotantes.
- **Movimiento:** entradas al hacer scroll y micro-interacciones, todo desactivable con `prefers-reduced-motion`.
