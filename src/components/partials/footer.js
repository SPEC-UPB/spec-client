import React from "react";

export default function Footer() {
  return (
    <React.Fragment>
      {/* Footer */}
      <footer className="page-footer font-small info-color-dark pt-4">
        {/* Footer Links */}
        <div className="container text-center text-md-left">
          {/* Grid row */}
          <div className="row">
            {/* Grid column */}
            <div className="col-md-4 mx-auto">
              {/* Content */}
              <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                Footer Content
              </h5>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
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
                   <a href="https://reactjs.org/">Framework de desarrollo: React.js</a>
                </li>
                <li>
                  <a href="https://leafletjs.com/">Framework SIG: Leafletjs</a>
                </li>
                <li>
                  <a href="https://www.flaticon.com/">Iconos y vectores:  Flaticon.com</a>
                </li>
                <li>
                  <a href="https://mdbootstrap.com/">UI: MDB.com</a>
                </li>
                <li>
                  <a href="https://www.chartjs.org/">Graficas: Chart.js</a>
                </li>
              </ul>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Footer Links */}

        {/* Social buttons */}
        <ul className="list-unstyled list-inline text-center">
          <li className="list-inline-item">
            <a className="btn-floating btn-fb mx-1">
              <i className="fab fa-facebook-f"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-tw mx-1">
              <i className="fab fa-twitter"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-gplus mx-1">
              <i className="fab fa-google-plus-g"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-li mx-1">
              <i className="fab fa-linkedin-in"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-dribbble mx-1">
              <i className="fab fa-dribbble"> </i>
            </a>
          </li>
        </ul>
        {/* Social buttons */}
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
