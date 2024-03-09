import React from "react";
import "../index.css";

function Presentacion({ iniciarJuego, mostrarInstrucciones }) {
  return (
    <div className="presentacion-container">
      <button className="start-button" onClick={iniciarJuego}>
        Comenzar Juego
      </button>
      <button className="instructions-button" onClick={mostrarInstrucciones}>
        <span role="img" aria-label="Instrucciones">
          &#x2753;
        </span>{" "}
      </button>
    </div>
  );
}

export default Presentacion;
