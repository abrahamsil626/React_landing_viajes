import { FAVORITE_RATING, PRICE_NOTE } from '../content/destinations';
import { formatPrice } from '../lib/trip';
import Icon from './Icon';
import Button from './Button';
import './DestinationCard.css';

export default function DestinationCard({ destination, favorite, highlighted, onToggleFavorite, onSelect }) {
  const { name, country, category, days, price, rating, image, alt, blurb, focus } = destination;

  return (
    <article className={`card ${highlighted ? 'is-highlighted' : ''}`} data-destination={destination.id}>
      <div className="card__media">
        <img src={image} alt={alt} loading="lazy" style={focus ? { objectPosition: focus } : undefined} />
        {rating >= FAVORITE_RATING && <span className="card__badge">Favorito de viajeros</span>}
        <button
          type="button"
          className={`card__fav ${favorite ? 'is-active' : ''}`}
          aria-pressed={favorite}
          aria-label={favorite ? `Quitar ${name} de favoritos` : `Guardar ${name} en favoritos`}
          onClick={() => onToggleFavorite(destination.id)}
        >
          <Icon name="heart" size={20} filled={favorite} />
        </button>
        <p className="card__blurb">{blurb}</p>
      </div>

      <div className="card__body">
        <div className="card__head">
          <h3 className="card__title">{name}</h3>
          <p className="card__rating" aria-label={`Valoración ${rating} de 5`}>
            <Icon name="star" size={14} filled /> {rating}
          </p>
        </div>
        <p className="card__meta">
          {country} · {days} días · {category}
        </p>

        <div className="card__foot">
          <p className="card__price">
            <strong>Desde {formatPrice(price)}</strong>
            <span>{PRICE_NOTE}</span>
          </p>
          <Button variant="link" size="sm" icon="arrow" onClick={() => onSelect(destination)} aria-label={`Quiero viajar a ${name}`}>
            Quiero este viaje
          </Button>
        </div>
      </div>
    </article>
  );
}
