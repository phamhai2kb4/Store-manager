import endpoints from "./endpoints"
import axios from 'axios'
import { Base_URL } from '../configs/Configs'

const getCategory = async () => {
    try {
        const res = await axios.get(`${Base_URL + endpoints.v1.category()}`)
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

export {
    getCategory,
}


