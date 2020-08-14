import React from 'react'
import PopupTemplate from './popup.template'
import estacionService from '../../services/estacion.service'
import Message from '../message/message'

export default class Popup extends React.Component {

   

    constructor(props){
        super(props)
        this.state = {
            message:'',
            openMessage:false,
            messageType:'info',
            messageForSnackbar:''
        }
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
    

    getRadiation(station){
       return estacionService.getRadiacionByDate(station, this.props.date)
    }

    showError(msg){
        this.setState({messageType:'error', messageForSnackbar:msg})
    }

    render(){
        return (
            <React.Fragment>
                <PopupTemplate showError={this.showError.bind(this)} object={this.props.object} getRadiation={this.getRadiation.bind(this)} 
                    date={this.props.date} potencial={this.props.potencial}
                    efficiencyPercentage={this.props.efficiencyPercentage}/>
                <Message open={this.state.openMessage} handleClose={this.clickCloseMessage.bind(this)}
                    type={this.state.messageType} message={this.state.messageForSnackbar}/>
            </React.Fragment>
        )
    }
}