import { GET_COMPLETE_ORDERS, LOADING_COMPLETE_ORDERS, ERROR_COMPLETE_ORDERS, DELETE_COMPLETE_ORDER} from './actionTypes';
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

export const deleteCompleteOrder = po_number => dispatch => {
    return axios.post('api/orders/delete-order', {po_number: po_number})
    .then(res => {
        if(res.data.success){
            dispatch({
                type: DELETE_COMPLETE_ORDER,
                payload: po_number
            });
            return res;
        }
        else{
            console.log(res);
            return res;
        } 
    })
    .catch(err => {
        console.log(err);
        return err;
    });
}

