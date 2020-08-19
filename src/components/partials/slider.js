import React from "react";
import Slider from "@material-ui/core/Slider";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  ,
  {
    value: 5,
    label: "5",
  }
  ,
  {
    value: 6,
    label: "6",
  }
  ,
  {
    value: 7,
    label: "7",
  }
  ,
  {
    value: 8,
    label: "8",
  }
  ,
  {
    value: 9,
    label: "9",
  }
  ,
  {
    value: 10,
    label: "10",
  }
  ,
  {
    value: 11,
    label: "11",
  }
  ,
  {
    value: 12,
    label: "12",
  }
  ,
  {
    value: 13,
    label: "13",
  }
  ,
  {
    value: 14,
    label: "14",
  }
  ,
  {
    value: 15,
    label: "15",
  }
  ,
  {
    value: 16,
    label: "16",
  }
  ,
  {
    value: 17,
    label: "17",
  }
  ,
  {
    value: 18,
    label: "18",
  }
  ,
  {
    value: 19,
    label: "19",
  }
  ,
  {
    value: 20,
    label: "20",
  }
  ,
  {
    value: 21,
    label: "21",
  }
  ,
  {
    value: 22,
    label: "22",
  }
  ,
  {
    value: 23,
    label: "23",
  }

];

function valuetext(value) {
  return  value;
}

export default function DiscreteSlider(props) {

  const [selectedValue, setSelectedValue] = React.useState('dia');

  const handleChange = (event) => {
    const value = event.target.value
    props.changeTypeScale(value)
    setSelectedValue(value);
  };

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
     
      <div className="card-body" style={{backgroundColor:'white', height:100, width:450, zIndex:3}}>
        <h6 className="text-muted text-center">Deslice para ver el cambio en el tiempo</h6>
        <div className="row">
          <div className="col">
            <Radio
              disabled={props.isRequest}
              color="primary"
              checked={selectedValue === 'dia'}
              onChange={handleChange}
              value="dia"
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
      <div className="card" style={{height:70}}>
        <div className="card-body">
          <Slider
            style={{ color: "#f1c40f"}}
            defaultValue={0}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={0}
            max={23}
            valueLabelDisplay="on"
          />
        </div>
      </div>
    </div>
  );
}
