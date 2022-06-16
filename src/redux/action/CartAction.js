import { ADD_TO_CART, DELETE_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, GET_ALL_PRODUCT, GET_NUMBER_CART } from '../reducers/CartReducers'

export function GetAllProduct(data) {
    return {
        type: GET_ALL_PRODUCT,
        payload: data
    }
}

export function GetNumberCart() {
    return {
        type: GET_NUMBER_CART
    }
}


export const ItemCart = (data) => {
    return {
        type: ADD_TO_CART,
        payload: data
    }
}

export function DeleteCart(data) {
    console.log(data,"data");
    return {
        type: DELETE_CART,
        payload: data
    }
}

export function IncreaseQuantity(data) {
    return {
        type: INCREASE_QUANTITY,
        payload: data
    }
}
export function DecreaseQuantity(data) {
    return {
        type: DECREASE_QUANTITY,
        payload: data
    }
}
