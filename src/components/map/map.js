import React from 'react';
import MapTemplate from './map.template'
import Message from '../message/message'
import estacionService from '../../services/estacion.service'
import potencialService from '../../services/potencial.service'
import RadiationColor from '../../constants/colors'

export default class Map extends React.Component {

  constructor(props) {
    super(props)
    this._center = [7.079748142697787, -73.05427551269533]
    this._limitDay = 31
    this._limitMonth = 365 // en días
    this._limitYear = 3651

    this.state = {
      stations: [],
      message: '',
      porcentajeAplicadoToBarChart:17,
      openMessage: false,
      messageType: 'info',
      messageForSnackbar: '',
      currentDate: '2010-01-01',
      currentDateEnd: '2010-01-31',
      typeScale: 'día',
      potencial: [],
      potentialForRange: [],
      isRequest: false,
      dateRangesForPotential: [],
      currentDateRange: "",
      efficiencyPercentage: 0.17,
      currentStationName: "",
      scaleIsActive:false,
      index: 0,
      datasets: {
        datasets: [
          {
            label: "Radiación",
            data: []
          }
        ]
      },
      datasetsScale: {
        estation: "",
        datasets: [
          {
            label: "Potencial",
            data: []
          }
        ]
      }
    }

    this.getEstaciones = this.getEstaciones.bind(this)
  }

  async closeScale() {
    if(this.state.typeScale == "mes"){
      await this.setState({efficiencyPercentage:(this.state.efficiencyPercentage*1000)/100, scaleIsActive:false})
    }else if(this.state.typeScale == "año"){
      await this.setState({efficiencyPercentage:(this.state.efficiencyPercentage*10000)/100, scaleIsActive:false})
    }

    await this.setState({ currentDateRange: "", typeScale: "día"})
    this.getPotencial()
    this.getRadiation(this.state.currentStationName)
  }

  openScale(){
    this.setState({scaleIsActive:true})
  }

  componentDidMount() {
    this.getEstaciones()
    this.getPotencial()
    setTimeout(() => {
      console.log("storage->",window.localStorage.getItem("spec-ok"));
     if(!window.localStorage.getItem("spec-ok")){
        window.$('#frameModalBottom').modal({
          show:true,
          backdrop: 'static',
          keyboard: false})
     }
      
    }, 3000);
  }

  changeEfficiencyPercentage(efficiencyPercentage) {
    if(this.state.typeScale == "mes"){
      this.setState({ efficiencyPercentage: (parseFloat(efficiencyPercentage) / 1000) })
    }else if(this.state.typeScale == "año"){
      this.setState({ efficiencyPercentage: (parseFloat(efficiencyPercentage) / 10000) })
    }else if(this.state.typeScale == "día"){
      this.setState({ efficiencyPercentage: (parseFloat(efficiencyPercentage) / 100) })
    }
    this.setDatasetToBarChart()

  }

  async changeDate(newDate, isRangeDate) {
    await this.setState({ currentDate: estacionService.formatDate(newDate) })
    if(this.state.scaleIsActive){
      if (this.validDateRange()) {
        this.getRadiation(this.state.currentStationName)
        if (!isRangeDate) {// si no es para escala de tiempo
          this.getPotencial()
        } else { // escala de tiempo
          if (new Date(this.state.currentDate) < new Date(this.state.currentDateEnd)) {
            this.getPotencialByDateRange()
          } else {
            this.openMessage();
            this.setState({ messageType: 'info', messageForSnackbar: 'El rango de fechas no puede ser negativo' })
          }
        }
      }
    }else{
      this.getRadiation(this.state.currentStationName)
        if (!isRangeDate) {// si no es para escala de tiempo
          this.getPotencial()
        } else { // escala de tiempo
          if (new Date(this.state.currentDate) < new Date(this.state.currentDateEnd)) {
            this.getPotencialByDateRange()
          } else {
            this.openMessage();
            this.setState({ messageType: 'info', messageForSnackbar: 'El rango de fechas no puede ser negativo' })
          }
        }
    }
    
  }

  async changeDateEnd(newDate) {
    // al cambiar la fecha final si es valida se hace la petición
    await this.setState({ currentDateEnd: estacionService.formatDate(newDate) })
    if (this.validDateRange()) {
      if (new Date(this.state.currentDate) < new Date(this.state.currentDateEnd)) {
        this.getPotencialByDateRange()
      } else {
        this.openMessage();
        this.setState({ messageType: 'info', messageForSnackbar: 'El rango de fechas no puede ser negativo' })
      }
    }
  }



  validDateRange() {
    let isValid = true;
    let start_date = new Date(this.state.currentDate)
    let end_date = new Date(this.state.currentDateEnd)
    const dayResult = 1000 * 60 * 60 * 24

    if (this.state.typeScale == "día") {
      if (((end_date - start_date) / dayResult) > this._limitDay && this.state.currentDateRange != "") {
        isValid = false
        this.openMessage();
        this.setState({ messageType: 'info', messageForSnackbar: 'Rango de fecha superado, valido maximo 30 días' })
      }

    } else if (this.state.typeScale == "mes") {
      if (((end_date - start_date) / dayResult) > this._limitMonth && this.state.currentDateRange != "") {
        isValid = false
        this.openMessage();
        this.setState({ messageType: 'info', messageForSnackbar: 'Rango de fecha superado, valido maximo 12 meses' })
      }

    } else if (this.state.typeScale == "año") {
      if (((end_date - start_date) / dayResult) > this._limitYear && this.state.currentDateRange != "") {
        isValid = false
        this.openMessage();
        this.setState({ messageType: 'info', messageForSnackbar: 'Rango de fecha superado, valido  maximo 10 años' })
      }

    }

    return isValid
  }

  validOptionTypeScale(newType) {
    let isValid = true;
    let start_date = new Date(this.state.currentDate)
    let end_date = new Date(this.state.currentDateEnd)
    const dayResult = 1000 * 60 * 60 * 24

    if (newType == "día" && this.state.typeScale == "año") {
      if (((end_date - start_date) / dayResult) > this._limitDay) {
        isValid = false
        this.openMessage();
        this.setState({ messageType: 'info', messageForSnackbar: 'Corrija el rango de fechas para deslizar por días' })
      }

    }

    if (newType == "mes" && this.state.typeScale == "año") {
      if (((end_date - start_date) / dayResult) > this._limitMonth) {
        isValid = false
        this.openMessage();
        this.setState({ messageType: 'info', messageForSnackbar: 'Corrija el rango de fechas para deslizar por mes' })
      }

    }

    if (newType == "día" && this.state.typeScale == "mes") {
      if (((end_date - start_date) / dayResult) > this._limitDay) {
        isValid = false
        this.openMessage();
        this.setState({ messageType: 'info', messageForSnackbar: 'Corrija el rango de fechas para deslizar por días' })
      }

    }

    return isValid
  }

  async changeTypeScale(type) {
    if(!this.state.isRequest){
      if(this.state.typeScale == "día" && type == "mes"){
        await this.setState({efficiencyPercentage:((this.state.efficiencyPercentage*100)/1000)})
      }else if(this.state.typeScale == "día" && type == "año"){
        await this.setState({efficiencyPercentage:((this.state.efficiencyPercentage*100)/10000)})
      } else if(this.state.typeScale == "mes" && type == "año"){
        await this.setState({efficiencyPercentage:((this.state.efficiencyPercentage*1000)/10000)})
      }else if(this.state.typeScale == "mes" && type == "día"){
        await this.setState({efficiencyPercentage:((this.state.efficiencyPercentage*1000)/100)})
      }else if(this.state.typeScale == "año" && type == "mes"){
        await this.setState({efficiencyPercentage:((this.state.efficiencyPercentage*10000)/1000)})
      }else if(this.state.typeScale == "año" && type == "día"){
        await this.setState({efficiencyPercentage:((this.state.efficiencyPercentage*10000)/100)})
      }
      await this.setState({ typeScale: type})
      await this.getPotencialByDateRange()
    }
  }


  calcularSizePoint = () => {
    const stattionName = this.state.currentStationName
    if (stattionName) {
      if (stattionName != 'Paralela Bosque' && stattionName != 'UPB - Piedecuesta') {
        return 3
      }
      return 1;
    }
  }

  getRadiation(station) {
    return estacionService.getRadiacionByDate(station, this.state.currentDate)
      .then(async res => {
        let data = res.data.map(r => {
          return {
            x: parseFloat(new Date(r.fecha).getHours() + (new Date(r.fecha).getMinutes() / 60) + (new Date(r.fecha).getSeconds() / 3600)),
            y: r.radiacion
          }
        })

        await data.sort((firstEl, secondEl) => {
          if (firstEl.x < secondEl.x)
            return -1;
          if (firstEl.x > secondEl.x)
            return 1;
          return 0;
        });

        await this.setState({
          datasets: {
            datasets: [
              {
                label: "Radiación",
                data,
                pointRadius: this.calcularSizePoint(),
                backgroundColor: function (context) {
                  let index = context.dataIndex;
                  let value = context.dataset.data[index];
                  let color = "#f5f6fa"
                  if (value) {
                    if (value.y < RadiationColor.lowRadiationValue)
                      color = RadiationColor.lowRadiationColor
                    else if (value.y >= RadiationColor.lowRadiationValue && value.y <= RadiationColor.mediaRadiationValue)
                      color = RadiationColor.mediaRadiationColor
                    else if (value.y >= RadiationColor.mediaRadiationValue && value.y <= RadiationColor.hightRadiationValue)
                      color = RadiationColor.hightRadiationColor
                    else if(value.y >= RadiationColor.hightRadiationValue && value.y <= RadiationColor.veryHightPotentialValue)
                      color = RadiationColor.veryHightRadiationColor
                  }
                  return color

                }
              }
            ]
          }
        })

      })
      .catch(err => {
        this.hideProgress();
        this.openMessage();
        if (this.state.currentStationName != "") {
          this.setState({ messageType: 'error', messageForSnackbar: 'Lo sentimos ocurrio un error al calcular la radiación' })
        } else {
          this.setState({ messageType: 'info', messageForSnackbar: 'Para calcular la radiación seleccione un punto o estación' })
        }
      })
  }

  async setCurrentStationName(name) {
    await this.setState({ currentStationName: name })
    if(this.state.typeScale == "día"){
      this.getRadiation(name)
    }
    
    if(this.state.typeScale != "día" && this.state.scaleIsActive){
      this.setDatasetToBarChart()
    }
  }

  async setCurrentPoint(point) {
    
  }

  async updateUIwithScale() {
    const typeScale = await this.state.typeScale
    const date = await this.state.dateRangesForPotential[this.state.index]

    if (typeScale == "día") {
      const newPotencial = await this.state.potentialForRange.filter(p => p.fecha == date)
      await this.setState({ potencial: newPotencial, currentDateRange: date })
      await this.setState({ currentDate: date })
      this.getRadiation(this.state.currentStationName)
      this.getPotencial()
    }else {
      this.setDatasetToBarChart()
    }
  }

  async setDatasetToBarChart() {
    let potencialPorEscala = await this.state.potentialForRange
    
    if (potencialPorEscala.length > 0) {
      const date = await this.state.dateRangesForPotential[this.state.index]
      const potecialPorTipo = await potencialPorEscala.filter(p => p.fecha == date)
      const potencialPorEstacion = await potencialPorEscala.filter(p => p.estacion == this.state.currentStationName)
      console.log(potencialPorEscala);

      //potencial para ese mes
      await this.setState({ potencial: potecialPorTipo, currentDateRange: date })
      const labels = this.state.dateRangesForPotential
      let porcentajePorAplicar = 17;
      if(this.state.typeScale == "día" ){
        porcentajePorAplicar = this.state.efficiencyPercentage
      }else if(this.state.typeScale == "mes" ){
        porcentajePorAplicar = (this.state.efficiencyPercentage*1000)/100
      }else if(this.state.typeScale == "año" ){
        porcentajePorAplicar = (this.state.efficiencyPercentage*10000)/100
      }
      this.setState({porcentajeAplicadoToBarChart:porcentajePorAplicar})

      // await potencialPorEstacion.sort((a,b) =>{
      //   const dateA = (new Date(a.fecha).getTime()/1000);
      //   const dateB = (new Date(b.fecha).getTime()/1000);
      //   if (dateA < dateB) {
      //     return -1;
      //   }
      //   if (dateA > dateB) {
      //     return 1;
      //   }

      //   return 0 ;
      // })
      // await labels.sort((a,b) =>{
      //   const dateA = (new Date(a).getTime()/1000);
      //   const dateB = (new Date(b).getTime()/1000);
      //   if (dateA < dateB) {
      //     return -1;
      //   }
      //   if (dateA > dateB) {
      //     return 1;
      //   }

      //   return 0 ;
      // })
    
      const type = this.state.typeScale
      const data = await potencialPorEstacion.map((p => (p.radiacion / 1000)*porcentajePorAplicar))
      this.setState({
        datasetsScale: {
          labels,
          datasets: [
            {
              label: "Potencial por " + this.state.typeScale + " (kw/m^2)",
              data,
              backgroundColor: function (context) {
                let index = context.dataIndex;
                let value = context.dataset.data[index];
                let color = ""

                // en watts sin aplicar el porcentaje de eficiencia
                if( type == "mes"){
                  if (value) {
                    console.log("Value",((value/porcentajePorAplicar)*1000) );
                    if (((value/porcentajePorAplicar)*1000) < RadiationColor.lowPotentialValueMonth){
                      console.log("2");
                      color = RadiationColor.lowRadiationColor
                    }
                    else if (((value/porcentajePorAplicar)*1000) >= RadiationColor.lowPotentialValueMonth && ((value/porcentajePorAplicar)*1000) <= RadiationColor.mediaPotentialValueMonth){
                      color = RadiationColor.mediaRadiationColor
                      console.log("3");
                    }
                     
                    else if (((value/porcentajePorAplicar)*1000) >= RadiationColor.mediaPotentialValueMonth && ((value/porcentajePorAplicar)*1000) <= RadiationColor.hightPotentialValueMonth){
                      color = RadiationColor.hightRadiationColor
                      console.log("4");
                    }
                    else if( ((value/porcentajePorAplicar)*1000) >= RadiationColor.veryHightPotentialValueMonth){
                      color = RadiationColor.veryHightRadiationColor
                      console.log("5");
                    }
                  }
                } else if(type == "año"){
                  if (value) {
                    if (((value/porcentajePorAplicar)*1000) < RadiationColor.lowPotentialValueYear)
                      color = RadiationColor.lowRadiationColor
                    else if (((value/porcentajePorAplicar)*1000) >= RadiationColor.lowPotentialValueYear && ((value/porcentajePorAplicar)*1000) <= RadiationColor.mediaPotentialValueYear)
                      color = RadiationColor.mediaRadiationColor
                    else if (((value/porcentajePorAplicar)*1000) >= RadiationColor.mediaPotentialValueYear && ((value/porcentajePorAplicar)*1000) <= RadiationColor.hightPotentialValueYear)
                      color = RadiationColor.hightRadiationColor
                    else if(((value/porcentajePorAplicar)*1000) >= RadiationColor.veryHightPotentialValueYear)
                      color = RadiationColor.veryHightRadiationColor
                  }
                }
                console.log("Color", color);
                return color

              }
            }
          ]
        }
      })
    }
  }

  async onChangeDateScale(index) {
    await this.setState({ index })
    this.updateUIwithScale()
  }



  getPotencial() {
    this.showProgress('Consultando datos')
    potencialService.getPotenciaByDate(this.state.currentDate)
      .then(res => {
        this.setState({ potencial: res.data.data })
        this.hideProgress();
      })
      .catch(err => {
        this.hideProgress();
        this.openMessage();
        this.setState({ messageType: 'error', messageForSnackbar: 'Lo sentimos ocurrio un error al calcular el potencial' })
      })
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getPotencialByDateRange() {
    if(!this.state.isRequest) {
      this.setState({isRequest:true})
      this.showProgress('Calculando potencial')
      potencialService.getPotencialByDateRange(this.state.currentDate, this.state.currentDateEnd, this.state.typeScale)
        .then(async res => {
          const dateRangesForPotentialNoUnique = await res.data.data.map(item => item.fecha)
          const dateRangesForPotential = await dateRangesForPotentialNoUnique.filter((value, index, self)=> self.indexOf(value) == index)
          await this.setState({ potentialForRange: res.data.data, dateRangesForPotential, currentDateRange: "" })
          console.log(res.data.data);
          this.hideProgress();
          this.onChangeDateScale(0)
          this.setState({isRequest:false})
        })
        .catch(err => {
          this.setState({isRequest:false})
          this.hideProgress(); this.openMessage();
          this.setState({ messageType: 'error', messageForSnackbar: 'Lo sentimos ocurrio un error al calcular el potencial' })
        })
    }
  }

  getEstaciones() {
    this.showProgress('Consultando estaciones')
    estacionService.getEstaciones()
      .then(res => { this.setState({ stations: res.data }); this.hideProgress() })
      .catch(err => {
        this.hideProgress(); this.openMessage();
        this.setState({ messageType: 'error', messageForSnackbar: 'Lo sentimos ocurrio un error al cargar las estaciones' })
      })

  }

  showProgress(message) {
    this.setState({ message, isRequest: true })
  }

  hideProgress() {
    this.setState({ message: '', isRequest: false })
  }

  openMessage = () => {
    this.setState({ openMessage: true })
  };

  clickCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openMessage: false })
  };

  showMessage(message) {
    this.openMessage();
    this.setState({ messageType: 'info', messageForSnackbar: message })
  }

  render() {
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
          closeScale={this.closeScale.bind(this)}
          openScale={this.openScale.bind(this)}
          dateRangesForPotential={this.state.dateRangesForPotential}
          getRadiation={this.getRadiation.bind(this)}
          setCurrentStationName={this.setCurrentStationName.bind(this)}
          datasets={this.state.datasets}
          datasetsScale={this.state.datasetsScale}
          showMessage={this.showMessage.bind(this)}
          currentStationName={this.state.currentStationName}
          currentDateEnd={this.state.currentDateEnd}
          updateUIwithScale={this.updateUIwithScale.bind(this)}
          porcentajeAplicadoToBarChart={this.state.porcentajeAplicadoToBarChart} />
        <Message open={this.state.openMessage} handleClose={this.clickCloseMessage.bind(this)}
          type={this.state.messageType} message={this.state.messageForSnackbar} />
      </React.Fragment>
    )
  }
}