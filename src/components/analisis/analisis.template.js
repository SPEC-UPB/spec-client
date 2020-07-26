import React from "react";
import { Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';


export default function AnalisisTemplate(props) {
  return (
    <React.Fragment>
      {/* <div className="container">
        <h2 className="h1-responsive font-weight-bold my-5">
          Comportamiento de los datos durante el día
          </h2>
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
            <p style={{textAlign:"justify"}} className="grey-text w-responsive mx-auto mb-5  mt-2">
             La información es mas facil de asimilar de forma gráfica, pero tambien es importante conocer
             el comportamiento de  los datos  mediante el uso de medidas básicas que nos permitan entender
             la tendencia que siguen dichos datos. A continuación podra conocer información sobre el
             potencial energético durante el día para la fecha consultada, ademas podra visualizar un gráfica
             que muestra el comportamiento de la radiación en base al tiempo.
            </p>
          </div>
      </div> */}
      {/* <div className="container my-5">
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
                    <h5 className="card-title">Potencial máximo</h5>
                    <p className="card-text">
                      830 kWh
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
                     570 kWh
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
                    <h5 className="card-title">Potencial mínimo</h5>
                    <p className="card-text">
                      450 kWh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Grafica
      <div className="container mb-5 ">
          
        <div className="card ">
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
        </div> */}

    {/*Uso del potencial*/}
      <div className="container my-5">
        <div>
          {/* Section heading */}
          <h2 className="h1-responsive font-weight-bold my-5 text-center">
          Uso del potencial calculado
          </h2>
          {/* Section description */}
          <div>
            <div className="row center-xs">
                  <div className="row">
                    <img
                    width={100}
                    height={100}
                    src="/icons/svg/001-question.svg"
                    className="img-fluid"
                    alt="Sample project image"
                  />
                  </div>
            </div>
            <p style={{textAlign:"justify"}} className="grey-text w-responsive mx-auto mb-5  mt-2">
              Ahora que conocemos el comportamiento de la radiación solar en el área metropolitana de Bucaramanga
              y sabemos lo que significa el potencial electrico entregado por los paneles o estaciones. puede que 
              se pregunte ¿ De que me sirve esta información? ¿ Que significan los valores de potencial calculados?.
              No estaria nada mal saber cuanto dinero podria ahorrarse en su factura electricidad si usara energia renovable en su hogar, cierto.
              Para ello hemos puesto a su disposición el siguiente apartado donde podra conocer la energía que usted
              puede ahorrarse, conociendo la cantidad de vatios (Watts) que se genero a partir de la consulta definida.
              A demas puede jugar con los valores de electricidad que su hogar o aparato electronico gasta en kw por hora
              y conocer cuanto tiempo de electricidad a partir de energia renovable usted podria obtener.
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
                  Energía para su hogar
                </h4>
                <p  className="grey-text">
                  Si s casa consume en promedio <strong>X watts</strong> por hora usted podria tener energia electrica 
                  durante <strong>X horas</strong>.
                </p>
                <TextField id="standard-basic" fullWidth label="Escriba los kWh que consume su hogar" type="number"/>
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
                  Tiempo de iluminación
                </h4>
                <p className="grey-text">
                  Con este potencial usted podria encender una bombila que consume <strong>X Watss </strong> 
                  en promedio durante <strong>X horas</strong>.
                </p>
                <TextField id="standard-basic" fullWidth label="KWh que consume en iluminación" type="number"/>
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
                  Carga de telefono celular
                </h4>
                <p className="grey-text">
                  Si su telefono consume en promedio <strong>X watts </strong>para cargarlo, usted con este potencial  
                  podria cargar su telefono <strong> X veces</strong>.
                </p>
                <TextField id="standard-basic" fullWidth label="Escriba los kWh que consume su telefono" type="number"/>
              </div>
            </div>
            {/* Grid column */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
