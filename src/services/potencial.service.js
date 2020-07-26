import axios from 'axios'
import env from '../config/env'

class PotencialService {

    getPotencial(date){
       return axios.get(env.SERVER_PYTHON_URL + '/get-potencial/'+date)
    }

    
}

export default new PotencialService()