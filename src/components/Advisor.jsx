import { ADVISOR } from '../content/site';
import Button from './Button';
import Icon from './Icon';
import Reveal from './Reveal';
import './Advisor.css';

const initials = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

// Ficha de anfitrión: quien te atiende es una persona, y se nota.
export default function Advisor() {
  return (
    <section id="asesor" className="section advisor" aria-labelledby="asesor-title">
      <div className="container advisor__layout">
        <Reveal className="advisor__intro">
          <h2 id="asesor-title" className="section-title">
            Una persona, de tu primera idea a tu regreso.
          </h2>
          <blockquote className="advisor__quote">“{ADVISOR.quote}”</blockquote>
          <ul className="advisor__facts">
            {ADVISOR.facts.map((fact) => (
              <li key={fact.title}>
                <Icon name={fact.icon} size={26} />
                <div>
                  <h3>{fact.title}</h3>
                  <p>{fact.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="advisor__card" delay={120}>
          <div className="advisor__avatar" aria-hidden="true">
            {initials(ADVISOR.name)}
            <span className="advisor__badge">
              <Icon name="check" size={14} />
            </span>
          </div>
          <p className="advisor__name">{ADVISOR.name}</p>
          <p className="advisor__role">{ADVISOR.role} · perfil de demostración</p>
          <dl className="advisor__stats">
            <div>
              <dt>Respuesta</dt>
              <dd>&lt; 24 h</dd>
            </div>
            <div>
              <dt>Asesor por viaje</dt>
              <dd>1</dd>
            </div>
            <div>
              <dt>Paquetes cerrados</dt>
              <dd>0</dd>
            </div>
          </dl>
          <Button href="#contacto" icon="arrow" size="lg" variant="dark" className="advisor__cta">
            Hablar con un asesor
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
