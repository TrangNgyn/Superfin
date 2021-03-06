import { GET_COMPLETE_ORDERS, LOADING_COMPLETE_ORDERS, ERROR_COMPLETE_ORDERS} from './actionTypes';
import axios from 'axios';

export const getCompleteOrders = () => dispatch => {
    dispatch(setCompleteOrdersLoading(true));

    return axios.get('api/orders/all-complete')
    .then(res => {
        dispatch({
            type: GET_COMPLETE_ORDERS,
            payload: res.data
        });
    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: ERROR_COMPLETE_ORDERS,
        });
    })
}

export const setCompleteOrdersLoading = val => {
    return {
        type: LOADING_COMPLETE_ORDERS,
        payload: val
    }
}

