import {GET_INCOMPLETE_ORDERS, LOADING_INCOMPLETE_ORDERS, ERROR_INCOMPLETE_ORDERS} from './actionTypes';
import axios from 'axios';

export const getIncompleteOrders = () => dispatch => {
    dispatch(setIncompleteOrdersLoading(true));

    axios.get('api/orders/all-uncomplete')
    .then(res => {
        console.log(res);
        dispatch({
            type: GET_INCOMPLETE_ORDERS,
            payload: res.data
        });
    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: ERROR_INCOMPLETE_ORDERS,
        });
    })
}

export const setIncompleteOrdersLoading = val => {
    return {
        type: LOADING_INCOMPLETE_ORDERS,
        payload: val
    }
}

