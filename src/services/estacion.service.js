import axios from 'axios'
import env from '../config/env'

class EstacionService {

    getEstaciones(){
       return axios.get(env.SERVER_URL + '/api/getEstaciones')
    }
}

export default new EstacionService()