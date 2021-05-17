import { 
    GET_INCOMPLETE_ORDERS,
    ERROR_INCOMPLETE_ORDERS, 
    LOADING_INCOMPLETE_ORDERS, 
    DELETE_INCOMPLETE_ORDERS, 
    ADD_TRACKING, 
    ADD_INCOMPLETE_ORDER, 
    EDIT_INCOMPLETE_ORDER 
} from '../_constants/actionTypes.constants';
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
        case ADD_TRACKING:{
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
        }
        case ADD_INCOMPLETE_ORDER: {
            const newArray = [...state.incompleteOrders, payload];
            newArray.sort((a,b) => { return new Date(b.issued_date) - new Date(a.issued_date)});

            return {
                ...state,
                incompleteOrders: newArray
            }
        }
        case EDIT_INCOMPLETE_ORDER: {
            const index = state.incompleteOrders.findIndex(o => {
                return o.po_number === payload.po_number;
            });
            
            return {
                ...state,
                incompleteOrders: [
                    ...state.incompleteOrders.slice(0, index),
                    payload,
                    ...state.incompleteOrders.slice(index + 1)
                ]
            }
        }
        default:
            return state
    }
}

export default incompleteOrdersReducer;