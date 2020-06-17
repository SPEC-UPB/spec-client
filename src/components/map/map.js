import React from 'react';
import MapTemplate from './map.template'
import Message from '../message/message'
import estacionService from '../../services/estacion.service'


export default class Map extends React.Component {

    constructor(props){
        super(props)
        this._center = [7.105771890547, -73.123729965916]

        this.state = {
            stations:[],
            message:'',
            openMessage:false,
            messageType:'info',
            messageForSnackbar:''
        }

        this.getEstaciones = this.getEstaciones.bind(this)
    }

   componentDidMount(){
       this.getEstaciones()
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
                    message={this.state.message}/>
                <Message open={this.state.openMessage} handleClose={this.clickCloseMessage.bind(this)}
                    type={this.state.messageType} message={this.state.messageForSnackbar}/>
            </React.Fragment>
        )
    }
}