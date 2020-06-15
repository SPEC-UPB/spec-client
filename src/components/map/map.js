import React from 'react';
import MapTemplate from './map.template'

export default class Map extends React.Component {

    constructor(props){
        super(props)
        this._center = [7.105771890547, -73.123729965916]

        this.state = {
            stations:[]
        }
    }

   componentDidMount(){
       this.setState({stations:[{nombre:'Ciudadela', lat:7.105771890547, lon:-73.123729965916, municipio:'Bucaramanga', provedor:'CDMB'},
       {nombre:'Centro', lat:7.119262078089, lon:-73.127154006918, municipio:'Bucaramanga', provedor:'CDMB'}]})
   }

    render(){
        return (<MapTemplate center={this._center} stations={this.state.stations}/>)
    }
}