import { GET_PRODUCTS, LOADING_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT, ORDER_BY, ERROR, DEFAULT_ORDER } from '../_actions/actionTypes';

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
                isLoading: false
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
        case DELETE_PRODUCT: 
            return {
               ...state,
               products: state.products.filter(p => p.p_code !== payload)
            }
        case ADD_PRODUCT: 
            return {
                
            }
        case ERROR: 
            return {
                ...state,
                error: true
            }

        case ORDER_BY.PRICE_A:
            return {
                ...state,
                products: [...state.products].sort((a,b) => (a.p_price > b.p_price) ? 1 : ((b.p_price > a.p_price) ? -1 : 0))
            }
        case ORDER_BY.PRICE_D:
            return {
                ...state,
                products: [...state.products].sort((a,b) => (a.p_price < b.p_price) ? 1 : ((b.p_price < a.p_price) ? -1 : 0))
            }
        case ORDER_BY.NAME_A:
            return {
                ...state,
                products: [...state.products].sort((a,b) => (a.p_name > b.p_name) ? 1 : ((b.p_name > a.p_name) ? -1 : 0))
            }
        case ORDER_BY.NAME_D:
            return {
                ...state,
                products: [...state.products].sort((a,b) => (a.p_name < b.p_name) ? 1 : ((b.p_name < a.p_name) ? -1 : 0))
            }
        case ORDER_BY.CODE_A:
            return {
                ...state,
                products: [...state.products].sort((a,b) => (a.p_code > b.p_code) ? 1 : ((b.p_code > a.p_code) ? -1 : 0))
            }
        case ORDER_BY.CODE_D:
            return {
                ...state,
                products: [...state.products].sort((a,b) => (a.p_code < b.p_code) ? 1 : ((b.p_code < a.p_code) ? -1 : 0))
            }
        default:
            return state
    }
}

export default productReducer;