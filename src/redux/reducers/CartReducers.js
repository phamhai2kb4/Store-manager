
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_CART = 'DELETE_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const GET_NUMBER_CART = 'GET_NUMBER_CART'
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT'

const initialState = {
    numberCart: 0,
    Carts: [],
    _products:[]

}

export default function actionForReducer(state = initialState, action) {
   
    switch (action.type) {

        case GET_ALL_PRODUCT:
            return{
                ...state,
                _products:action.payload
                
            }
        case GET_NUMBER_CART:
            return {
                ...state
            }

        case ADD_TO_CART:
            if (state.numberCart == 0) {
                let cart = {
                    id: action.payload._id,
                    quantity: 1,
                    name: action.payload.tenSp,
                    image: action.payload.productImage,
                    price: action.payload.giaSp,
                    userId: action.payload.userId
                }
                state.Carts.push(cart);
            }
            else {
                let check = false;
                state.Carts.map((item, key) => {
                    if (item.id == action.payload.id) {
                        state.Carts[key].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        id: action.payload._id,
                        quantity: 1,
                        name: action.payload.tenSp,
                        image: action.payload.productImage,
                        price: action.payload.giaSp
                    }
                    state.Carts.push(_cart);
                }
            }

            return {
                ...state,
                numberCart: state.numberCart + 1
            }

        case INCREASE_QUANTITY:
            state.numberCart ++
            state.Carts[action.payload].quantity ++
            return {
                ...state
            }

        case DECREASE_QUANTITY:
            let quantity = state.Carts[action.payload].quantity
            if (quantity > 1) {
                state.numberCart--
                state.Carts[action.payload].quantity--
            }
            return {
                ...state
            }

        case DELETE_CART:
            return {
                ...state,
                Carts: state.Carts.filter((item) => item.id !== action.payload.id)
            }

        default:
            return state

    }
}
