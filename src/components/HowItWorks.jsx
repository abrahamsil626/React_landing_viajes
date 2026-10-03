import { BENEFITS, STEPS } from '../content/site';
import { useInView } from '../hooks/useInView';
import Icon from './Icon';
import Reveal from './Reveal';
import './HowItWorks.css';

export default function HowItWorks() {
  const [routeRef, drawn] = useInView({ threshold: 0.35 });

  return (
    <section id="como-funciona" className="section how" aria-labelledby="como-title">
      <div className="container">
        <Reveal className="how__head">
          <h2 id="como-title" className="section-title">
            De la idea al viaje, <span>sin perderte en el camino.</span>
          </h2>
        </Reveal>

        <ol className={`route ${drawn ? 'is-drawn' : ''}`} ref={routeRef}>
          <li className="route__line" aria-hidden="true" />
          {STEPS.map((step, index) => (
            <li key={step.title} className="stop" style={{ '--i': index }}>
              <span className="stop__pin" aria-hidden="true">
                {index + 1}
              </span>
              <p className="stop__when">{step.when}</p>
              <h3 className="stop__title">{step.title}</h3>
              <p className="stop__text">{step.text}</p>
            </li>
          ))}
        </ol>

        <Reveal className="how__benefits">
          <h3 className="how__benefits-title">Lo que cuidamos en cada ruta</h3>
          <ul>
            {BENEFITS.map((benefit) => (
              <li key={benefit.title}>
                <Icon name={benefit.icon} size={30} />
                <h4>{benefit.title}</h4>
                <p>{benefit.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
