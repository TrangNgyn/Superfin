import {GET_INCOMPLETE_ORDERS, LOADING_INCOMPLETE_ORDERS, ERROR_INCOMPLETE_ORDERS, DELETE_INCOMPLETE_ORDERS, ADD_TRACKING, ADD_INCOMPLETE_ORDER} from './actionTypes';
import axios from 'axios';
import { _logout } from '../_services/SharedFunctions';

export const getIncompleteOrders = (token, updateAuth) => dispatch => {
    dispatch(setIncompleteOrdersLoading(true));

    const config = { headers:{ authorization : `Bearer ${token}` }};

    axios.get('api/orders/all-uncomplete', config)
    .then(res => {
        dispatch({
            type: GET_INCOMPLETE_ORDERS,
            payload: res.data
        });
    })
    .catch(err => {
        console.log(err);
        if(err.response.status === 401) _logout(updateAuth);
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

export const deleteIncompleteOrder = (po_number, token, updateAuth) => dispatch => {

    const config = { headers:{ authorization : `Bearer ${token}` }};

    return axios.post('api/orders/delete-order', {po_number: po_number}, config)
    .then(res => {
        if(res.data.success){
            dispatch({
                type: DELETE_INCOMPLETE_ORDERS,
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
        if(err.response.status === 401) _logout(updateAuth);
        return err;
    });
}

export const addTracking = (trackingDetails, token, updateAuth) => dispatch => {
    const config = { headers:{ authorization : `Bearer ${token}` }};

    return axios.post('api/orders/add-tracking', trackingDetails, config)
    .then(res => {
        if(res.data.success){
            dispatch({
                type: ADD_TRACKING,
                payload: trackingDetails
            });
            return res;
        }
        else {
            console.log(res);
            return res;
        }
    })
    .catch(err => {
        console.log(err);
        if(err.response.status === 401) _logout(updateAuth);
        return err;
    })
}

export const addIncompleteOrder = order => dispatch => {
    return axios.post('/api/orders/create-order', order)
    .then(res => {
        if(res.data.success){
            order.po_number = res.data.po_number;
            dispatch({
                type: ADD_INCOMPLETE_ORDER,
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


