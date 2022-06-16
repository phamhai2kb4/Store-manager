import { combineReducers } from "redux";
import info from './infoReducers'
import cart from './CartReducers'
const reducers = combineReducers({
    personalInfo: info,
    personalCart: cart,
})

export default (state, action) => reducers(state, action)