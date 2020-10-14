import React from "react";
import Iframe from "./iframe";

export default function Header() {
  return (
    <React.Fragment>
      {/* Projects section v.3 */}
      <div className="card">
        <div className="card-body">
          <section className="my-5 container">
        {/* Section heading */}
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Radiación solar en el Área Metropolitana de Bucaramanga
        </h2>
        {/* Section description */}
        <p style={{textAlign:"justify"}} className="grey-text  w-responsive mx-auto mb-5">
        El Semillero de Prospectiva Energética de Colombia (SPEC) de la Universidad Pontificia
        Bolivariana coloca a disposición del público general este sitio de consulta sobre la radiación
        solar en el Área Metropolitana de Bucaramanga.
        </p>
        {/* Grid row */}
        <div className="row">
          {/* Grid column */}
          <div className="col-lg-5 mb-lg-0 mb-5">
            {/*Image*/}
            <div className="row center-xs">
              <img
                src="/icons/svg/sun.svg"
                alt="Energía renovable"
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
                <p style={{textAlign:"justify"}} className="grey-text">
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
                <p style={{textAlign:"justify"}} className="grey-text">
                Las energías renovables se obtienen a partir de fuente naturales, como el sol, el viento, las mareas. Son inagotables y se consideran limpias debido a que generan un bajo impacto negativo sobre el medio ambiente
                (<a href="http://www.lineaverdehuelva.com/lv/consejos-ambientales/energias-renovables/Que-son-las-energias-renovables.asp">Tomada de lineaverdehuelva.com</a>).
                El Área Metropolitana de Bucaramanga, por su posición geográfica, se presume posee un buen potencial para generación de energía eléctrica a partir de la radiación solar. En la región se encuentran varias 
                estaciones meteorológicas donde también se registran señales de radiación solar. Luego de varios años de tomar estos registros, en este proyecto se han calculado valores promedios de radiación solar en diferentes puntos del Área Metropolitana de Bucaramanga, y se ha proyectado su potencial eléctrico,
                el cual depende del <strong> porcentaje de eficiencia</strong> del panel solar, que es el porcentaje de radiación neta que puede capturar un panel, este valor se encuentra entre el 17% y 25%.
                Lo invitamos a consultar el mapa interactivo y conocer las oportunidades para su aprovechamiento.
                </p>
                {/*Iframe*/}
                <Iframe />
              </div>
            </div>
            {/* Grid row */}
          </div>
          {/* Grid column */}
        </div>
        {/* Grid row */}
      </section>
        </div>
      </div>
      {/* Projects section v.3 */}
    </React.Fragment>
  );
}
