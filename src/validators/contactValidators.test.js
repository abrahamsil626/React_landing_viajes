import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateEmail,
  validateDestination,
  validateMessage,
  validateConsent,
  validateContactForm,
} from './contactValidators';

describe('contactValidators', () => {
  it('CA-14 nombre', () => {
    expect(validateName('')).toBe('Cuéntanos tu nombre');
    expect(validateName(' a ')).toBe('El nombre debe tener al menos 2 caracteres');
    expect(validateName('Ana')).toBe('');
  });

  it('CA-15 correo', () => {
    expect(validateEmail('')).toBe('Necesitamos tu correo para responderte');
    expect(validateEmail('abc')).toBe('Ingresa un correo válido');
    expect(validateEmail('a@b')).toBe('Ingresa un correo válido');
    expect(validateEmail('ana@correo.com')).toBe('');
  });

  it('CA-16 destino', () => {
    expect(validateDestination('')).toBe('Elige un destino de interés');
    expect(validateDestination('kioto')).toBe('');
  });

  it('CA-17 mensaje', () => {
    expect(validateMessage('')).toBe('');
    expect(validateMessage('x'.repeat(500))).toBe('');
    expect(validateMessage('x'.repeat(501))).toBe('El mensaje no puede superar 500 caracteres');
  });

  it('CA-18 consentimiento', () => {
    expect(validateConsent(false)).toBe('Necesitamos tu autorización para responderte');
    expect(validateConsent(true)).toBe('');
  });

  it('CA-19 formulario completo', () => {
    const bad = validateContactForm({ name: '', email: '', destination: '', message: '', consent: false });
    expect(bad.valid).toBe(false);
    expect(Object.values(bad.errors).filter(Boolean)).toHaveLength(4);

    const good = validateContactForm({
      name: 'Ana',
      email: 'ana@correo.com',
      destination: 'kioto',
      message: '',
      consent: true,
    });
    expect(good.valid).toBe(true);
  });
});
