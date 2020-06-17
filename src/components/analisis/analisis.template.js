import React from "react";
import { Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';

const data = {
  datasets: [{
      label: 'Radiación para la fecha X',
      data: [{
          x: -10,
          y: 0
      }, {
          x: 0,
          y: 10
      }, {
          x: 10,
          y: 5
      }]
  }]
}

export default function AnalisisTemplate(props) {
  return (
    <React.Fragment>
      {/* Analisis basico*/}
      <div className="container">
        {/* Section heading */}
        <h2 className="h1-responsive font-weight-bold my-5">
          Comportamiento de los datos durante el día
          </h2>
          {/* Section description */}
          <div>
            <div className="row center-xs">
                  <img
                    width={100}
                    height={100}
                    src="/icons/svg/003-stats.svg"
                    className="img-fluid"
                    alt="Sample project image"
                  />
            </div>
            <p className="grey-text w-responsive mx-auto mb-5 text-center">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              est laborum.
            </p>
          </div>
      </div>
      <div className="container my-5">
        <div className="row">
        <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="row middle-xs">
                  <div className="col-2 mr-4">
                    <img
                      src="/icons/svg/006-up-arrow.svg"
                      height={60}
                      width={60}
                    />
                  </div>
                  <div className="col-8">
                    <h5 className="card-title">Potencial maximo</h5>
                    <p className="card-text">
                      Some quick example text to build Some quick example
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="row middle-xs">
                  <div className="col-2 mr-4">
                    <img
                      src="/icons/svg/008-balance.svg"
                      height={60}
                      width={60}
                    />
                  </div>
                  <div className="col-8">
                    <h5 className="card-title">Potencial promedio</h5>
                    <p className="card-text">
                      Some quick example text to build Some quick example
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="row middle-xs">
                  <div className="col-2 mr-4">
                    <img
                      src="/icons/svg/004-down-arrow.svg"
                      height={60}
                      width={60}
                    />
                  </div>
                  <div className="col-8">
                    <h5 className="card-title">Potencial minimo</h5>
                    <p className="card-text">
                      Some quick example text to build Some quick example
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Grafica */}
      <div className="container mb-5 ">
        <div className="row">
          <div className="col-4">
            <img src="https://www.globalweatherclimatecenter.com/uploads/7/0/9/4/70941227/daneeja-rainfall-1_orig.png" class="img-fluid" alt="interpolación del día"/>
          </div>
        <div className="card col-8">
          <div className="card-body">
            <div className="row middle-xs">
              <Line
              data={data}
              height={80}
              options={{
                backgroundColor:'#00a8ff',
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }}/>
            </div>
          </div>
        </div>
        </div>
      </div>

    {/*Uso del potencial*/}
      <div className="container my-5">
        <div>
          {/* Section heading */}
          <h2 className="h1-responsive font-weight-bold my-5">
          Uso del potencial calculado
          </h2>
          {/* Section description */}
          <div>
            <div className="row center-xs">
                  <div className="row">
                    <div className="col-4">
                    <img
                    width={100}
                    height={100}
                    src="/icons/svg/001-question.svg"
                    className="img-fluid"
                    alt="Sample project image"
                  />
                    </div>
                  <div className="col-8">
                  <TextField id="standard-basic" className="ml-2" fullWidth label="Escriba los kWh a calucular" type="number"/>
                  </div>
                  </div>
            </div>
            <p className="grey-text w-responsive mx-auto mb-5 text-center">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              est laborum.
            </p>
          </div>
          {/* Grid row */}
          <div className="row text-center">
            {/* Grid column */}
            <div className="col-lg-4 col-md-12 mb-lg-0 mb-4">
              {/*Featured image*/}
              <div className="view overlay rounded">
                <div className="row center-xs">
                  <img
                    width={100}
                    height={100}
                    src="/icons/svg/002-smart-house.svg"
                    className="img-fluid"
                    alt="Sample project image"
                  />
                </div>
                <a>
                  <div className="mask rgba-white-slight" />
                </a>
              </div>
              {/*Excerpt*/}
              <div className="card-body pb-0">
                <h4 className="font-weight-bold my-3">
                  Title of the news article
                </h4>
                <p className="grey-text">
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
              </div>
            </div>
            {/* Grid column */}
             {/* Grid column */}
             <div className="col-lg-4 col-md-12 mb-lg-0 mb-4">
              {/*Featured image*/}
              <div className="view overlay rounded">
                <div className="row center-xs">
                  <img
                    width={100}
                    height={100}
                    src="/icons/svg/005-lamp.svg"
                    className="img-fluid"
                    alt="Sample project image"
                  />
                </div>
                <a>
                  <div className="mask rgba-white-slight" />
                </a>
              </div>
              {/*Excerpt*/}
              <div className="card-body pb-0">
                <h4 className="font-weight-bold my-3">
                  Title of the news article
                </h4>
                <p className="grey-text">
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
              </div>
            </div>
            {/* Grid column */} {/* Grid column */}
            <div className="col-lg-4 col-md-12 mb-lg-0 mb-4">
              {/*Featured image*/}
              <div className="view overlay rounded">
                <div className="row center-xs">
                  <img
                    width={100}
                    height={100}
                    src="/icons/svg/010-smartphone.svg"
                    className="img-fluid"
                    alt="Sample project image"
                  />
                </div>
                <a>
                  <div className="mask rgba-white-slight" />
                </a>
              </div>
              {/*Excerpt*/}
              <div className="card-body pb-0">
                <h4 className="font-weight-bold my-3">
                  Title of the news article
                </h4>
                <p className="grey-text">
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
              </div>
            </div>
            {/* Grid column */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
