import { useEffect, useRef } from 'react';
import { CREDITS } from '../content/credits';
import './CreditsDialog.css';

// Atribución de las imágenes y el video (las licencias CC BY y CC BY-SA la exigen).
export default function CreditsDialog({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal?.();
    if (!open && dialog.open) dialog.close?.();
  }, [open]);

  return (
    <dialog ref={ref} className="credits" aria-labelledby="creditos-title" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <div className="credits__panel">
        <h2 id="creditos-title" className="credits__title">Créditos de imágenes y video</h2>
        <p className="credits__lead">Material con licencia libre de Wikimedia Commons.</p>
        <ul className="credits__list">
          {CREDITS.map((credit) => (
            <li key={credit.subject}>
              <a href={credit.url} target="_blank" rel="noopener noreferrer">
                {credit.subject}
              </a>
              <span>
                {credit.author} · {credit.license}
              </span>
            </li>
          ))}
        </ul>
        <button type="button" className="credits__close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </dialog>
  );
}
