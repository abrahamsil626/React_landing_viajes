import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const cards = () => document.querySelectorAll('.card');

describe('Navegación', () => {
  it('CA-01 el botón del menú móvil alterna aria-expanded y Escape lo cierra', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Abrir menú' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('CA-02 al elegir un enlace el menú móvil se cierra', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    await user.click(within(screen.getByRole('navigation', { name: 'Principal' })).getByRole('link', { name: 'Destinos' }));
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Destinos', () => {
  it('CA-03 filtra por categoría', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(cards()).toHaveLength(6);
    await user.click(screen.getByRole('button', { name: 'Aventura' }));
    expect(cards()).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Todos' }));
    expect(cards()).toHaveLength(6);
  });

  it('CA-04 guarda favoritos y actualiza el contador', async () => {
    const user = userEvent.setup();
    render(<App />);
    const fav = screen.getByRole('button', { name: 'Guardar Kioto en favoritos' });
    await user.click(fav);
    expect(screen.getByRole('button', { name: 'Quitar Kioto de favoritos' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('1 guardado')).toBeInTheDocument();
  });

  it('CA-05 "Quiero este viaje" preselecciona el destino en el formulario', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Quiero viajar a Kioto' }));
    expect(screen.getByLabelText('Destino de interés')).toHaveValue('kioto');
  });

  it('CA-06 el planificador arma una propuesta con total, resalta el destino y lo pone primero', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText(/destino/i, { selector: '#planner-destino' }), 'patagonia');
    await user.click(screen.getByRole('button', { name: 'Añadir un viajero' }));
    await user.click(screen.getByRole('button', { name: /ver mi propuesta/i }));
    const proposal = document.querySelector('.proposal');
    expect(proposal).toHaveTextContent('Patagonia, Argentina y Chile');
    expect(proposal).toHaveTextContent('3 viajeros');
    // 3 viajeros × $2,450 USD
    expect(proposal).toHaveTextContent('$7,350 USD');
    expect(document.querySelector('.card.is-highlighted')).toHaveAttribute('data-destination', 'patagonia');
    expect(cards()[0]).toHaveAttribute('data-destination', 'patagonia');
  });

  it('CA-07 "Sorpréndeme" elige un destino y explica por qué', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /ver mi propuesta/i }));
    const proposal = document.querySelector('.proposal');
    expect(proposal).toHaveTextContent('Elegido para ti');
    expect(proposal.querySelector('.proposal__reason')).not.toBeEmptyDOMElement();
  });

  it('CA-08 pedir la propuesta lleva destino y viajeros al formulario, y se puede limpiar', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText(/destino/i, { selector: '#planner-destino' }), 'kioto');
    await user.click(screen.getByRole('button', { name: /ver mi propuesta/i }));
    await user.click(screen.getByRole('button', { name: /pedir esta propuesta/i }));
    expect(screen.getByLabelText('Destino de interés')).toHaveValue('kioto');
    expect(screen.getByLabelText(/mensaje/i)).toHaveValue('2 viajeros');
    await user.click(screen.getByRole('button', { name: /limpiar búsqueda/i }));
    expect(document.querySelector('.proposal')).toBeNull();
  });
});

describe('Testimonios', () => {
  it('CA-09 muestra todas las opiniones y permite destacar otra', async () => {
    const user = userEvent.setup();
    render(<App />);
    const featured = () => document.querySelector('.featured');
    expect(featured()).toHaveTextContent('Laura Mendoza');
    expect(screen.getAllByRole('button', { name: /^Ver la opinión de/ })).toHaveLength(4);
    await user.click(screen.getByRole('button', { name: 'Ver la opinión de Miguel Torres' }));
    expect(featured()).toHaveTextContent('Miguel Torres');
    expect(screen.getByRole('button', { name: 'Ver la opinión de Miguel Torres' })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('Créditos', () => {
  it('CA-10 el pie ofrece un enlace discreto a los créditos de imágenes', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'Créditos de imágenes' })).toBeInTheDocument();
  });
});

describe('Formulario de contacto', () => {
  const submit = (user) => user.click(screen.getByRole('button', { name: /enviar consulta/i }));

  it('CA-11 muestra errores y lleva el foco al primer campo inválido', async () => {
    const user = userEvent.setup();
    render(<App />);
    await submit(user);
    expect(screen.getByText('Cuéntanos tu nombre')).toBeInTheDocument();
    expect(screen.getByText('Necesitamos tu correo para responderte')).toBeInTheDocument();
    expect(screen.getByText('Elige un destino de interés')).toBeInTheDocument();
    expect(screen.getByText('Necesitamos tu autorización para responderte')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toHaveFocus();
  });

  it('CA-12 valida al salir del campo y limpia el error al corregir', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Correo electrónico'), 'abc');
    await user.tab();
    expect(screen.getByText('Ingresa un correo válido')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Correo electrónico'), '@correo.com');
    expect(screen.queryByText('Ingresa un correo válido')).not.toBeInTheDocument();
  });

  it('CA-13 envía con datos válidos, muestra carga y luego la confirmación', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Nombre'), 'Ana Pérez');
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@correo.com');
    await user.selectOptions(screen.getByLabelText('Destino de interés'), 'islandia');
    await user.click(screen.getByLabelText(/acepto que rumbo use mis datos/i));
    await submit(user);

    expect(await screen.findByRole('button', { name: /enviando/i })).toBeDisabled();
    expect(await screen.findByText('¡Gracias, Ana!', {}, { timeout: 3000 })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Enviar otra consulta' }));
    expect(screen.getByLabelText('Nombre')).toHaveValue('');
  });
});
