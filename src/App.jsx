import { useCallback, useState } from 'react';
import Advisor from './components/Advisor';
import BackToTop from './components/BackToTop';
import ClosingCta from './components/ClosingCta';
import ContactForm from './components/ContactForm';
import Destinations from './components/Destinations';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import { DESTINATIONS } from './content/destinations';
import { tripNote } from './lib/trip';

const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function App() {
  const [search, setSearch] = useState(null);
  const [interest, setInterest] = useState(null);

  const handleSearch = useCallback(({ destinationId, date, travelers }) => {
    // "Sorpréndeme": elegimos un destino y lo marcamos para explicar el porqué.
    const surprise = !destinationId;
    const resolved = surprise
      ? DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)].id
      : destinationId;
    setSearch({ destinationId: resolved, surprise, date, travelers, at: Date.now() });
    // Espera a que se pinte la propuesta antes de desplazar.
    requestAnimationFrame(() => scrollToSection('propuesta'));
  }, []);

  const handleSelect = useCallback((destination) => {
    setInterest({ id: destination.id, at: Date.now() });
    scrollToSection('contacto');
  }, []);

  // Desde una propuesta, el formulario recibe también fechas y viajeros.
  const handleRequest = useCallback((destination, trip) => {
    setInterest({ id: destination.id, note: tripNote(trip), at: Date.now() });
    scrollToSection('contacto');
  }, []);

  const handleClear = useCallback(() => setSearch(null), []);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero onSearch={handleSearch} />
        <Destinations search={search} onSelect={handleSelect} onRequest={handleRequest} onClear={handleClear} />
        <Advisor />
        <HowItWorks />
        <Testimonials />
        <ClosingCta />
        <ContactForm interest={interest} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
