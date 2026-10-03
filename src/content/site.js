export const SITE = {
  name: 'Rumbo',
  tagline: 'Viajes a medida',
  email: 'hola@rumbo-viajes.test',
  phone: '+52 55 0000 0000',
  address: 'Av. Ejemplo 123, Ciudad de México',
};

export const NAV_LINKS = [
  { id: 'destinos', label: 'Destinos' },
  { id: 'asesor', label: 'Tu asesor' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'opiniones', label: 'Opiniones' },
];

// Perfil de demostración: la persona y sus datos son ficticios.
export const ADVISOR = {
  name: 'Valeria Ortega',
  role: 'Asesora de viajes',
  quote:
    'Antes de proponerte nada te pregunto cómo te gusta viajar: si madrugas o no, cuánto caminas, qué te cansa. La ruta sale de ahí.',
  facts: [
    { icon: 'clock', title: 'Responde en menos de 24 horas', text: 'Una persona real revisa tu consulta, no un formulario automático.' },
    { icon: 'users', title: 'Un solo asesor de principio a fin', text: 'No repites tu historia: quien te escucha es quien diseña tu ruta.' },
    { icon: 'compass', title: 'Ruta a tu ritmo', text: 'Sin paquetes cerrados: cada día se ajusta a tus gustos y presupuesto.' },
  ],
};

export const BENEFITS = [
  { icon: 'route', title: 'Itinerarios a medida', text: 'Sin paquetes cerrados: la ruta se ajusta a ti.' },
  { icon: 'pin', title: 'Guías locales', text: 'Anfitriones que viven en el destino.' },
  { icon: 'shield', title: 'Cancelación flexible', text: 'La mayoría de las reservas admiten cambios.' },
  { icon: 'headset', title: 'Acompañamiento humano', text: 'Personas reales durante todo el viaje.' },
];

export const STEPS = [
  {
    when: 'Hoy',
    title: 'Cuéntanos tu idea',
    text: 'Elige un destino o descríbenos lo que sueñas. Tu asesor te escribe para entender cómo te gusta viajar.',
  },
  {
    when: 'En 24 horas',
    title: 'Diseñamos tu ruta',
    text: 'Recibes una propuesta día por día, con vuelos sugeridos, alojamiento y actividades.',
  },
  {
    when: 'Tu viaje',
    title: 'Tú solo disfrutas',
    text: 'Ajustamos lo que quieras antes de reservar y te acompañamos durante todo el viaje.',
  },
];

export const FOOTER_LINKS = [
  {
    title: 'Navegar',
    links: [
      { label: 'Destinos', href: '#destinos' },
      { label: 'Tu asesor', href: '#asesor' },
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Opiniones', href: '#opiniones' },
    ],
  },
];
