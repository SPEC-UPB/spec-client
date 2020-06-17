import React from 'react'
import PopupTemplate from './popup.station.template'

export default class Popup extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            station:props.station
        }
    }

    render(){
        return (<PopupTemplate station={this.props.station}/>)
    }
}