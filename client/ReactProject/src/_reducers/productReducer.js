import { GET_PRODUCTS, GET_PRODUCT, LOADING_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, ADD_PRODUCT, ERROR, DEFAULT_ORDER } from '../_actions/actionTypes';

const initState = {
    products: [],
    isLoading: false,
    error: false
}

const productReducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload.sort((a,b) => (a.p_code > b.p_code) ? 1 : ((b.p_code > a.p_code) ? -1 : 0)),
                isLoading: false,
                error: false
            }
        case GET_PRODUCT:
            return {
                ...state,
                products: payload,
                isLoading: false,
                error: false
            }
        case DEFAULT_ORDER:
            return {
                ...state,
                products: [...state.products].sort((a,b) => (a.p_code > b.p_code) ? 1 : ((b.p_code > a.p_code) ? -1 : 0))
            }
        case LOADING_PRODUCTS: 
            return {
                ...state,
                isLoading: payload
            }
        case EDIT_PRODUCT:{
            const index = state.products.findIndex(p => {
                return p.p_code === payload.p_code;
            });
            
            return {
                ...state,
                products: [
                    ...state.products.slice(0, index),
                    payload,
                    ...state.products.slice(index + 1)
                ]
            }
        }
        case DELETE_PRODUCT: 
            return {
               ...state,
               products: state.products.filter(p => p.p_code !== payload)
            }
        case ADD_PRODUCT: 
            return {
                ...state,
                products: [...state.products, payload]
            }
        case ERROR: 
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default productReducer;