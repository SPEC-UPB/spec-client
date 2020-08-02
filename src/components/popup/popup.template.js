import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import estacionService from '../../services/estacion.service'

export default function Popup(props) {
  const { object, potencial } = props;

  const [datasets, setDatasets] = useState({
    datasets: [
        {
          label: "Radiación",
          data: []
        }
      ]
  })

  let potencialEstacion = {maximo:0, minimo:0, promedio:0}


  useEffect(() => {
    if(props.object.nombre){
      props.getRadiation(props.object.nombre)
      .then(res => {
        setDatasets({
          datasets: [
              {
                label: "Radiación",
                data: res.data.map(r => {return {x:new Date(r.fecha).getHours(), y:r.radiacion}})
              }
            ]
        })
      })
      .catch(err => console.error(err)) 
      potencial.forEach(p => {
        if(p.estacion == object.nombre){
            potencialEstacion.maximo = p.maximo
            potencialEstacion.minimo = p.minimo
            potencialEstacion.promedio = p.radiacion
        }
      });
    }
    return ()=>{

    }
  },[object, potencial])

  return (
    <React.Fragment>
      <div className="my-3 mx-2">
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
              {object.nombre ? "Inf. de la estación":"Información del punto"}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="radiacion-tab"
              data-toggle="tab"
              href="#radiacion"
              role="tab"
              aria-controls="radiacion"
              aria-selected="false"
            >
              Radiación
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
                          Potencial máximo:
                          <span className="text-muted"> {potencialEstacion.maximo} kw/h</span>
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
                          <span className="text-muted">{potencialEstacion.promedio} kw/h</span>
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
                          Potencial mínimo:
                          <span className="text-muted"> {potencialEstacion.minimo} kw/h</span>
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
            id="radiacion"
            role="tabpanel"
            aria-labelledby="radiacion-tab"
          >
            <div className="mt-2">
              <div>
                {/*Grafica */}
                <div>
                  <div className="card">
                    <div className="card-body">
                      <h6 className="text-center text-muted">Comportamiento para la fecha: {estacionService.formatDate(props.date)}</h6>
                      {datasets.datasets[0].data.length > 0 ? (<div className="row middle-xs">
                        <Line
                          data={datasets}
                          options={{
                            backgroundColor: "#FFEB3B",
                            scales: {
                              xAxes: [
                                {
                                  type: "linear",
                                  position: "bottom",
                                  scaleLabel:{
                                    display:true,
                                    labelString: "Horas del día (24H)"
                                  }
                                },
                              ],
                              yAxes: [
                                {
                                  type: "linear",
                                  position: "bottom",
                                  scaleLabel:{
                                    display:true,
                                    labelString: "Radiación (KW/h)"
                                  }
                                },
                              ]
                            },
                          }}
                        />
                      </div>): <p className="text-center">No se encontraron resultados.</p>}
                      
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
