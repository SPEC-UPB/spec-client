export default  {
    lowRadiationColor : "rgba(76, 209, 55,0.7)",
    mediaRadiationColor : "rgba(241, 196, 15,0.7)",
    hightRadiationColor : "rgba(243, 156, 18,0.7)",
    veryHightRadiationColor : "rgba(232, 65, 24,0.7)",

    lowRadiationValue : 250,
    mediaRadiationValue : 500,
    hightRadiationValue : 750,
    veryHightRadiationValue:1000,

    // en watts sin aplicar el porcentaje de eficiencia
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