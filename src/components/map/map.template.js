import React, {useState} from 'react';
import {Map, Marker, Popup, TileLayer, GeoJSON} from 'react-leaflet'
import {Icon} from 'leaflet'
import  SANTANDER_POLYGON from './santander.geo.json.js'
import  COLOMBIA_POLYGON from './colombia.geo.json'
import Progress from '../progress/progress'

const icon = new Icon({iconUrl:process.env.PUBLIC_URL + '/icons/svg/002-solar-energy.svg',iconSize:[40, 40]})


const  MapTemplate  =  (props) =>  {

    const {stations, center, message} = props
    const [stationSelected, setstation] = useState(null)
    const [zoom, setzoom] = useState(8)
    const [pointSelected, setpointSelected] = useState(null)
    const [urlVideo, seturlVideo] = useState('')


    return (
    <React.Fragment>

        <button onClick={() => seturlVideo("https://www.youtube.com/embed/5cVpl1WGmJA")} type="button" class="btn btn-info" data-toggle="modal" data-target="#modalYT">Video 1</button>
        <button onClick={() => seturlVideo("https://www.youtube.com/embed/mmDFW8vJw7U")} type="button" class="btn btn-info" data-toggle="modal" data-target="#modalYT">Video 2</button>
        <div class="modal fade" id="modalYT" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-body mb-0 p-0">
                    <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                    <iframe class="embed-responsive-item" src={urlVideo} allowfullscreen></iframe>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <span class="mr-4 text-muted">Tomado de: {urlVideo}</span>
                    <button type="button" class="btn btn-outline-primary btn-rounded btn-md ml-4" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
        
        {message !== '' && 
        <div style={{textAlign:'center'}}>
            <Progress message={message}/>    
        </div>}
        <Map onclick={(e) => setpointSelected({lat:e.latlng.lat, lon:e.latlng.lng})} center={center} zoom={8} onzoomend={(e) => setzoom(e.target._zoom)}>
            <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>

            {zoom >= 8 && stations.map((estation, index) => 
            <Marker 
                key={index} 
                position={[estation.lat, estation.lon]} 
                icon={icon}
                onclick={() => setstation(estation)}/>)}

            {stationSelected && 
            <Popup position={[stationSelected.lat, stationSelected.lon]} onClose={() => setstation(null)}>
                {stationSelected.nombre}
            </Popup>}

            {pointSelected && 
            <Popup position={[pointSelected.lat, pointSelected.lon]} onClose={() => setpointSelected(null)}>
                Lat: {pointSelected.lat} lng: {pointSelected.lon}
            </Popup>}

            <GeoJSON  data={COLOMBIA_POLYGON} color="#fed330" opacity={ zoom <=10 ? 0.2:0} fillOpacity={ zoom <= 10 ? 0.2:0} />
            {zoom <= 10 && 
            <GeoJSON  data={ SANTANDER_POLYGON} style={{fillColor:"#26de81", color:"white",  weight: 2, opacity: 0.5, fillOpacity: 0.5}}/>
            }
        </Map>
        <div className="container my-5">
            <div className="row">
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <img style={{color:'red'}} src="/icons/svg/004-down-arrow.svg" />
                                </div>
                                <div className="col">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <img style={{color:'red'}} src="/icons/svg/004-down-arrow.svg" />
                                </div>
                                <div className="col">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <img style={{color:'red'}} src="/icons/svg/004-down-arrow.svg" />
                                </div>
                                <div className="col">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <img style={{color:'red'}} src="/icons/svg/004-down-arrow.svg" />
                                </div>
                                <div className="col">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </React.Fragment>
    )
}

export default MapTemplate