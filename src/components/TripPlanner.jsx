import { useState } from 'react';
import { DESTINATIONS, MAX_TRAVELERS } from '../content/destinations';
import Icon from './Icon';
import './TripPlanner.css';

const todayISO = () => new Date().toISOString().slice(0, 10);

// Buscador en píldora: tres segmentos (destino, salida, viajeros) y un botón que los une.
export default function TripPlanner({ onSearch }) {
  const [destinationId, setDestinationId] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(2);

  const changeTravelers = (delta) =>
    setTravelers((prev) => Math.min(MAX_TRAVELERS, Math.max(1, prev + delta)));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ destinationId, date, travelers });
  };

  return (
    <form className="planner" onSubmit={handleSubmit} aria-label="Planificador de viaje">
      <div className="planner__seg planner__seg--where">
        <label htmlFor="planner-destino">Destino</label>
        <select id="planner-destino" value={destinationId} onChange={(event) => setDestinationId(event.target.value)}>
          <option value="">Sorpréndeme: elijan por mí</option>
          {DESTINATIONS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}, {d.country}
            </option>
          ))}
        </select>
      </div>

      <div className="planner__seg">
        <label htmlFor="planner-fecha">Salida</label>
        <input id="planner-fecha" type="date" min={todayISO()} value={date} onChange={(event) => setDate(event.target.value)} />
      </div>

      <div className="planner__seg planner__seg--who">
        <span id="planner-viajeros-label" className="planner__label">
          Viajeros
        </span>
        <div className="stepper" role="group" aria-labelledby="planner-viajeros-label">
          <button
            type="button"
            className="stepper__btn"
            onClick={() => changeTravelers(-1)}
            disabled={travelers <= 1}
            aria-label="Quitar un viajero"
          >
            <Icon name="minus" size={16} />
          </button>
          <output className="stepper__value" aria-live="polite">
            {travelers}
          </output>
          <button
            type="button"
            className="stepper__btn"
            onClick={() => changeTravelers(1)}
            disabled={travelers >= MAX_TRAVELERS}
            aria-label="Añadir un viajero"
          >
            <Icon name="plus" size={16} />
          </button>
        </div>
      </div>

      <button type="submit" className="planner__submit">
        <Icon name="search" size={18} />
        <span>Ver mi propuesta</span>
      </button>
    </form>
  );
}
