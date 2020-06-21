import React from "react";
import { Line } from "react-chartjs-2";
const data = {
  datasets: [
    {
      label: "Comportamiento de la radiación solar para la fecha X",
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
  const { object } = props;

  return (
    <React.Fragment>
      <div style={{width:500}}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Información de la estación
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
             Resumen básico
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="contact-tab"
              data-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Grafica
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          {/*Estación tab */}
          <div
            className="tab-pane fade show active mt-2"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div>
              {/* Grid column */}
              <div>
                {/*Featured image*/}
                <div className="view overlay rounded">
                  <div className="row center-xs">
                    <img
                      width={100}
                      height={100}
                      src={object.nombre ? "/icons/svg/006-solar-panel-3.svg": "/icons/svg/location.svg"}
                      className="img-fluid"
                      alt="Vector"
                    />
                  </div>
                  <a>
                    <div className="mask rgba-white-slight" />
                  </a>
                </div>
                {/*Excerpt*/}
                <div className="card-body pb-0">
                  {object.nombre && <h4 className="font-weight-bold text-center">
                    Estación {object.nombre}
                  </h4>}
                  <ul class="list-group">
                    {object.nombre && <li class="list-group-item">
                      Municipio: {object.municipio}
                    </li>}
                    {object.nombre && <li class="list-group-item">Origen: {object.origen}</li>}
                    <li class="list-group-item">Laitud: {object.lat}</li>
                    <li class="list-group-item">Longitud: {object.lon}</li>
                  </ul>
                  <div></div>
                </div>
              </div>
              {/* Grid column */}
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum quam a nunc tincidunt hendrerit. Nullam aliquet vitae ipsum sed eleifend. Ut scelerisque elementum accumsan.</p>
            <div className="mt-2">
              <div style={{ width: "100%" }}>
                <div className="card" style={{ height: 60 }}>
                  <div className="card-body">
                    <div className="row middle-xs">
                      <div className="col-2 ">
                        <img
                          className="mb-3"
                          src="/icons/svg/006-up-arrow.svg"
                          height={30}
                          width={30}
                        />
                      </div>
                      <div className="col-10">
                        <h5 className="card-title">
                          Potencial maximo:
                          <span className="text-muted"> 830 kw/h</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card my-2" style={{ height: 60 }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-2 ">
                        <img
                          src="/icons/svg/008-balance.svg"
                          height={30}
                          width={30}
                        />
                      </div>
                      <div className="col-10">
                        <h5 className="card-title">
                          Potencial promedio:
                          <span className="text-muted"> 830 kw/h</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ height: 60 }}>
                  <div className="card-body">
                    <div className="row middle-xs">
                      <div className="col-2 ">
                        <img
                          className="mb-3"
                          src="/icons/svg/004-down-arrow.svg"
                          height={30}
                          width={30}
                        />
                      </div>
                      <div className="col-10">
                        <h5 className="card-title">
                          Potencial minimo:
                          <span className="text-muted"> 830 kw/h</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="mt-2">
              <div>
                {/*Grafica */}
                <div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row middle-xs">
                        <Line
                          data={data}
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
