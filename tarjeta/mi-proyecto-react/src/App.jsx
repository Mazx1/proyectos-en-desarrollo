import "./App.css";
import { useEffect, useRef } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';

import videoFondo from "./assets/fondo.mp4";
import musica from "./assets/Olivia Newton John.mp3";



function App() {

  const audioRef = useRef(null);


  const imagenes = [
    { src: '/exp.jpg', label: 'Outfit 1' },
    { src: '/exp1.jpg', label: 'Outfit 2' },
    { src: '/exp3.jpg', label: 'Outfit 3' },
  ];

  useEffect(() => {
    const iniciarMusica = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.log("No se pudo reproducir:", err));
      }
      document.removeEventListener('click', iniciarMusica);
      document.removeEventListener('touchstart', iniciarMusica);
    };

    document.addEventListener('click', iniciarMusica);
    document.addEventListener('touchstart', iniciarMusica);

    return () => {
      document.removeEventListener('click', iniciarMusica);
      document.removeEventListener('touchstart', iniciarMusica);
    };
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

        <div className="scroll-content" style={{ marginBottom: '3.5rem' }}>
          <img src="/imagen.jpg" alt="imagen" />
        </div>
        <h1 style={{ marginBottom: '1.5rem' }}>MIS XV</h1>
        <h2>GABRIELA</h2>

      </section>

      
      <section className="hero1">
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <svg viewBox="0 0 800 1150" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
            <defs>
              <style>
                {`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Tangerine:wght@700&family=Cinzel:wght@400;500;600&display=swap');

            .script { font-family: 'Tangerine', cursive; font-weight: 700; fill: #E8C879; }
            .cinzel { font-family: 'Cinzel', serif; fill: #F3E9D2; letter-spacing: 6px; }
            .cinzel-gold { font-family: 'Cinzel', serif; fill: #E8C879; letter-spacing: 4px; }
            .body { font-family: 'Cormorant Garamond', serif; fill: #E9E2D2; }
            .body-it { font-family: 'Cormorant Garamond', serif; font-style: italic; fill: #D9CFB8; }
          `}
              </style>

              <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F6E7B4" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#F6E7B4" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C9A65C" stopOpacity="0" />
                <stop offset="50%" stopColor="#E8C879" stopOpacity="1" />
                <stop offset="100%" stopColor="#C9A65C" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8C879" />
                <stop offset="50%" stopColor="#C9A65C" />
                <stop offset="100%" stopColor="#E8C879" />
              </linearGradient>
            </defs>

            {/* Decorative frame (no background fill = transparent) */}
            <rect x="30" y="30" width="740" height="1090" fill="none" stroke="url(#frameGrad)" strokeWidth="2" />
            <rect x="42" y="42" width="716" height="1066" fill="none" stroke="url(#frameGrad)" strokeWidth="0.75" />

            {/* Corner flourishes */}
            <g stroke="#E8C879" strokeWidth="1.4" fill="none" opacity="0.9">
              <path d="M30,80 Q30,30 80,30" />
              <path d="M770,80 Q770,30 720,30" />
              <path d="M30,1070 Q30,1120 80,1120" />
              <path d="M770,1070 Q770,1120 720,1120" />
            </g>
            <g fill="#E8C879">
              <circle cx="30" cy="30" r="4" />
              <circle cx="770" cy="30" r="4" />
              <circle cx="30" cy="1120" r="4" />
              <circle cx="770" cy="1120" r="4" />
            </g>

            {/* Moon + stars signature */}
            <circle cx="400" cy="175" r="80" fill="url(#moonGlow)" />
            <g transform="translate(400,175)">
              <path d="M 18,-42 A 44,44 0 1 0 18,42 A 34,34 0 1 1 18,-42 Z" fill="#F3E4B0" />
            </g>
            <g fill="#E8C879">
              <path d="M 300,120 l4,11 11,4 -11,4 -4,11 -4,-11 -11,-4 11,-4 Z" />
              <path d="M 495,205 l3,8 8,3 -8,3 -3,8 -3,-8 -8,-3 8,-3 Z" />
              <path d="M 505,120 l2.5,6 6,2.5 -6,2.5 -2.5,6 -2.5,-6 -6,-2.5 6,-2.5 Z" />
              <path d="M 285,225 l2.5,6 6,2.5 -6,2.5 -2.5,6 -2.5,-6 -6,-2.5 6,-2.5 Z" />
            </g>

            {/* Eyebrow */}
            <text x="400" y="300" textAnchor="middle" className="cinzel-gold" fontSize="20">
              CON MUCHO AMOR TE INVITO
            </text>

            <line x1="250" y1="325" x2="550" y2="325" stroke="url(#goldLine)" strokeWidth="1" />

            {/* Script headline */}
            <text x="400" y="440" textAnchor="middle" className="script" fontSize="130">
              a celebrar
            </text>
            <text x="400" y="520" textAnchor="middle" className="cinzel" fontSize="34">
              ESTE MOMENTO MUY ESPECIAL
            </text>
            <text x="400" y="558" textAnchor="middle" className="cinzel" fontSize="34">
              EN MI VIDA
            </text>

            <line x1="250" y1="595" x2="550" y2="595" stroke="url(#goldLine)" strokeWidth="1" />

            {/* Body copy */}
            <text x="400" y="660" textAnchor="middle" className="body-it" fontSize="32">
              <tspan x="400" dy="0">Espero que puedas acompañarme a disfrutar</tspan>
              <tspan x="400" dy="34">de este día tan importante para mí.</tspan>
            </text>

            <text x="400" y="760" textAnchor="middle" className="body-it" fontSize="32">
              <tspan x="400" dy="0">Será una noche mágica e inolvidable,</tspan>
              <tspan x="400" dy="34">llena de sorpresas y momentos que quedarán</tspan>
              <tspan x="400" dy="34">en nuestros corazones para siempre.</tspan>
            </text>

            {/* Small star divider */}
            <g fill="#E8C879" transform="translate(400,850)">
              <path d="M 0,-9 L 3,-3 9,0 3,3 0,9 -3,3 -9,0 -3,-3 Z" />
            </g>

            {/* Date block */}
            <text x="400" y="940" textAnchor="middle" className="cinzel-gold" fontSize="24">
              EL GRAN DÍA ES EL
            </text>
            <text x="400" y="1010" textAnchor="middle" className="cinzel-gold" fontSize="72" fontWeight="600">
              05 DE SEPTIEMBRE
            </text>
            <text x="400" y="1060" textAnchor="middle" className="cinzel" fontSize="30">
              A LAS 7:00 PM
            </text>

            <line x1="300" y1="1090" x2="500" y2="1090" stroke="url(#goldLine)" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* 📜 SCROLL CONTENIDO */}
      <div className="view-container">

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "0.4rem",
            padding: "1.2rem 2rem",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            borderRadius: "14px",
            border: "1px solid #E8C879",
            boxShadow: "0 0 20px rgba(232, 200, 121, 0.3)",
            maxWidth: "320px",
            margin: "1.5rem auto",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: "3px",
              color: "#E8C879",
              fontSize: "1.8rem",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            👔 Traje formal para disco
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "#D9CFB8",
              fontSize: "1rem",
              margin: 0,
            }}
          >
            Se agradece abstenerse de usar color azul
          </p>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0.8rem 1.5rem",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            borderRadius: "16px",
            border: "1px solid #E8C879",
            boxShadow: "0 0 25px rgba(232, 200, 121, 0.35)",
            maxWidth: "260px",
            margin: "1.5rem auto",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: "2px",
              color: "#E8C879",
              fontSize: "1.8rem",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            💌 Lluvia de sobres
          </h2>
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
          <div className="scroll-content" style={{ marginTop: '1.5rem' }} >
            <img src="/aviso.jpg" alt="aviso" />
          </div>
        </div>

        <div className="scroll-content">
          <div className="texto">

          </div>

        </div>

      </div>
      {/* 📅 CARD */}


    </div>
  );
}

export default App;