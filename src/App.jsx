import React, { useState, useRef, useEffect } from "react";
import Presentacion from "./components/Presentacion";
import Juego from "./components/Juego";
import musicaFondo from "./img/musicaFondo.mp3";
import volumenOn from "./img/activadoVolumen.png";
import volumenOff from "./img/desactivadoVolumen.png";
import clickSound from "./img/clickSound.mp3";
import "./index.css";

function App() {
  const [mostrarJuego, setMostrarJuego] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(musicaFondo));
  audioRef.current.volume = 0.1;
  const clickSoundAudio = useRef(new Audio(clickSound));

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const playClickSound = () => {
      if (isPlaying) {
        clickSoundAudio.current.play();
      }
    };
    document.addEventListener("click", playClickSound);

    return () => {
      audioRef.current.pause();
      document.removeEventListener("click", playClickSound);
    };
  }, [isPlaying]);

  const iniciarJuego = () => {
    setMostrarJuego(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="App">
      <div className="controls-container">
        <button className="volume-button" onClick={togglePlay}>
          <img src={isPlaying ? volumenOn : volumenOff} alt="Control de volumen" />
        </button>
      </div>
      {mostrarJuego ? <Juego /> : <Presentacion iniciarJuego={iniciarJuego} />}
    </div>
  );
}

export default App;
