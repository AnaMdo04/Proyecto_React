import React from "react";

const Carta = React.memo(({ carta, onClick }) => {
  const { color, valor } = carta;
  const estilo = {
    backgroundColor: color,
    color: color === "amarillo" || color === "verde" ? "negro" : "blanco",
  };

  return (
    <div className="carta fade-in" style={estilo} onClick={onClick}>
      {valor}
    </div>
  );
});

export default Carta;
