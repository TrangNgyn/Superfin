import {GET_INCOMPLETE_ORDERS, LOADING_INCOMPLETE_ORDERS, ERROR_INCOMPLETE_ORDERS, DELETE_INCOMPLETE_ORDERS, ADD_TRACKING, ADD_INCOMPLETE_ORDER} from './actionTypes';
import axios from 'axios';

export const getIncompleteOrders = () => dispatch => {
    dispatch(setIncompleteOrdersLoading(true));

    axios.get('api/orders/all-uncomplete')
    .then(res => {
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

export const deleteIncompleteOrder = po_number => dispatch => {
    return axios.post('api/orders/delete-order', {po_number: po_number})
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
        return err;
    });
}

export const addTracking = trackingDetails => dispatch => {
    return axios.post('api/orders/add-tracking', trackingDetails)
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
        return err;
    })
}

export const addIncompleteOrder = order => dispatch => {
    console.log('got here to the actions');
    return axios.post('/api/orders/create-order', order)
    .then(res => {
        if(res.data.success){
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


