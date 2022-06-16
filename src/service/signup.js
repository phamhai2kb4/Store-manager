import endpoints from "./endpoints"
import axios from 'axios'
import { Base_URL, base_url } from '../configs/Configs'

const signup = async (name, email, password, phone) => {
    try {
        const res = await axios.post(`${Base_URL + endpoints.v1.register()}`, {
            "email": email,
            "password": password,
            "name": name,
            "phone": phone
        })
            .then( (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
export {
    signup,
}