import { useEffect, useRef, useState } from 'react';
import { DESTINATIONS } from '../content/destinations';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import Icon from './Icon';
import TripPlanner from './TripPlanner';
import './Hero.css';

const VIDEO_SRC = `${import.meta.env.BASE_URL}media/hero-olas-islandia.webm`;
const poster = DESTINATIONS.find((d) => d.id === 'bora-bora');

// Con "ahorro de datos" no se descarga el video; queda la foto.
const saveData = () => Boolean(navigator.connection?.saveData);

const clamp = (value) => Math.min(1, Math.max(0, value));

export default function Hero({ onSearch }) {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const showVideo = !failed && !saveData();
  const playing = !reduced && !paused;

  // El marco del video crece hasta ocupar todo el ancho a medida que se hace scroll.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (reduced) {
      stage.style.setProperty('--p', '0');
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top } = stage.getBoundingClientRect();
      stage.style.setProperty('--p', clamp(1 - top / (window.innerHeight * 0.62)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (playing) video.play()?.catch(() => {});
      else video.pause();
    } catch {
      // Entornos sin reproducción de video (por ejemplo, pruebas): no hay nada que hacer.
    }
  }, [playing, ready]);

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero__intro">
        <p className="hero__eyebrow">
          <Icon name="sparkles" size={16} /> Viajes a medida, sin paquetes cerrados
        </p>
        <h1 id="hero-title" className="hero__title">
          Tu ruta, diseñada por <span>una persona.</span>
        </h1>
        <p className="hero__lead">
          Cuéntanos a dónde quieres ir. Un asesor con nombre te responde en menos de 24 horas con una propuesta día
          por día.
        </p>
        <TripPlanner onSearch={onSearch} />
      </div>

      <div className="hero__stage" ref={stageRef}>
        <div className="hero__frame">
          <img className="hero__poster" src={poster.image} alt="" style={poster.focus ? { objectPosition: poster.focus } : undefined} />
          {showVideo && (
            <video
              ref={videoRef}
              className={`hero__video ${ready ? 'is-ready' : ''}`}
              autoPlay={!reduced}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              onLoadedData={() => setReady(true)}
              onError={() => setFailed(true)}
            >
              <source src={VIDEO_SRC} type="video/webm" />
            </video>
          )}
          <div className="hero__shade" aria-hidden="true" />

          {showVideo && ready && (
            <p className="hero__caption">
              <Icon name="pin" size={16} /> Costa de Lækjavik, Islandia
            </p>
          )}
          {showVideo && !reduced && (
            <button
              type="button"
              className="hero__toggle"
              aria-pressed={paused}
              aria-label={paused ? 'Reproducir video de fondo' : 'Pausar video de fondo'}
              onClick={() => setPaused((prev) => !prev)}
            >
              <Icon name={paused ? 'play' : 'pause'} size={16} filled={paused} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
