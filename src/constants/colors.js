export default  {
    lowRadiationColor : "rgb(250, 232, 177)",
    mediaRadiationColor : "rgba(255, 255, 69, 0.7)",
    hightRadiationColor : "rgba(255, 199, 0,0.7)",
    veryHightRadiationColor : "rgba(255, 0, 0,0.7)",

    lowRadiationValue : 250,
    mediaRadiationValue : 500,
    hightRadiationValue : 750,
    veryHightRadiationValue:1000,

    // suma en watts sin aplicar el porcentaje de eficiencia para las diferente sieres de tiempo
    lowPotentialValueDay : ((1000*12)/4),
    mediaPotentialValueDay : (((1000*12)/4)*2),
    hightPotentialValueDay : (((1000*12)/4)*3),
    veryHightPotentialValueDay:(((1000*12)/4)*4),

    lowPotentialValueMonth : ((1000*12*30)/4),
    mediaPotentialValueMonth : (((1000*12*30)/4)*2),
    hightPotentialValueMonth : (((1000*12*30)/4)*3),
    veryHightPotentialValueMonth:(((1000*12*30)/4)*4),

    lowPotentialValueYear : ((1000*12*365)/4),
    mediaPotentialValueYear : (((1000*12*365)/4)*2),
    hightPotentialValueYear : (((1000*12*365)/4)*3),
    veryHightPotentialValueYear:(((1000*12*365)/4)*4),

    
}