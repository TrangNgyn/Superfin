import { GET_INCOMPLETE_ORDERS, ERROR_INCOMPLETE_ORDERS, LOADING_INCOMPLETE_ORDERS, DELETE_INCOMPLETE_ORDERS, ADD_TRACKING } from '../_actions/actionTypes';
import { orderStatusConstants } from '../_constants/orderStatus.constants'; 

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
                incompleteOrders: payload.sort((a,b) => { return new Date(b.issued_date) - new Date(a.issued_date)}),
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
        case DELETE_INCOMPLETE_ORDERS:
            return {
                ...state,
                incompleteOrders: state.incompleteOrders.filter(o => o.po_number !== payload)
            }
        case ADD_TRACKING:
            const index = state.incompleteOrders.findIndex(o => { return o.po_number === payload.po_number });
            const tempArr = state.incompleteOrders;
            let tempObj = tempArr[index];
            
            tempObj.tracking_number = payload.tracking_number;
            tempObj.carrier = payload.carrier;
            tempObj.status = orderStatusConstants.SHIPPED;

            return {
                ...state,
                incompleteOrders: [...tempArr]
            }
        default:
            return state
    }
}

export default incompleteOrdersReducer;