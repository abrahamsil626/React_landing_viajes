import { useState } from 'react';
import { DESTINATIONS } from '../content/destinations';
import { TESTIMONIALS } from '../content/testimonials';
import Icon from './Icon';
import Reveal from './Reveal';
import './Testimonials.css';

const withTrip = TESTIMONIALS.map((item) => ({ ...item, destination: DESTINATIONS.find((d) => d.id === item.destinationId) }));

const average = TESTIMONIALS.reduce((sum, item) => sum + item.rating, 0) / TESTIMONIALS.length;
const AVERAGE_LABEL = average.toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const excerpt = (text) => (text.length > 92 ? `${text.slice(0, 89).trimEnd()}…` : text);

export default function Testimonials() {
  const [activeId, setActiveId] = useState(withTrip[0].id);
  const current = withTrip.find((item) => item.id === activeId);

  return (
    <section id="opiniones" className="section testimonials" aria-labelledby="opiniones-title">
      <div className="container">
        <Reveal className="testimonials__head">
          <p className="rating-display" aria-label={`Valoración media ${AVERAGE_LABEL} de 5`}>
            <Icon name="laurel" size={56} className="rating-display__laurel" />
            <span className="rating-display__value">{AVERAGE_LABEL}</span>
            <Icon name="laurel" size={56} className="rating-display__laurel rating-display__laurel--right" />
          </p>
          <h2 id="opiniones-title" className="section-title">
            Lo que cuentan quienes ya viajaron
          </h2>
          <p className="testimonials__demo">Opiniones de demostración</p>
        </Reveal>

        <div className="testimonials__layout">
          <figure className="featured" key={current.id}>
            <div className="featured__media">
              <img
                src={current.destination.image}
                alt={current.destination.alt}
                style={current.destination.focus ? { objectPosition: current.destination.focus } : undefined}
              />
              <figcaption className="featured__trip">
                <Icon name="pin" size={14} /> {current.trip}
              </figcaption>
            </div>
            <div className="featured__body">
              <span className="featured__rating" aria-label={`${current.rating} de 5 estrellas`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" size={16} filled={i < current.rating} />
                ))}
              </span>
              <blockquote className="featured__text">“{current.text}”</blockquote>
              <p className="featured__author">
                <strong>{current.name}</strong>
              </p>
            </div>
          </figure>

          <ul className="voices" aria-label="Elegir opinión">
            {withTrip.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`voice ${item.id === activeId ? 'is-active' : ''}`}
                  aria-pressed={item.id === activeId}
                  aria-label={`Ver la opinión de ${item.name}`}
                  onClick={() => setActiveId(item.id)}
                >
                  <img src={item.destination.image} alt="" loading="lazy" />
                  <span className="voice__body">
                    <strong>{item.name}</strong>
                    <span className="voice__trip">{item.trip}</span>
                    <span className="voice__text">{excerpt(item.text)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
