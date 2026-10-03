import { PRICE_NOTE } from '../content/destinations';
import { addDays, formatDate, formatPrice, travelersLabel } from '../lib/trip';
import Button from './Button';
import Icon from './Icon';
import './Proposal.css';

// Propuesta preliminar con la forma de una ficha de reserva: fotografía y momentos a la izquierda, total a la derecha.
export default function Proposal({ search, destination, onRequest, onClear }) {
  const { date, travelers, surprise } = search;
  const total = destination.price * travelers;

  return (
    <section id="propuesta" className="proposal" aria-labelledby="propuesta-title">
      <p className="visually-hidden" role="status">
        Propuesta lista para {destination.name} · {travelersLabel(travelers)}
      </p>

      <div className="proposal__main">
        <p className="proposal__tag">
          <Icon name={surprise ? 'sparkles' : 'check'} size={16} />
          {surprise ? 'Elegido para ti' : 'Tu propuesta preliminar'}
        </p>
        <h3 id="propuesta-title" className="proposal__title">
          {destination.name}, {destination.country}
        </h3>
        {surprise && <p className="proposal__reason">{destination.reason}</p>}

        <div className="proposal__media">
          <img src={destination.image} alt={destination.alt} style={destination.focus ? { objectPosition: destination.focus } : undefined} />
        </div>

        <div className="proposal__moments">
          <p className="proposal__moments-title">Así podría empezar tu viaje</p>
          <ol>
            {destination.moments.map((moment, index) => (
              <li key={moment} style={{ '--i': index }}>
                <span className="proposal__step" aria-hidden="true">
                  {index + 1}
                </span>
                {moment}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <aside className="proposal__card" aria-label="Resumen de tu propuesta">
        <p className="proposal__price">
          <span className="proposal__total">{formatPrice(total)}</span>
          <span className="proposal__note">
            Estimado · {formatPrice(destination.price)} {PRICE_NOTE}
          </span>
        </p>

        <dl className="proposal__facts">
          <div>
            <dt>Salida</dt>
            <dd>{date ? formatDate(date) : 'Fechas por definir'}</dd>
          </div>
          <div>
            <dt>Regreso</dt>
            <dd>{date ? formatDate(addDays(date, destination.days)) : `${destination.days} días de viaje`}</dd>
          </div>
          <div className="proposal__facts-wide">
            <dt>Viajeros</dt>
            <dd>{travelersLabel(travelers)}</dd>
          </div>
        </dl>

        <Button icon="arrow" size="lg" className="proposal__cta" onClick={() => onRequest(destination, search)}>
          Pedir esta propuesta a un asesor
        </Button>
        <p className="proposal__fine">Sin compromiso. Un asesor te responde en menos de 24 horas.</p>
        <Button variant="link" onClick={onClear}>
          Limpiar búsqueda
        </Button>
      </aside>
    </section>
  );
}
