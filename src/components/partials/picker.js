import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState('08-17-2016');
  const [selectedDateEnd, setSelectedDateEnd] = React.useState('09-17-2016');

  


const handleDateChange = (date) => {
  if(date != "Invalid Date"){
    setSelectedDate(date);
    props.onChange(date)
  }else{
    console.log("Fecha invalida");
  }
  
};

const handleDateEndChange = (date) => {
  if(date != "Invalid Date"){
    setSelectedDateEnd(date);
    props.onChangeDateEnd(date)
  }else{
    console.log("Fecha invalida");
  }
  
};

  return (
      <div className="row">
        <div className="col">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disabled={props.isRequest}
              margin="normal"
              id="date-picker-dialog"
              label={props.scale ? "Fecha de inicio":"Seleccione una fecha"}
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
              
          </MuiPickersUtilsProvider>
        </div>
        <div className="col">
          {props.scale && 
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disabled={props.isRequest}
            margin="normal"
            id="date-picker-dialog"
            label={props.scale ? "Fecha final":"Seleccione una fecha"}
            format="MM/dd/yyyy"
            value={selectedDateEnd}
            onChange={handleDateEndChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
            
        </MuiPickersUtilsProvider>}
          
        </div>
      </div>
  );
}