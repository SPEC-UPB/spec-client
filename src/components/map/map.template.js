import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import SANTANDER_POLYGON from "./Santander.geo.json";
import COLOMBIA_POLYGON from "./Colombia.geo.json";
import Progress from "../progress/progress";
import Footer from "../partials/footer";
import Analisis from "../analisis/analisis.container";
import Slider from "../partials/slider";
import Picker from "../partials/picker";
import Header from "../partials/header";
import MyPopup from "../popup/popup.container";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {polygon as Polygon, Point} from './Polygon'


const icon = new Icon({
  iconUrl: process.env.PUBLIC_URL + "/icons/svg/002-solar-energy.svg",
  iconSize: [40, 40],
});

const MapTemplate = (props) => {
  const { stations, center, message } = props;
  const [stationSelected, setstation] = useState(null);
  const [zoom, setzoom] = useState(8);
  const [pointSelected, setpointSelected] = useState(null);
  const [state, setState] = React.useState({
    Scala: false,
    Points: true,
    Mapa: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <React.Fragment>
      {/*Header */}
      <Header />

      {/*Mapa */}
      <div style={{ position: "relative" }}>
        {/*Switches */}
        <div className="card-body" style={{position:'absolute', right:10, top:20, zIndex:2, backgroundColor:'white',  width:350}}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Opciones</FormLabel>
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
                    checked={state.Points}
                    onChange={handleChange}
                    name="Points"
                  />
                }
                label="Mostrar puntos interpolados"
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

        {/*Interpolación */}
        <div
          className="card "
          style={{
            position: "absolute",
            top: 10,
            zIndex: 2,
            backgroundColor: "white",
            left: 10,
            width: 350,
          }}
        >
          <div className="card-body">
            <h5 className="text-center text-muted">
            Conozca la radiación solar en el Área Metropolitana de Bucaramanga
            </h5>
            {/*Date Picker */}
            <Picker />
            {state.Mapa && 
            <div className="text-center">
            <img
              width={300}
              height={300}
              src="https://www.globalweatherclimatecenter.com/uploads/7/0/9/4/70941227/daneeja-rainfall-1_orig.png"
              class="img-fluid"
              alt="interpolación del día"
            />
          </div>}
          </div>
        </div>

        {/*Progress */}
        {message !== "" && (
          <div style={{ textAlign: "center" }}>
            <Progress message={message} />
          </div>
        )}

        <Map
          style={{ zIndex: 1 }}
          onclick={(e) =>
            setpointSelected({ lat: e.latlng.lat, lon: e.latlng.lng })
          }
          center={center}
          zoom={8}
          onzoomend={(e) => setzoom(e.target._zoom)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {zoom >= 8 &&
            stations.map((estation, index) => (
              <Marker
                key={index}
                position={[estation.lat, estation.lon]}
                icon={icon}
                onclick={() => setstation(estation)}
              />
            ))}

          {stationSelected && (
            <Popup
              maxWidth={500}
              position={[stationSelected.lat, stationSelected.lon]}
              onClose={() =>setstation(null)}
            >
              <MyPopup object={stationSelected} />
            </Popup>
          )}

            <Popup
              maxWidth={500}
              position={center}
            >
              <div style={{width:200}}>
                <p className="text-center">
                  Haz click sobre el mapa para conocer el potencial
                  electrico en un punto!
                </p>
              </div>
            </Popup>


          {pointSelected && Polygon.inPolygon(new Point(pointSelected.lon, pointSelected.lat)) !== 0 && (
            <Popup
              maxWidth={500}
              position={[pointSelected.lat, pointSelected.lon]}
              onClose={() => setpointSelected(null)}
            >
              <MyPopup object={pointSelected} />
            </Popup>
          )}

          <GeoJSON
            data={COLOMBIA_POLYGON}
            color="#fed330"
            opacity={zoom <= 10 ? 0.2 : 0}
            fillOpacity={zoom <= 10 ? 0.2 : 0}
          />
          {zoom <= 10 && (
            <GeoJSON
              data={SANTANDER_POLYGON}
              style={{
                fillColor: "#26de81",
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
      <Analisis />

      {/*Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default MapTemplate;
