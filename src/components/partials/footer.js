import React from "react";

export default function Footer() {
  
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
                Este proyecto hace parte del semillero de prospectiva energética de Colombia
                de la Universidad Pontificia Bolivariana seccional Bucaramanga.
              </p>

              <div class="row start-lg start-sm start-md center-xs">
                <div class="col-xs-6 col-sm-10 col-md-12">
                  <div class="box">
                    <div className="row">
                    <img src="logosemillero.png" class="img-fluid z-depth-1 rounded-circle"
                      alt="Logo semillero SPEC"
                      height={100}
                      width={100} />
                    <div className="row middle-xs ml-3">
                      <h4 className="text-white">SPEC</h4>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2 mx-auto">
              {/* Links */}
              <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                Software usado
              </h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://leafletjs.com/">Framework SIG: Leafletjs</a>
                </li>
                <li>
                  <a href="https://www.flaticon.com/">Iconos y vectores:  Flaticon.com</a>
                </li>
              </ul>
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
                <p class="pt-3 pr-2">Este sitio web no almacenara la iformación que ingrese.</p>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Entendido</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Frame Modal Bottom --> */}
    </React.Fragment>
  );
}
