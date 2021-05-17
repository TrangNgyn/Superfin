import { GET_COMPLETE_ORDERS, LOADING_COMPLETE_ORDERS, ERROR_COMPLETE_ORDERS, DELETE_COMPLETE_ORDER, ADD_COMPLETE_ORDER } from './actionTypes';
import axios from 'axios';
import { _logout } from '../_services/SharedFunctions';


export const getCompleteOrders = (token, updateAuth) => dispatch => {
    dispatch(setCompleteOrdersLoading(true));
    
    const config = { headers:{ authorization : `Bearer ${token}` }};

    return axios.get('api/orders/all-complete', config)
    .then(res => {
        dispatch({
            type: GET_COMPLETE_ORDERS,
            payload: res.data
        });
    })
    .catch(err => {
        console.log(err);
        if(err.response.status === 401) _logout(updateAuth);
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

export const deleteCompleteOrder = (po_number, token) => dispatch => {
    const config = { headers:{ authorization : `Bearer ${token}` }};

    return axios.post('api/orders/delete-order', {po_number: po_number}, config)
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
    });
}

export const addCompleteOrder = order => dispatch => {
    return axios.post('/api/orders/create-order', order)
    .then(res => {
        if(res.data.success){
            order.po_number = res.data.po_number;
            dispatch({
                type: ADD_COMPLETE_ORDER,
                payload: order
            })
        }
        else console.log(res);
        return res;
        
    })
    .catch(err => {
        console.log(err);
        return err;
    });
}
 
