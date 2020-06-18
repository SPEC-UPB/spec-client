import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function CircularIndeterminate(props) {

  return (
    <div className="card" style={{position:'absolute',left:'45%', top:50, zIndex:2, height:100}} >
      <div className="card-body">
        <CircularProgress />
        <p>{props.message}</p>
      </div>
    </div>
  );
}