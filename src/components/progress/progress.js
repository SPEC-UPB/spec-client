import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function CircularIndeterminate(props) {

  return (
    <div style={{position:'absolute',left:'45%', top:50, zIndex:2}} >
      <div>
        <CircularProgress />
        <p>{props.message}</p>
      </div>
    </div>
  );
}