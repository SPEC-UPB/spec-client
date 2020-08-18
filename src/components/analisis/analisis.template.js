import React, { useState } from "react";


export default function AnalisisTemplate(props) {

  
  return (
    <div className="card mx-3">
      <div className="card-body">

        <div className="row container-fluid">
          <div className="col-lg-10 col-xs-12 col-sm-12 col-md-10">
            <h2 className="text-muted my-3" >Uso del potencial calculado</h2>
            <p style={{ textAlign: "justify" }} className="grey-text">
                  Ahora que conocemos el comportamiento de la radiación solar en el área metropolitana de Bucaramanga
                  y sabemos lo que significa el potencial electrico entregado por las estaciones. puede que
                  se pregunte ¿ De que me sirve esta información? ¿ Que significan los valores de potencial calculados?.
                  No estaria nada mal saber cuanto dinero podria ahorrarse en su factura electricidad si usara energia renovable en su hogar, cierto.
                  Para ello hemos puesto a su disposición el siguiente apartado donde podra conocer la energía que usted
                  puede ahorrarse, conociendo la cantidad de vatios (Watts) que se caluculo a partir de la consulta definida.
                  Este calculo depende de la eficiencia del panel solar, la cual es el porcentaje de energía que este puede capturar y se encuentra entre un 17% y 25%,
                  juega con este valor para descubrir cuanta energía puedes capturar.
              </p>
          </div>
          <div className="col-lg-2 col-xs-12 col-sm-12 col-md-2 mt-lg-5">
          <div className="row center-xs mt-5 ml-5">
                  <div className="row">
                    <img
                    width={100}
                    height={100}
                    src="/icons/svg/001-question.svg"
                    className="img-fluid  mb-xs-3"
                    alt="Sample project image"
                  />
                  </div>
            </div>
          </div>
         
            </div>
          </div>
        </div>
  );
}
