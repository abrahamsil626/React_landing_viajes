export const NAME_MIN_LENGTH = 2;
export const MESSAGE_MAX_LENGTH = 500;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ok = () => '';

export function validateName(name) {
  const value = (name ?? '').trim();
  if (!value) return 'Cuéntanos tu nombre';
  if (value.length < NAME_MIN_LENGTH) {
    return `El nombre debe tener al menos ${NAME_MIN_LENGTH} caracteres`;
  }
  return ok();
}

export function validateEmail(email) {
  const value = (email ?? '').trim();
  if (!value) return 'Necesitamos tu correo para responderte';
  if (!EMAIL_REGEX.test(value)) return 'Ingresa un correo válido';
  return ok();
}

export function validateDestination(destination) {
  return destination ? ok() : 'Elige un destino de interés';
}

export function validateMessage(message) {
  if ((message ?? '').length > MESSAGE_MAX_LENGTH) {
    return `El mensaje no puede superar ${MESSAGE_MAX_LENGTH} caracteres`;
  }
  return ok();
}

export function validateConsent(consent) {
  return consent ? ok() : 'Necesitamos tu autorización para responderte';
}

const FIELD_VALIDATORS = {
  name: validateName,
  email: validateEmail,
  destination: validateDestination,
  message: validateMessage,
  consent: validateConsent,
};

export const FIELD_ORDER = Object.keys(FIELD_VALIDATORS);

export function validateField(field, value) {
  return FIELD_VALIDATORS[field](value);
}

export function validateContactForm(values) {
  const errors = {};
  FIELD_ORDER.forEach((field) => {
    errors[field] = validateField(field, values[field]);
  });
  return {
    valid: FIELD_ORDER.every((field) => !errors[field]),
    errors,
  };
}
