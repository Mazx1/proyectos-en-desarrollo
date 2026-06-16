import "./App.css";
import { useEffect, useRef } from "react";

import videoFondo from "./assets/fondo.mp4";
import musica from "./assets/musica.mp3";

function App() {

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
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
        <p>Con mucho amor te invito a celebrar este momento especial</p>
      </section>

      {/* 📜 SCROLL CONTENIDO */}
      <div className="view-container">

        <div className="scroll-content">
          <img src="/imagen.jpg" alt="imagen" />
        </div>

        <div className="scroll-content">
          <img src="/imagen.jpg" alt="imagen" />
        </div>

        <div className="scroll-content">
          <img src="/imagen.jpg" alt="imagen" />
        </div>

        <div className="scroll-content">
          <img src="/imagen.jpg" alt="imagen" />
        </div>

        <div className="scroll-content">
          <img src="/imagen.jpg" alt="imagen" />
        </div>

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