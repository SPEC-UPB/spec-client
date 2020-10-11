import React, { useState } from "react";
import ItemsCarousel from 'react-items-carousel';

export default function Footer() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  return (
    <React.Fragment>
      {/* Footer */}
      <footer className="page-footer font-small info-color-dark pt-4">
        {/* Footer Links */}
        <div className="container text-center text-md-left mb-3">
          {/* Grid row */}
          <div className="row">
            {/* Grid column */}
            <div className="col-md-4 mx-auto">
              {/* Content */}
              <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                Proyecto de radiación solar
              </h5>
              <p>
                Proyecto desarrollado por el Semillero de Prospectiva Energética de Colombia (SPEC)
                de la Universidad Pontificia Bolivariana seccional Bucaramanga.
              </p>

              <div class="row start-lg start-sm start-md center-xs">
                <div class="col-xs-6 col-sm-10 col-md-12">
                  <div class="box">
                    <div className="row">
                      <div className="col-4">
                        <div class="row middle-xs">
                          <div class="col-xs">
                            <div class="box">
                              <img src="logosemillero.png" class="img-fluid z-depth-1 rounded-circle"
                                alt="Logo semillero SPEC" />
                              <div className="row middle-xs ml-3 d-none d-xl-block">
                                <h4 className="text-white mt-2">SPEC</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-8 ">
                        <div class="row middle-xs">
                          <div class="col-xs">
                            <div class="box">
                              <img src="/images/logoupb.png" class="img-fluid"
                                alt="Logo UPB" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mx-auto">
              {/* Links */}
              <h5 className="font-weight-bold text-uppercase mt-3 mb-4 text-center">
                Integrantes del proyecto
              </h5>
              <div style={{ padding: `0 ${chevronWidth}px` }}>
                <ItemsCarousel
                  requestToChangeActive={setActiveItemIndex}
                  activeItemIndex={activeItemIndex}
                  numberOfCards={1}
                  gutter={20}
                  leftChevron={<i class="fas fa-chevron-left"></i>}
                  rightChevron={<i class="fas fa-chevron-right"></i>}
                  outsideChevron
                  chevronWidth={chevronWidth}
                >
                <div className="row text-center">
                  <div class="avatar xx| ">
                    <img   height="50%" width="40%" src="/images/Diana.jpeg" class="rounded-circle "
                      alt="woman avatar"/>
                      <h5 class="card-title mt-2">Diana Teresa Gómez Forero</h5>
                      <hr/>
                      diana.gomez@upb.edu.co
                  </div>
                </div>
                <div className="row text-center">
                  <div class="avatar xx| ">
                    <img   height="45%" width="40%" src="/images/Francisco.jpeg" class="rounded-circle "
                      alt="woman avatar"/>
                      <h5 class="card-title mt-2">Juan F. Javier Pérez Rivero</h5>
                      <hr/>
                      francisco.perez@upb.edu.co
                  </div>
                </div>
                <div className="row text-center">
                  <div class="avatar xx| ">
                    <img   height="50%" width="35%" src="/images/Deiver.jpg" class="rounded-circle "
                      alt="woman avatar"/>
                      <h5 class="card-title mt-2">Deiver Guerra Carrascal</h5>
                      <hr/>
                      ingendeiver@gmail.com
                  </div>
                </div>
                </ItemsCarousel>
              </div>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Footer Links */}
        {/* Copyright */}
        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="https://www.upb.edu.co/es/universidad/nuestro-campus/campus-bucaramanga"> UPB - Bucaramanga</a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}

      {/* <!-- Frame Modal Bottom --> */}
      <div class="modal fade bottom" id="frameModalBottom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">

        {/* <!-- Add class .modal-frame and then add class .modal-bottom (or other classes from list above) to set a position to the modal --> */}
        <div class="modal-dialog modal-frame modal-bottom" role="document">


          <div class="modal-content">
            <div class="modal-body">
              <div class="row d-flex justify-content-center align-items-center">
                <p class="pt-3 pr-2">Este sitio web no almacenara la iformación que ingrese, asi mimso al hacer uso del sitio usted  esta aceptando los  <a href="/terminos.html">términos y condicones</a></p>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => window.localStorage.setItem("spec-ok", "ok")}>Entendido</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Frame Modal Bottom --> */}
    </React.Fragment>
  );
}
