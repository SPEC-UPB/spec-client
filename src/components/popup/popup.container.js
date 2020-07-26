import React from 'react'
import PopupTemplate from './popup.template'
import estacionService from '../../services/estacion.service'

export default class Popup extends React.Component {

   

    constructor(props){
        super(props)
    }

    

    getRadiation(station){
       return estacionService.getRadiacionByDate(station, this.props.date)
    }

    render(){
        return (<PopupTemplate object={this.props.object} getRadiation={this.getRadiation.bind(this)} 
        date={this.props.date} potencial={this.props.potencial}/>)
    }
}