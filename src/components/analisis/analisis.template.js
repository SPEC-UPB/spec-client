import React, { useEffect, useState } from "react";
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
  const [efficiencyPercentage, setEfficiencyPercentage] = useState(17)
  const [consumo, setConsumo] = useState(0)
  const [potencialEstacion, setPotencialEstacion] = useState(0)
  const [originalPotencialEstacion, setOriginalPotencialEstacion] = useState(0)
 

  const changeEfficiencyPercentage = (e) => {
    const value = e.target.value
    if (value <= mayorEfficiencyPercentage && value >= menorEfficiencyPercentage) {
      setEfficiencyPercentage(value)
      setPotencialEstacion(originalPotencialEstacion * (value/100))
    }
  }

  

  const changeKw = (e) => {
    const value = e.target.value
    if(value >= 0){
      setConsumo(value)
    }
    
  }

  const images = [
    {
      url: '/images/recibo.jpg',
      title: '¡Conozca cuánta energía puede ahorrarse!',
      width: '50%'
    },
    {
      url: '/images/consumo-electrico-hogar.png',
      title: '¡Conozca cuánta energía consume en su hogar!',
      width: '50%'
    }
  ];

  const data = {
    datasets: [{
      data: [potencialEstacion, consumo],
      backgroundColor: ['#2ecc71', '#e74c3c']
    }],
    labels: [
      'Energía renovable (kwh/m^2) generada',
      'Energía tradicional (kw) consumida'
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
  

  useEffect(() => {

      if(props.object && props.scale && props.typeScale == "día" && props.data.length == 0){
        const dataForDay = props.dataForScaleDay.filter(p => p.estacion == props.object.nombre)
        console.log("--> data for day range ", dataForDay);
        let contador = 0;
        dataForDay.forEach(potencial => {
          contador+=potencial.radiacion
        });
        setOriginalPotencialEstacion(contador/1000)
        setPotencialEstacion((contador/1000) * (efficiencyPercentage/100))
        console.log("value for day range ->", contador/1000);
      }
      
      console.log("props.data->",props.data);
      if(props.data && props.typeScale != "día"){
        let contador = 0;
        props.data.forEach(potencial => {
          contador+=(potencial/props.porcentajeAplicadoToBarChart);
        });
        setOriginalPotencialEstacion(contador)
        setPotencialEstacion(contador * (efficiencyPercentage/100))
      }
  
    return () => {

    }
  },[props.data, props.object, props.dataForScaleDay]);
  
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
              No estaria nada mal saber cuánta energía podría ahorrarse si implementara energias renovables en su hogar, cierto. 
              Una vez calculado la cantidad de vatios (Watts) a partir de la consulta definida, puede conocer el potencial que podría estarse
              ahorrando, lo que le ayudaria a reducir los costos de por consumo eléctrico en su hogar.
              Este cálculo depende de la eficiencia del panel solar, lo cual es el porcentaje de energía que este puede capturar y se encuentra entre un 17% y 25%,
              puede jugar con este valor para descubrir cuánta energía puede capturar.
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
          <div class="modal-dialog modal-dialog-scrollable modal-full-height modal-bottom " role="document">


            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title w-100 text-center text-muted" id="myModalLabel">Conozca cuánta energía puede ahorrar</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 ">
                    <h5 className="text-center">¿Le gustaría conocer en cuánto podría reducir el consumo de su factura
                    si implementara energía renovable en su hogar?
                    </h5>
                    <p className="mt-3" style={{ textAlign: "justify" }}>Para conocer cuánta energía podría ahorrarse si usara una fuente de energia renovable como el panel solar
                    solo necesita tener a la mano su recibo de consumo eléctrico e identificar la cantidad de kilovatios consumidos
                    sobre el cual la empresa que provee el servicio le esta generando cargos, una vez identificado siga los siguientes pasos:
                    </p>
                    <ul>
                      <li>Realice una consulta de radiación para el rango de fecha del cual desea conocer el potencial (en Kw/h) generado.</li>
                      <li>Ingrese la cantidad de de kilovatios (kw) que registra su factura.</li>
                    </ul>
                    
                    <div className="row">
                      <div className="col">
                        <FormControl className="mt-2"  >
                          <Input
                            onChange={changeKw}
                            value={consumo}
                            type="number"
                            endAdornment={<InputAdornment position="end">KW</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                            }}
                          />
                          <FormHelperText id="standard-weight-helper-text">Ingrese consumo en kilovatios</FormHelperText>
                        </FormControl>
                      </div>
                      <div className="col">
                        <FormControl className="mt-2 ml-2"  >
                          <Input
                            onChange={changeEfficiencyPercentage}
                            value={efficiencyPercentage}
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
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    {props.scale && props.object ? (
                      <div>
                        <p style={{ textAlign: "justify" }} className="text-center mx-5  mt-1">La gráfica muestra los Kilovatios por hora ahorrados por cada metro<sup>2</sup> con un panel solar 
                    del <strong>{efficiencyPercentage}% </strong>de eficiencia cerca de la estación <strong>{props.object.nombre}</strong> desde la fecha {props.currentDateStart} hasta {props.currentDateEnd}, rango en el cual  
                        pudo ahorrarse el <strong>{consumo != 0 ? ((potencialEstacion*100) / consumo).toFixed(2):100}% </strong> equivalente a <strong>{potencialEstacion .toFixed(2)} kilovatios</strong> de consumo </p>
                        <Doughnut data={data} />
                      </div>
                    ) : (
                    <div>
                      <h6 className="text-center mx-5 my-2 text-muted">Active la escala de tiempo como lo indica la figura.</h6>
                      <img className="z-depth-1 img-fluid rounded mx-auto d-block" src="/images/activar-escala.png"></img>
                      <h6 className="text-center mx-5 mt-3 text-muted">Luego seleccione una estación.</h6>
                      <img className="z-depth-1 img-fluid rounded mx-auto d-block" src="/images/seleccionar-estacion.PNG"></img>
                    </div>)}
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
