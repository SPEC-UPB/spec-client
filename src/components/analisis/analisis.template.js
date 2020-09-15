import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Doughnut } from 'react-chartjs-2';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function AnalisisTemplate(props) {

  const menorEfficiencyPercentage = 17
  const mayorEfficiencyPercentage = 25


  const changeEfficiencyPercentage = (e) => {
    const value = e.target.value
    if (value <= mayorEfficiencyPercentage && value >= menorEfficiencyPercentage) {
      props.changeEfficiencyPercentage(value)
    }
  }

  const [consumo, setConsumo] = useState(0)
  const [ahorrado, setAhorrado] = useState(33)

  const changeKw = (e) => {
    setConsumo(e.target.value)
  }

  const images = [
    {
      url: '/images/recibo.jpg',
      title: '¿Cuantos kw/h puedo ahorrarme?',
      width: '50%'
    },
    {
      url: '/images/consumo-electrico-hogar.png',
      title: '¡Conozca cuanta energía consume en su hogar!',
      width: '50%'
    }
  ];

  const data = {
    datasets: [{
      data: [ahorrado, consumo],
      backgroundColor: ['#2ecc71', '#e74c3c']
    }],
    labels: [
      'Energía renobable',
      'Energía tradicional'
    ]
  };
  const changeQuestion = (index) => {
    console.log(index);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));

  const classes = useStyles();
  return (
    <div className="card mx-3">
      <div className="card-body">

        <div className="row container-fluid">
          <div className="col-lg-10 col-xs-12 col-sm-12 col-md-10">
            <h2 className="text-muted my-3" >Uso del potencial calculado</h2>
            <p style={{ textAlign: "justify" }} className="grey-text">
              Ahora que conocemos el comportamiento de la radiación solar en el área metropolitana de Bucaramanga
              y sabemos lo que significa el potencial electrico entregado por las estaciones. puede que
              se pregunte ¿ De que me sirve esta información? ¿ Que significan los valores de potencial calculados?.
              No estaria nada mal saber cuanto dinero podria ahorrarse en su factura electricidad si usara energia renovable en su hogar, cierto.
              Para ello hemos puesto a su disposición el siguiente apartado donde podra conocer la energía que usted
              puede ahorrarse, conociendo la cantidad de vatios (Watts) que se caluculo a partir de la consulta definida.
              Este calculo depende de la eficiencia del panel solar, la cual es el porcentaje de energía que este puede capturar y se encuentra entre un 17% y 25%,
              juega con este valor para descubrir cuanta energía puede capturar.
              </p>
          </div>
          <div className="col-lg-2 col-xs-12 col-sm-12 col-md-2 mt-lg-5">
            <div className="row center-xs mt-5 ml-5">
              <div className="row">
                <img
                  width={100}
                  height={100}
                  src="/icons/svg/001-question.svg"
                  className="img-fluid  mb-xs-3"
                  alt="Sample project image"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="row container-fluid mt-1">
          <div className={classes.root}>
            {images.map((image, index) => (
              <ButtonBase
                data-toggle="modal"
                data-target="#fullHeightModalRight"
                onClick={() => changeQuestion(index)}
                focusRipple
                key={index}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: image.width,
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${image.url})`,
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {image.title}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            ))}
          </div>
        </div>

        {/* !-- Button trigger modal --> */}


        {/* <!-- Full Height Modal Right --> */}
        <div class="modal fade bottom " id="fullHeightModalRight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
          aria-hidden="true">

          {/* <!-- Add class .modal-full-height and then add class .modal-right (or other classes from list above) to set a position to the modal --> */}
          <div class="modal-dialog modal-full-height modal-bottom " role="document">


            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title w-100 text-center text-muted" id="myModalLabel">Conozca cuanto energía puede ahorrar</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-4">
                    <h5 className="text-center">¿Le gustaria conocer cuanto dinero podria ahorrar en el costo de sus factura
                    si implementara energía renobable en su hogar?
                    </h5>
                    <p className="mt-3" style={{ textAlign: "justify" }}>Para conocer cuanta energía podria ahorrarse si usara una fuente de energpia renovable como el panel solar
                    solo necesita tener a la mano su recibo de consumo electrico e identificar la cantidad de kilovatios consumidos
                    sobre el cual la empresa que provee el servicio le esta generando cargos, una vez identificado siga los siguientes pasos:
                    </p>
                    <ul>
                      <li>Realice una consulta de radiación para el rango de fecha del cual desea conocer el potencial (en Kw/h) generado.</li>
                      <li>Ingrese la cantidad de de kilovatios (kw) consumidos</li>
                    </ul>
                    <input onChange={changeKw} required="true" min={0} class="form-control mt-3 form-control-sm" type="number" placeholder="Ingrese el consumo en kilovatios"></input>
                    <FormControl className="mt-2"  >
                      <Input
                        onChange={changeEfficiencyPercentage}
                        value={props.efficiencyPercentage}
                        type="number"
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      <FormHelperText id="standard-weight-helper-text">Porcentaje de eficiencia / m<sup>2</sup></FormHelperText>
                    </FormControl>
                  </div>
                  <div className="col-8">
                    {props.scale ? (
                      <div>
                        <p className="text-center text-muted my-3">Kilovatios por hora ahorrados desde {props.currentDateStart} hasta {props.currentDateEnd} </p>
                        <p className="text-center text-muted my-3">Usted pudo ahorrarse el {(ahorrado / consumo).toFixed(2)}% equivalente a {ahorrado} kilovatios de consumo </p>
                        <Doughnut data={data} />
                      </div>
                    ) : (<h5 className="text-center my-5 text-muted">Active la escala de tiempo y seleccione un rango de fecha para el
                    cual quiere conocer el potencial obtenido
                    </h5>)}
                  </div>
                </div>
              </div>
              {/* <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div> */}
            </div>
          </div>
        </div>
        {/* <!-- Full Height Modal Right --> */}
      </div>
    </div>
  );
}
