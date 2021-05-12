import { GET_PRODUCTS, GET_PRODUCT, DEFAULT_ORDER, LOADING_PRODUCTS,
    DELETE_PRODUCT, ERROR, EDIT_PRODUCT, ADD_PRODUCT } from './actionTypes';
import axios from 'axios';

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

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
    dispatch(setIsLoading(true));
    axios.post('api/products/product-by-id', {
        p_code: p_code
    }).then(res => {
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        })
    })
    .catch(() => {
        dispatch(setIsLoading(false));
        dispatch({
            type: ERROR
        })
    });
};

export const setDefaultOrder = () => {
    return {
        type: DEFAULT_ORDER
    }
}

export const deleteProduct = p_code => dispatch => {
    return axios.post('api/products/delete-product', {
        p_code: p_code
    })
    .then(res => {
        if(res.data.succes){                            //This may need to be changed to 'success'
            dispatch({
                type: DELETE_PRODUCT,
                payload: p_code
            })
        }
    })
    .catch(err => {
        console.log(err);
    });
}

export const editProduct = product => dispatch => {
    return axios.post('/api/products/edit-product', product)
        .then(res => {
            if(res.data.success){
                dispatch({
                    type: EDIT_PRODUCT,
                    payload: product
                })
            }
            return res;
        });
}

export const addProduct = (formData, newProduct) => dispatch => {
    return axios.post('/api/products/add-product', formData, config)
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
