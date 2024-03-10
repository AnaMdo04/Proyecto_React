import React, { useState, useEffect } from "react";
import Mano from "./Mano";
import useGameLogic from "../useGameLogic";
import "../index.css";
import imagenDecirUno from "../img/logo.png";

function CartaRobar({ onClick, jugable }) {
  return (
    <div className={`carta-robar ${jugable ? "jugable" : ""}`} onClick={jugable ? onClick : null}>
      <div className="uno-card-middle-circle"></div>
      <div className="uno-card-middle-circle-text">UNO</div>
    </div>
  );
}

function Juego({ playVictorySound, playDefeatSound }) {
  const {
    manoJugador,
    manoComputadora,
    pilaDescarte,
    turno,
    colorActual,
    carta,
    mostrarModalSelectorColor,
    juegoTerminado,
    jugadorDijoUno,
    inicializarJuego,
    jugarCarta,
    robarCartas,
    seleccionarColor,
    esCartaJugable,
    setJugadorDijoUno,
    ganador,
  } = useGameLogic();

  const [robarCartaVisible, setRobarCartaVisible] = useState(false);
  const [mostrarModalInstrucciones, setMostrarModalInstrucciones] = useState(false);

  useEffect(() => {
    const jugable = !manoJugador.some((carta) => esCartaJugable(carta));
    setRobarCartaVisible(jugable);
  }, [manoJugador, esCartaJugable]);

  useEffect(() => {
    if (juegoTerminado) {
      if (ganador === "jugador") {
        playVictorySound();
      } else {
        playDefeatSound();
      }
    }
  }, [juegoTerminado, ganador, playVictorySound, playDefeatSound]);

  const toggleInstrucciones = () => {
    setMostrarModalInstrucciones(!mostrarModalInstrucciones);
  };

  const renderManoJugador = (colorActual) => (
    <Mano cartas={manoJugador} alJugarCarta={(carta) => jugarCarta(carta, "jugador")} jugador="jugador" tipo="mano" />
  );

  const renderManoComputadora = () => (
    <Mano cartas={manoComputadora} alJugarCarta={() => {}} jugador="computadora" tipo="mano" />
  );

  const renderPilaDescarte = () => {
    return pilaDescarte.length > 0 ? (
      <div className="pila-descarte">
        <div className="carta-robar-container">
          <CartaRobar onClick={() => robarCartas(1, "jugador")} jugable={robarCartaVisible} />
        </div>
        <div className="mano-computadora-container">
          <Mano
            cartas={[pilaDescarte[pilaDescarte.length - 1]]}
            alJugarCarta={() => {}}
            jugador="computadora"
            tipo="pila-descarte"
          />
        </div>
      </div>
    ) : null;
  };

  const ModalSelectorColor = ({ seleccionarColor, carta }) =>
    mostrarModalSelectorColor && (
      <div className="modal-selector-color">
        <div className="contenido-selector-color">
          {["rojo", "amarillo", "verde", "azul"].map((color) => (
            <button key={color} className={color} onClick={() => seleccionarColor(color, carta)}>
              {color.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );

  const ModalInstrucciones = () =>
    mostrarModalInstrucciones && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setMostrarModalInstrucciones(false)}>
            &times;
          </span>
          <h1>Instrucciones</h1>
          <div className="scrollable-content">
            <h2>Objetivo</h2>
            <p>El objetivo principal del juego es ser el primer jugador en quedarse sin cartas en la mano.</p>
            <h2>Preparación</h2>
            <p>
              El juego es de 2 jugadores. Se reparten 7 cartas a cada jugador. Las cartas restantes se colocan boca
              abajo para formar el mazo de robar. La primera carta del mazo se coloca boca arriba al lado del mazo para
              comenzar la pila de descarte.
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
              jugador a robar 4 cartas y pierda su turno. El juego continúa hasta que un jugador se queda sin cartas en
              la mano.
            </p>
            <h3>Fin</h3>
            <p>
              El primer jugador en quedarse sin cartas en la mano es el ganador. Una vez que un jugador juega su última
              carta, se termina el juego y se suman los puntos de las cartas restantes en las manos de los otros
              jugadores. Las cartas numéricas suman su valor nominal, las cartas especiales suman 20 puntos y las cartas
              de Comodín Roba 4 suman 50 puntos. Se juegan varias rondas hasta que un jugador alcance una cantidad
              específica de puntos para ganar la partida.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="center-container">
      <div className="App">
        {juegoTerminado ? (
          <div className="game-over-screen">
            <h2 className="game-over-text">Juego Terminado. ¡{ganador} gana!</h2>
            <button className="restart-button" onClick={inicializarJuego}>
              Reiniciar Juego
            </button>
          </div>
        ) : (
          <>
            <div className="mano-computadora-container">
              <div className={`color-actual-indicator ${colorActual}`}>
                <h1>{colorActual.toUpperCase()}</h1>
              </div>
              {renderManoComputadora()}
            </div>
            <h2></h2>
            {renderPilaDescarte()}
            {turno === "jugador" && (
              <>
                <h2></h2>
                <div className="mano-jugador-container">
                  {renderManoJugador(colorActual)}
                  {robarCartaVisible && !jugadorDijoUno && (
                    <img
                      src={imagenDecirUno}
                      alt="Decir UNO"
                      className="imagen-decir-uno"
                      onClick={() => setJugadorDijoUno(true)}
                    />
                  )}
                </div>
              </>
            )}
            <button className="instructions-button" onClick={toggleInstrucciones}>
              <span role="img" aria-label="Instrucciones">
                &#x2753;
              </span>{" "}
            </button>

            <ModalSelectorColor seleccionarColor={seleccionarColor} carta={carta} />
            <ModalInstrucciones />
          </>
        )}
      </div>
    </div>
  );
}

export default Juego;
