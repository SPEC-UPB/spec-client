import React from 'react';
import MapTemplate from './map.template'
import Message from '../message/message'
import estacionService from '../../services/estacion.service'
import potencialService from '../../services/potencial.service'

export default class Map extends React.Component {

    constructor(props){
        super(props)
        this._center = [6.767579526961214 , -73.48754882812501]

        this.state = {
            stations:[],
            message:'',
            openMessage:false,
            messageType:'info',
            messageForSnackbar:'',
            currentDate : new Date('2016-08-18'),
            potencial:[]
        }

        this.getEstaciones = this.getEstaciones.bind(this)
    }

   componentDidMount(){
       this.getEstaciones()
       this.getPotencial()
   }

   changeDate(newDate){
    this.setState({currentDate:newDate})
    this.getPotencial()
   }

   getPotencial(){
    potencialService.getPotencial(this.state.currentDate)
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
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
                    potencial={this.state.potencial}/>
                <Message open={this.state.openMessage} handleClose={this.clickCloseMessage.bind(this)}
                    type={this.state.messageType} message={this.state.messageForSnackbar}/>
            </React.Fragment>
        )
    }
}