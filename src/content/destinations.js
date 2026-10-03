import boraBora from '../assets/images/destino-bora-bora.jpg';
import patagonia from '../assets/images/destino-patagonia.jpg';
import nuevaYork from '../assets/images/destino-nueva-york.jpg';
import kioto from '../assets/images/destino-kioto.jpg';
import marrakech from '../assets/images/destino-marrakech.jpg';
import islandia from '../assets/images/destino-islandia.jpg';

export const CATEGORIES = ['Todos', 'Playa', 'Montaña', 'Ciudad', 'Cultura', 'Aventura'];

export const CATEGORY_ICONS = {
  Todos: 'grid',
  Playa: 'wave',
  Montaña: 'mountain',
  Ciudad: 'city',
  Cultura: 'landmark',
  Aventura: 'compass',
};

// Las valoraciones a partir de este umbral reciben la insignia de favorito.
export const FAVORITE_RATING = 4.8;

// Datos de prueba: destinos, precios y valoraciones son ficticios.
export const DESTINATIONS = [
  {
    id: 'bora-bora',
    name: 'Bora Bora',
    country: 'Polinesia Francesa',
    category: 'Playa',
    days: 8,
    price: 3290,
    rating: 4.9,
    image: boraBora,
    alt: 'Pico verde del monte Otemanu sobre una laguna turquesa con bungalós sobre el agua',
    blurb: 'Bungalós sobre el agua y lagunas de cristal.',
    reason: 'Para quien quiere desconectar de verdad: agua tranquila, privacidad y cero prisas.',
    moments: [
      'Llegada en lancha privada y primera noche sobre la laguna',
      'Día de snorkel con rayas y tiburones de arrecife',
      'Cena en la playa y una tarde sin agenda',
    ],
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina y Chile',
    category: 'Montaña',
    days: 10,
    price: 2450,
    rating: 4.8,
    image: patagonia,
    focus: '50% 40%',
    alt: 'Cumbres nevadas de Torres del Paine sobre un lago turquesa',
    blurb: 'Glaciares, picos nevados y senderos infinitos.',
    reason: 'Para quien busca paisaje grande, caminatas con sentido y noches de silencio.',
    moments: [
      'Llegada a El Calafate y mirador del glaciar Perito Moreno',
      'Trekking de día completo con guía local',
      'Atardecer frente a las torres y cena de cordero',
    ],
  },
  {
    id: 'nueva-york',
    name: 'Nueva York',
    country: 'Estados Unidos',
    category: 'Ciudad',
    days: 6,
    price: 1890,
    rating: 4.7,
    image: nuevaYork,
    focus: '50% 60%',
    alt: 'Silueta del bajo Manhattan y el puente de Brooklyn al atardecer',
    blurb: 'Rascacielos, arte, gastronomía y una energía única.',
    reason: 'Para quien quiere ritmo, museos y buena mesa en pocos días.',
    moments: [
      'Primer paseo por el Village y cena en una cocina de barrio',
      'Día de museos con entradas reservadas',
      'Brunch, High Line y una función en Broadway',
    ],
  },
  {
    id: 'kioto',
    name: 'Kioto',
    country: 'Japón',
    category: 'Cultura',
    days: 9,
    price: 2980,
    rating: 4.9,
    image: kioto,
    alt: 'Túnel de torii naranjas entre el bosque en Fushimi Inari',
    blurb: 'Templos milenarios, jardines y ceremonias del té.',
    reason: 'Para quien viaja a mirar con calma: templos, jardines y rituales.',
    moments: [
      'Llegada y paseo al amanecer por Fushimi Inari',
      'Ceremonia del té y tarde en el barrio de Gion',
      'Día en Arashiyama y noche en un ryokan',
    ],
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Marruecos',
    category: 'Aventura',
    days: 7,
    price: 1590,
    rating: 4.6,
    image: marrakech,
    focus: '50% 72%',
    alt: 'Plaza Jemaa el-Fnaa de Marrakech con sombrillas verdes al atardecer',
    blurb: 'Zocos, dunas del Sahara y noches bajo las estrellas.',
    reason: 'Para quien quiere sentidos a tope: zocos, especias y desierto cerca.',
    moments: [
      'Llegada al riad y paseo por la medina',
      'Excursión al desierto de Agafay con cena bajo las estrellas',
      'Taller de cocina y tarde en los jardines Majorelle',
    ],
  },
  {
    id: 'islandia',
    name: 'Islandia',
    country: 'Islandia',
    category: 'Aventura',
    days: 7,
    price: 2690,
    rating: 4.8,
    image: islandia,
    focus: '60% 50%',
    alt: 'Cascada Skógafoss cayendo sobre una ladera cubierta de musgo',
    blurb: 'Auroras boreales, volcanes y aguas termales.',
    reason: 'Para quien persigue fenómenos naturales: auroras, volcanes y aguas termales.',
    moments: [
      'Llegada y baño en aguas termales del sur',
      'Cascadas, playa negra y glaciar con guía',
      'Noche de caza de auroras fuera de la ciudad',
    ],
  },
];

export const MAX_TRAVELERS = 12;

// Precios por persona, en USD (datos de demostración).
export const PRICE_NOTE = 'por persona · hotel, traslados y guías';
