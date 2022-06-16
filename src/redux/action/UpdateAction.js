import { FETCH_USER_SUCCESS } from '../reducers/infoReducers'

export const SelectUser = (data) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: data
    }
}
