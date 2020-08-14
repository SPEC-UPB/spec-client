import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";

const lowRadiationColor = "#4cd137"
const mediaRadiationColor = "#fbc531"
const hightRadiationColor = "#e67e22"
const veryHightRadiationColor = "#e84118"
export default function Popup(props) {
  const { object, potencial, date, efficiencyPercentage} = props;

  const [datasets, setDatasets] = useState({
    datasets: [
        {
          label: "Radiación",
          data: []
        }
      ]
  })

  const [potencialEstacion, setPotencialEstacion] = useState({maximo:0, minimo:0, promedio:0})


  useEffect(() => {
    if(props.object.nombre){
      props.getRadiation(props.object.nombre)
      .then(res => {
        let data = res.data.map(r => {return {x: parseFloat(new Date(r.fecha).getHours() + (new Date(r.fecha).getMinutes()/60) + (new Date(r.fecha).getSeconds()/3600)), 
          y:r.radiacion}})

          data.sort((firstEl, secondEl) => {
              if(firstEl.x < secondEl.x)
                return -1;
              if (firstEl.x > secondEl.x)
                return 1;
              return 0;
          });

          console.log(data);
        setDatasets({
          datasets: [
              {
                label: "Radiación",
                data,
                backgroundColor:function(context) {
                  let index = context.dataIndex;
                  let value = context.dataset.data[index];
                  let color = "#f5f6fa"
                  if(value){
                    if (value.y < 500 )
                      color = lowRadiationColor
                    else if( value.y >= 500 && value.y <= 700)
                      color = mediaRadiationColor
                    else
                      color = hightRadiationColor
                  }
                  return color
                  
              }}
            ]
        })
      })
      .catch(err => props.showError("Lo sentimos ocurrio un error al obtener la radiación")) 
      
      let hayPotencial = false;
      potencial.forEach(p => {
        if(p.estacion == object.nombre){
            setPotencialEstacion({
              maximo : p.maximo,
              minimo : p.minimo,
              promedio : p.radiacion
            })
            hayPotencial = true;
        }
      });
      if(!hayPotencial){
        setPotencialEstacion({
          maximo : 0,
          minimo : 0,
          promedio : 0
        })
      }
    }
    return ()=>{

    }
  },[object, potencial, date, efficiencyPercentage])

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
             Potencial
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
                          <span className="text-muted"> {potencialEstacion.maximo ? (potencialEstacion.maximo * efficiencyPercentage).toFixed(2):0} kw/h</span>
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
                          Promedio:
                          <span className="text-muted">{potencialEstacion.promedio ? (potencialEstacion.promedio * efficiencyPercentage).toFixed(2):0} kw/h</span>
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
                          <span className="text-muted"> {potencialEstacion.minimo ? (potencialEstacion.minimo * efficiencyPercentage).toFixed(2):0} kw/h</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
            <a  href="#potencial">¿ Como puedo aprovechar este potencial ?</a>
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
                      <h6 className="text-center text-muted">Comportamiento para la fecha: {props.date}</h6>
                      {object.nombre && <p className="text-center text-muted">Estación {object.nombre}</p>}
                      {datasets.datasets[0].data.length > 0 ? (<div className="row middle-xs">
                        <Line
                          data={datasets}
                          options={{
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
                      {/* Indicadore de nivel */}
                      <div className="row mt-2">
                            <div className="col">
                                <div className="row around-xs">
                                  <div  style={{width:20, height:20, backgroundColor:lowRadiationColor, borderRadius:50}}></div>
                                  <div><span style={{fontSize:15}} className="text-muted ">Baja</span></div>
                                </div>
                              </div>
                            <div className="col">
                              <div className="row around-xs">
                                <div  style={{width:20, height:20, backgroundColor:mediaRadiationColor, borderRadius:50}}></div>
                                <div><span style={{fontSize:15}} className="text-muted ">Moderada</span></div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="row around-xs">
                                <div  style={{width:20, height:20, backgroundColor:hightRadiationColor, borderRadius:50}}></div>
                                <div><span style={{fontSize:15}} className="text-muted ">Alta</span></div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="row around-xs">
                                <div  style={{width:20, height:20, backgroundColor:veryHightRadiationColor, borderRadius:50}}></div>
                                <div><span style={{fontSize:15}} className="text-muted ">Muy alta</span></div>
                              </div>
                            </div>
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
