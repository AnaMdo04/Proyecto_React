import React, { useState } from "react";
import Presentacion from "./components/Presentacion";
import Juego from "./components/Juego";

function App() {
  const [mostrarJuego, setMostrarJuego] = useState(false);

  const iniciarJuego = () => {
    setMostrarJuego(true);
  };

  return <div className="App">{mostrarJuego ? <Juego /> : <Presentacion iniciarJuego={iniciarJuego} />}</div>;
}

export default App;
