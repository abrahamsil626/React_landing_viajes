import { useEffect, useRef } from 'react';
import { useScrolled } from '../hooks/useScrolled';
import Icon from './Icon';
import './BackToTop.css';

export default function BackToTop() {
  const visible = useScrolled(700);
  const ref = useRef(null);

  // Porcentaje leído de la página, para el anillo de progreso.
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      ref.current?.style.setProperty('--p', value.toFixed(1));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className={`to-top ${visible ? 'is-visible' : ''}`}
      aria-label="Volver arriba"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="up" size={22} />
    </button>
  );
}
