export const FETCH_USER = "FETCH_USER"
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"
export const FETCH_USER_FAILED = "FETCH_USER_FAILED"
const initialState = {
    loading: false,
    error: null,
    user: null,
  }

export default function actionForReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                loading: true,
                user: null,
                error: null,
            };
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: null,
            };
        case FETCH_USER_FAILED: {
            return {
                loading: false,
                user: null,
                error: action.payload
            }
        }
        default:
            return state

    }
}