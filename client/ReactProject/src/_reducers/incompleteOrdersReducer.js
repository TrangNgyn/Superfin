import { GET_INCOMPLETE_ORDERS, ERROR_INCOMPLETE_ORDERS, LOADING_INCOMPLETE_ORDERS } from '../_actions/actionTypes';

const initState = {
    incompleteOrders: [],
    loading: false,
    error: false
}

const incompleteOrdersReducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_INCOMPLETE_ORDERS:
            return {
                ...state,
                incompleteOrders: payload,
                loading: false,
                error: false
            }
        case ERROR_INCOMPLETE_ORDERS:
            return {
                ...state,
                error: true,
                loading: false
            }
        case LOADING_INCOMPLETE_ORDERS:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

export default incompleteOrdersReducer;