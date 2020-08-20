import React from 'react';
import MapTemplate from './map.template'
import Message from '../message/message'
import estacionService from '../../services/estacion.service'
import potencialService from '../../services/potencial.service'

export default class Map extends React.Component {

    constructor(props){
        super(props)
        this._center = [7.079748142697787,   -73.05427551269533]
        this._limitDay = 31
        this._limitMonth = 365 // en días
        this._limitYear = 3651

        this.state = {
            stations:[],
            message:'',
            openMessage:false,
            messageType:'info',
            messageForSnackbar:'',
            currentDate : '2016-08-17',
            currentDateEnd : '2016-08-17',
            typeScale:'día',
            potencial:[],
            potentialForRange:[],
            isRequest:false,
            dateRangesForPotential:[],
            currentDateRange:"",
            efficiencyPercentage:0.17
        }

        this.getEstaciones = this.getEstaciones.bind(this)
    }

    closeScale(){
        console.log("closeScale");
        this.setState({currentDateRange:""})
        this.getPotencial()
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
        if(this.validDateRange()){
            if(!isRangeDate){// si no es para escala de tiempo
                this.getPotencial()
            }else{ // escala de tiempo
                if(new Date(this.state.currentDate) < new Date(this.state.currentDateEnd)){
                    this.getPotencialByDateRange()
                }else{
                    this.openMessage();
                    this.setState({messageType:'info', messageForSnackbar:'El rango de fechas no puede ser negativo'})
                }
            }
        }
   }

   async changeDateEnd(newDate){
        // al cambiar la fecha final si es valida se hace la petición
        await this.setState({currentDateEnd:estacionService.formatDate(newDate)})
        if(this.validDateRange()){
            if(new Date(this.state.currentDate) < new Date(this.state.currentDateEnd)){
                this.getPotencialByDateRange()
            }else{
                this.openMessage();
                this.setState({messageType:'info', messageForSnackbar:'El rango de fechas no puede ser negativo'})
            }
        }
   }

   validDateRange(){
        let isValid = true;
        let start_date = new Date(this.state.currentDate)
        let end_date = new Date(this.state.currentDateEnd)
        const dayResult = 1000 * 60 * 60 * 24

        if(this.state.typeScale == "día"){
            if( ( (end_date - start_date)/dayResult) > this._limitDay){
                isValid = false 
                this.openMessage();
                this.setState({messageType:'info', messageForSnackbar:'Rango de fecha superado, valido maximo 30 días'})
            }
                
        }else if(this.state.typeScale == "mes"){
            if( ( (end_date - start_date)/dayResult) > this._limitMonth){
                isValid = false 
                this.openMessage();
                this.setState({messageType:'info', messageForSnackbar:'Rango de fecha superado, valido maximo 12 meses'})
            }
                
        }else if(this.state.typeScale == "año"){
            if( ( (end_date - start_date)/dayResult) > this._limitYear){
                isValid = false 
                this.openMessage();
                this.setState({messageType:'info', messageForSnackbar:'Rango de fecha superado, valido  maximo 10 años'})
            }
                
        }

        return isValid
   }

   validOptionTypeScale(newType){
        let isValid = true;
        let start_date = new Date(this.state.currentDate)
        let end_date = new Date(this.state.currentDateEnd)
        const dayResult = 1000 * 60 * 60 * 24

        if(newType=="día" &&  this.state.typeScale=="año"){
            if( ( (end_date - start_date)/dayResult) > this._limitDay){
                isValid = false 
                this.openMessage();
                this.setState({messageType:'info', messageForSnackbar:'Corrija el rango de fechas para deslizar por días'})
            }
            
        }

        if(newType=="mes" &&  this.state.typeScale=="año"){
            if( ( (end_date - start_date)/dayResult) > this._limitMonth){
                isValid = false 
                this.openMessage();
                this.setState({messageType:'info', messageForSnackbar:'Corrija el rango de fechas para deslizar por mes'})
            }
            
        }

        if(newType=="día" &&  this.state.typeScale=="mes"){
            if( ( (end_date - start_date)/dayResult) > this._limitDay){
                isValid = false 
                this.openMessage();
                this.setState({messageType:'info', messageForSnackbar:'Corrija el rango de fechas para deslizar por días'})
            }
            
        }

        return isValid
   }

   async changeTypeScale(type){
        await this.setState({typeScale:type})
        this.getPotencialByDateRange()
    }

    async onChangeDateScale(index){
        const date = this.state.potentialForRange[index].fecha
        console.log(date);
        const newPotencial = await this.state.potentialForRange.filter(p => p.fecha == date)
        console.log(newPotencial);
        this.setState({potencial:newPotencial, currentDateRange:date})
    }

   getPotencial(){
    this.showProgress('Consultando datos')
    potencialService.getPotenciaByDate(this.state.currentDate)
    .then(res => {
        console.log(res.data.data)
        this.setState({potencial:res.data.data})
        this.hideProgress();
    })
    .catch(err => { 
        this.hideProgress(); 
        this.openMessage();
        this.setState({messageType:'error', messageForSnackbar:'Lo sentimos ocurrio un error al calcular el potencial'})
        })
    }

    onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    getPotencialByDateRange(){
        this.showProgress('Calculando potencial')
        potencialService.getPotencialByDateRange(this.state.currentDate, this.state.currentDateEnd, this.state.typeScale)
        .then(async res => {
            const dateRangesForPotential = await [...new Set( res.data.data.map(item => item.fecha))]
            console.log(dateRangesForPotential);
            this.setState({potentialForRange:res.data.data, dateRangesForPotential})
            this.hideProgress();
            this.onChangeDateScale(0)
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
                    isRequest={this.state.isRequest}
                    validDateRange={this.validOptionTypeScale.bind(this)}
                    onChangeDateScale={this.onChangeDateScale.bind(this)}
                    currentDateRange={this.state.currentDateRange}
                    closeScale={this.closeScale.bind(this)}/>
                <Message open={this.state.openMessage} handleClose={this.clickCloseMessage.bind(this)}
                    type={this.state.messageType} message={this.state.messageForSnackbar}/>
            </React.Fragment>
        )
    }
}