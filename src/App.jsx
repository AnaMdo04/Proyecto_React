import React, { useState, useRef, useEffect } from "react";
import Presentacion from "./components/Presentacion";
import Juego from "./components/Juego";
import musicaFondo from "./img/musicaFondo.mp3";
import volumenOn from "./img/activadoVolumen.png";
import volumenOff from "./img/desactivadoVolumen.png";
import clickSound from "./img/clickSound.mp3";
import victorySound from "./img/VictorySound.mp3";
import defeatSound from "./img/DefeatSound.mp3";
import "./index.css";

function App() {
  const [mostrarJuego, setMostrarJuego] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(musicaFondo));
  const clickSoundAudio = useRef(new Audio(clickSound));
  const victorySoundAudio = useRef(new Audio(victorySound));
  const defeatSoundAudio = useRef(new Audio(defeatSound));

  audioRef.current.volume = 0.1;
  audioRef.current.loop = true;

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
      document.removeEventListener("click", playClickSound);
    };
  }, [isPlaying]);

  const playVictorySound = () => {
    if (isPlaying) {
      victorySoundAudio.current.play();
    }
  };

  const playDefeatSound = () => {
    if (isPlaying) {
      defeatSoundAudio.current.play();
    }
  };

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
      {mostrarJuego ? (
        <Juego playVictorySound={playVictorySound} playDefeatSound={playDefeatSound} />
      ) : (
        <Presentacion iniciarJuego={iniciarJuego} />
      )}
    </div>
  );
}

export default App;
