import React from 'react'
import AnalisisTemplate from './analisis.template'

export default class Analisis extends React.Component {
    render(){
        return(<AnalisisTemplate changeEfficiencyPercentage={this.props.changeEfficiencyPercentage} 
            efficiencyPercentage={this.props.efficiencyPercentage}
            currentDateEnd={this.props.currentDateEnd}
            currentDateStart={this.props.currentDateStart}
            scale={this.props.scale}/>)
    }
}