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
             <div className="row">
              <img src="logosemillero.png" class="img-fluid z-depth-1 rounded-circle"
                alt="Logo semillero SPEC"
                height={100}
                width={100}/>
                <div className="row middle-xs ml-3">
                  <h4 className="text-white">SPEC</h4>
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
    </React.Fragment>
  );
}
