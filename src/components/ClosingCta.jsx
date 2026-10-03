import { DESTINATIONS } from '../content/destinations';
import Button from './Button';
import Reveal from './Reveal';
import './ClosingCta.css';

const backdrop = DESTINATIONS.find((d) => d.id === 'bora-bora');

export default function ClosingCta() {
  return (
    <section className="closing" aria-labelledby="cierre-title">
      <Reveal className="container">
        <div className="closing__card">
          <img className="closing__bg" src={backdrop.image} alt="" loading="lazy" />
          <div className="closing__tint" aria-hidden="true" />
          <div className="closing__inner">
            <h2 id="cierre-title" className="closing__title">
              Tu próximo viaje empieza con una conversación.
            </h2>
            <Button href="#contacto" size="lg" icon="arrow">
              Hablar con mi asesor
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
