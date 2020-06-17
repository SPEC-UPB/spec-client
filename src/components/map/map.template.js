import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import SANTANDER_POLYGON from "./santander.geo.json.js";
import COLOMBIA_POLYGON from "./colombia.geo.json";
import Progress from "../progress/progress";
import Footer from "../partials/footer";
import Analisis from "../analisis/analisis.container";
import Slider from "../partials/slider";
import Picker from '../partials/picker'
import Header from '../partials/header'
import PopupStation from '../popup/popup.station.container'

const icon = new Icon({
  iconUrl: process.env.PUBLIC_URL + "/icons/svg/002-solar-energy.svg",
  iconSize: [40, 40],
});

const MapTemplate = (props) => {
  const { stations, center, message } = props;
  const [stationSelected, setstation] = useState(null);
  const [zoom, setzoom] = useState(8);
  const [pointSelected, setpointSelected] = useState(null);

  return (
    <React.Fragment>

      {/*Header */}
      <Header/>

      {/*Mapa */}
      <div style={{position:'relative'}}>

        {/*Progress */}
        {message !== "" && (
          <div style={{ textAlign: "center" }} >
            <Progress message={message} />
          </div>
        )}

        {/*Date Picker */}
        <Picker/>

        <Map style={{zIndex:1}}
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
              maxWidth={650}
              maxHeight={600}
              position={[stationSelected.lat, stationSelected.lon]}
              onClose={() => setstation(null)}
            >
              <PopupStation station={stationSelected}/>
            </Popup>
          )}

          {pointSelected && (
            <Popup
              position={[pointSelected.lat, pointSelected.lon]}
              onClose={() => setpointSelected(null)}
            >
              Lat: {pointSelected.lat} lng: {pointSelected.lon}
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
        <Slider />
      </div>
      
      {/*Analisis*/}
      <Analisis />

      {/*Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default MapTemplate;
