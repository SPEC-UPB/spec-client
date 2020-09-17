import React from 'react'
import AnalisisTemplate from './analisis.template'

export default class Analisis extends React.Component {
    render(){
        return(<AnalisisTemplate changeEfficiencyPercentage={this.props.changeEfficiencyPercentage}
            porcentajeAplicadoToBarChart = {this.props.porcentajeAplicadoToBarChart}
            currentDateEnd={this.props.currentDateEnd}
            currentDateStart={this.props.currentDateStart}
            potencial={this.props.potencial}
            object={this.props.object}
            scale={this.props.scale}
            data={this.props.data}
            typeScale={this.props.typeScale}/>)
    }
}