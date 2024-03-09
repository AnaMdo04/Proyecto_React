import React, { useState, useEffect } from "react";
import Mano from "./Mano";
import useGameLogic from "../useGameLogic";
import "../index.css";

function CartaRobar({ onClick, jugable }) {
  return (
    <div className={`carta-robar ${jugable ? "jugable" : ""}`} onClick={jugable ? onClick : null}>
      <div className="uno-card-middle-circle"></div>
      <div className="uno-card-middle-circle-text">UNO</div>
    </div>
  );
}

function Juego() {
  const {
    manoJugador,
    manoComputadora,
    pilaDescarte,
    turno,
    mostrarModalSelectorColor,
    juegoTerminado,
    jugadorDijoUno,
    inicializarJuego,
    jugarCarta,
    robarCartas,
    seleccionarColor,
    esCartaJugable,
    setJugadorDijoUno,
  } = useGameLogic();

  const [robarCartaVisible, setRobarCartaVisible] = useState(false);

  useEffect(() => {
    const jugable = !manoJugador.some((carta) => esCartaJugable(carta));
    setRobarCartaVisible(jugable);
  }, [manoJugador, esCartaJugable]);

  const renderManoJugador = () => <Mano cartas={manoJugador} alJugarCarta={(carta) => jugarCarta(carta, "jugador")} />;

  const renderManoComputadora = () => <Mano cartas={manoComputadora} alJugarCarta={() => {}} />;

  const renderPilaDescarte = () => {
    return pilaDescarte.length > 0 ? (
      <div>
        <Mano cartas={[pilaDescarte[pilaDescarte.length - 1]]} alJugarCarta={() => {}} />
        <CartaRobar onClick={() => robarCartas(1, "jugador")} jugable={robarCartaVisible} />
      </div>
    ) : null;
  };

  const ModalSelectorColor = ({ seleccionarColor }) =>
    mostrarModalSelectorColor && (
      <div className="modal-selector-color">
        <div className="contenido-selector-color">
          {["rojo", "amarillo", "verde", "azul"].map((color) => (
            <button key={color} style={{ backgroundColor: color }} onClick={() => seleccionarColor(color)}>
              {color.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );

  return (
    <div className="App">
      {juegoTerminado ? (
        <>
          <h2>Juego Terminado. ¡{turno} gana!</h2>
          <button onClick={inicializarJuego}>Reiniciar Juego</button>
        </>
      ) : (
        <>
          <div>
            <h2></h2>
            <Mano cartas={manoComputadora} />
          </div>
          <h2></h2>
          {renderPilaDescarte()}
          {turno === "jugador" && (
            <>
              <h2></h2>
              {renderManoJugador()}
              {robarCartaVisible && !jugadorDijoUno && (
                <button onClick={() => setJugadorDijoUno(true)}>Decir UNO</button>
              )}
            </>
          )}
          <ModalSelectorColor seleccionarColor={seleccionarColor} />
        </>
      )}
    </div>
  );
}

export default Juego;
