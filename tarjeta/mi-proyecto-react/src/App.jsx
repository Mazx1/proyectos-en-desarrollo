import "./App.css";
import { useEffect, useRef } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';

import videoFondo from "./assets/fondo.mp4";
import musica from "./assets/musica.mp3";

function App() {

  const audioRef = useRef(null);

  
    const imagenes = [
      { src: '/exp.jpg', label: 'Outfit 1' },
      { src: '/exp1.jpg', label: 'Outfit 2' },
      { src: '/exp3.jpg', label: 'Outfit 3' },
    ];

    useEffect(() => {
      audioRef.current?.play().catch(() => { });
    }, []);

    return (

      <div className="app">

        {/* 🎵 MÚSICA DE FONDO */}
        <audio autoPlay loop>
          <source src={musica} type="audio/mp3" />
        </audio>

        {/* 🎥 VIDEO DE FONDO */}
        <video className="video" autoPlay loop muted playsInline>
          <source src={videoFondo} type="video/mp4" />
        </video>

        {/* 🌟 HERO */}
        <section className="hero">
          <h1>MIS XV</h1>
          <h2>GABRIELA</h2>

        </section>
        <section className="hero1">

          <p>
            Con mucho amor te invito a celebrar este momento muuy especial en mi vida,
            espero que puedas acompañarme a disfrutar de este día tan importante para mí.
            Sera una noche magica e inolvidable, llena de sorpresas y momentos que quedaran en nuestros corazones para siempre.
          </p>
        </section>

        {/* 📜 SCROLL CONTENIDO */}
        <div className="view-container">

          <div className="scroll-content">
            <img src="/imagen.jpg" alt="imagen" />
          </div>

          <div className="scroll-content">
            <img src="/imagen4.jpg" alt="imagen4" />
          </div>

          
          <div className="vestuario-wrapper">
            <DropdownButton
              id="dropdown-vestuario"
              title="✨ Ideas para tu vestuario"
              variant="outline-dark"
              className="vestuario-btn"
            >
              <div className="vestuario-menu">

                <p className="vestuario-titulo">💐 Inspiración de outfits</p>

                <div className="vestuario-grid">
                  {imagenes.map((img, i) => (
                    <div key={i} className="vestuario-card">
                      <img src={img.src} alt={img.label} className="vestuario-img" />
                      <span className="vestuario-label">{img.label}</span>
                    </div>
                  ))}
                </div>

                <p className="vestuario-footer">🎀 ¡Luce increíble en tu día especial!</p>

              </div>
            </DropdownButton>
          </div>


          <div className="scroll-content">


            <a href="https://wa.me/573106973754"
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                style={{ width: "24px", height: "24px" }}
              />
              Confirmar asistencia por WhatsApp
            </a>
          </div>

          <div className="scroll-content">
            <div className="texto">

            </div>

          </div>
          <section className="ubicacion">
            <h3>¿Cómo llegar?</h3>
            <div className="mapa-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.9809448869737!2d-74.09138112432362!3d4.773242841023001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f843a756f8687%3A0x7f26fd52db7fc59f!2sBogota%20Sport%20Club%2C%20Suba%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1781821351907!5m2!1ses-419!2sco" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="mapa-info">
                <p className="mapa-nombre">Bogota Sport Club</p>
                <p className="mapa-direccion"> Avenida Suba - Cota, Kilómetro 4</p>

              </div>
            </div>
          </section>

        </div>

        {/* 📅 CARD */}
        <section className="card">
          <h3>Falta para el gran día</h3>
          <div className="countdown"></div>
        </section>

      </div>
    );
  }

  export default App;