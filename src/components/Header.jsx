import { useEffect, useMemo, useState } from 'react';
import { NAV_LINKS, SITE } from '../content/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import Button from './Button';
import Icon from './Icon';
import './Header.css';

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label={`${SITE.name}, ir al inicio`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="var(--primary)" />
        <path d="m22 10-4 9-9 3 4-9 9-3Z" fill="#fff" />
      </svg>
      <span>{SITE.name}</span>
    </a>
  );
}

// Lleva al planificador y le da el foco, como el buscador compacto de un marketplace.
const focusPlanner = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => document.getElementById('planner-destino')?.focus({ preventScroll: true }), 450);
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);
  const compact = useScrolled(430);
  const ids = useMemo(() => NAV_LINKS.map((link) => link.id), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled || open ? 'is-scrolled' : ''} ${compact ? 'is-compact' : ''}`}>
      <div className="container header__inner">
        <Logo />

        <div className="header__center">
          <nav id="menu-principal" className={`nav ${open ? 'is-open' : ''}`} aria-label="Principal">
            <ul className="nav__list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    className={`nav__link ${active === link.id ? 'is-active' : ''}`}
                    href={`#${link.id}`}
                    aria-current={active === link.id ? 'true' : undefined}
                    onClick={close}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href="#contacto" icon="arrow" size="lg" className="nav__cta" onClick={close}>
              Planear mi viaje
            </Button>
          </nav>

          <button
            type="button"
            className="header__pill"
            aria-label="Buscar viaje: destino, fecha y viajeros"
            aria-hidden={!compact}
            tabIndex={compact ? 0 : -1}
            onClick={focusPlanner}
          >
            <span>Cualquier destino</span>
            <span>Cualquier fecha</span>
            <span className="header__pill-last">¿Cuántos?</span>
            <span className="header__pill-orb">
              <Icon name="search" size={15} />
            </span>
          </button>
        </div>

        <div className="header__right">
          <Button href="#contacto" size="sm" className="header__cta">
            Planear mi viaje
          </Button>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
      <span className="header__progress" aria-hidden="true" />
    </header>
  );
}
