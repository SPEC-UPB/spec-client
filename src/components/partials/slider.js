import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const marks = [
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
  ,
  {
    value: 24,
    label: "24",
  }
  ,
  {
    value: 25,
    label: "25",
  }
  ,
  {
    value: 26,
    label: "26",
  }
  ,
  {
    value: 27,
    label: "27",
  }
  ,
  {
    value: 28,
    label: "28",
  }
  ,
  {
    value: 29,
    label: "29",
  }
  ,
  {
    value: 30,
    label: "30",
  }
];

function valuetext(value) {
  return  value;
}

export default function DiscreteSlider() {
  return (
    <div
      style={{ position: "absolute", bottom: 50, zIndex: 2 }}
      className="container-fluid"
    >
      <div className="card" style={{height:70}}>
        <div className="card-body">
          <Slider
            style={{ color: "#f1c40f" }}
            defaultValue={1}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={marks}
            min={1}
            max={31}
            valueLabelDisplay="on"
          />
        </div>
      </div>
    </div>
  );
}
