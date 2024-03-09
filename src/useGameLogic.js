import { useState, useEffect, useCallback } from "react";

function useGameLogic() {
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

  const generarMazo = () => {
    const colores = ["rojo", "amarillo", "verde", "azul"];
    const valores = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "prohibido", "reversa", "+2"];
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
  };

  const barajarMazo = (mazo) => {
    for (let i = mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo;
  };

  const inicializarJuego = useCallback(() => {
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
    setColorActual(nuevaPilaDescarte[0].color);
    setJuegoTerminado(false);
    setJugadorDijoUno(false);
    setComputadoraDijoUno(false);
  }, []);

  useEffect(() => {
    inicializarJuego();
  }, [inicializarJuego]);

  const jugarTurnoComputadora = () => {
    if (turno === "computadora" && !juegoTerminado) {
      const cartaJugada = manoComputadora.find((carta) => esCartaJugable(carta));
      if (cartaJugada) {
        jugarCarta(cartaJugada, "computadora");
      } else {
        robarCartas(1, "computadora");
      }
    }
  };

  useEffect(() => {
    jugarTurnoComputadora();
  }, [manoComputadora, turno]);

  const seleccionarColor = (color) => {
    setColorActual(color);
    setMostrarModalSelectorColor(false);
    if (!juegoTerminado) {
      cambiarTurno();
    }
  };

  const jugarCarta = (carta, jugador) => {
    if (juegoTerminado) return;
    if (jugador === turno && esCartaJugable(carta)) {
      const nuevaPilaDescarte = [...pilaDescarte, carta];
      setPilaDescarte(nuevaPilaDescarte);
      setColorActual(carta.color);

      if (jugador === "jugador") {
        const nuevaMano = manoJugador.filter((c) => c !== carta);
        setManoJugador(nuevaMano);
        verificarFinJuego(nuevaMano, "jugador");
      } else {
        const nuevaMano = manoComputadora.filter((c) => c !== carta);
        setManoComputadora(nuevaMano);
        verificarFinJuego(nuevaMano, "computadora");
      }
      aplicarEfectoCarta(carta);
      cambiarTurno();
    }
  };

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

  const verificarFinJuego = (mano, jugador) => {
    if (mano.length === 0) {
      setJuegoTerminado(true);
      alert(`${jugador} gana!`);
    }
  };

  const esCartaJugable = (cartaSeleccionada) => {
    const cartaCimaPilaDescarte = pilaDescarte[pilaDescarte.length - 1];
    return (
      cartaSeleccionada.color === "negro" ||
      cartaSeleccionada.color === cartaCimaPilaDescarte.color ||
      cartaSeleccionada.valor === cartaCimaPilaDescarte.valor ||
      cartaSeleccionada.color === colorActual
    );
  };

  const aplicarEfectoCarta = (carta) => {
    switch (carta.valor) {
      case "prohibido":
        cambiarTurno();
        break;
      case "reversa":
        setDireccionJuego(direccionJuego * -1);
        cambiarTurno();
        break;
      case "+2":
        robarCartas(2, turno === "jugador" ? "computadora" : "jugador");
        cambiarTurno();
        break;
      case "comodin":
      case "+4":
        if (turno === "computadora") {
          const coloresEnManoComputadora = Array.from(new Set(manoComputadora.map((carta) => carta.color)));
          const colorElegido = coloresEnManoComputadora[Math.floor(Math.random() * coloresEnManoComputadora.length)];
          setColorActual(colorElegido);
          if (carta.valor === "+4") {
            robarCartas(4, turno === "jugador" ? "computadora" : "jugador");
          }
        } else {
          setMostrarModalSelectorColor(true);
          if (carta.valor === "+4") {
            robarCartas(4, turno === "jugador" ? "computadora" : "jugador");
          }
        }
        break;
      default:
        cambiarTurno();
        break;
    }
  };

  return {
    mazo,
    manoJugador,
    manoComputadora,
    pilaDescarte,
    turno,
    direccionJuego,
    colorActual,
    mostrarModalSelectorColor,
    juegoTerminado,
    jugadorDijoUno,
    computadoraDijoUno,
    inicializarJuego,
    jugarCarta,
    esCartaJugable,
    robarCartas,
    cambiarTurno,
    seleccionarColor,
    setJugadorDijoUno,
  };
}

export default useGameLogic;
