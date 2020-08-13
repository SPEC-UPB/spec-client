import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON, Circle } from "react-leaflet";
import { Icon } from "leaflet";
import AREA_METROPOLITANA_BUCARAMANGA_POLYGON from "./Metropolitana.border.geo.json";
import COLOMBIA_POLYGON from "./Colombia.geo.json";
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

const icon = new Icon({
  iconUrl: process.env.PUBLIC_URL + "/icons/svg/002-solar-energy.svg",
  iconSize: [40, 40],
});

const MapTemplate = (props) => {
  const { stations, center, message } = props;
  const [stationSelected, setstation] = useState(null);
  const [zoom, setzoom] = useState(13);
  const [pointSelected, setpointSelected] = useState({lat:center[0], lon: center[1]});
  const [state, setState] = React.useState({
    Scala: false,
    Points: false,
    Mapa: false,
  });

  const [date, setDate] = useState(null)

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <React.Fragment>
      {/*Header */}
      <Header />

      {/*Mapa */}
      <div style={{ position: "relative" }}>
  
        <div id="scroll" className="card" style={{position:'absolute', right:10, top:3, zIndex:2, backgroundColor:'white',
            borderRadius:10, width:520, height:"98vh", overflowY:"auto"}}>

          <div className="card-body">
          <h5 className="text-center  mx-3">
                Conozca la radiación solar en el Área Metropolitana de Bucaramanga
          </h5>

          {stationSelected && (
             <MyPopup object={stationSelected} date={props.date} potencial={props.potencial}/>
          )}

          {pointSelected !=null  && Polygon.inPolygon(new Point(pointSelected.lon, pointSelected.lat)) !== 0 ? (
            <MyPopup object={pointSelected} date={props.date}/>
          ):
          <Alert severity="info">
            No es posible mostrar información de radiación solar fuera del Área Metropolitana de Bucaramanga
          </Alert>}



          <div className="mx-3 mt-2">
            {/*Date Picker */}
            <Picker  onChange={(newDate) => props.changeDate(newDate)} />
            <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          checked={state.Scala}
                          onChange={handleChange}
                          name="Scala"
                        />
                      }
                      label="Mostrar escala de tiempo"
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
        {message !== "" && (
          <div style={{ textAlign: "center" }}>
            <Progress message={message} />
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
          onzoomend={(e) => setzoom(e.target._zoom)}
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
                  onclick={() => {
                    setstation(estation)
                    setpointSelected(null)
                  }}
                />
                <Circle
                  center={[estation.lat, estation.lon]}
                  color="red"
                  fillColor="#f03"
                  fillOpacity={0.5}
                  radius={500}
                />
              </React.Fragment>
             
            ))}
          
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
        <Slider />}
      </div>

      {/*Analisis*/}
      <div id="potencial">
        <Analisis />
      </div>

      {/*Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default MapTemplate;
