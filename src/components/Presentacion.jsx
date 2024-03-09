import React, { useState } from "react";
import "../index.css";

function Presentacion({ iniciarJuego }) {
  const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

  const toggleInstrucciones = () => {
    setMostrarInstrucciones(!mostrarInstrucciones);
  };

  return (
    <div className="presentacion-container">
      <button className="start-button" onClick={iniciarJuego}>
        Comenzar Juego
      </button>
      <button className="instructions-button" onClick={toggleInstrucciones}>
        <span role="img" aria-label="Instrucciones">
          &#x2753;
        </span>{" "}
      </button>

      {/* Modal de instrucciones */}
      {mostrarInstrucciones && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleInstrucciones}>
              &times;
            </span>
            <h1>Instrucciones</h1>
            <div className="scrollable-content">
              <h2>Objetivo</h2>
              <p>El objetivo principal del juego es ser el primer jugador en quedarse sin cartas en la mano.</p>
              <h2>Preparación</h2>
              <p>
                El juego es de 2 jugadores. Se reparten 7 cartas a cada jugador. Las cartas restantes se colocan boca
                abajo para formar el mazo de robar. La primera carta del mazo se coloca boca arriba al lado del mazo
                para comenzar la pila de descarte.
              </p>
              <h2>Desarrollo</h2>
              <p>
                El juego se desarrolla en el sentido de las agujas del reloj. Los jugadores deben jugar una carta que
                coincida en número, color o símbolo con la carta superior de la pila de descarte. Si un jugador no puede
                jugar una carta, debe robar una carta del mazo. Si la carta robada puede ser jugada, el jugador puede
                hacerlo, de lo contrario, su turno termina.
              </p>
              <h2>Cartas Especiales Efectos </h2>
              <h3>Cambio de color </h3>
              <p>Permite al jugador cambiar el color de la carta superior de la pila de descarte.</p>
              <h3>Roba 2</h3>
              <p>Hace que el siguiente jugador robe 2 cartas y pierda su turno. </p>
              <h3>Salto</h3>
              <p>Salta al siguiente jugador, haciendo que pierda su turno.</p>
              <h3>Comodín Roba 4 </h3>
              <p>
                Permite al jugador cambiar el color de la carta superior de la pila de descarte y obliga al siguiente
                jugador a robar 4 cartas y pierda su turno. El juego continúa hasta que un jugador se queda sin cartas
                en la mano.
              </p>
              <h3>Fin</h3>
              <p>
                El primer jugador en quedarse sin cartas en la mano es el ganador. Una vez que un jugador juega su
                última carta, se termina el juego y se suman los puntos de las cartas restantes en las manos de los
                otros jugadores. Las cartas numéricas suman su valor nominal, las cartas especiales suman 20 puntos y
                las cartas de Comodín Roba 4 suman 50 puntos. Se juegan varias rondas hasta que un jugador alcance una
                cantidad específica de puntos para ganar la partida.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Presentacion;
