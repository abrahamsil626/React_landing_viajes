import { useMemo, useState } from 'react';
import { CATEGORIES, CATEGORY_ICONS, DESTINATIONS } from '../content/destinations';
import DestinationCard from './DestinationCard';
import Icon from './Icon';
import Proposal from './Proposal';
import Reveal from './Reveal';
import './Destinations.css';

export default function Destinations({ search, onSelect, onRequest, onClear }) {
  const [category, setCategory] = useState('Todos');
  const [favorites, setFavorites] = useState([]);

  const searched = search ? DESTINATIONS.find((d) => d.id === search.destinationId) : null;

  // El destino buscado va primero; si se filtra por categoría, el filtro manda.
  const visible = useMemo(() => {
    const list = DESTINATIONS.filter((d) => category === 'Todos' || d.category === category);
    if (!searched) return list;
    return [...list].sort((a, b) => Number(b.id === searched.id) - Number(a.id === searched.id));
  }, [category, searched]);

  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <section id="destinos" className="section destinations" aria-labelledby="destinos-title">
      <div className="container">
        <Reveal className="destinations__head">
          <div>
            <h2 id="destinos-title" className="section-title">
              Elige tu próxima ruta
            </h2>
            <p className="section-lead">
              Seis viajes de ejemplo para inspirarte. Cada uno se rediseña a tu ritmo y presupuesto. Los precios son
              de demostración.
            </p>
          </div>
          <p className={`destinations__saved ${favorites.length ? 'has-items' : ''}`} aria-live="polite">
            <Icon name="heart" size={18} filled={favorites.length > 0} />
            {favorites.length === 0
              ? 'Guarda tus favoritos'
              : `${favorites.length} ${favorites.length === 1 ? 'guardado' : 'guardados'}`}
          </p>
        </Reveal>

        {searched && <Proposal key={search.at} search={search} destination={searched} onRequest={onRequest} onClear={onClear} />}
      </div>

      <div className="catbar">
        <div className="container">
          <div className="catbar__scroll" role="group" aria-label="Filtrar destinos por categoría">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${category === item ? 'is-active' : ''}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                <Icon name={CATEGORY_ICONS[item]} size={26} />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="destinations__grid" key={category}>
          {visible.map((destination, index) => (
            <Reveal key={destination.id} delay={(index % 3) * 80}>
              <DestinationCard
                destination={destination}
                favorite={favorites.includes(destination.id)}
                highlighted={Boolean(searched) && searched.id === destination.id}
                onToggleFavorite={toggleFavorite}
                onSelect={onSelect}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
