import axios from 'axios'
import env from '../config/env'

class PotencialService {

    getPotenciaByDate(date){
       return axios.get(env.SERVER_PYTHON_URL + '/getPotencialByDate/'+date)
    }

    getPotencial(){
        return axios.get(env.SERVER_PYTHON_URL + '/getPotencial')
     }

    
}

export default new PotencialService()