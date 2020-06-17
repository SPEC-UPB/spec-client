import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {

  return (
    <div style={{position:'absolute', bottom:50, zIndex:2}} className="container-fluid" >
      <Typography id="discrete-slider" gutterBottom>
        Escala de tiempo
      </Typography>
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
    </div>
  );
}
