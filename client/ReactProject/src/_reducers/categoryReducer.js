import { GET_CATEGORIES, CATEGORY_ERROR } from '../_actions/actionTypes';

const initState = {
    categories: [],
    error: false
}

const categoryReducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default categoryReducer;