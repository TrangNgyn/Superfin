import { GET_COMPLETE_ORDERS, ERROR_COMPLETE_ORDERS, LOADING_COMPLETE_ORDERS, DELETE_COMPLETE_ORDER, ADD_COMPLETE_ORDER, EDIT_COMPLETE_ORDER } from '../_actions/actionTypes';

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
                completeOrders: payload.sort((a,b) => { return new Date(b.issued_date) - new Date(a.issued_date)}),
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
        case DELETE_COMPLETE_ORDER:
            return{
                ...state,
                completeOrders: state.completeOrders.filter(o => o.po_number !== payload)
            }
        case ADD_COMPLETE_ORDER: {
            const newArray = [...state.completeOrders, payload];
            newArray.sort((a,b) => { return new Date(b.issued_date) - new Date(a.issued_date)});
            
            return {
                ...state,
                completeOrders: newArray
            }
        }
        case EDIT_COMPLETE_ORDER: {
            const index = state.completeOrders.findIndex(o => {
                return o.po_number === payload.po_number;
            });
            
            return {
                ...state,
                completeOrders: [
                    ...state.completeOrders.slice(0, index),
                    payload,
                    ...state.completeOrders.slice(index + 1)
                ]
            }
        }
        default:
            return state
    }
}

export default completeOrdersReducer;