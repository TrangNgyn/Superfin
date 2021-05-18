import { 
    GET_COMPANY_INFO,
    SET_COMPANY_INFO, 
    LOADING_COMPANY_INFO 
} from '../_constants/actionTypes.constants';

const initState = {
    companyInfo: {},
    loading: false,
    error: false
}

const companyInfoReducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_COMPANY_INFO:
            return {
                ...state,
                companyInfo: payload
            }
        case SET_COMPANY_INFO:
            return {
                ...state,
                companyInfo: payload
            }
        case LOADING_COMPANY_INFO:
            return {
                ...state,
                loading: !state.loading
            }
        default:
            return state
    }
}

export default companyInfoReducer;