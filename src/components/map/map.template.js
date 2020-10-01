import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON, Circle } from "react-leaflet";
import { Icon } from "leaflet";
import AREA_METROPOLITANA_BUCARAMANGA_POLYGON from "./Metropolitana.border.geo.json";
import Progress from "../progress/progress";
import Footer from "../partials/footer";
import Analisis from "../analisis/analisis.container";
import Slider from "../partials/slider";
import Picker from "../partials/picker";
import Header from "../partials/header";
import MyPopup from "../popup/popup.container";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {polygon as Polygon, Point} from './Polygon'
import Alert from '@material-ui/lab/Alert';
import "./scroll.css"
import RadiationColor from '../../constants/colors'

const icon = new Icon({
  iconUrl: process.env.PUBLIC_URL + "/icons/svg/002-solar-energy.svg",
  iconSize: [40, 40],
});



const MapTemplate = (props) => {
  const { stations, center } = props;
  const [stationSelected, setstation] = useState(null);
  const [zoom, setzoom] = useState(13);
  const [pointSelected, setpointSelected] = useState({lat:center[0], lon: center[1]});
  const [state, setState] = React.useState({
    Scala: false,
    Points: false,
    Mapa: false,
  });
  

  const getPotential = (nombreEstacion) => {
    const potencial =  props.potencial.filter(p => p.estacion == nombreEstacion)
  
    let radio = 0;

    if(potencial[0]){
      if(potencial[0].radiacion){
        radio = potencial[0].radiacion
      }
    }
    console.log(props.efficiencyPercentage);
    return radio * props.efficiencyPercentage
  }

  const getColor = (nombreEstacion) => {
    let color = ""
    const potencial =  props.potencial.filter(p => p.estacion == nombreEstacion)
    let radio = 0;
    if(potencial[0]){
      if(potencial[0].radiacion){
        radio = potencial[0].radiacion
      }
    }

    if (radio < RadiationColor.lowRadiationValue)
      color = RadiationColor.lowRadiationColor
    else if (radio >= RadiationColor.lowRadiationValue && radio <= RadiationColor.mediaRadiationValue)
      color = RadiationColor.mediaRadiationColor
    else if (radio >= RadiationColor.mediaRadiationValue && radio <= RadiationColor.hightRadiationValue)
      color = RadiationColor.hightRadiationColor
    else
      color = RadiationColor.veryHightRadiationColor

    return color
  }

  const handleChange = (event) => {
    if(event.target.name=="Scala" && event.target.checked){
      if(props.currentStationName!=""){
        props.openScale()
        const dateBase = new Date(props.date)
        dateBase.setMonth(dateBase.getMonth() + 1);
        props.onChangeDateEnd(dateBase)
        props.changeTypeScale(props.typeScale)
        setState({ ...state, [event.target.name]: event.target.checked });
      }else{
        props.showMessage("Primero debe seleccionar un punto o estación")
      }
    }else if(event.target.name=="Scala" && !event.target.checked){
      props.closeScale()
    }


    if(!event.target.checked){
      setState({ ...state, [event.target.name]: event.target.checked });
    }
    
  };

  useEffect(() => {
    return () => {

    }
  }, [props.potencial, props.efficiencyPercentage, props.message])

  return (
    <React.Fragment>
      {/*Header */}
        <div className="container-fluid my-4">
          <Header />
        </div>

      {/*Mapa */}
      <div style={{ position: "relative" }}>
  
        <div id="scroll" className="card" style={{position:'absolute', right:10, top:3, zIndex:2, backgroundColor:'white',
            borderRadius:10, width:520, height:"98vh", overflowY:"auto"}}>

          <div className="card-body">
          <h5 className="text-center  mx-3">
                Conozca la radiación solar en el Área Metropolitana de Bucaramanga
          </h5>

          {stationSelected && (
             <MyPopup 
             currentDateRange={props.currentDateRange} scale={state.Scala} 
             datasets={props.datasets}
             currentDateEnd={props.currentDateEnd}
             datasetsScale={props.datasetsScale}
             typeScale={props.typeScale}
             changeEfficiencyPercentage={props.changeEfficiencyPercentage}  
             efficiencyPercentage={props.efficiencyPercentage} 
             object={stationSelected} date={props.date} potencial={props.potencial}
             potentialForRange={props.potentialForRange}
             getRadiation={props.getRadiation}
             updateUIwithScale={props.updateUIwithScale}/>
          )}

          {pointSelected !=null  && Polygon.inPolygon(new Point(pointSelected.lon, pointSelected.lat)) !== 0 ? (
            <MyPopup currentDateRange={props.currentDateRange} scale={state.Scala}
            getRadiation={props.getRadiation}
            currentDateEnd={props.currentDateEnd}
            datasetsScale={props.datasetsScale}
            datasets={props.datasets}
            typeScale={props.typeScale} 
            changeEfficiencyPercentage={props.changeEfficiencyPercentage}  
            object={pointSelected} date={props.date}
            potentialForRange={props.potentialForRange}
            updateUIwithScale={props.updateUIwithScale}/>
          ):
          <div>
            {stationSelected == null && <Alert severity="info">
            No es posible mostrar información de radiación solar fuera del Área Metropolitana de Bucaramanga
          </Alert>}
          </div>
          }



          <div className="mx-3 mt-2">
            {/*Date Picker */}
            <Picker typeScale={props.typeScale} isRequest={props.isRequest} onChangeDateEnd={(newDate) => props.onChangeDateEnd(newDate)} 
            scale={state.Scala} onChange={(newDate) => props.changeDate(newDate, state.Scala)} />
            <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      disabled={props.isRequest}
                      control={
                        <Switch
                          color="primary"
                          checked={state.Scala}
                          onChange={handleChange}
                          name="Scala"
                        />
                      }
                      label="Ver el cambio de radiación en el tiempo"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          checked={state.Mapa}
                          onChange={handleChange}
                          name="Mapa"
                        />
                      }
                      label="Mostrar imagen mapa interpolado"
                    /> 
                  </FormGroup>
              </FormControl>
          </div>
          </div>
      </div>

        {/*Mapa interpolado*/}
        {state.Mapa && <div
          className="card "
          style={{
            position: "absolute",
            top: 10,
            zIndex: 2,
            backgroundColor: "white",
            left: 10,
            width: 300,
          }}
        >
          <div className="card-body">
          <img
                width={300}
                height={300}
                src="https://www.globalweatherclimatecenter.com/uploads/7/0/9/4/70941227/daneeja-rainfall-1_orig.png"
                class="img-fluid"
                alt="interpolación del día"
              />
          </div>
        </div>}

        {/*Progress */}
        {props.message != "" && (
          <div style={{ textAlign: "center" }}>
            <Progress message={props.message} />
          </div>
        )}

        <Map
          style={{ zIndex: 1 }}
          onclick={(e) =>
            {
              setpointSelected({ lat: e.latlng.lat, lon: e.latlng.lng })
              setstation(null)
            }
          }
          center={center}
          zoom={zoom}
          onzoomend={(e) => {setzoom(e.target._zoom);}}
        >

          <Popup
            position={[7.0436319896086745, -73.11658859252931]}>
            <Alert severity="info">Haga click sobre algún punto del Área Metropolitana de Bucaramanga para conocer la radiación y el potencial energético.
              
            </Alert>
          </Popup>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {zoom >= 8 &&
            stations.map((estation, index) => (
                <React.Fragment>
                  <Marker
                  key={index}
                  position={[estation.lat, estation.lon]}
                  icon={icon}
                  onclick={ () => {
                    setstation(estation)
                    props.setCurrentStationName(estation.nombre)
                    setpointSelected(null)
                  }}
                />
              </React.Fragment>
             
            ))}

            {zoom <= 16 && props.potencial.length > 0 &&
                     stations.map((estation) => (
                      <Circle
                        center={[estation.lat, estation.lon]}
                        color={getColor(estation.nombre)}
                        fillColor={getColor(estation.nombre)}
                        fillOpacity={0.5}
                        radius={getPotential(estation.nombre)}
                      />
                  ))
            }
                
          
          {/* <GeoJSON
            data={COLOMBIA_POLYGON}
            color="#fed330"
            opacity={zoom <= 10 ? 0.2 : 0}
            fillOpacity={zoom <= 10 ? 0.2 : 0}
          /> */}
          {zoom <= 10 && (
            <GeoJSON
              data={AREA_METROPOLITANA_BUCARAMANGA_POLYGON}
              style={{
                fillColor: "#FFEB3B",
                color: "white",
                weight: 2,
                opacity: 0.5,
                fillOpacity: 0.5,
              }}
            />
          )}
        </Map>

        {/*Slider */}
        {state.Scala &&
        <Slider validDateRange={props.validDateRange} isRequest={props.isRequest} 
          changeTypeScale={props.changeTypeScale}
          onChangeDateScale={props.onChangeDateScale}
          currentDateRange={props.currentDateRange}
          dateRangesForPotential={props.dateRangesForPotential}/>}
      </div>

      {/*Analisis*/}
      <div id="potencial" className="my-5">
        <Analisis
         typeScale={props.typeScale}
         data={props.datasetsScale.datasets[0].data}
         porcentajeAplicadoToBarChart = {props.porcentajeAplicadoToBarChart}
         object={stationSelected}
         potencial={props.potencial}
         scale={state.Scala} 
         currentDateEnd={props.currentDateEnd}
         currentDateStart={props.date}/>
      </div>

      {/*Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default MapTemplate;
