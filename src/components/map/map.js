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
            potencial:[],
            efficiencyPercentage:0.17
        }

        this.getEstaciones = this.getEstaciones.bind(this)
    }

   componentDidMount(){
       this.getEstaciones()
       this.getPotencial()
   }

   changeEfficiencyPercentage(efficiencyPercentage){
        this.setState({efficiencyPercentage:parseFloat(efficiencyPercentage)/100})
   }

   changeDate(newDate){
    this.setState({currentDate:estacionService.formatDate(newDate)})
    this.getPotencial()
   }

   getPotencial(){

    // potencialService.getPotencial()
    // .then(res => {
    //     console.log(res.data.data);
    //     this.setState({potencial:res.data.data})
    // })
    // .catch(err => this.setState({messageType:'error', messageForSnackbar:'Lo sentimos ocurrio un error al obtener el potencial'}))

    potencialService.getPotenciaByDate(this.state.currentDate)
    .then(res => {
        console.log(res.data.data);
        this.setState({potencial:res.data.data})
    })
    .catch(err => this.setState({messageType:'error', messageForSnackbar:'Lo sentimos ocurrio un error al obtener el potencial'}))
   
}

   getEstaciones(){
    this.showProgress('Cargando estaciones')
    estacionService.getEstaciones()
    .then(res => {this.setState({stations:res.data}); this.hideProgress()})
    .catch(err => {console.error(err); this.hideProgress(); this.openMessage();
    this.setState({messageType:'error', messageForSnackbar:'Lo sentimos ocurrio un error al cargar las estaciones'})})
    
   }

   showProgress(message){
    this.setState({message})
   }

   hideProgress(){
       this.setState({message:''})
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
                    potencial={this.state.potencial}
                    efficiencyPercentage={this.state.efficiencyPercentage}
                    changeEfficiencyPercentage={this.changeEfficiencyPercentage.bind(this)}/>
                <Message open={this.state.openMessage} handleClose={this.clickCloseMessage.bind(this)}
                    type={this.state.messageType} message={this.state.messageForSnackbar}/>
            </React.Fragment>
        )
    }
}