import React from "react";
import { Line } from "react-chartjs-2";
const data = {
  datasets: [
    {
      label: "Radiación para la fecha X",
      data: [
        {
          x: -10,
          y: 0,
        },
        {
          x: 0,
          y: 10,
        },
        {
          x: 10,
          y: 5,
        },
      ],
    },
  ],
};

export default function Popup(props) {
  const { station } = props;

  return (
    <React.Fragment>
      <div className="row">
        {/* Grid column */}
        <div className="col-xs-12 col-lg-5 ">
          {/*Featured image*/}
          <div className="view overlay rounded">
            <div className="row center-xs">
              <img
                width={100}
                height={100}
                src="/icons/svg/006-solar-panel-3.svg"
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
            <h4 className="font-weight-bold text-center">
              Estación {station.nombre}
            </h4>
            <ul class="list-group">
              <li class="list-group-item">Municipio: {station.municipio}</li>
              <li class="list-group-item">Origen: {station.origen}</li>
              <li class="list-group-item">Laitud: {station.lat}</li>
              <li class="list-group-item">Longitud: {station.lon}</li>
            </ul>
            <div>
              {/* Collapse buttons */}
              <div className="text-center">
                <button
                  className="btn btn-info btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Ver grafica
                </button>
              </div>
              {/* / Collapse buttons */}
            </div>
          </div>
        </div>
        {/* Grid column */}

        <div className="col-xs-12  col-lg-7 mt-2">
          <div className="container ">
            <div className="col-lg-4 col-xs-10 ">
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
            <div className="col-lg-4 col-xs-10 my-2">
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
            <div className="col-lg-4 col-xs-10">
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
      </div>
      <div className="mt-2">
        {/* Collapsible element */}
        <div className="collapse" id="collapseExample">
          {/*Grafica */}
          <div>
            <div className="card">
              <div className="card-body">
                <div className="row middle-xs">
                  <Line
                    data={data}
                    height={100}
                    options={{
                      backgroundColor: "#00a8ff",
                      scales: {
                        xAxes: [
                          {
                            type: "linear",
                            position: "bottom",
                          },
                        ],
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* / Collapsible element */}
      </div>
    </React.Fragment>
  );
}
