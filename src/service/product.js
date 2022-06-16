import endpoints from "./endpoints"
import axios from 'axios'
import { Base_URL } from '../configs/Configs'

const getProduct = async () => {
    try {
        const res = await axios.get(`${Base_URL + endpoints.v1.product()}`)
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

const getProductId = async (id) => {
    console.log(id,'id');
    try {
        const res = await axios.get(`${Base_URL + endpoints.v1.product() + id}`)
            .then(async (response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

const postProduct = async (data, e) => {
    const uploadData = new FormData();
    uploadData.append("tenSp", data.name)
    uploadData.append("giaSp", data.regular_price)
    uploadData.append("giaKm", data.sale_price)
    uploadData.append("maSp", data.sku)
    uploadData.append("tonKho", data.stock_quantity)
    uploadData.append( "moTa", data.description)
    uploadData.append(e.type, {
        name: 'image',
        uri: e.uri,
        
    });

    try {
        const res = await fetch(`${Base_URL + endpoints.v1.product()}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: uploadData
            })
            .then(response => response.json())
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}
const updateProduct = async (data, photo) => {

    try {
        const res = await axios.put(`${Base_URL + endpoints.v1.product() + "/" + data.id}`, {
            "tenSp": data.name,
            "giaSp": data.regular_price,
            "giaKm": data.sale_price,
            "maSp": data.sku,
            "tonKho": data.stock_quantity,
            "moTa": data.description,

        })
            .then((response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${Base_URL + endpoints.v1.product() + "/" + id}`, {
        })
            .then((response) => response.data)
            .catch(error => console.log(error))
        return res
    } catch (error) {
        throw error
    }
}

export {
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
    getProductId
}