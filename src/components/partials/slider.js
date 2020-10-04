import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Radio from '@material-ui/core/Radio';



export default function DiscreteSlider(props) {

  const [selectedValue, setSelectedValue] = React.useState('día');

  const handleChange = (event) => {
    const value = event.target.value
    if (props.validDateRange(value)) {
      props.changeTypeScale(value)
      setSelectedValue(value);
    }

  };

  
  const onChangeCommitted = (event) => {
    props.onChangeDateScale(event.target.value - 1)
  }

  const [dates, setDates] = useState([])

  React.useEffect(() => {
    setDates(props.dateRangesForPotential.sort((a, b) => {
      const dateA = (new Date(a).getTime() / 1000);
      const dateB = (new Date(b).getTime() / 1000);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }

      return 0;
    }))
    return () => {

    }
  }, [selectedValue, props.isRequest, props.currentDateRange, props.dateRangesForPotential])

  return (
    <div
      style={{ position: "absolute", bottom: 5, zIndex: 2, width: 800, overflowX: "auto" }}
      className="container-fluid"
    >

      <div className="card-body" style={{ backgroundColor: 'white', height: 100, width: 450, zIndex: 3 }}>
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
      </div>
      <div className="card" style={{ height: 90 }}>
        <div className="card-body">
          <input disabled={props.isRequest} type="range" class="custom-range" min="1"
            max={props.dateRangesForPotential.length >= 2 ? props.dateRangesForPotential.length : 1}
            step="1" id="customRange3"
            onChange={onChangeCommitted}/>
          <div className="d-flex justify-content-between">
            <div class="p-2">{dates[0]}</div>
            {props.currentDateRange != "" &&
              <div>
                <strong>Observando</strong>: {props.currentDateRange}
              </div>
            }
            <div class="p-2">{dates[props.dateRangesForPotential.length - 1]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
