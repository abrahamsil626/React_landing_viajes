# Rumbo · Landing page de viajes

Landing de una agencia de viajes ficticia, hecha con React y orientada a la **experiencia de usuario**. Es un proyecto de demostración: todo es frontend, sin backend ni base de datos. El contenido son datos de prueba. El sistema visual sigue el [`DESIGN.md`](DESIGN.md) de Airbnb.

## Stack
- React 19 + Vite (JavaScript)
- CSS propio con variables (sin librería de componentes)
- Vitest + React Testing Library

## Requisitos
Node.js 20 o superior y npm.

## Uso
```bash
npm install
npm run dev        # http://localhost:5173
npm test           # ejecuta las pruebas
npm run build      # build de producción en dist/
npm run preview    # sirve el build
```

## Secciones
1. **Cabecera** fija con sección activa. Al bajar, un buscador compacto sustituye los enlaces y lleva de vuelta al planificador.
2. **Hero** con el **planificador** en píldora (destino, salida, viajeros) y un marco de video que se expande con el scroll.
3. **Destinos** con barra de categorías fija, tarjetas fotográficas y favoritos. Tras buscar aparece la **propuesta** como ficha de reserva.
4. **Tu asesor**, **Cómo funciona** (una ruta que se dibuja al entrar en pantalla) y **Opiniones**.
5. **Cierre** con foto y llamada a hablar con el asesor.
6. **Contacto** con validaciones, estados de carga y confirmación; recibe destino, fechas y viajeros desde la propuesta.
7. **Footer** claro, con botón de volver arriba (con anillo de progreso) y créditos de imágenes.

## Desarrollo guiado por especificación (SDD)
La especificación en `specs/landing/` es la fuente de verdad. Cada criterio de aceptación (CA-xx) tiene al menos una prueba cuyo nombre incluye su ID. Ante un cambio de comportamiento, se actualiza primero `spec.md`, luego `plan.md` y `tasks.md`, y después el código.

| Archivo | Contenido |
|---------|-----------|
| [`specs/landing/spec.md`](specs/landing/spec.md) | Objetivo, alcance, requisitos (RF), criterios (CA) y mejoras de UX |
| [`specs/landing/plan.md`](specs/landing/plan.md) | Stack, decisiones técnicas y estructura |
| [`specs/landing/tasks.md`](specs/landing/tasks.md) | Tareas hechas y pendientes |

## Diagramas
Los flujos están en Mermaid, en `docs/`:
- [`flujo-planificador.mmd`](docs/flujo-planificador.mmd): del buscador a la propuesta y al formulario.
- [`flujo-contacto.mmd`](docs/flujo-contacto.mmd): validación, envío simulado y confirmación.

## Estructura
```
specs/landing/                spec.md, plan.md, tasks.md
docs/                         diagramas .mmd
DESIGN.md                     sistema de diseño de Airbnb
public/media/                 video del hero
src/
  assets/images/              una fotografía por destino
  content/                    datos de prueba (sitio, destinos, opiniones, créditos)
  validators/                 validaciones del formulario (funciones puras) y pruebas
  lib/                        formato de precios y fechas
  hooks/                      useInView, useActiveSection, useScrolled, usePrefersReducedMotion
  components/                 un componente y su CSS por sección, más Button, Icon y Reveal
  styles/                     tokens.css (colores, tipografía, radios, sombra) y global.css
  App.jsx, main.jsx, App.test.jsx
```

## Decisiones de UX
- **Planificador real:** buscar arma una propuesta (fechas de salida y regreso, total por viajeros, primeros días), pone el destino primero y lo resalta. "Sorpréndeme" elige un destino y explica por qué.
- **Formulario cuidado:** validación al salir del campo, mensaje específico por campo, foco automático al primer error, contador de caracteres y confirmación con opción de enviar otra consulta.
- **Animaciones con criterio:** entrada al hacer scroll, marco del video que crece, ruta que se dibuja y micro-interacciones. Todo se desactiva con `prefers-reduced-motion`.
- **Accesibilidad:** enlace "saltar al contenido", etiquetas asociadas, `aria-pressed`/`aria-expanded`/`aria-current`, foco visible, menú que cierra con Escape y botón de pausa para el video.
- **Adaptable:** pensado para móvil, tablet y escritorio, sin scroll horizontal.

## Formulario y datos
Las validaciones viven en `src/validators/contactValidators.js`, no en el JSX ni en atributos HTML.

| Campo | Regla | Mensaje |
|-------|-------|---------|
| Nombre | Obligatorio, mínimo 2 caracteres | Cuéntanos tu nombre / El nombre debe tener al menos 2 caracteres |
| Correo | Obligatorio y con formato válido | Necesitamos tu correo para responderte / Ingresa un correo válido |
| Destino | Obligatorio | Elige un destino de interés |
| Mensaje | Opcional, máximo 500 caracteres | El mensaje no puede superar 500 caracteres |
| Política | Debe aceptarse | Necesitamos tu autorización para responderte |

**El formulario no envía nada:** al validar correctamente simula el envío con un temporizador y muestra la confirmación. Destinos, precios, opiniones y personas son ficticios.

## Fuentes
`index.html` carga *Inter* desde Google Fonts, como sustituta de Airbnb Cereal VF. Sin conexión, la página usa tipografías del sistema.

## Imágenes y video
Las fotografías de los destinos y el video del hero provienen de Wikimedia Commons con licencias libres (CC0, dominio público, CC BY y CC BY-SA). Los créditos y enlaces están en `src/content/credits.js` y se muestran en el footer. El video vive en `public/media/`; para cambiarlo, reemplaza el archivo y actualiza `VIDEO_SRC` en `src/components/Hero.jsx` y el crédito.

## Próximos pasos posibles
Conectar el formulario a un servicio real, detalle de cada destino, internacionalización y fotos reales. Ver `specs/landing/tasks.md`.
