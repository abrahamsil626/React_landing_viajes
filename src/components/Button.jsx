import Icon from './Icon';
import './Button.css';

// Botón propio: variantes, flecha animada, estado de carga. Se renderiza como <a> si recibe href.
export default function Button({
  variant = 'primary',
  size = 'md',
  icon = null,
  loading = false,
  className = '',
  children,
  href,
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${loading ? 'is-loading' : ''} ${className}`.trim();
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && !loading && (
        <span className="btn__icon">
          <Icon name={icon} size={18} />
        </span>
      )}
      {loading && <span className="btn__spinner" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} disabled={loading || rest.disabled} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
