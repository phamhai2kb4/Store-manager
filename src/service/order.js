import endpoints from "./endpoints"
import axios from 'axios'
import { Base_URL } from '../configs/Configs'

const getOrder = async () => {
    try {
        const res = await axios.get(`${Base_URL + endpoints.v1.order()}`)
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

const getSummary = async () => {
    try {
        const res = await axios.get(`${Base_URL + "/api/summary"}`)
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
const updateOrder = async (id, status) => {
    try {
        const res = await axios.put(`${Base_URL + endpoints.v1.order() + id}`, {
            "status": status
        })
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
const createOrder = async (data, id) => {
    try {
        const res = await axios.post(`${Base_URL + endpoints.v1.order()}`, {
            "userId": id,
            "items": data
        })
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
export {
    getOrder,
    updateOrder,
    createOrder,
    getSummary
}