import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  const [selectedDate, setSelectedDate] = React.useState('01-01-2010');
  const [selectedDateEnd, setSelectedDateEnd] = React.useState('01-31-2010');

  


const handleDateChange = (date) => {
  if(date != "Invalid Date"){
    console.log(date);
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
  }
  
};

  return (
      <div className="row">
        <div className="col">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              views={props.typeScale != "día" ? props.typeScale == "mes" ? ["month"]:["year"]:["date"]}
              disabled={props.isRequest}
              margin="normal"
              id="date-picker-dialog"
              label={props.scale ? "Fecha de inicio":"Seleccione una fecha"}
              format={props.typeScale != "día" ? props.typeScale == "mes" ? "MM/yyyy":"yyyy":"MM/dd/yyyy"}
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
            views={props.typeScale != "día" ? props.typeScale == "mes" ? ["month"]:["year"]:["date"]}
            disabled={props.isRequest}
            margin="normal"
            id="date-picker-dialog"
            label="Fecha final"
            format={props.typeScale != "día" ? props.typeScale == "mes" ? "MM/yyyy":"yyyy":"MM/dd/yyyy"}
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