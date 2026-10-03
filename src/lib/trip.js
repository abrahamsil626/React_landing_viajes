export const formatPrice = (value) => `$${value.toLocaleString('es-MX')} USD`;

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

export const addDays = (iso, days) => {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const travelersLabel = (count) => `${count} ${count === 1 ? 'viajero' : 'viajeros'}`;

// Resumen de una búsqueda del planificador, listo para precargar el mensaje del formulario.
export const tripNote = ({ date, travelers }) =>
  [date ? `Salida: ${formatDate(date)}` : null, travelers ? travelersLabel(travelers) : null].filter(Boolean).join(' · ');
