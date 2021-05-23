import { 
    GET_PRODUCTS, 
    GET_PRODUCT, 
    DEFAULT_ORDER, 
    LOADING_PRODUCTS,
    DELETE_PRODUCT, 
    ERROR, 
    EDIT_PRODUCT, 
    ADD_PRODUCT,
    SET_LOADING,
} from '../_constants/actionTypes.constants';
import axios from 'axios';
import { _logout } from '../_services/SharedFunctions';
import {baseURL} from '../_helpers/axiosBaseURL';

axios.defaults.baseURL = baseURL;

/*
const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}*/

export const getAllProducts = () => dispatch  => {
    dispatch(setIsLoading(true));

    axios.get('api/products/all-product')
    .then(res => {
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data.products
        })
    })
    .catch(() => {
        dispatch(setIsLoading(false));
        dispatch({
            type: ERROR
        })
    });
};

export const getProductDetails = p_code => dispatch => {
    dispatch(setLoadingProductDetails(true));
    axios.post('api/products/product-by-id', {
        p_code: p_code
    }).then(res => {
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        })
    })
    .catch(() => {
        dispatch(setLoadingProductDetails(false));
        dispatch({
            type: ERROR
        })
    });
};

export const setLoadingProductDetails = () => {
    return {type: SET_LOADING}
}

export const setDefaultOrder = () => {
    return {
        type: DEFAULT_ORDER
    }
}

export const deleteProduct = (p_code, access_token, updateAuth) => dispatch => {
    const config = { headers:{ authorization : `Bearer ${access_token}` }};
    return axios.post('api/products/delete-product', {
        p_code: p_code
    }, config)
    .then(res => {
        if(res.data.success){                            //This may need to be changed to 'success'
            dispatch({
                type: DELETE_PRODUCT,
                payload: p_code
            })
        }
    })
    .catch(err => {
        console.log(err);
        if(err.response.status === 401) _logout(updateAuth);
    });
}

export const editProduct = (newProduct, formData, access_token) => dispatch => {
    const config = { headers:{ authorization : `Bearer ${access_token}` }};
    return axios.post('api/products/edit-product', formData, config)
        .then(res => {
            if(res.data.success){
                dispatch({
                    type: EDIT_PRODUCT,
                    payload: newProduct
                })
            }
            return res;
        })
}

export const addProduct = (formData, newProduct, access_token) => dispatch => {
    const config = { headers:{ authorization : `Bearer ${access_token}` }};
    
    return axios.post('api/products/add-product', formData, config)
        .then(res => {
            if(res.data.success){
                dispatch({
                    type: ADD_PRODUCT,
                    payload: newProduct
                })
            }
            return res;
        });
}

export const setIsLoading = val => {
    return {
        type: LOADING_PRODUCTS,
        payload: val
    }
}
