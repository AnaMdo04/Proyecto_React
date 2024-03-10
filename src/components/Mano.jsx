import React from "react";

function Mano({ cartas, alJugarCarta }) {
  const determinarClaseEspecial = (carta) => {
    if (["+2", "reversa", "prohibido", "comodin", "+4"].includes(carta.valor)) {
      let claseEspecial = "especial";
      if (carta.valor === "comodin") {
        claseEspecial += " comodin";
      } else if (carta.valor === "reversa") {
        claseEspecial += " reversa";
      }
      return claseEspecial;
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
          {!["comodin", "reversa"].includes(carta.valor) && (
            <React.Fragment>
              <div className="uno-card-small-number">{carta.valor !== "prohibido" ? carta.valor : ""}</div>
              <div className="uno-card-small-number uno-card-small-number-bottom-right">
                {carta.valor !== "prohibido" ? carta.valor : ""}
              </div>
            </React.Fragment>
          )}
          <div className="uno-card-middle-circle">
            {carta.valor === "prohibido" ? (
              <React.Fragment>
                <div className="uno-card-prohibido"></div>
                <div className="uno-card-prohibido uno-card-prohibido-top-left"></div>
                <div className="uno-card-prohibido uno-card-prohibido-bottom-right"></div>
              </React.Fragment>
            ) : carta.valor === "comodin" ? (
              <div className="uno-card-comodin-simbolo"></div>
            ) : carta.valor === "reversa" ? (
              <React.Fragment>
                <div className="uno-card-reversa-simbolo">
                  <span className="uno-card-simbolo-menor"></span>
                </div>
              </React.Fragment>
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
