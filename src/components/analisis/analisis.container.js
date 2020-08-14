import React from 'react'
import AnalisisTemplate from './analisis.template'

export default class Analisis extends React.Component {
    render(){
        return(<AnalisisTemplate changeEfficiencyPercentage={this.props.changeEfficiencyPercentage}/>)
    }
}