import axios from 'axios'
import env from '../config/env'

class PotencialService {

    getPotenciaByDate(date){
       return axios.get(env.SERVER_PYTHON_URL + '/getPotencialByDate/'+date)
    }

    getPotencial(){
        return axios.get(env.SERVER_PYTHON_URL + '/getPotencial')
     }

     getPotencialByDateRange(start_date, end_date, type){
      if(type == "día"){
         // request for day
         return axios.get(env.SERVER_PYTHON_URL + '/getPotencialByDateRangeDay/'+ start_date + "/" + end_date)
       }else if(type == "mes"){
         // request for month
         return axios.get(env.SERVER_PYTHON_URL + '/getPotencialByDateRangeMonth/'+ start_date + "/" + end_date)
       }else if(type == "año"){
         // request for year
         return axios.get(env.SERVER_PYTHON_URL + '/getPotencialByDateRangeYear/'+ start_date + "/" + end_date)
       }
   }

    
}

export default new PotencialService()