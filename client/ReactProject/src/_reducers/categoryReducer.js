import { GET_CATEGORIES, GET_SUB_CATEGORIES, LOADING_CATEGORIES, ERROR_CATEGORIES, EMPTY_CATEGORIES } from '../_actions/actionTypes';

const initState = {
    categories: [],
    loading: false,
    error: false,
    empty: false
}

const categoryReducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case GET_SUB_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case LOADING_CATEGORIES:
            return {
                ...state,
                loading: true
            }
        case ERROR_CATEGORIES:
            return {
                ...state,
                loading: false,
                error: true
            }
        case EMPTY_CATEGORIES: 
            return {
                ...state,
                loading: false,
                empty: true
            }
        default:
            return state
    }
}

export default categoryReducer;