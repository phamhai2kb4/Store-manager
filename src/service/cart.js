import endpoints from "./endpoints"
import axios from 'axios'
import { Base_URL } from '../configs/Configs'

const getCart = async () => {
    try {
        const res = await axios.get(`${Base_URL + endpoints.v1.cart()}`)
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
const deleteCart = async (id) => {
    try {
        const res = await axios.delete(`${Base_URL + endpoints.v1.cart() + id}`)
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
const createCart = async (data) => {
    try {
        const res = await axios.post(`${Base_URL + endpoints.v1.cart()}`, {
            "userId": data.userId,
            "productId": data.productId,
            "qty": data.qty,
            "name": data.name,
            "price": data.price,
            "image": data.image
        })
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
export {
    getCart,
    deleteCart,
    createCart
}