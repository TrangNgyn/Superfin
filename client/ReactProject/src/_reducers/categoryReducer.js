import { GET_CATEGORIES, LOADING_CATEGORIES, ERROR_CATEGORIES } from '../_actions/actionTypes';

const initState = {
    categories: [],
    loading: false,
    error: false
}

const categoryReducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_CATEGORIES:
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
        default:
            return state
    }
}

export default categoryReducer;