import React from "react";
import Iframe from "./iframe";

export default function Header() {
  return (
    <React.Fragment>
      {/* Projects section v.3 */}
      <section className="my-5 container">
        {/* Section heading */}
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Radiación solar en el área metropolitana de Bucaramanga
        </h2>
        {/* Section description */}
        <p className="grey-text text-center w-responsive mx-auto mb-5">
        El Semillero de Prospectiva Energética de Colombia (SPEC) de la Universidad Pontificia
        Bolivariana coloca a disposición del público general este sitio de consulta sobre la radiación
        solar en el Área Metropolitana de Bucaramanga
        </p>
        {/* Grid row */}
        <div className="row">
          {/* Grid column */}
          <div className="col-lg-5 mb-lg-0 mb-5">
            {/*Image*/}
            <div className="row center-xs">
              <img
                src="/icons/svg/sun.svg"
                alt="Energia renovable"
                height={50}
                width={50}
              />
              <img
                src="/icons/svg/001-solar-energy-1.svg"
                alt="Energia renovable"
                height={300}
                width={300}
              />
            </div>
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className="col-lg-7">
            {/* Grid row */}
            <div className="row mb-3">
              <div className="col-md-1 col-2">
                <img
                  src="/icons/svg/003-solar-panel.svg"
                  width={30}
                  height={30}
                />
              </div>
              <div className="col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Objetivo</h5>
                <p className="grey-text">
                  Facilitar al público general la comprensión acerca de la radiación solar 
                  en el Área Metropolitana de Bucaramanga y las posibilidades para su aprovechamiento.
                </p>
              </div>
            </div>
            {/* Grid row */}
            {/* Grid row */}
            <div className="row mb-3">
              <div className="col-md-1 col-2">
                <img
                  src="/icons/svg/003-solar-panel-1.svg"
                  width={30}
                  height={30}
                />
              </div>
              <div className="col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Energia renovable</h5>
                <p className="grey-text">
                Las energías renovables se obtienen a partir de fuente naturales, como el sol, el viento, las mareas. Son inagotables y se consideran limpias debido a que generan un bajo impacto negativo sobre el medio ambiente. 
                El Área Metropolitana de Bucaramanga, por su posición geográfica, se presume posee un buen potencial para generación de energía eléctrica a partir de la radiación solar. En la región se encuentran varias estaciones meteorológicas donde también se registran señales de radiación solar. Luego de varios años de tomar estos registros, en este proyecto se han calculado valores promedios de radiación solar en diferentes puntos del Área Metropolitana de Bucaramanga, y se ha proyectado su potencial eléctrico. Los invitamos a consultar el mapa interactivo, y conocer las oportunidades para su aprovechamiento
                </p>
              </div>
            </div>
            {/* Grid row */}
            {/* Grid row */}
            <div className="row">
              <div className="col-md-1 col-2">
                <img
                  src="/icons/svg/002-high-voltage.svg"
                  width={30}
                  height={30}
                />
              </div>
              <div className="col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Potencial</h5>
                <p className="grey-text mb-0">
                  La energía que capturamos la podemos convertir en electricidad,
                  conocido tambien como potencial electrico, el cual podemos
                  usar como energía en nuestros hogares. Conoce más sobre
                  energia renovable haciend click en los sugientes videos.
                </p>
                <div className="row start-xs">
                  {/*Iframe*/}
                  <Iframe />
                </div>
              </div>
            </div>
            {/* Grid row */}
          </div>
          {/* Grid column */}
        </div>
        {/* Grid row */}
      </section>
      {/* Projects section v.3 */}
    </React.Fragment>
  );
}
