import endpoints from "./endpoints"
import axios from 'axios'
import { Base_URL, base_url } from '../configs/Configs'

const onLoggedIn = async (username, password) => {
    try {
        const res = await axios.post(`${Base_URL + endpoints.v1.login()}`, {
            "email": username,
            "password": password
        })
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

const getUserId = async (id) => {
    try {
        const res = await axios.get(`${Base_URL + endpoints.v1.getUser() + id}`, {
        })
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

const getInfo = async () => {

    try {
        const res = await axios.get(`${base_url + endpoints.v1.getinfo()}`)
            .then((response) => { return response.data })
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

export {
    onLoggedIn,
    getInfo,
    getUserId
}