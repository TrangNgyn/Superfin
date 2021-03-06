import { GET_COMPLETE_ORDERS, ERROR_COMPLETE_ORDERS, LOADING_COMPLETE_ORDERS } from '../_actions/actionTypes';

const initState = {
    completeOrders: [],
    loading: false,
    error: false
}

const completeOrdersReducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_COMPLETE_ORDERS:
            return {
                ...state,
                completeOrders: payload,
                loading: false,
                error: false
            }
        case ERROR_COMPLETE_ORDERS:
            return {
                ...state,
                error: true,
                loading: false
            }
        case LOADING_COMPLETE_ORDERS:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

export default completeOrdersReducer;