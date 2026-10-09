import { FOOTER_LINKS, SITE } from '../content/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <p className="footer__text">
          Viajes a medida, diseñados por una persona con nombre. Cuéntanos a dónde quieres ir.
        </p>

        {FOOTER_LINKS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="footer__title">{group.title}</h3>
            <ul className="footer__links">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="footer__title">Escríbenos</h3>
          <ul className="footer__links">
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            </li>
            <li>{SITE.address}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
