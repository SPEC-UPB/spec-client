import axios from 'axios'
import env from '../config/env'

class EstacionService {

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        console.log([year, month, day].join('-'));
        return [year, month, day].join('-');
    }

    getEstaciones(){
       return axios.get(env.SERVER_URL + '/api/getEstaciones')
    }

    getRadiacionByDate(station, date){
        console.log("Buscando radiación para la estacion " + station + " en la fecha " + date); 
        return axios.get(env.SERVER_URL + '/api/getRadiacionByEstacionAndDate/'+station+'/'+date + " 00:00:00")
    }
}

export default new EstacionService()