import React from "react";
import Slider from "@material-ui/core/Slider";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


export default function DiscreteSlider(props) {

  const [selectedValue, setSelectedValue] = React.useState('día');

  const handleChange = (event) => {
    const value = event.target.value
    if(props.validDateRange(value)){
      props.changeTypeScale(value)
      setSelectedValue(value);
    }
    
  };

  const onChangeCommitted = (event, index) =>{
      props.onChangeDateScale(index)
  }

  React.useState(() => {
    console.log(props.isRequest);
    return () => {

    }
  })

  return (
    <div
      style={{ position: "absolute", bottom: 5, zIndex: 2 , width:800, overflowX:"auto"}}
      className="container-fluid"
    >
     
      <div className="card-body" style={{backgroundColor:'white', height:130, width:450, zIndex:3}}>
        <h6 className="text-muted text-center">Deslice para ver el cambio en el tiempo</h6>
        <div className="row">
          <div className="col">
            <Radio
              disabled={props.isRequest}
              color="primary"
              checked={selectedValue === 'día'}
              onChange={handleChange}
              value="día"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            /> Por día
          </div>
          <div className="col">
            <Radio
              disabled={props.isRequest}
              color="primary"
              checked={selectedValue === 'mes'}
              onChange={handleChange}
              value="mes"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            /> Por mes
          </div>
          <div className="col">
            <Radio
              disabled={props.isRequest}
              color="primary"
              checked={selectedValue === 'año'}
              onChange={handleChange}
              value="año"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            /> Por año
          </div>
      </div>
      {props.currentDateRange != "" &&
      <div class="row center-xs">
          <div class="col-xs-6">
              <div class="box">
                <h6 className="text-muted">Fecha: {props.currentDateRange}</h6>
              </div>
          </div>
      </div>
      }
      </div>
      <div className="card" style={{height:70}}>
        <div className="card-body">
           <Slider
            disabled={props.isRequest}
            valueLabelDisplay="f"
            style={{ color: "#f1c40f"}}
            defaultValue={1}
            valueLabelDisplay="on"
            step={1}
            min={1}
            max={selectedValue == "día" ? 31 : selectedValue == "mes" ? 12 : 10}
            onChangeCommitted={onChangeCommitted}
          />
        </div>
      </div>
    </div>
  );
}
