import { GET_PRODUCT, ERROR } from '../_actions/actionTypes';

const initState = {
    product: null,
    isLoading: false,
    error: false
}

const productDetailsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                isLoading: false,
                error: false
            }
        case ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
};

export default productDetailsReducer;