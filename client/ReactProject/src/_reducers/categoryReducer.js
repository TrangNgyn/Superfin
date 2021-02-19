import { GET_CATEGORIES } from '../_actions/actionTypes';

const initState = {
    categories: []
}

const categoryReducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        default:
            return state
    }
}

export default categoryReducer;