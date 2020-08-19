import React from 'react';
import MapTemplate from './map.template'
import Message from '../message/message'
import estacionService from '../../services/estacion.service'
import potencialService from '../../services/potencial.service'

export default class Map extends React.Component {

    constructor(props){
        super(props)
        this._center = [7.079748142697787,   -73.05427551269533]

        this.state = {
            stations:[],
            message:'',
            openMessage:false,
            messageType:'info',
            messageForSnackbar:'',
            currentDate : '2016-08-17',
            currentDateEnd : '2016-09-17',
            typeScale:'dia',
            potencial:[],
            isRequest:false,
            efficiencyPercentage:0.17
        }

        this.getEstaciones = this.getEstaciones.bind(this)
    }

   componentDidMount(){
       this.getEstaciones()
       this.getPotencial()
   }

   changeEfficiencyPercentage(efficiencyPercentage){
        this.setState({efficiencyPercentage:(parseFloat(efficiencyPercentage)/100)})
   }

   async changeDate(newDate, isRangeDate){
        await this.setState({currentDate:estacionService.formatDate(newDate)})
        if(!isRangeDate){
            this.getPotencial()
        }
   }

   async changeDateEnd(newDate){
        await this.setState({currentDateEnd:estacionService.formatDate(newDate)})
    
   }

   async changeTypeScale(type){
        await this.setState({typeScale:type})
        this.getPotencialByDateRange()
    }


   getPotencial(){
    this.showProgress('Consultando datos')
    potencialService.getPotenciaByDate(this.state.currentDate)
    .then(res => {
        this.setState({potencial:res.data.data})
        this.hideProgress();
    })
    .catch(err => { 
        this.hideProgress(); 
        this.openMessage();
        this.setState({messageType:'error', messageForSnackbar:'Lo sentimos ocurrio un error al calcular el potencial'})
        })
    }

    getPotencialByDateRange(){
        this.showProgress('Calculando potencial')
        potencialService.getPotencialByDateRange(this.state.currentDate, this.state.currentDateEnd, this.state.typeScale)
        .then(res => {
            console.log(res.data.data);
            this.setState({potencial:res.data.data})
            this.hideProgress();
        })
        .catch(err => { 
            this.hideProgress(); this.openMessage();
            this.setState({messageType:'error', messageForSnackbar:'Lo sentimos ocurrio un error al calcular el potencial'})
        })
    }

   getEstaciones(){
    this.showProgress('Consultando estaciones')
    estacionService.getEstaciones()
    .then(res => {this.setState({stations:res.data}); this.hideProgress()})
    .catch(err => { this.hideProgress(); this.openMessage();
    this.setState({messageType:'error', messageForSnackbar:'Lo sentimos ocurrio un error al cargar las estaciones'})})
    
   }

   showProgress(message){
    this.setState({message, isRequest:true})
   }

   hideProgress(){
       console.log("OJOO CERRO XD");
       this.setState({message:'', isRequest:false})
   }

   openMessage = () => {
    this.setState({openMessage:true})
  };

   clickCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({openMessage:false})
  };

    render(){
        return (
            <React.Fragment>
                <MapTemplate center={this._center} stations={this.state.stations}
                    message={this.state.message} date={this.state.currentDate} 
                    changeDate={this.changeDate.bind(this)}
                    onChangeDateEnd={this.changeDateEnd.bind(this)}
                    potencial={this.state.potencial}
                    efficiencyPercentage={this.state.efficiencyPercentage}
                    changeEfficiencyPercentage={this.changeEfficiencyPercentage.bind(this)}
                    changeTypeScale={this.changeTypeScale.bind(this)}
                    typeScale={this.state.typeScale}
                    isRequest={this.state.isRequest}/>
                <Message open={this.state.openMessage} handleClose={this.clickCloseMessage.bind(this)}
                    type={this.state.messageType} message={this.state.messageForSnackbar}/>
            </React.Fragment>
        )
    }
}