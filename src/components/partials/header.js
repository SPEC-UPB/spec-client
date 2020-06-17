import React from 'react'
import Iframe from "./iframe";

export default function Header (){
    return (
        <React.Fragment>
             {/* Projects section v.3 */}
      <section className="my-5 container">
        {/* Section heading */}
        <h2 className="h1-responsive font-weight-bold text-center my-5">Radiación solar en el área metropolitana de Bucaramanga</h2>
        {/* Section description */}
        <p className="grey-text text-center w-responsive mx-auto mb-5">Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit est laborum.</p>
        {/* Grid row */}
        <div className="row">
          {/* Grid column */}
          <div className="col-lg-5 mb-lg-0 mb-5">
            {/*Image*/}
            <div className="row center-xs">
              <img src="/icons/svg/001-solar-energy-1.svg" 
                alt="Energia renovable" 
                height={300}
                width={300}/>
            </div>
            <div className="row center-xs">
                 {/*Iframe*/}
                  <Iframe />
            </div>
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className="col-lg-7">
            {/* Grid row */}
            <div className="row mb-3">
              <div className="col-md-1 col-2">
                <img src="/icons/svg/003-solar-panel.svg" width={30} height={30} />
              </div>
              <div className="col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Objetivo</h5>
                <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing. Reprehenderit maiores nam,
                  aperiam minima elit assumenda voluptate velit.</p>
              </div>
            </div>
            {/* Grid row */}
            {/* Grid row */}
            <div className="row mb-3">
              <div className="col-md-1 col-2">
                <img src="/icons/svg/003-solar-panel-1.svg" width={30} height={30} />
              </div>
              <div className="col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Energia renovable</h5>
                <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing. Reprehenderit maiores nam,
                  aperiam minima elit assumenda voluptate velit.</p>
              </div>
            </div>
            {/* Grid row */}
            {/* Grid row */}
            <div className="row">
              <div className="col-md-1 col-2">
                <img src="/icons/svg/002-high-voltage.svg" width={30} height={30} />
              </div>
              <div className="col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Potencial</h5>
                <p className="grey-text mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing. Reprehenderit maiores
                  nam, aperiam minima elit assumenda voluptate velit.</p>
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
    )
}