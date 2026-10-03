# Spec: Landing de viajes "Rumbo"

## Objetivo
Landing de una agencia de viajes ficticia que lleva al visitante de una idea ("quiero viajar") a una consulta enviada. Una sola acción principal: el **planificador** (destino, salida, viajeros) que arma una propuesta preliminar y la conecta con el formulario de contacto. El sistema visual sigue `DESIGN.md` (Airbnb).

## Alcance
- Incluye: cabecera con navegación y buscador compacto, hero con planificador y video, destinos filtrables con favoritos, propuesta preliminar, asesor, cómo funciona, opiniones, cierre, formulario de contacto, footer y créditos.
- Excluye: backend real (el envío es simulado), pagos y reservas, cuentas de usuario, persistencia (favoritos y búsqueda viven en memoria), rutas múltiples, internacionalización.

## Requisitos funcionales

| ID | Requisito |
|----|-----------|
| RF-01 | La página es de una sola vista con secciones ancladas: inicio, destinos, asesor, cómo funciona, opiniones y contacto. |
| RF-02 | El planificador (destino, salida, viajeros) está en el hero; el destino vacío significa "Sorpréndeme". |
| RF-03 | Buscar arma una propuesta con fechas, total estimado (precio × viajeros) y primeros días, y resalta el destino. |
| RF-04 | Los destinos se filtran por categoría y se pueden guardar como favoritos, con contador. |
| RF-05 | Desde una tarjeta o desde la propuesta se puede pedir el viaje: el formulario recibe destino y, si existen, fechas y viajeros. |
| RF-06 | Las validaciones del formulario viven en `validators/contactValidators.js`, no en el JSX ni en atributos HTML (`noValidate`). |
| RF-07 | El formulario no envía datos: simula el envío con un temporizador y confirma. |
| RF-08 | Los datos (destinos, precios, opiniones, personas) son ficticios y están en `src/content/`. |
| RF-09 | Las fotografías y el video provienen de Wikimedia Commons; los créditos son accesibles desde el footer. |
| RF-10 | Toda la interfaz está en español. |
| RF-11 | El sistema visual (colores, tipografía, radios, sombra única) sale de `DESIGN.md` y se define como tokens en `styles/tokens.css`. |

## Criterios de aceptación

### Navegación
- **CA-01** El botón del menú móvil alterna `aria-expanded` y la tecla Escape lo cierra.
- **CA-02** Al elegir un enlace del menú móvil, el menú se cierra.

### Destinos
- **CA-03** Filtrar por categoría muestra solo los destinos de esa categoría; "Todos" muestra los seis.
- **CA-04** Guardar un favorito cambia el botón a "Quitar … de favoritos" (`aria-pressed="true"`) y actualiza el contador ("1 guardado").
- **CA-05** "Quiero este viaje" preselecciona el destino en el formulario.

### Planificador y propuesta
- **CA-06** Buscar con un destino y N viajeros muestra la propuesta con el nombre del destino, los viajeros y el total (precio × N), resalta la tarjeta y la coloca primero.
- **CA-07** Buscar sin destino ("Sorpréndeme") elige uno, muestra "Elegido para ti" y una razón.
- **CA-08** "Pedir esta propuesta" lleva destino y viajeros al formulario (destino y mensaje precargados); "Limpiar búsqueda" elimina la propuesta.

### Opiniones y créditos
- **CA-09** Se muestran todas las opiniones; al elegir otra, pasa a ser la destacada (`aria-pressed`).
- **CA-10** El footer ofrece el botón "Créditos de imágenes".

### Formulario de contacto
- **CA-11** Al enviar vacío se muestran los errores de cada campo y el foco va al primer campo inválido.
- **CA-12** Al salir de un campo se valida; al corregirlo, el error desaparece.
- **CA-13** Con datos válidos el botón pasa a "Enviando…" (deshabilitado) y luego se muestra "¡Gracias, {nombre}!"; "Enviar otra consulta" restablece el formulario.

### Validadores (puros)
- **CA-14** Nombre: obligatorio y mínimo 2 caracteres.
- **CA-15** Correo: obligatorio y con formato válido.
- **CA-16** Destino: obligatorio.
- **CA-17** Mensaje: opcional, máximo 500 caracteres.
- **CA-18** Consentimiento: debe aceptarse.
- **CA-19** `validateContactForm` devuelve `valid` solo si todos los campos pasan y un error por campo.

### Mejoras de UX
- **UX-01** Al bajar, la cabecera sustituye los enlaces por un buscador compacto que lleva al planificador y le da el foco.
- **UX-02** El marco del video del hero crece de tarjeta a ancho completo con el scroll; el video tiene botón de pausa.
- **UX-03** Una barra de categorías con iconos queda fija bajo la cabecera.
- **UX-04** La ruta de "Cómo funciona" se dibuja al entrar en pantalla.
- **UX-05** El botón de volver arriba muestra un anillo con el progreso de lectura.
- **UX-06** Con `prefers-reduced-motion` se desactivan las animaciones y el video queda detenido; con "ahorro de datos" no se descarga el video.
- **UX-07** Accesibilidad: enlace "Saltar al contenido", etiquetas asociadas, foco visible, `aria-current` en la sección activa y objetivos táctiles de al menos 44 px.

## Datos de prueba
Seis destinos (Bora Bora, Patagonia, Nueva York, Kioto, Marrakech, Islandia), cuatro opiniones y una asesora ficticia (Valeria Ortega). Máximo 12 viajeros.

## Limitaciones conocidas
- El contraste de texto blanco sobre Rausch (`#ff385c`) es ~3,6:1, inferior al 4,5:1 de WCAG AA para texto normal; se mantiene por fidelidad a `DESIGN.md`.
- Se usa Inter como sustituta de Airbnb Cereal VF, como sugiere `DESIGN.md`.
- No hay datos persistentes ni envío real.
