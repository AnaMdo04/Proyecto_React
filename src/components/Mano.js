import React from "react";

function Mano({ cartas, alJugarCarta }) {
  // Función para determinar la clase basada en el valor de la carta
  const determinarClaseEspecial = (carta) => {
    if (["+2", "reversa", "salta", "comodin", "+4"].includes(carta.valor)) {
      return "especial";
    }
    return "";
  };

  return (
    <div className="mano">
      {cartas.map((carta, index) => (
        <div
          key={index}
          className={`carta ${carta.color} ${determinarClaseEspecial(carta)}`}
          onClick={() => alJugarCarta(carta)}
        >
          {!["comodin"].includes(carta.valor) && (
            <>
              <div className="uno-card-small-number">{carta.valor !== "salta" ? carta.valor : ""}</div>
              <div className="uno-card-small-number uno-card-small-number-bottom-right">
                {carta.valor !== "salta" ? carta.valor : ""}
              </div>
            </>
          )}
          <div className="uno-card-middle-circle">
            {carta.valor === "salta" ? (
              <>
                <div className="uno-card-prohibido"></div>
                <div className="uno-card-prohibido uno-card-prohibido-top-left"></div>
                <div className="uno-card-prohibido uno-card-prohibido-bottom-right"></div>
              </>
            ) : (
              <div className="uno-card-middle-circle-number">{carta.valor}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Mano;
