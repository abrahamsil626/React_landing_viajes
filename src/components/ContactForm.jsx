import { useEffect, useRef, useState } from 'react';
import { DESTINATIONS } from '../content/destinations';
import { SITE } from '../content/site';
import {
  FIELD_ORDER,
  MESSAGE_MAX_LENGTH,
  validateContactForm,
  validateField,
} from '../validators/contactValidators';
import Button from './Button';
import Icon from './Icon';
import Reveal from './Reveal';
import './ContactForm.css';

const SEND_DELAY_MS = 1400;
const EMPTY = { name: '', email: '', destination: '', message: '', consent: false };
const NO_ERRORS = { name: '', email: '', destination: '', message: '', consent: '' };

export default function ContactForm({ interest }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState(NO_ERRORS);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const fieldRefs = useRef({});
  const timer = useRef(null);

  // Preselecciona el destino (y el resumen de la búsqueda) cuando llega desde una tarjeta o una propuesta.
  useEffect(() => {
    if (interest) {
      setValues((prev) => ({
        ...prev,
        destination: interest.id,
        message: interest.note && !prev.message ? interest.note : prev.message,
      }));
      setErrors((prev) => ({ ...prev, destination: '', message: '' }));
    }
  }, [interest]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const setValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setValue(name, type === 'checkbox' ? checked : value);
  };

  const handleBlur = (event) => {
    const { name, type, checked, value } = event.target;
    // La aceptación de la política solo se exige al enviar.
    if (name === 'consent') return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, type === 'checkbox' ? checked : value) }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateContactForm(values);
    setErrors(result.errors);
    if (!result.valid) {
      const firstInvalid = FIELD_ORDER.find((field) => result.errors[field]);
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    setStatus('sending');
    // Simulación: no se envía ningún dato a ningún servidor.
    timer.current = setTimeout(() => setStatus('sent'), SEND_DELAY_MS);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors(NO_ERRORS);
    setStatus('idle');
  };

  const ref = (field) => (node) => {
    fieldRefs.current[field] = node;
  };

  const fieldProps = (field) => ({
    id: `contacto-${field}`,
    name: field,
    ref: ref(field),
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `contacto-${field}-error` : undefined,
  });

  const error = (field) =>
    errors[field] ? (
      <p className="field__error" id={`contacto-${field}-error`}>
        {errors[field]}
      </p>
    ) : null;

  const sending = status === 'sending';

  return (
    <section id="contacto" className="section contact" aria-labelledby="contacto-title">
      <div className="container contact__layout">
        <Reveal className="contact__intro">
          <h2 id="contacto-title" className="section-title">
            Cuéntanos tu viaje ideal
          </h2>
          <p className="section-lead">
            Déjanos tus datos y Valeria o alguien de su equipo te enviará una propuesta personalizada. Sin compromiso.
          </p>
          <ul className="contact__promises">
            <li><Icon name="check" size={18} /> Respuesta en menos de 24 horas</li>
            <li><Icon name="check" size={18} /> Propuesta gratuita y sin compromiso</li>
            <li><Icon name="check" size={18} /> Usamos tus datos solo para responderte</li>
          </ul>
          <p className="contact__direct">
            ¿Prefieres escribirnos? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </Reveal>

        <Reveal className="contact__panel" delay={120}>
          {status === 'sent' ? (
            <div className="sent" role="status">
              <span className="sent__icon">
                <Icon name="check" size={34} />
              </span>
              <h3 className="sent__title">¡Gracias, {values.name.trim().split(' ')[0]}!</h3>
              <p>
                Recibimos tu consulta. Te escribiremos a <strong>{values.email.trim()}</strong> muy pronto.
              </p>
              <p className="sent__note">Es una demostración: no se envió ningún dato.</p>
              <Button variant="outline" onClick={reset}>
                Enviar otra consulta
              </Button>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto" aria-busy={sending}>
              <fieldset className="form__fieldset" disabled={sending}>
              <div className="field">
                <label htmlFor="contacto-name">Nombre</label>
                <input type="text" autoComplete="name" placeholder="Tu nombre" value={values.name} {...fieldProps('name')} />
                {error('name')}
              </div>

              <div className="field">
                <label htmlFor="contacto-email">Correo electrónico</label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  value={values.email}
                  {...fieldProps('email')}
                />
                {error('email')}
              </div>

              <div className="field">
                <label htmlFor="contacto-destination">Destino de interés</label>
                <select value={values.destination} {...fieldProps('destination')}>
                  <option value="">Selecciona un destino</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}, {d.country}
                    </option>
                  ))}
                </select>
                {error('destination')}
              </div>

              <div className="field">
                <label htmlFor="contacto-message">
                  Mensaje <span className="field__optional">(opcional)</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Fechas, presupuesto, ocasión especial…"
                  value={values.message}
                  {...fieldProps('message')}
                />
                <p
                  className={`field__counter ${values.message.length > MESSAGE_MAX_LENGTH ? 'is-over' : ''}`}
                  aria-hidden="true"
                >
                  {values.message.length}/{MESSAGE_MAX_LENGTH}
                </p>
                {error('message')}
              </div>

              <div className="field field--check">
                <label className="check" htmlFor="contacto-consent">
                  <input type="checkbox" checked={values.consent} {...fieldProps('consent')} />
                  <span className="check__box" aria-hidden="true">
                    <Icon name="check" size={14} />
                  </span>
                  <span>Acepto que Rumbo use mis datos solo para responder a esta consulta.</span>
                </label>
                {error('consent')}
              </div>

              <Button type="submit" size="lg" icon="send" loading={sending} className="form__submit">
                {sending ? 'Enviando…' : 'Enviar consulta'}
              </Button>
              </fieldset>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
