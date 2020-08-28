import React, { useState } from "react";
import { Line, Bar} from "react-chartjs-2";
import { useEffect } from "react";
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadiationColor from '../../constants/colors'


export default function Popup(props) {
  const { object, date , scale} = props;
  const menorEfficiencyPercentage = 17
  const mayorEfficiencyPercentage = 25

  const [efficiencyPercentage, setEfficiencyPercentage] = useState(17)
  const changeEfficiencyPercentage = (e) => {
    const value = e.target.value
    if (value <= mayorEfficiencyPercentage && value >= menorEfficiencyPercentage) {
      setEfficiencyPercentage(value)
      props.changeEfficiencyPercentage(value)
    }
  }

  

 

  const [potencialEstacion, setPotencialEstacion] = useState({ maximo: null, minimo: null, promedio: null })
 

  useEffect(() => {

    // si la escala esta desactiva hace petición
    if (props.object.nombre )  {

      let hayPotencial = false;
      props.potencial.forEach(p => {
        if (p.estacion == object.nombre) {
          setPotencialEstacion({
            maximo: p.maximo,
            minimo: p.minimo,
            promedio: p.radiacion
          })
          hayPotencial = true;
        }
      });

      console.log(props.potencial);
      if (!hayPotencial) {
        setPotencialEstacion({
          maximo: 0,
          minimo: 0,
          promedio: 0
        })
      }
    }
    
    return () => {

    }

  }, [object, props.potencial, date, efficiencyPercentage, scale, props.datasets, props.datasetsScale])

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
              {object.nombre ? "Inf. de la estación" : "Información del punto"}
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
              {props.typeScale != "día" && props.scale ? "Comparación":"Radiación"}
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
                      src={object.nombre ? "/icons/svg/006-solar-panel-3.svg" : "/icons/svg/location.svg"}
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
                <p className="text-center text-muted mx-5">Potencial registrado en kilovatios al {" " + props.typeScale + " "}  
                para la fecha: {!props.scale ? props.date:props.currentDateRange}</p>
                {potencialEstacion.promedio && object.nombre ?
                  (<React.Fragment>
                    <p className="text-center text-muted">Estación {object.nombre}</p>
                    <div class="row">
                      <div className="col-4">
                        <img
                          width={200}
                          height={200}
                          src="/images/potencial_solar.gif"
                          className="img-fluid ml-5"
                        />
                      </div>
                      <div className="col-8">
                        <div class="row middle-xs">
                          <div class="col mt-4">
                            <div class="box">
                              <FormControl  >
                                <Input
                                  onChange={changeEfficiencyPercentage}
                                  value={efficiencyPercentage}
                                  type="number"
                                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                  aria-describedby="standard-weight-helper-text"
                                  inputProps={{
                                    'aria-label': 'weight',
                                  }}
                                />
                                <FormHelperText id="standard-weight-helper-text">Porcentaje de eficiencia / m<sup>2</sup></FormHelperText>
                              </FormControl>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="card" style={{ height: 60 }}>
                      <div className="card-body">
                        <div className="row middle-xs">
                          <div className="col-2 ">
                            <i class="fas fa-arrow-up" style={{ fontSize: 30, color: "#FFC107" }}></i>
                          </div>
                          <div className="col-10">
                            <h5 className="card-title">
                              Potencial máximo:
                                <span className="text-muted ml-2">
                                {potencialEstacion.maximo ? ((potencialEstacion.maximo * (efficiencyPercentage/100))/1000).toFixed(2): 0} Kwh/m<sup>2</sup>
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card my-2" style={{ height: 60 }}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-2 ">
                            <i class="fas fa-bolt" style={{ fontSize: 30, color: "#FFC107" }}></i>
                          </div>
                          <div className="col-10">
                            <h5 className="card-title">
                              Promedio:
                                <span className="text-muted ml-2">{potencialEstacion.promedio ? ((potencialEstacion.promedio * (efficiencyPercentage/100))/1000).toFixed(2) : 0}  Kwh/m<sup>2</sup></span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card" style={{ height: 60 }}>
                      <div className="card-body">
                        <div className="row middle-xs">
                          <div className="col-2 ">
                            <i class="fas fa-arrow-down" style={{ fontSize: 30, color: "#FFC107" }}></i>
                          </div>
                          <div className="col-10">
                            <h5 className="card-title">
                              Potencial mínimo:
                                <span className="text-muted ml-2"> {potencialEstacion.minimo ? ((potencialEstacion.minimo * (efficiencyPercentage/100))/1000).toFixed(2): 0} Kwh/m<sup>2</sup></span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>

                   


                    <div className="my-3">
                      <a href="#potencial">¿ Como puedo aprovechar este potencial ?</a>
                    </div>
                  </React.Fragment>) : (<p className="text-center">No se encontraron resultados.</p>)
                }




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
                      {props.typeScale == "día" && <h6 className="text-center text-muted">Comportamiento para la fecha: {!props.scale ? props.date:props.currentDateRange}</h6>}
                      {props.typeScale != "día" && <h6 className="text-center text-muted">Comparación del potencial por {props.typeScale} entre: {props.date} y {props.currentDateEnd}</h6>}
                      {object.nombre && <p className="text-center text-muted">Estación {object.nombre}</p>}
                      {props.datasets.datasets[0].data.length > 0  && props.typeScale == "día" && (<div className="row middle-xs">
                        <Line
                          data={props.datasets}
                          options={{
                            scales: {
                              xAxes: [
                                {
                                  type: "linear",
                                  position: "bottom",
                                  scaleLabel: {
                                    display: true,
                                    labelString: props.scale && props.typeScale!= "día" ? "Potencial por " + props.typeScale:"Horas del día (24H)"
                                  }
                                },
                              ],
                              yAxes: [
                                {
                                  type: "linear",
                                  position: "bottom",
                                  scaleLabel: {
                                    display: true,
                                    labelString: props.scale ? "Potencial (Wh / m^2)":"Radiación (Wh / m^2)"
                                  }
                                },
                              ]
                            },
                          }}
                        />


                      </div>)}
                      { props.datasetsScale.datasets[0].data.length == 0 && props.datasets.datasets[0].data.length == 0 &&
                        <p className="text-center">No se encontraron resultados.</p>
                      }
                      {props.typeScale!= "día" && props.scale && props.datasetsScale.datasets[0].data.length > 0 &&
                        <Bar
                        type="bar"
                        data={props.datasetsScale}
                      />
                      }
                      {/* Indicadore de nivel */}
                      { props.typeScale == "día" && <div className="row mt-2">
                        <div className="col">
                          <div className="row around-xs">
                            <div style={{ width: 20, height: 20, backgroundColor: RadiationColor.lowRadiationColor, borderRadius: 50 }}></div>
                            <div><span style={{ fontSize: 15 }} className="text-muted ">Baja</span></div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row around-xs">
                            <div style={{ width: 20, height: 20, backgroundColor: RadiationColor.mediaRadiationColor, borderRadius: 50 }}></div>
                            <div><span style={{ fontSize: 15 }} className="text-muted ">Moderada</span></div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row around-xs">
                            <div style={{ width: 20, height: 20, backgroundColor: RadiationColor.hightRadiationColor, borderRadius: 50 }}></div>
                            <div><span style={{ fontSize: 15 }} className="text-muted ">Alta</span></div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row around-xs">
                            <div style={{ width: 20, height: 20, backgroundColor: RadiationColor.veryHightRadiationColor, borderRadius: 50 }}></div>
                            <div><span style={{ fontSize: 15 }} className="text-muted ">Muy alta</span></div>
                          </div>
                        </div>
                      </div>}

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
