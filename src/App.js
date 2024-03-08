import React, { useState, useEffect } from "react";
import Mano from "./components/Mano";
import "./index.css";

function App() {
  const [mazo, setMazo] = useState([]);
  const [manoJugador, setManoJugador] = useState([]);
  const [manoComputadora, setManoComputadora] = useState([]);
  const [pilaDescarte, setPilaDescarte] = useState([]);
  const [turno, setTurno] = useState("jugador");
  const [direccionJuego, setDireccionJuego] = useState(1);
  const [colorActual, setColorActual] = useState("");
  const [mostrarModalSelectorColor, setMostrarModalSelectorColor] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [jugadorDijoUno, setJugadorDijoUno] = useState(false);
  const [computadoraDijoUno, setComputadoraDijoUno] = useState(false);

  useEffect(() => {
    inicializarJuego();
  }, []);

  const inicializarJuego = () => {
    let nuevoMazo = generarMazo();
    nuevoMazo = barajarMazo(nuevoMazo);
    const manoInicialJugador = nuevoMazo.slice(0, 7);
    const manoInicialComputadora = nuevoMazo.slice(7, 14);
    const nuevaPilaDescarte = [nuevoMazo[14]];
    setMazo(nuevoMazo.slice(15));
    setManoJugador(manoInicialJugador);
    setManoComputadora(manoInicialComputadora);
    setPilaDescarte(nuevaPilaDescarte);
    setTurno("jugador");
    setJuegoTerminado(false);
    setJugadorDijoUno(false);
    setComputadoraDijoUno(false);
  };

  function generarMazo() {
    const colores = ["rojo", "amarillo", "verde", "azul"];
    const valores = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "salta", "reversa", "+2"];
    const cartasEspeciales = ["comodin", "+4"];
    let mazo = [];

    colores.forEach((color) => {
      valores.forEach((valor) => {
        mazo.push({ color, valor, tipo: "normal" });
        if (valor !== "0") mazo.push({ color, valor, tipo: "normal" });
      });
    });

    cartasEspeciales.forEach((valor) => {
      for (let i = 0; i < 4; i++) {
        mazo.push({ color: "negro", valor, tipo: "especial" });
      }
    });

    return mazo;
  }

  function barajarMazo(mazo) {
    for (let i = mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo;
  }

  const jugarCarta = (carta, jugador) => {
    if (juegoTerminado) return;
    if (jugador === turno && esCartaJugable(carta)) {
      const nuevaPilaDescarte = [...pilaDescarte, carta];
      setPilaDescarte(nuevaPilaDescarte);
      if (jugador === "jugador") {
        const nuevaMano = manoJugador.filter((c) => c !== carta);
        setManoJugador(nuevaMano);
        if (nuevaMano.length === 1 && !jugadorDijoUno) {
          alert("¡No dijiste UNO! Toma 2 cartas como penalización.");
          robarCartas(2, "jugador");
        }
        setJugadorDijoUno(false);
        verificarFinJuego(nuevaMano);
      } else {
        const nuevaMano = manoComputadora.filter((c) => c !== carta);
        setManoComputadora(nuevaMano);
        if (nuevaMano.length === 1 && !computadoraDijoUno) {
          setComputadoraDijoUno(true);
        }
        setComputadoraDijoUno(false);
        verificarFinJuego(nuevaMano);
      }
      aplicarEfectoCarta(carta);
      if (carta.valor !== "comodin" && carta.valor !== "+4") {
        cambiarTurno();
      }
    }
  };

  const verificarFinJuego = (mano) => {
    if (mano.length === 0) {
      setJuegoTerminado(true);
      alert(`${turno} gana!`);
    }
  };

  const esCartaJugable = (cartaSeleccionada) => {
    const cartaCimaPilaDescarte = pilaDescarte[pilaDescarte.length - 1];
    if (
      cartaSeleccionada.color === "negro" ||
      cartaSeleccionada.color === cartaCimaPilaDescarte.color ||
      cartaSeleccionada.valor === cartaCimaPilaDescarte.valor ||
      colorActual === cartaSeleccionada.color
    ) {
      return true;
    }
    if (
      (cartaSeleccionada.valor === "salta" || cartaSeleccionada.valor === "reversa") &&
      cartaSeleccionada.color !== cartaCimaPilaDescarte.color
    ) {
      return false;
    }
    return false;
  };

  function aplicarEfectoCarta(carta) {
    switch (carta.valor) {
      case "salta":
        cambiarTurno();
        break;
      case "reversa":
        setDireccionJuego(direccionJuego * -1);
        break;
      case "+2":
        robarCartas(2, turno === "jugador" ? "computadora" : "jugador");
        break;
      case "comodin":
      case "+4":
        setMostrarModalSelectorColor(true);
        if (carta.valor === "+4") {
          robarCartas(4, turno === "jugador" ? "computadora" : "jugador");
        }
        break;
      default:
        break;
    }
  }

  const robarCartas = (numeroCartas, jugador) => {
    const cartasRobadas = mazo.slice(0, numeroCartas);
    setMazo(mazo.slice(numeroCartas));
    if (jugador === "jugador") {
      setManoJugador([...manoJugador, ...cartasRobadas]);
    } else {
      setManoComputadora([...manoComputadora, ...cartasRobadas]);
    }
    cambiarTurno();
  };

  const cambiarTurno = () => {
    setTurno(turno === "jugador" ? "computadora" : "jugador");
  };

  const seleccionarColor = (color) => {
    setColorActual(color);
    setMostrarModalSelectorColor(false);
    cambiarTurno();
  };

  useEffect(() => {
    if (turno === "computadora" && !juegoTerminado) {
      setTimeout(() => {
        juegoComputadora();
      }, 1000);
    }
  }, [turno, juegoTerminado]);

  const juegoComputadora = () => {
    const cartasJugables = manoComputadora.filter((carta) => esCartaJugable(carta));
    if (cartasJugables.length > 0) {
      jugarCarta(cartasJugables[0], "computadora");
    } else {
      robarCartas(1, "computadora");
    }
  };

  function ModalSelectorColor({ alSeleccionarColor }) {
    const colores = ["rojo", "amarillo", "verde", "azul"];
    return (
      <div className="modal-selector-color">
        <div className="contenido-selector-color">
          {colores.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color, width: 100, height: 100, margin: 10 }}
              onClick={() => alSeleccionarColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Botón para decir UNO cuando el jugador tiene solo dos cartas
  const renderizarBotonUno = () => {
    if (manoJugador.length === 2 && !jugadorDijoUno) {
      return <button onClick={() => setJugadorDijoUno(true)}>Decir UNO!</button>;
    }
    return null;
  };

  if (juegoTerminado) {
    return (
      <div className="App">
        <h2>Juego Terminado</h2>
        <button onClick={inicializarJuego}>Reiniciar Juego</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h2>Mano del Jugador</h2>
      <Mano cartas={manoJugador} alJugarCarta={(carta) => jugarCarta(carta, "jugador")} />
      {renderizarBotonUno()}
      <h2>Mano del Ordenador</h2>
      <div>El ordenador tiene {manoComputadora.length} cartas</div>
      <h2>Pila de Descarte</h2>
      {pilaDescarte.length > 0 && <Mano cartas={[pilaDescarte[pilaDescarte.length - 1]]} />}
      {mostrarModalSelectorColor && <ModalSelectorColor alSeleccionarColor={seleccionarColor} />}
      {turno === "jugador" && !manoJugador.some(esCartaJugable) && (
        <button onClick={() => robarCartas(1, "jugador")}>Robar Carta</button>
      )}
    </div>
  );
}

export default App;
