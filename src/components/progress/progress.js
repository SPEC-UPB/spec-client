import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function CircularIndeterminate(props) {

  return (
    <div>
      <CircularProgress />
        <p>{props.message}</p>
    </div>
  );
}